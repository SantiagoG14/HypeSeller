import React, {useEffect, useState} from 'react'
import { firestore, getCatalog } from '../firebase'
import Product from './product-catalog-components/catalog-product'
import BrandTitle from './product-catalog-components/catalog-title'
import { useLocation } from 'react-router'


const ProductCatalog = ({match})=> {
    const defaultProduct = {
        id: '',
        mainImageUrl:'',
        name: '',
        price : '',
        sold: '',
        brand: ''
    }
    const [productsGroupedByBrand, setProducts] = useState([{brand:'...', products: [defaultProduct]}, {brand:'...', products: [defaultProduct]}])
    const {productType, brand, collection} = match.params
    const location = useLocation()
    const {isCollection} = location.state ? location.state : false

    useEffect(()=>{

        let isSubscribed = true
        let query = firestore.collection('catalog')
        if(typeof productType  === 'string') {
            query = isCollection 
            ? query.where('featuredCollection', '==', productType)
            : query.where('productType', '==', productType)
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
    }, [productType, brand, collection, isCollection])

    return(
        productsGroupedByBrand.map((productsByBrand, index) => (
            <div className="catalog-container" key={index}>
                <BrandTitle title={productsByBrand.brand} />
                {
                    productsByBrand.products.map((product, index) =>(
                    <Product 
                        key={index}
                        id={product.id}
                        image={product.mainImageUrl}
                        name={product.name}
                        price={product.price}
                        sold={product.sold}
                    />)
                    )
                }
            </div>
    )))
}

export default ProductCatalog