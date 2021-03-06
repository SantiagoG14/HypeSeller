import React, {useState, useEffect} from 'react'
import { firestore, getProduct} from '../firebase'
import firebase from 'firebase/app'
import PictureDisplay from './product-page-components/product-images'
import ProductDetails from './product-page-components/productDetails'
import { useApp } from '../context/AppContext'

const ProductPage = ({match}, props) => {

    const { userCredentials, shoppingBag } = useApp()
    let processingAddingToCart = false
    const [product, setProduct] = useState({
        images: [],
        brand: ' '
    })

    const [alreadyInBag, setAlreadyInBag] = useState(false)

    useEffect(()=>{
        let isSubscribed = true
        getProduct(match.params.id).then(productData => {
            if(isSubscribed){
                setProduct(productData)
                window.scrollTo(0,0)
                const isInBag = shoppingBag.bag.find((item) => item.id === productData.id)
                if(isInBag) {
                    setAlreadyInBag(true)
                }
            }
        })

        return ()=> isSubscribed = false
    },[match.params.id, shoppingBag.bag])


    const handleClick = ()=> {
        processingAddingToCart = true
        firestore.collection('bags').doc(userCredentials.user.uid).update({
            bag: firebase.firestore.FieldValue.arrayUnion({
                name:product.name, 
                price:product.price, 
                size: product.size, 
                image: product.images[0],
                id: product.id
            })
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
                alreadyInBag={alreadyInBag}
                 />
            </div>
        </main>
       
    )
}


export default ProductPage