import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './sass/App.sass';

import AddNewProduct from './components/addProduct.component';
import Product from './components/product.component';
import Cart from './components/cart.component';
import ProductList from './components/product-list.component';
import CartList from './components/cart-list.component';


class App extends Component {
  render() {
    return (
      <div>    
        <Header />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}

const Navigation = (props) => {
  return (
    <Router>
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/products"}>Products</Link>
                      </li>
                    </ul>
                    <Link to={"/addNewProduct"} title="Add new product">
                      <i className="fas fa-plus fa-2x"></i>
                    </Link>
                    <Link to={"/carts"} title="Carts">
                      <i className="fas fa-shopping-cart fa-2x"></i>
                    </Link>
                  </div>
                </div>
              </nav>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/products" component={ProductList} />
                <Route path="/product/:id" component={Product} />
                <Route exact path="/addNewProduct" component={AddNewProduct} />
                <Route path="/carts" component={CartList} /> 
                <Route path="/cart/:id" component={Cart} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1> ShoppingList </h1>
  </div>
);

export default App;