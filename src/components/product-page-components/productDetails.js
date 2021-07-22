import React from 'react'

const ProductDetails = (props) => {
    const product = props.product

    return(
        <section className="shoes__description">
            <ShoeInfo 
            // brand={product.brandId}
            name={product.name}
            nickname={product.nickname} 
            brandName={product.brandName}
            />

            <AddToCartBtn />     
            <div className="descriptions">
                <Details 
                size={product.size}
                price={product.price}
                condition={product.condition}
                worn={product.worn}
                colorway={product.colorway}
                />   


                <Description 
                    description={product.description}
                />

                <Returns />
            </div>
          
        </section>
        
    )
}


const ShoeInfo = (props) => {
    return(
        <div className="shoe__info">
            <div className="shoes__info-attributes">
                <h2 className="brand">{props.brandName}</h2>
                <h2 className="name">{props.name}</h2>
                <h2 className="nickname">"{props.nickname}"</h2>
            </div>
        </div>
    )
}


const AddToCartBtn = ()=> {
    return(
        <div className="action__btns">
            <button className="cart">Add to shopping bag</button>
        </div>
    )
}

const Details = (props)=> {
    return(
        <>
            <h1 className="descriptions-title">Detail: </h1>
            <div className="attributes">
                <ul>
                    <li class="attributes__list-item important-text">Size:  </li>
                    <li class="attributes__list-item important-text">Price: </li>
                    <li class="attributes__list-item">Condition:</li>
                    <li class="attributes__list-item">Worn:</li>
                    <li class="attributes__list-item">Colorway:</li>
                </ul>    
                <ul class="attributes-numbers">
                    <li class="attributes__list-item important-text">{props.size}</li>
                    <li class="attributes__list-item important-text">${props.price}</li>
                    <li class="attributes__list-item" id="condition">{props.condition}</li>
                    <li class="attributes__list-item" id="worn">{props.worn}</li>
                    <li class="attributes__list-item" id="colorway">{props.colorway}</li>
                </ul>      
            </div>
        </>
    )
}

const Description = (props) => {
    return(
        <div className="shoe-description">
            <h1 className="descriptions-title">Descripition: </h1>
            <p className="text">{props.description}</p>
        </div>
    )
}

const Returns = ()=> {
    return(
        <div class="returns">
            <h1 class="descriptions-title">Returns:</h1>
            <p class="text">If not please with purchase, returns are accepted within 3 buisness days of the purchase, please take a close look at the pictures provided, since this is the shoe you will be recieving if ordered</p>
        </div>
    )
}


export default ProductDetails