import React, { Component } from 'react';
import ProductDataService from '../../services/productService';
import CartDataService from '../../services/cartService';
import { Link } from 'react-router-dom';
import * as CurrencyFormat from 'react-currency-format';
const imgUrl = "http://127.0.0.1:8887/img/products/";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.retrieveCategories = this.retrieveCategories.bind(this);

        this.state = {
            productID: null,
            cartID: null,
            products: [],
            categories: []
        };
    }

    componentDidMount() {
        Promise.all([this.retrieveProducts(), this.retrieveCategories()]);
    }

    retrieveCategories() {
        ProductDataService.getCategories()
        .then(response => {
            this.setState({
                categories: response.data.categories
            })
            console.log(response.data.categories);
        })
        .catch(e => {
            console.log(e);
        });
    }

    retrieveProducts() {
        ProductDataService.getAll()
        .then(response => {
            this.setState({
                products: response.data.products
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
            if (response.data.validationErrors != null) {
                alert(response.data.validationErrors);
            } else {
                alert("Product removed")
                this.refreshList();
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    addProductToCart(productId, cartId) {
        let data = {
            productID: productId,
            cartID: cartId
        }

        CartDataService.addToCart(data)
        .then(response => {
            if (response.data.validationErrors == null && response.data.dbErrors == null) {
                alert("Product was added to cart.");
            } else {
                alert(response.data.validationErrors)
            }
        })
    }

    render() {
        const { products } = this.state;

        return (
            <div className="container">
                <div className="row">
                { products && products.map( p => (
                    <div className="col-4" key={ p.id }>
                        <Link to={"/product/" + p.id}>
                            <div className="info">
                                <div className="category">
                                    { p.category }
                                </div>
                                <div className="image">
                                    <img src={ imgUrl + p.image_path }  alt=""/>
                                </div>
                                <div className="name">
                                    { p.name }
                                </div>
                                <div className="prices">
                                { p.discount != 0 ? (
                                    <>
                                        <div className="discount">
                                            -<CurrencyFormat value={p.discount} displayType={'text'} suffix="%" />
                                        </div>
                                        <div className="regPrice">
                                            <CurrencyFormat value={p.regPrice} displayType={'text'} prefix="&euro;" />
                                        </div>
                                        <div className="actPrice">
                                            <CurrencyFormat value={p.actPrice} displayType={'text'} prefix="&euro;" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="actPrice">
                                        <CurrencyFormat value={p.actPrice} displayType={'text'} prefix="&euro;" />
                                    </div>
                                )}
                                </div>
                            </div>
                            <div className="control">
                                <button className="btn btn-default" onClick={this.refreshList}>
                                    Reload page
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
                </div>
            </div>

// <div className="container">
//   <div className="row">
//     <div className="col-12">
//       <h1>Product List</h1>
//     </div>
//   </div>
//   <div className="row">
//     <div className="col-12">
//       <div className="table-responsive">
//         <table className="table table-hover table-bordered table-dark">
//           <thead>
//             <tr>
//               <th scope="col">Product</th>
//               <th scope="col">Category</th>
//               <th scope="col">Regular Price</th>
//               <th scope="col">Discount</th>
//               <th scope="col">Actual Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products && products.map(product => (
//               <tr key={product.id}>
//                 <td>{product.name}</td>
//                 <td>{product.category}</td>
//                 <td>
//                   <CurrencyFormat value={product.regPrice} displayType={'text'} prefix="&euro;" />
//                 </td>
//                 <td>
//                   <CurrencyFormat value={product.discount} displayType={'text'} suffix="%" />
//                 </td>
//                 <td>
//                   <CurrencyFormat value={product.actPrice} displayType={'text'} prefix="&euro;" />
//                 </td>
//                 <td>
//                   <Link to={"/api/product/" + product.id}>
//                     <i className="fas fa-2x fa-info-circle"></i>
//                   </Link>
//                 </td>
//                 <td>
//                   <div className="dropdown">
//                     <a className="dropdown-toggle"
//                       id="dropdownCarts" data-toggle="dropdown"
//                       aria-haspopup="true" aria-expanded="false"
//                       title="Add to Cart">
//                         <i className="fas fa-2x fa-cart-plus"></i>
//                     </a>
//                     <div className="dropdown-menu" aria-labelledby="dropdownCarts">
//                       <div className="input-group  ">
//                         <div className="input-group-prepend">
//                           <button style={{minWidth: 2.5 + 'rem'}} className="btn btn-decrement btn-outline-secondary" type="button">
//                             <strong>−</strong>
//                           </button>
//                         </div>
//                         <input type="number" value="1" min="1" max="1000" step="1"/>
//                         <div className="input-group-append">
//                           <button style={{minWidth: 2.5 + 'rem'}} className="btn btn-increment btn-outline-secondary" type="button">
//                             <strong>+</strong>
//                           </button>
//                         </div>
//                       </div>
//                       <script>
//                         $("input[type='number']").inputSpinner()
//                       </script>
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <a onClick={ () => this.deleteProduct(product.id)} title={product.id}>
//                     <i className="far fa-2x fa-trash-alt"></i>
//                   </a>     
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>  
//       </div>
//     </div>
//   </div>
// </div>
);
    }
}

// class CreateCart extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeName = this.onChangeName.bind(this);
//     this.saveCart = this.saveCart.bind(this);
  
//     this.state = {
//       cartName: "",

//       errors: {
//         validationErrors: {},
//         dbErrors: {}
//       }
//     }
//   }

//   onChangeName(e) {
//     this.setState({
//       cartName: e.target.value
//     });
//   }

//   saveCart() {
//     var data = {
//       cartName: this.state.cartName
//     };

//     CartDataService.create(data)
//       .then(response => {
//         this.setState({
//           cartName: response.data.cartName,

//           validationErrors: response.data.validationErrors,
//           dbErrors: response.data.dbErrors
//         });
//         if (this.state.validationErrors == null && this.state.dbErrors == null) {
//             window.location.reload()
//         }
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     return (  
//       <div className="modal fade" id="createCartModal" tabIndex="-1" role="dialog" aria-labelledby="createCartModalLabel" aria-hidden="true">
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="createCartModalLabel">Create Cart</h5>
//               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="submit-form">
//                 <div className="form-row">
//                   <div className="col-12 mb-3">
//                     <label htmlFor="validationCart">Cart name</label>
//                     <input 
//                       type="text" 
//                       className="form-control" 
//                       value={this.state.cartName}
//                       onChange={this.onChangeName} 
//                       id="validationCart" 
//                       name="cartName"
//                     />
//                     <span className="invalid-feedback">
//                       Field can't be empty!
//                     </span>
//                   </div>
//                 </div>
//                 <div className="form-row">
//                   <button className="btn btn-primary" onClick={this.saveCart}>Save</button>
//                 </div>
//               </div>
//             </div>
//             { this.state.validationErrors ? (
//             <div className="errors">
//               <ul>
//                 { this.state.validationErrors.map((validationError, index) => (
//                   <li key={index}>
//                     {validationError}
//                   </li>
//                 ))}
//               </ul>
//             </div>      
//             ) : (<div className="errors"></div>  
//             )}
//             { this.state.dbErrors ? (
//             <div className="errors">
//               <ul>
//                 { this.state.dbErrors.map((dbError, index) => (
//                   <li key={index}>
//                     {dbError}
//                   </li>
//                 ))}
//               </ul>
//             </div>                
//             ) : (
//             <div className="errors"></div>
//             )}
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )  
//   }
// }