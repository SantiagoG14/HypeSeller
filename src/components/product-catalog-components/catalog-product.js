import React, {useState} from 'react'
import {Link} from 'react-router-dom'


const Product = (props)=> {
    const [loading, setLoading] = useState(true)
    return(
        <div className="product" key={props.id}>
            <Link to={`/catalog/products/${props.id}`}>
                {/* {props.image
                ?<img src={props.image} alt=""/>
                :<div className='product-img-placeholder'></div>
                } */}
                {loading && <div className="product-img-placeholder"></div>}
                <img src={props.image} alt={props.name} onLoad={()=>setLoading(false)} loading="lazy" />
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