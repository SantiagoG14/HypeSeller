import React from 'react'
import {Link} from 'react-router-dom'

function NewShoe(props) {
    return(
        <div className="card">
            <Link to={`/catalog/products/${props.itemId}`}>
                <img src={props.image} alt="Yeezy boost" loading="lazy"/>
            </Link>
            <div className="catalog-info" >
                <p className="card-name">{props.shoeName}</p>
                <p className="card-price">${props.shoePrice}</p>
            </div>
        </div>
    )
    

}

export default NewShoe