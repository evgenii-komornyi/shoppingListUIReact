import React, { Component } from 'react';
import ProductDataService from '../services/productService';
import * as CurrencyFormat from 'react-currency-format';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        productName: "",
        productCategory: "",
        productPrice: "",
        productDiscount: "",
        productActPrice: "",
        productDescription: ""
      },
      message: "",
      errors: {
        validationErrors: {},
        dbErrors: {}
      }
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          productName: name
        }
      };
    });
  }

  onChangeCategory(e) {
    const category = e.target.value;

    this.setState(function(prevState) {
        return {
          currentProduct: {
          ...prevState.currentProduct,
          productCategory: category
        }
      };
    });
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          productPrice: price
        }
      };
    });
  }

  onChangeDiscount(e) {
    const discount = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          productDiscount: discount
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        productDescription: description
      }
    }));
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: {
            id:  response.data.product.id,
            productName: response.data.product.name,
            productCategory: response.data.product.category,
            productPrice: response.data.product.regPrice,
            productDiscount: response.data.product.discount,
            productActPrice: response.data.product.actPrice,
            productDescription: response.data.product.description
          }
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduct() {
    ProductDataService.update(
      this.state.currentProduct.id,
      this.state.currentProduct
    )
      .then(response => {
        this.setState({
          message: "The product was updated successfully!",
          validationErrors: response.data.validationErrors,
          dbErrors: response.data.dbErrors
        });
        if (this.state.validationErrors == null && this.state.dbErrors == null) { 
            alert(this.state.message);
         
            this.getProduct(this.props.match.params.id);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/products')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Product Info</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form>
                  <div className="form-row">
                    <div className="col-6 mb-3">
                      <label htmlFor="productName">Product </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={currentProduct.productName}
                        onChange={this.onChangeName}
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label htmlFor="productCategory">Category</label>
                      <select
                        className="custom-select"
                        id="productCategory"
                        value={currentProduct.productCategory}
                        onChange={this.onChangeCategory}
                      >
                        <option value="ALCOHOL">Alcohol</option>
                        <option value="BREAD">Bread</option>
                        <option value="FISH">Fish</option>
                        <option value="FRUITS">Fruits</option>
                        <option value="MEAT">Meat</option>
                        <option value="MILK">Milk</option>
                        <option value="SOFT_DRINKS">Soft drinks</option>
                        <option value="SWEETS">Sweets</option>
                        <option value="VEGETABLES">Vegetables</option>
                      </select>
                    </div>
                    <div className="col-6 mb-3">
                      <label htmlFor="productPrice">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productPrice"
                        value={currentProduct.productPrice}
                        onChange={this.onChangePrice}
                      />
                   </div>
                   <div className="col-6 mb-3">
                      <label htmlFor="productDiscount">Discount</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productDiscount"
                        value={currentProduct.productDiscount}
                        onChange={this.onChangeDiscount}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-12 mb-3">
                      <label htmlFor="productActualPrice">Actual Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productActPrice"
                        value={currentProduct.productActPrice}
                        onChange={this.onChangeDiscount}
                        readOnly
                      />
                    </div>
                  </div>  
                  <div className="form-row">  
                    <div className="col-12 mb-3">
                      <label htmlFor="productDescription">Description</label>
                      <div className="input-group">
                        <textarea
                          className="form-control"
                          id="productDescription"
                          value={currentProduct.productDescription}
                          onChange={this.onChangeDescription}
                        ></textarea>
                      </div>
                    </div>
                  </div>
               </form>
               <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteProduct}
                >
                  Delete
                </button>

                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateProduct}
                >
                  Update
                </button>
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
                ) : (
                <div className="errors"></div>  
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
                </div>
            </div>
        </div>
        );
  }
}