import React, {useState, useEffect} from 'react'
import NewShoe from './newShoe'
import {firestore} from '../../firebase'


function useShoes() {
    const [shoe, setShoes] = useState([])

    useEffect(()=>{
        fetchShoes()
    },[])
    const fetchShoes = async ()=> {
        const data = await firestore.collection('catalog').get()
        setShoes(data.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        })))
    }

    return shoe

}

const NewArrivals = ()=> {
    const shoes = useShoes()

    return(
        <section className="product__page-card">
            <div className="catalog">

                {shoes.map(shoe=>
                    <NewShoe 
                    key={shoe.id}
                    image={shoe.images.main}
                    shoeName={shoe.name}
                    shoePrice={shoe.price}
                    itemId={shoe.id}
                    
                    />
                )}
                {/* <NewShoe 
                image="pictures/shoes/all american air jordan.jpg"
                shoeName="Yeezy Boost 350"
                shoePrice="$349.99"
                />

                <NewShoe 
                image="pictures/shoes/Nike cropped top.jpg"
                shoeName='Nike Crops'
                shoePrice='$349.99'
                />

                <NewShoe 
                image="pictures/shoes/Air Jordan off white.png"
                shoeName='Nike Crops'
                shoePrice='$349.99'
                />

                <NewShoe 
                image='pictures/shoes/blackYeezy1.jpg'
                shoeName='Yeezy 350 V2'
                shoePrice='$349.99'
                /> */}
            </div>
    </section>
    )
    
}

export default NewArrivals