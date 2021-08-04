import React from 'react'
import { Link } from 'react-router-dom'
const ShoppingBag = ({numberOfItems})=> {
    return(
        <Link to="/checkout" className="shopping-bag-link">
            <div className="shopping-bag">  
                <span className="material-icons-outlined">
                        shopping_bag
                </span>
                <span className="number-of-items">{numberOfItems}</span>

            </div>
        </Link>
        
    )
}

export default ShoppingBag