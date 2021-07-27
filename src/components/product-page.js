import React, {useState, useEffect} from 'react'
import { firestore } from '../firebase'
import PictureDisplay from './product-page-components/product-images'
import ProductDetails from './product-page-components/productDetails'


function useProduct(itemId) {
    const [product, setProduct] = useState({
        images:{
            main: '',
            rest: []
        },
        brandName: ''
    })

    useEffect(()=>{
        fetchProduct()
        window.scrollTo(0,0)
    },[])
    const fetchProduct = async ()=> {
        // const db = firestore.collection('catalog').doc('eQhKX8PIUwNNEU0pQ1bV')
        // const data = db.get().then((doc) => {
        //     if(doc.exists) {
        //         console.log('Document exist')
        //         setProduct(doc.data())

        //     } else {
        //         console.log('no such document')
        //     }
        // })
        const docRef = firestore.collection('catalog').doc(itemId)
        const docProduct = await docRef.get()
        const productData = docProduct.data()
        const docBrand =  await productData.brandId.get()
        const brandName = docBrand.data().name
        setProduct({
            brandName : brandName,
            ...productData
            
        })

    }

    return product

}


const ProductPage = ({match}) => {
    const product = useProduct(match.params.id)
    const images = [product.images.main, ...product.images.rest]

    return(
        <main>
            <div className="product__page">
                <PictureDisplay images={images} />
                <ProductDetails product={product}/>
            </div>
        </main>
       
    )
}


export default ProductPage