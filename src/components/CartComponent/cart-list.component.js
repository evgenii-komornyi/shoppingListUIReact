import React, { Component } from 'react';
import CartDataService from '../../services/cartService';
import { Link } from 'react-router-dom';
import * as CurrencyFormat from 'react-currency-format';

export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCarts = this.retrieveCarts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.deleteCart = this.deleteCart.bind(this);

    this.state = {
      carts: []
    };
  }

  componentDidMount() {
    this.retrieveCarts();
  }

  retrieveCarts() {
    CartDataService.getAll()
      .then(response => {
        this.setState({
          carts: response.data.carts
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCarts();
  }

  deleteCart(id) {
    CartDataService.delete(id)
      .then(response => {
        console.log(response.data)
        if (response.data.validationErrors != null) {
          alert(response.data.validationErrors);
        } else {
          alert("Cart removed")
          this.refreshList();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { carts } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Cart List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">   
            <div className="table-responsive">
              <table className="table table-hover table-bordered table-dark">
                <thead>
                  <tr>
                    <th scope="col">Cart</th>
                  </tr>
                </thead>
                <tbody>                 
                  {carts && carts.map(cart => (
                    <tr key={cart.id}>
                      <td>{cart.name}</td>
                      <td>
                        <Link to={"/cart/" + cart.id}>
                          <i className="fas fa-2x fa-info-circle"></i>
                        </Link>
                      </td>
                      <td>
                        <a onClick={ () => this.deleteCart(cart.id)} title={cart.id}>
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
      </div>
    );
  }
}