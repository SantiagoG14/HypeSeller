import React, {useEffect, useState} from 'react'
import FeaturedProducts from './featuredProducts'
// import { storage } from '../../firebase'
import { getFeaturedCollections } from '../../firebase'
function Collection() {
    const [featuredCollections, setFeaturedCollections] = useState([])

    useEffect( ()=>{
        let isSubscribed = true
        if(isSubscribed) {
            getFeaturedCollections().then(featuredCollections =>
                setFeaturedCollections(featuredCollections)
            )
        }

        return ()=> isSubscribed = false
    }, [])
    return(
        <div className="product__catalog">

            {featuredCollections.map((collection, index) => (
                <FeaturedProducts 
                    key={collection.id}
                    picture={collection.image}
                    collection={collection.name}
                    text={collection.name}
                    btnText='Shop All'
                    btnClass={index === 0 ? 'btn accent' : 'btn blue'}
                />
            ))}
           
           {/* <FeaturedProducts 
           picture={'pictures/shoes/sneakerCollection1.png'}
           text="All shoes"
           btnClass="btn accent"
           btnText="Shop All"


            />

            <FeaturedProducts 
            picture="pictures/shoes/sneakerCollection2 1.png"
            text="Jordan 1's"
            btnClass="btn blue"
            btnText="Shop All"

            /> */}
        </div>
    )
}

export default Collection