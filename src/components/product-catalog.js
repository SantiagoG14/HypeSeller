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
    
    let query = firestore.collection('catalog')
    if(typeof productType  === 'string') {
        query = query.where('productType', '==', productType)
    }
    if(typeof brand === 'string') {
        query = query.where('brand', '==', brand)
    }

    useEffect(()=>{
        fetchProducts()
    }, [productType, brand])

    const fetchProducts =  async () => {

        const producstByBrand = await getCatalog(query)
        setProducts(producstByBrand)

    }

    return(
        productsGroupedByBrand.map((productsByBrand) => (
            <div className="catalog-container">
                <BrandTitle title={upperCase(productsByBrand.brand)} />
                {
                        productsByBrand.products.map(product =>(
                        <Product 
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