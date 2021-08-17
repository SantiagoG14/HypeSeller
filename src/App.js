import Nav from './components/nav'
import Home from './components/home';
import ProductPage from './components/product-page';
import ProductCatalog from './components/product-catalog';
import SuccessfulCheckout from './components/SuccessfulCheckout';
import Footer from './components/Footer';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/checkout';
import React from 'react'
import AppContext  from './context/AppContext';

function App() {

  return (
    <Router>
      <div className="App">
      <AppContext>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/catalog/products/:id" component={ProductPage} />
            
            <Route path="/catalog/:productType" exact component={ProductCatalog} />
            <Route path="/catalog/:productType/:brand" exact component={ProductCatalog} />
            <Route path="/catalog/:collection" exact component={ProductCatalog} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/success" component={SuccessfulCheckout} />
          </Switch>
          <Footer />
        </AppContext>
      </div>
    </Router>
    
  );
}

export default App;
