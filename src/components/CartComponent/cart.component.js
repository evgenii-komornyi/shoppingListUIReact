import React, { Component } from 'react';
import CartDataService from '../../services/cartService';
import * as CurrencyFormat from 'react-currency-format';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.getCart = this.getCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearCart = this.clearCart.bind(this);

    this.state = {
      currentCart: {
        name: "",
        products: [],
        amount: ""
      }
    };
  }

  componentDidMount() {
    this.getCart(this.props.match.params.id);
  }

  getCart(id) {
    CartDataService.get(id)
      .then(response => {
        this.setState({
          currentCart: {
            id:  response.data.id,
            name: response.data.name,
            products: response.data.products,
            amount: response.data.amount
          }
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeItem(productId, cartId, productName) {
    CartDataService.removeProduct(productId, cartId)
      .then(response => {
        alert("Product: " + productName + " removed from cart");
        window.location.reload(false);
      })
  }

  clearCart(cartId) {
    CartDataService.clearCart(cartId)
      .then(response => {
        alert("Cart clear");
        window.location.reload(false);
      })
  }

  render() {
    const { currentCart } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Cart Info</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1>{ currentCart.name }</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <button className="btn btn-danger" onClick={ () => this.clearCart(currentCart.id)}>
                Claer this cart
              </button>
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
                  { currentCart.products.map(product => (
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
                        <a onClick={ () => this.removeItem(product.id, currentCart.id, product.name)}>
                          <i className="far fa-2x fa-trash-alt"></i>
                        </a>     
                      </td>
                    </tr>
                  ))}
                    <tr>
                      <td>
                        Total amount
                      </td>
                      <td>
                        <CurrencyFormat value={currentCart.amount} displayType={'text'} prefix="&euro;" />
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>   
        </div>
      </div>
    );
  }
}