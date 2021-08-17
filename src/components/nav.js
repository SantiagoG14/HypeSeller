import React, { useState } from 'react'
import '../css/styles.css'
import {Link, useLocation} from 'react-router-dom'
import ShoppingBag from './bag'
import { useApp } from '../context/AppContext'


function Nav() {

    const { shoppingBag } = useApp()
    const location = useLocation()


    const CheckoutNav = () => {
        return(
            <header className="checkout-nav">
                <Link to="/" className="checkout-nav-logo">
                    <img className="checkout-nav-image" src="https://firebasestorage.googleapis.com/v0/b/cheap-hype-seller.appspot.com/o/logo%2FLogo.jpg?alt=media&token=90fa8cc8-beb3-4254-a492-402ce96e3aef" alt="Cheap Hype Seller Logo" />
                </Link>
            </header>
        )
    }


    if(location.pathname !== "/success") {
        return(
            <>
            {location.pathname === "/checkout"
                ? <CheckoutNav />
                : <MainNav shoppingBag={shoppingBag}/>
            }
            </>
        )
    }else{
        return(
            <>
            </>
        )
    }
        
   
}

const MainNav = ({shoppingBag}) => {
    const [activeDropDown, setActive] = useState(false)

    const handleActiveList = ()=> {
        setActive(!activeDropDown)
    }

    const handleClickLogo = ()=> {
        setActive(false)
    }
    return(
        <header>
            <Link to="/" className="logo" onClick={handleClickLogo}>
                <img src="../pictures/Icons/Logo.jpg" alt="Cheap Hype Seller Logo" />
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
                            <li key="item4" className="shoes-list-item"><Link to="/catalog/shoes/adidas" className="shoes-list-link" onClick={handleActiveList}>Adidas</Link></li>
                            <li key="item5" className="shoes-list-item"><Link to="/catalog/shoes/nike" className="shoes-list-link" onClick={handleActiveList}>Nike</Link></li>
                            <li key="item6" className="shoes-list-item"><Link to="/catalog/shoes/nike" className="shoes-list-link" onClick={handleActiveList}>Gucci</Link></li>
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