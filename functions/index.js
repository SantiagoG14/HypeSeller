const functions = require("firebase-functions")
const admin = require('firebase-admin')
const stripe = require("stripe")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const { firestore } = require("firebase-admin")

require('dotenv/config')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp()

async function validateTotal(itemIds, total) {
  const products = await Promise.all(itemIds.map(itemId => admin.firestore().collection('catalog').doc(itemId).get()))
  const totalCatalog = products.filter(product => product.data().sold === false).map(product => product.data().price).reduce(totalPriceReducer, 0)
  return total === totalCatalog
}

function totalPriceReducer (accomulator, currentPrice) {
  return accomulator + currentPrice
}


exports.paymentIntents = functions.https.onCall(async (data, context) => {

  functions.logger.info(`Processing payment intent ${data}`, {structuredData: true})
  
  // Checking that the user is authenticated.
  validateAuth(context)

  functions.logger.info(`User is authenticated ${context.auth}`, {structuredData: true})

  // const totalPriceReducer = (accomulator, currentItem) => accomulator + currentItem.price
  
  const bagDoc = await admin.firestore().collection('bags').doc(context.auth.uid).get()
  const bagData = bagDoc.data()
  const bagItemIds = bagData.bag.map(item => item.id)
  // const amount = bagData.bag.map(item => item.price).reduce(totalPriceReducer, 0) * 100
  const userAmount = data.amount
  const validateAmount = await validateTotal(bagItemIds, userAmount)
  // functions.logger.info(`Server amount is ${amount}`)
  functions.logger.info(`Client amount is ${userAmount}`)

  if(validateAmount) {
    const amount = userAmount * 100
    const stripeWithSecret = new stripe.Stripe(process.env.STRIPE_SECRET_KEY)
    const paymentIntent = await stripeWithSecret.paymentIntents.create({
      amount,
      currency: "usd"
    })
    functions.logger.info(`Payment intent created succesfully ${paymentIntent}`, {structuredData: true})
    return paymentIntent.client_secret
  } else {
    throw new functions.https.HttpsError("invalid-argument", "Request amount does not match server amount. Or one of the products has been sold")
  }
})

exports.successfulCheckout = functions.https.onCall(async (data, context) => {
  functions.logger.info(`Successful payment ${data}` )

  // Checking that the user is authenticated.
  validateAuth(context)

  

  const bagReference = admin.firestore().collection('bags').doc(context.auth.uid)
  const bagDoc = await bagReference.get()

  const bagData = bagDoc.data()
  const totalPriceReducer = (accomulator, currentItem) => accomulator + currentItem.price
  const amount = bagData.bag.reduce(totalPriceReducer, 0)

  const orderDetails = {
    userId: context.auth.uid,
    items: bagDoc.data().bag,
    billingDetails: data.billingDetails,
    date: admin.firestore.FieldValue.serverTimestamp(),
    total: amount
  }

  const orderRef = await admin.firestore().collection('orders').add(orderDetails)
  const orderDoc = await orderRef.get()

  const catalogReference = admin.firestore().collection('catalog')
  Promise.all(bagDoc.data().bag.map(item => (
    catalogReference.doc(item.id).set({
      sold: true
    }, { merge: true})
    )))
  
  const successDetails = {
    items: orderDetails.items.length,
    date: orderDoc.get('date').toDate().toUTCString(),
    orderId: orderDoc.id,
    total: orderDetails.total
  }

  //reset user bag

  bagReference.set({
    bag: []
  })

  return successDetails

})

function validateAuth(context) {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition',
      'The function must be called while authenticated.')
  }
}




exports.sendEmail = functions.firestore.document('/orders/{orderId}')
.onCreate( async (snap, context) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sagaan14@gmail.com',
      pass: 'tsrjbedfyddtkkqb'
    }

  })

  transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './',
  }))

  const destData = snap.data()
  const dest = destData.email

  functions.logger.info( destData, dest)

  const mailOptions = {
    from: `Cheap Hype Seller <sagaan14@gmail.com>`,
    to: dest,
    subject: `Cheap hype seller order`,
    template: 'main', 
    context : {
      ...destData
    }
    // html: 
    // `<h1>Thanks for shopping with us</h1>

    // `,
  }
  
  return transporter.sendMail(mailOptions, (erro,info) => {
    if(erro) {
      functions.logger.info(`Error occured while sending email ${erro}`, {structuredData: true})
      return erro.toString()
    }

    functions.logger('succeded')
  })
})


exports.createProduct = functions.https.onRequest((req, res) => {
  const product = {
    brand: req.body.brand,
    name: req.body.name,
    nickname: req.body.nickname,
    productType: req.body.productType,
    colorway: req.body.colorway,
    condition: req.body.condition,
    price: req.body.price,
    size: req.body.size,
    sold: false,
    worn: req.body.worn,
    description: req.body.description,
    images: req.body.images,
    dateAdded: new Date().toUTCString()
  }

  firestore().collection('catalog').add(product)
    .then(productId => {
      res.json({ message: `product create ${productId}`})
    })
    .catch(err => {
      res.status(500).json({ error: `something went wrong ${err}`})
    })
})