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

const getQuery = (params)=> {
    const {productType, brand} =  params
    
    let query = firestore.collection('catalog')
    if(typeof productType  === 'string') {
        query = query.where('productType', '==', productType)
    }
    if(typeof brand === 'string') {
        query = query.where('brand', '==', brand)
    }
    return query
}

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
    const data = await firestore.collection('catalog').orderBy('dateAdded','desc').limit(5).get()
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
        ...productData,
        images: imagesUrl
    }
}

const getMainImageUrl = async (productDoc) =>  storage.ref(productDoc.id + '/' + productDoc.data().images.main).getDownloadURL()

const getMainAndRestImagesUrl = async (productDoc) =>  {
    const productData = productDoc.data()
    const images = [productData.images.main, ...productData.images.rest]
    return Promise.all(images.map(img => (storage.ref(`${productDoc.id}/${img}`).getDownloadURL())))
}


export default app