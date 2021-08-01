import React, { useState } from 'react'
import '../css/styles.css'
import {Link} from 'react-router-dom'
import ShoppingBag from './bag'


function Nav({shoppingBag}) {

    const [activeDropDown, setActive] = useState(false)
   
    const handleActiveList = ()=> {
        setActive(!activeDropDown)
    }
    return(
        <header>
            <Link to="/" className="logo" >
                <img src="https://firebasestorage.googleapis.com/v0/b/cheap-hype-seller.appspot.com/o/logo%2FLogo.jpg?alt=media&token=90fa8cc8-beb3-4254-a492-402ce96e3aef" alt="Cheap Hype Seller Logo" />
            </Link>
            <input type="checkbox" id="toggle-nav" className="toggle-nav" />
            <nav>
                <ul className="list">
                    <div key="item1" className="nav-shoes-list">

                        <li key="item2" className="list-items">
                            <Link to="/catalog/shoes" className="list-link">Shoes</Link>
                            <span onClick={()=>handleActiveList()}>
                                <i className="fas fa-angle-down list-link-dropdown"></i>
                            </span>
                        </li>
                        <ul key="item3" className={activeDropDown ? 'active' : ''}>
                            <li key="item4" className="shoes-list-item"><Link to="/catalog/shoes/adidas" className="shoes-list-link">Adidas</Link></li>
                            <li key="item5" className="shoes-list-item"><Link to="/catalog/shoes/nike" className="shoes-list-link">Nike</Link></li>
                            <li key="item6" className="shoes-list-item"><Link to="/catalog/shoes/nike" className="shoes-list-link">Gucci</Link></li>
                        </ul>
                    </div>
                    <li key="item7" className="list-items"><Link to="/catalog/clothes" className="list-link">Clothes</Link></li>
                    <li key="item8" className="list-items"><Link to="/catalog/accessories" className="list-link">Accessories</Link></li>
                </ul>
           
            </nav>
            <label htmlFor="toggle-nav" className="toggle-nav-label">
                <span></span>
            </label>

            <div className="nav-icons">
                <span className="material-icons-outlined authentication">
                    account_circle
                </span>
                <ShoppingBag numberOfItems={shoppingBag.bag.length}/>
               
            </div>
        </header>
    )
}



export default Nav