import React, {useEffect, useState} from 'react'
import { firestore, getCatalog } from '../firebase'
import Product from './product-catalog-components/catalog-product'
import BrandTitle from './product-catalog-components/catalog-title'

function upperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const ProductCatalog = ({match})=> {
    const [productsGroupedByBrand, setProducts] = useState([])
    const {productType, brand} = match.params

    useEffect(()=>{
        let isSubscribed = true
        let query = firestore.collection('catalog')
        if(typeof productType  === 'string') {
            query = query.where('productType', '==', productType)
        }
        if(typeof brand === 'string') {
            query = query.where('brand', '==', brand)
    }
        getCatalog(query).then(producstByBrand => {
            if (isSubscribed) {
                setProducts(producstByBrand)
            }
        })
        return () => isSubscribed = false
    }, [productType, brand])

    return(
        productsGroupedByBrand.map((productsByBrand, index) => (
            <div className="catalog-container" key={index}>
                <BrandTitle title={upperCase(productsByBrand.brand)} />
                {
                    productsByBrand.products.map((product, index) =>(
                    <Product 
                        key={index}
                        id={product.id}
                        image={product.mainImageUrl}
                        name={product.name}
                        price={product.price}
                    />)
                    )
                }
            </div>
    )))
}

export default ProductCatalog