import Nav from './components/nav'
import Home from './components/home';
import ProductPage from './components/product-page';
import './css/styles.css'
import './css/product-page.css'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/catalog/:id" component={ProductPage} />
        </Switch>
      
      </div>
    </Router>
    
  );
}

export default App;
