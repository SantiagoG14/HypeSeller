import React, {useState, useEffect} from 'react'
import NewShoe from './newShoe'
import {getNewHeat} from '../../firebase'


function useProducts() {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetchShoes()
    },[])
    const fetchShoes = async ()=> {
        const newHeat = await getNewHeat()
        setProducts(newHeat)
    }
    return products
}

const NewArrivals = ()=> {
    const shoes = useProducts()
    return(
        <section className="product__page-card">
            <div className="catalog">

                {shoes.map(shoe=>
                    <NewShoe 
                    key={shoe.id}
                    image={shoe.imageMainUrl}
                    shoeName={shoe.name}
                    shoePrice={shoe.price}
                    itemId={shoe.id}
                    
                    />
                )}
            </div>
    </section>
    )
    
}

export default NewArrivals