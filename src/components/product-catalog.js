import React, {useEffect, useState} from 'react'
import { firestore } from '../firebase'
import Product from './product-catalog-components/catalog-product'
import BrandTitle from './product-catalog-components/catalog-title'


const ProductCatalog = ()=> {
    const [products, setProducts] = useState([{images: ''}])

    useEffect(()=>{
        fetchProducts()
    }, [])

    const fetchProducts =  async () => {
        const productRef = firestore.collection('catalog')
        const productsData = await productRef.get()
        setProducts(productsData.docs.map(doc => ({
            id: doc.id,
             ...doc.data()
        })))
    }
    return(
        <div className="catalog-container">
            <BrandTitle title="Adidas" />
            {
                products.map(product=>
                    <Product 
                    id={product.id}
                    image={product.images.main}
                    name={product.name}
                    price={product.price}
                    />
                )
            }
        </div>
        
        
    )
}

export default ProductCatalog