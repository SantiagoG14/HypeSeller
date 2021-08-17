import React from 'react'
import { Link } from 'react-router-dom'

function FeaturedProducts(props) {
    const pathname = `/catalog/${props.collection}`
    return(
        <div className="product__catalog-all-shoes">
                <img src={props.picture} alt="all shoes"/>
                <div className="buy-button">
                    <p className="product__catalog-name">{props.text}</p>
                    <button className={props.btnClass}><Link className='collection-link' to={{pathname: pathname, state:{isCollection: true}}}>{props.btnText}</Link></button>
                </div>
        </div>
    )
}

export default FeaturedProducts