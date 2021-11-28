import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

export const firestore = app.firestore()
export const auth = app.auth()
export const storage = app.storage()
export const functions = app.functions()

functions.useEmulator('localhost', 5001)


export const getCatalog = async (query) => {
    const productsData = await query.get()
    const imagesUrl = await Promise.all(productsData.docs.map(doc => getMainImageUrl(doc)))
    const products = productsData.docs.map((doc, index)=>({
        id: doc.id,
        ...doc.data(),
        mainImageUrl:  imagesUrl[index]
    }))

    return groupProductsByBrand(products)
}

const groupProductsByBrand = (products) => {
    const reducer = (acc, current) => {
        let productsByBrand = acc.find(v => v.brand === current.brand)
        if(typeof productsByBrand === 'undefined' ) {
            acc.push({
                brand: current.brand,
                products: [current]
            })
        }else {
            productsByBrand.products.push(current)
        }
        return acc
    }
    return products.reduce(reducer,[])
}

export const getNewHeat = async () => {
    const data = await firestore.collection('catalog').where('sold', '==', false).orderBy('dateAdded','desc').limit(5).get()
    const imagesUrl = await Promise.all(data.docs.map(doc => getMainImageUrl(doc)))
    return data.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        imageMainUrl: imagesUrl[index]
    }))
}

export const getProduct = async (id) => {
    const docRef = firestore.collection('catalog').doc(id)
    const productDoc = await docRef.get()
    const productData = productDoc.data()
    const imagesUrl = await getMainAndRestImagesUrl(productDoc)
    return {
        id: id,
        ...productData,
        images: imagesUrl
    }
}

export const cloudFunctions = {
    paymentIntent: functions.httpsCallable('paymentIntents'),
    successfulCheckout: functions.httpsCallable('successfulCheckout')
}

export const getFeaturedCollections = async () => {
    const collectionDocs = await firestore.collection('featured-collection').get()
    const imageUrl = await Promise.all(collectionDocs.docs.map(doc => getFeatureCollectionImageUrl(doc)))
    const collectionData = collectionDocs.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        image: imageUrl[index]
    }))
    return collectionData
}

const getMainImageUrl = async (productDoc) =>  storage.ref(productDoc.id + '/' + productDoc.data().images.main).getDownloadURL()

const getFeatureCollectionImageUrl = async (productDoc) => storage.ref(`home/${productDoc.data().image}`).getDownloadURL()

const getMainAndRestImagesUrl = async (productDoc) =>  {
    const productData = productDoc.data()
    const images = [productData.images.main, ...productData.images.rest]
    return Promise.all(images.map(img => (storage.ref(`${productDoc.id}/${img}`).getDownloadURL())))
}

// firestore.collection('bags').add({name: 'hello'}).catch((err)=>console.log('failed to add collection' + err))

// firestore.collection('bags').doc('G7vEVzcScbgZmwtbGp2NaX2yEMF2').get().catch((err)=>console.log('failed to get bag' + err))

// // test set bag

// firestore.collection('bags').doc('G7vEVzcScbgZmwtbGp2NaX2yEMF2').set({bag: []}).catch((err) => console.log(`failed to add bag ${err}`))

// firestore.collection('featured-collection').doc('G7vEVzcScbgZmwtbGp2NaX2yEMF2').set({bag: []}).catch((err) => console.log(`failed to add featured collection ${err}`))

// firestore.collection('catalog').doc('G7vEVzcScbgZmwtbGp2NaX2yEMF2').set({bag: []}).catch((err) => console.log(`failed to add to catalog ${err}`))

// firestore.collection('orders').doc('G7vEVzcScbgZmwtbGp2NaX2yEMF2').set({bag: []}).catch((err) => console.log(`failed to add order ${err}`))

// firestore.collection('orders').doc('1sGeNl4tptpjO03gZXMB').get().catch((err) => console.log(`failed to get order ${err}`))


// firestore.collection('orders').get().catch((err)=>console.log(`failed to get all orders ${err}`))
// firestore.collection('bags').get().catch((err)=>console.log(`failed to get all bags ${err}`))





export default app