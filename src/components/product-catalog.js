import React, {useEffect, useState} from 'react'
import { firestore } from '../firebase'
import Product from './product-catalog-components/catalog-product'
import BrandTitle from './product-catalog-components/catalog-title'

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
        const productsData = await query.get()
        const products = productsData.docs.map(doc => ({
            id: doc.id,
             ...doc.data()
        }))
        setProducts(groupProductsByBrand(products))
    }

    return(
        productsGroupedByBrand.map((productsByBrand) => (
            <div className="catalog-container">
                <BrandTitle title={productsByBrand.brand} />
                {
                        productsByBrand.products.map(product =>(
                        <Product 
                        id={product.id}
                        image={product.images.main}
                        name={product.name}
                        price={product.price}
                        />)
                    )
                }
            </div>
    )))
}

export default ProductCatalog