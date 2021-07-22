import React from 'react'


function FeaturedProducts(props) {
    return(
        <div className="product__catalog-all-shoes">
                <img src={props.picture} alt="all shoes"/>
                <div className="buy-button">
                    <p className="product__catalog-name">{props.text}</p>
                    <button className={props.btnClass}>{props.btnText}</button>
                </div>
        </div>
    )
}

export default FeaturedProducts