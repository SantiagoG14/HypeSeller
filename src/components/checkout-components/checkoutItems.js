import React, {useState} from 'react'
import firebase from 'firebase'
import { firestore } from '../../firebase'
import { useApp } from '../../context/AppContext'

const CheckOutItems = ({shoppingBag})=> {
    

    return(
        <div className="checkout-items">
            <h1 className="checkout-title">ITEMS 
                <span>
                    <i className="fas fa-angle-down"></i>
                </span>
            </h1>

            {shoppingBag.bag.length > 0 
            ?  <div className="checkout-items-container">
            {shoppingBag.bag.map((item)=>(
                <Item 
                key={item.id}
                image={item.image}
                productName={item.name}
                productPrice={item.price}
                productSize={item.size}
                item={item}
                />

            ))}
            </div>

            :<div className="no-items-in-cart-title"><p>No Items in Cart</p></div>
        }
           
        </div>
    )
}

const Item = ({image, productName, productPrice, productSize, item})=> {

    const { userCredentials } = useApp()
    const [processing, setProcessing] = useState(false)
    const removeItemFromBag = () => {
        setProcessing(true)
        firestore.collection('bags').doc(userCredentials.user.uid).update({
            bag: firebase.firestore.FieldValue.arrayRemove(item)
        }).then(()=>{
            setProcessing(false)
        })
    }

    return(
        <div className="checkout-item">
            <img src={image} alt="" />
            <div className="checkout-item-info">
                <ul>
                    <li className="checkout-item-name"> {productName}</li>
                    <li><span>Price:</span> ${productPrice}</li>
                    <li><span>Size:</span>{productSize}</li>
                </ul>
                
                <span className="remove-item-btn" onClick={removeItemFromBag}>
                    {processing ? '...Removing' : 'Remove'}
                    <span class="material-icons-outlined ">
                        close
                    </span>
                </span>
                
            </div>
        </div>
    )
   
}

export default CheckOutItems