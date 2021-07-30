import React from 'react'
import {Link} from 'react-router-dom'


const Product = (props)=> {

    return(
        <div className="product" key={props.id}>
            <Link to={`/catalog/products/${props.id}`}>
                <img src={props.image} alt=""/>
            </Link>
            <div className="product-shoeInfo">
                <p id="name" className="card-name">{props.name}</p>
                <p id="price" className="card-price">${props.price}</p>
            </div>
        </div>
    )
}

export default Product