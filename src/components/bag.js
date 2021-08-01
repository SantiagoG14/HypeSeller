import React from 'react'

const ShoppingBag = ({numberOfItems})=> {
    return(
        <div className="shopping-bag">
            <span className="material-icons-outlined">
                    shopping_bag
            </span>
            <span className="number-of-items">{numberOfItems}</span>
        </div>
    )
}

export default ShoppingBag