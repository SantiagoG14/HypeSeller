import React from 'react'
import {Link} from 'react-router-dom'


const Product = (props)=> {

    console.log(props.image)
    return(
        <div className="product" key={props.id}>
            <Link to={`/catalog/products/${props.id}`}>
                {/* {props.image
                ?<img src={props.image} alt=""/>
                :<div className='product-img-placeholder'></div>
                } */}
                <div loading="lazy" className="product-img-placeholder" style={{ backgroundImage: `url(${props.image})`}} alt={props.name}></div>
            </Link>

            {props.sold && 
            <div className="sold-out">
                <p>Sold</p>
            </div>}
            
            <div className="product-shoeInfo">
                <p id="name" className="card-name">{props.name}</p>
                <p id="price" className="card-price">${props.price}</p>
            </div>
        </div>
    )
}

export default Product