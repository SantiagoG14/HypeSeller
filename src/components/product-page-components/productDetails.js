import React from 'react'

function upperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const ProductDetails = (props) => {
    const product = props.product   
    return(
        <section className="shoes__description">
            <ShoeInfo 
            // brand={product.brandId}
            name={product.name}
            nickname={product.nickname} 
            brandName={upperCase(product.brand)}
            />

            <AddToCartBtn 
            handleClick={props.addToCartClick} 
            processing={props.processingAddingToCart} 
            alreadyInBag={props.alreadyInBag} 
            sold={product.sold}/>     

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


const AddToCartBtn = (props)=> {
    return(
        <div className="action__btns">
            {props.sold 
            ? <SoldOutBtn />
            :<button className={props.alreadyInBag ? 'cart unactive-cart' : 'cart'} onClick={props.handleClick} disabled={props.processing || props.alreadyInBag}>{props.alreadyInBag ? 'Already in shopping bag' : 'Add to shopping bag'}</button>
            }
        </div>
    )
}

const SoldOutBtn = () => {
    return(
        <button className="cart sold-out-btn">Sold</button>
    )
}

const Details = (props)=> {
    return(
        <>
            <h1 className="descriptions-title">Details: </h1>
            <div className="attributes">
                <ul>
                    <li key={`${props.id}1`} className="attributes__list-item important-text">Size:  </li>
                    <li key={`${props.id}2`} className="attributes__list-item important-text">Price: </li>
                    <li key={`${props.id}3`} className="attributes__list-item">Condition:</li>
                    <li key={`${props.id}4`} className="attributes__list-item">Worn:</li>
                    <li key={`${props.id}5`} className="attributes__list-item">Colorway:</li>
                </ul>    
                <ul className="attributes-numbers">
                    <li key={`${props.id}6`} className="attributes__list-item important-text">{props.size}</li>
                    <li key={`${props.id}7`} className="attributes__list-item important-text">${props.price}</li>
                    <li key={`${props.id}8`} className="attributes__list-item" id="condition">{props.condition}</li>
                    <li key={`${props.id}9`} className="attributes__list-item" id="worn">{props.worn}</li>
                    <li key={`${props.id}10`} className="attributes__list-item" id="colorway">{props.colorway}</li>
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
        <div className="returns">
            <h1 className="descriptions-title">Returns:</h1>
            <p className="text">If not please with purchase, returns are accepted within 3 buisness days of the purchase, please take a close look at the pictures provided, since this is the shoe you will be recieving if ordered</p>
        </div>
    )
}


export default ProductDetails