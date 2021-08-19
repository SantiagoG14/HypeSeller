import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function FeaturedProducts(props) {
    const pathname = `/catalog/${props.collection}`
    const [loading, setLoading] = useState(true)
    return(
        <div className="product__catalog-all-shoes">
                {loading === true && <div className="collection-image-placeholder"></div>}
                <img src={props.picture} alt="all shoes" onLoad={()=>setLoading(false)}/>
                <div className="buy-button">
                    <p className="product__catalog-name">{props.text}</p>
                    <button className={props.btnClass}><Link className='collection-link' to={{pathname: pathname, state:{isCollection: true}}}>{props.btnText}</Link></button>
                </div>
        </div>
    )
}

export default FeaturedProducts