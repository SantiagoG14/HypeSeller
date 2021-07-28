import React, {useState, useEffect} from 'react'
import { firestore, storage } from '../firebase'
import PictureDisplay from './product-page-components/product-images'
import ProductDetails from './product-page-components/productDetails'


function useProduct(itemId) {
    const [product, setProduct] = useState({
        images:[],
        brandName: ''
    })

    useEffect(()=>{
        fetchProduct()
        window.scrollTo(0,0)
    },[])
    const fetchProduct = async ()=> {
        const docRef = firestore.collection('catalog').doc(itemId)
        const docProduct = await docRef.get()
        const productData = docProduct.data()
        const images = [productData.images.main, ...productData.images.rest]
        const imagesUrl = await Promise.all(images.map(img => (storage.ref(`${itemId}/${img}`).getDownloadURL())))
        setProduct({
            ...productData,
            images : imagesUrl
        })
    }

    return product
}


const ProductPage = ({match}) => {
    const product = useProduct(match.params.id)

    return(
        <main>
            <div className="product__page">
                <PictureDisplay images={product.images} />
                <ProductDetails product={product}/>
            </div>
        </main>
       
    )
}


export default ProductPage