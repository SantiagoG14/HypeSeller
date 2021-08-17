import React, {useState, useEffect} from 'react'
import NewShoe from './newShoe'
import {getNewHeat} from '../../firebase'
import Error from '../Error'

const NewArrivals = ()=> {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')

    useEffect(()=>{
        let isSubscribed = true
        try {
            setError('')
            getNewHeat().then(newHeat => {
                if(isSubscribed){
                    setProducts(newHeat)
                }
            })
        }catch {
            setError('Could not fetch new arrivals')
        }
       
        return ()=> isSubscribed = false
    },[])
    return(
        <>
        <section className="product__page-card">
            
            <div className="catalog">
                {products.map(product=>
                    <NewShoe 
                        key={product.id}
                        image={product.imageMainUrl}
                        shoeName={product.name}
                        shoePrice={product.price}
                        itemId={product.id}
                    />
                )}
            </div>
        </section>
        </>
    )
}

export default NewArrivals