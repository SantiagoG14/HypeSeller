import Nav from './components/nav'
import Home from './components/home';
import ProductPage from './components/product-page';
import ProductCatalog from './components/product-catalog';
import './css/styles.css'
import './css/product-page.css'
import './css/product-catalog.css'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/checkout';
import { auth, firestore } from './firebase';
import React, {useEffect, useState} from 'react'

export const AppContext = React.createContext({})
 
function App() {

  const [userCredentials, setUserCredentials] = useState({user: ''})
  const [shoppingBag, setShoppingBag] = useState({bag : []})

  useEffect(()=>{
    let isSubscribed = true
    if(isSubscribed){
      auth.signInAnonymously().then(userCredentials => {
        setUserCredentials(userCredentials)

        const bagRef = firestore.collection('bags').doc(userCredentials.user.uid)
        if(userCredentials.additionalUserInfo.isNewUser) {
          bagRef.set({bag:[]}).then(() => bagRef.onSnapshot((snapshot) => {
            setShoppingBag({...snapshot.data()})
          }))
        }else {
          bagRef.onSnapshot((snapshot) => {
            setShoppingBag({...snapshot.data()})
          })
        }
      })
    }
    return ()=> isSubscribed = false
  },[])

  const CheckoutRender = (props) => <Checkout {...props}  shoppingBag={shoppingBag}/>

  return (
    <AppContext.Provider value={userCredentials}>
      <Router>
        <div className="App">
          <Nav shoppingBag={shoppingBag} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/catalog/products/:id" component={ProductPage} / >
            
            <Route path="/catalog/:productType" exact component={ProductCatalog}></Route>
            <Route path="/catalog/:productType/:brand" component={ProductCatalog}></Route>
            <Route path="/checkout" render={CheckoutRender} />
          </Switch>
        
        </div>
      </Router>
    </AppContext.Provider>
    
  );
}

export default App;
