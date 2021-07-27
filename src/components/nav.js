import React, { useEffect, useState } from 'react'
import '../css/styles.css'
import { firestore } from '../firebase'
import {Link} from 'react-router-dom'


function Nav() {

    const [productTypes, setProductType] = useState([])
    useEffect(()=> {
        fetchProductTypes()
    },[])

    const fetchProductTypes = async ()=> {
        const data = await firestore.collection('product-types').get()
        setProductType(data.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        })))
    }
    return(
        <header>
            <Link to="/" className="logo" >
                <img src="../pictures/Icons/Logo.jpg" alt="Cheap Hype Seller Logo" />
            </Link>
            <input type="checkbox" id="toggle-nav" className="toggle-nav" />
            <nav>
                <ul className="list">
                    {productTypes.map((pt) => (
                        <li key={pt.id} className="list-items"><a href="product-catalog.html" className="list-link">{pt.name}</a> <span><i className="fas fa-angle-down list-link-dropdown"></i></span></li>
                    ))}
                </ul>
           
            </nav>
            <label htmlFor="toggle-nav" className="toggle-nav-label">
                <span></span>
            </label>

            <div className="nav-icons">
                <span className="material-icons-outlined authentication">
                    account_circle
                </span>
                <span className="material-icons-outlined">
                    shopping_bag
                </span>
            </div>
        </header>
    )
}



export default Nav