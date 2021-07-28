import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
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

export const getCatalog = async (productType, brand) => {
    //TODO
}
export const getNewHeat = async () => {
    const data = await firestore.collection('catalog').orderBy('dateAdded','desc').limit(5).get()
    const imagesUrl = await Promise.all(data.docs.map(doc => getMainImageUrl(doc)))
    return data.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        imageMainUrl: imagesUrl[index]
    }))
}

export const getProduct = async (id) => {
    //TODO
}

const getMainImageUrl = async (productDoc) =>  storage.ref(productDoc.id + '/' + productDoc.data().images.main).getDownloadURL()

const getMainAndRestImagesUrl = async (productDoc) =>  {
    const productData = productDoc.data()
    const images = [productData.images.main, ...productData.images.rest]
    return Promise.all(images.map(img => (storage.ref(`${productDoc.id}/${img}`).getDownloadURL())))
}


export default app