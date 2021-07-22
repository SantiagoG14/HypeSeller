import React from 'react'
import FeaturedProducts from './featuredProducts'
function Collection() {
    return(
        <div className="product__catalog">
           
           <FeaturedProducts 
           picture="pictures/shoes/SneakerCollection 1.jpg"
           text="All shoes"
           btnClass="btn accent"
           btnText="Shop All"


            />

            <FeaturedProducts 
            picture="pictures/shoes/sneakerCollection2 1.png"
            text="Jordan 1's"
            btnClass="btn blue"
            btnText="Shop All"

            />
        </div>
    )
}

export default Collection