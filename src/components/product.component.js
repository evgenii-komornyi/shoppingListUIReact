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
        name: "",
        category: "",
        regPrice: "",
        discount: "",
        description: ""
      },
      message: ""
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
          currentProduct: response.data.product
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
        console.log(response.data);
        this.setState({
          message: "The product was updated successfully!"
        });
        this.getProduct(this.props.match.params.id);
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

  readInputs() {

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
                        defaultValue={currentProduct.name}
                        onChange={this.onChangeName}
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label htmlFor="productCategory">Category</label>
                      <select
                        className="custom-select"
                        id="productCategory"
                        defaultValue={currentProduct.category}
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
                        defaultValue={currentProduct.regPrice}
                        onChange={this.onChangePrice}
                      />
                   </div>
                   <div className="col-6 mb-3">
                      <label htmlFor="productDiscount">Discount</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productDiscount"
                        defaultValue={currentProduct.discount}
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
                        defaultValue={currentProduct.actPrice}
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
                          defaultValue={currentProduct.description}
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
                <p>{this.state.message}</p>
              </div>
            </div>
          </div>
        );
  }
}