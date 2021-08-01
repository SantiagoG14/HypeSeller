import React, {useState, useEffect, useContext} from 'react'
import { firestore, getProduct} from '../firebase'
import firebase from 'firebase/app'
import PictureDisplay from './product-page-components/product-images'
import ProductDetails from './product-page-components/productDetails'
import { AppContext } from '../App'

const ProductPage = ({match}, props) => {
    let processingAddingToCart = false
    const [product, setProduct] = useState({
        images: [],
        brand: ' '
    })

    useEffect(()=>{
        let isSubscribed = true
        getProduct(match.params.id).then(productData => {
            if(isSubscribed){
                setProduct(productData)
                window.scrollTo(0,0)

            }
        })

        return ()=> isSubscribed = false
    },[match.params.id])

    const userCredentials = useContext(AppContext)

    const handleClick = ()=> {
        processingAddingToCart = true
        firestore.collection('bags').doc(userCredentials.user.uid).update({
            bag: firebase.firestore.FieldValue.arrayUnion(product.id)
        }).then(()=> {
            processingAddingToCart = false
        })
    }
    
    return(
        <main>
            <div className="product__page">
                <PictureDisplay images={product.images} />
                <ProductDetails 
                product={product}
                addToCartClick={handleClick}
                processingAddingToCart={processingAddingToCart}
                 />
            </div>
        </main>
       
    )
}


export default ProductPage