import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram } from '@material-ui/icons'
import { useLocation } from 'react-router'

export default function Footer() {
    const location = useLocation()
    const pathname = location.pathname
    
    return (
        <footer className={pathname === '/success' ? 'footer-on-success' : ''}>
            <div className="logo-footer">
                <img className="checkout-nav-image" src="https://firebasestorage.googleapis.com/v0/b/cheap-hype-seller.appspot.com/o/logo%2FLogo.jpg?alt=media&token=90fa8cc8-beb3-4254-a492-402ce96e3aef" alt="Cheap Hype Seller Logo" />
            </div>

            <div className="footer-info">
                <div className="footer-contact">
                    <ul className="footer-contact-list">
                        <li key='footer-conctact-1'><Link to="/">Contact Us</Link></li>
                        <li key='footer-conctact-2'><Link to="/">Suppliers</Link></li>
                        <li key='footer-conctact-3'><Link to="/">About</Link></li>
                    </ul>
                </div>
                <div className="footer-socials">
                    <ul>
                        <li key="social-1"><Instagram style={{ color: 'white' }}/></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
