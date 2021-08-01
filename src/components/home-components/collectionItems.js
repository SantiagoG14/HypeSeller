import React, {useEffect, useState} from 'react'
import FeaturedProducts from './featuredProducts'
import { storage } from '../../firebase'
function Collection() {
    const [url, setUrl] = useState('')
    useEffect(()=>{
        let isSubscribed = true
        storage.ref("home/SneakerCollection 1.jpg").getDownloadURL().then(url=>{
            if(isSubscribed){
                setUrl(url)
            }
        })

        return ()=> isSubscribed = false
    })

    return(
        <div className="product__catalog">
           
           <FeaturedProducts 
           picture={url}
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