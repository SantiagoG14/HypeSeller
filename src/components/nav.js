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

    const list = document.querySelector('.nav-shoes-list ul')

    function changeView() {
        list.classList.toggle('active')
    }
   
    return(
        <header>
            <Link to="/" className="logo" >
                <img src="https://firebasestorage.googleapis.com/v0/b/cheap-hype-seller.appspot.com/o/logo%2FLogo.jpg?alt=media&token=90fa8cc8-beb3-4254-a492-402ce96e3aef" alt="Cheap Hype Seller Logo" />
            </Link>
            <input type="checkbox" id="toggle-nav" className="toggle-nav" />
            <nav>
                <ul className="list">
                    <div className="nav-shoes-list">
                        <li className="list-items"><Link to="/catalog/shoes" className="list-link">Shoes</Link> <span onClick={()=>changeView()}><i className="fas fa-angle-down list-link-dropdown"></i></span></li>
                        <ul>
                            <li className="shoes-list-item"><Link to="/catalog/shoes/adidas" className="shoes-list-link">Adidas</Link></li>
                            <li className="shoes-list-item"><Link to="/catalog/shoes/nike" className="shoes-list-link">Nike</Link></li>
                            <li className="shoes-list-item"><Link to="/catalog/shoes/nike" className="shoes-list-link">Gucci</Link></li>
                        </ul>
                    </div>
                    <li className="list-items"><Link to="/catalog/clothes" className="list-link">Clothes</Link></li>
                    <li className="list-items"><Link to="/catalog/accessories" className="list-link">Accessories</Link></li>
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