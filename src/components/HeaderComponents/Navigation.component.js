import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from '../Home.component';
import AddNewProduct from '../ProductComponents/addProduct.component';
import Product from '../ProductComponents/product.component';
import Cart from '../CartComponent/cart.component';
import ProductList from '../ProductComponents/product-list.component';
import AddUser from '../UserComponent/addUser.component';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);

        this.state = {
            user: {
                name: localStorage.getItem('name'),
                role: localStorage.getItem('role'),
                cartId: localStorage.getItem('cartId')
            }
        }
    }

    logIn = () => {
        const { user } = this.state;

        if (user.name == null && user.role == null && user.cartId == null) {
            user.name = "Guest",
            user.role = "admin",
            user.cartId = 1;

            this.setState({
                user: {
                    name: user.name,
                    role: user.role,
                    cartId: user.cartId
                }
            });

            console.log(user)

            localStorage.setItem('name', user.name);
            localStorage.setItem('role', user.role);
            localStorage.setItem('cartId', user.cartId);

            window.location.reload();
        }
    }

    logOut = () => {
        localStorage.clear();

        this.setState({
            name: null,
            role: null,
            cartId: null
        })

        window.location.reload();
    }

    render() {
        const { user } = this.state;

        return (
            <Router>
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <nav className="navbar navbar-expand-lg">
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
                                            { user.role == "admin" ? (
                                            <Link to={"/addNewProduct"} title="Add new product">
                                                <i className="fas fa-plus fa-2x"></i>
                                            </Link>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                            {/*<Link to={"/api/cart/:id"} title="Carts">
                                                <i className="fas fa-shopping-cart fa-2x"></i>
                                            </Link>*/}
                                            { user.name == null ? (
                                            <i className="fas fa-user-plus fa-2x" onClick={ this.logIn }></i>
                                            ) : (
                                            <div className="sing-in">
                                                <h4>
                                                    Hello, { user.name }
                                                </h4>
                                                <button className="btn btn-danger" onClick={ this.logOut }>X</button>
                                            </div>
                                            )}
                                            <Link to={"/registration"} title="Registration">
                                                <i className="fas fa-user-plus fa-2x"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </nav>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/products" component={ProductList} />
                                    <Route path="/product/:id" component={Product} />
                                    <Route exact path="/addNewProduct" component={AddNewProduct} />
                                    <Route path="/api/cart/:id" component={Cart} />
                                    <Route exact path="/registration" component={AddUser} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </>
            </Router>
        )
    }
}