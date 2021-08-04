import React from 'react'


const CheckOutItems = ({shoppingBag})=> {
    return(
        <div className="checkout-items">
            <h1 className="checkout-title">ITEMS 
                <span>
                    <i className="fas fa-angle-down"></i>
                </span>
            </h1>
            <div className="checkout-items-container">
                {shoppingBag.bag.map((item, index)=>(
                    <Item 
                    key={index}
                    image={item.image}
                    productName={item.name}
                    productPrice={item.price}
                    productSize={item.size}
                    />

                ))}
            </div>
        </div>
    )
}

const Item = ({image, productName, productPrice, productSize})=> {
    return(
        <div className="checkout-item">
            <img src={image} alt="" />
            <div className="checkout-item-info">
                <ul>
                    <li>{productName}</li>
                    <li>${productPrice}</li>
                    <li>{productSize}</li>
                </ul>
            </div>
        </div>
    )
   
}

export default CheckOutItems