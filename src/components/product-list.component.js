import React, { Component } from 'react';
import ProductDataService from '../services/productService';
import CartDataService from '../services/cartService';
import { Link } from 'react-router-dom';
import * as CurrencyFormat from 'react-currency-format';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      products: [],
      carts: []
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then(response => {
        this.setState({
          products: response.data.products,
          carts: response.data.carts
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts();
  }

  deleteProduct(id) {
    ProductDataService.delete(id)
      .then(response => {
        alert("Product removed")
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { products, carts } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Product List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">   
            <div className="table-responsive">
              <table className="table table-hover table-bordered table-dark">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Category</th>
                    <th scope="col">Regular Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Actual Price</th>
                  </tr>
                </thead>
                <tbody>                 
                  {products && products.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        <CurrencyFormat value={product.regPrice} displayType={'text'} prefix="&euro;" />
                      </td>
                      <td>
                        <CurrencyFormat value={product.discount} displayType={'text'} suffix="%" />
                      </td>
                      <td>
                        <CurrencyFormat value={product.actPrice} displayType={'text'} prefix="&euro;" />
                      </td>
                      <td>
                        <Link to={"/product/" + product.id}>
                          <i className="fas fa-2x fa-info-circle"></i>
                        </Link>
                      </td>
                      <td>
                        <div className="dropdown">
                          <a className="dropdown-toggle"
                            id="dropdownCarts" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false"
                            title="Add to Cart">
                              <i className="fas fa-2x fa-cart-plus"></i>
                          </a>
                          <div className="dropdown-menu" aria-labelledby="dropdownCarts">
                            <a className="dropdown-item createCart" data-target="#createCartModal" data-toggle="modal">
                              <i className="fas fa-plus-circle"></i> 
                              Add new cart
                            </a>
                            {carts && carts.map(cart => (
                              <a className="dropdown-item" key={cart.id} onClick={ () => this.addToCart(product.id, cart.id)}>
                                {cart.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <a onClick={ () => this.deleteProduct(product.id)} title={product.id}>
                          <i className="far fa-2x fa-trash-alt"></i>
                        </a>     
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>  
            </div>
          </div>
        </div>
        <CreateCart />
      </div>
    );
  }
}

class CreateCart extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveCart = this.saveCart.bind(this);
  
    this.state = {
      cartName: "",

      errors: {
        validationErrors: {},
        dbErrors: {}
      }
    }
  }

  onChangeName(e) {
    this.setState({
      cartName: e.target.value
    });
  }

  saveCart() {
    var data = {
      cartName: this.state.cartName
    };

    CartDataService.create(data)
      .then(response => {
        this.setState({
          cartName: response.data.cartName,

          validationErrors: response.data.validationErrors,
          dbErrors: response.data.dbErrors
        });
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (  
      <div className="modal fade" id="createCartModal" tabIndex="-1" role="dialog" aria-labelledby="createCartModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCartModalLabel">Create Cart</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="submit-form">
                <div className="form-row">
                  <div className="col-12 mb-3">
                    <label htmlFor="validationCart">Cart name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={this.state.cartName}
                      onChange={this.onChangeName} 
                      id="validationCart" 
                      name="cartName"
                    />
                    <span className="invalid-feedback">
                      Field can't be empty!
                    </span>
                  </div>
                </div>
                <div className="form-row">
                  <button className="btn btn-primary" onClick={this.saveCart}>Save</button>
                </div>
              </div>
            </div>
            { this.state.validationErrors ? (
            <div className="errors">
              <ul>
                { this.state.validationErrors.map((validationError, index) => (
                  <li key={index}>
                    {validationError}
                  </li>
                ))}
              </ul>
            </div>      
            ) : (<div className="errors"></div>  
            )}
            { this.state.dbErrors ? (
            <div className="errors">
              <ul>
                { this.state.dbErrors.map((dbError, index) => (
                  <li key={index}>
                    {dbError}
                  </li>
                ))}
              </ul>
            </div>                
            ) : (
            <div className="errors"></div>
            )}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )  
  }
}