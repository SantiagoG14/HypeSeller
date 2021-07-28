import React from 'react'
import {Link} from 'react-router-dom'

function NewShoe(props) {
    return(
        <div class="card" key={props.key}>
            <Link to={`/catalog/products/${props.itemId}`}>
                <img src={props.image} alt="Yeezy boost"/>
            </Link>
            <div class="catalog-info">
                <p class="card-name">{props.shoeName}</p>
                <p class="card-price">${props.shoePrice}</p>
            </div>
        </div>
    )
    

}

export default NewShoe