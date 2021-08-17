const functions = require("firebase-functions")
const admin = require('firebase-admin')
const stripe = require("stripe")
require('dotenv/config')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp()


exports.paymentIntents = functions.https.onCall(async (data, context) => {

  functions.logger.info(`Processing payment intent ${data}`, {structuredData: true})
  
  // Checking that the user is authenticated.
  validateAuth(context)

  functions.logger.info(`User is authenticated ${context.auth}`, {structuredData: true})

  const stripeWithSecret = new stripe.Stripe(process.env.STRIPE_SECRET_KEY)

  const userAmount = data.amount
  const totalPriceReducer = (accomulator, currentItem) => accomulator + currentItem.price
  
  const bagDoc = await admin.firestore().collection('bags').doc(context.auth.uid).get()
  const bagData = bagDoc.data()
  const amount = bagData.bag.reduce(totalPriceReducer, 0) * 100

  functions.logger.info(`Server amount is ${amount}`)

  functions.logger.info(`Client amount is ${userAmount}`)
  if(amount === userAmount) {
    const paymentIntent = await stripeWithSecret.paymentIntents.create({
      amount,
      currency: "usd"
    })
    functions.logger.info(`Payment intent created succesfully ${paymentIntent}`, {structuredData: true})
    return paymentIntent.client_secret
  } else {
    throw new functions.https.HttpsError("invalid-argument", "Request amount does not match server amount.")
  }
})

exports.successfulCheckout = functions.https.onCall(async (data, context) => {
  functions.logger.info(`Successful payment ${data}` )

  // Checking that the user is authenticated.
  validateAuth(context)

  const bagReference = admin.firestore().collection('bags').doc(context.auth.uid)
  const bagDoc = await bagReference.get()
  admin.firestore().collection('orders').add({
    userId: context.auth.uid,
    items: bagDoc.data().bag,
    billingDetails: data.billingDetails
  })

  const catalogReference = admin.firestore().collection('catalog')
  Promise.all(bagDoc.data().bag.map(item => (
    catalogReference.doc(item.id).set({
      sold: true
    }, { merge: true})
    )))

  //reset user bag

  bagReference.set({
    bag: []
  })
})

function validateAuth(context) {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition',
      'The function must be called while authenticated.')
  }
}
