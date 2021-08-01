import React, {useState, useEffect} from 'react'
import NewShoe from './newShoe'
import {getNewHeat} from '../../firebase'

const NewArrivals = ()=> {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        let isSubscribed = true
        getNewHeat().then(newHeat => {
            if(isSubscribed){
                setProducts(newHeat)
            }
        })
        return ()=> isSubscribed = false
    },[])
    return(
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
    )
}

export default NewArrivals