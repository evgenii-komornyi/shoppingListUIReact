import React, { Component } from 'react';
import ProductDataService from '../services/productService';

export default class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveProduct = this.saveProduct.bind(this);

    this.state = {
      productName: "",
      productCategory: "",
      productPrice: "",
      productDiscount: "",
      productDescription: "", 

      errors: {
        validationErrors: {},
        dbErrors: {}
      }
    };
  }

  onChangeName(e) {
    this.setState({
      productName: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      productCategory: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      productPrice: e.target.value
    });
  }

  onChangeDiscount(e) {
    this.setState({
      productDiscount: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      productDescription: e.target.value
    });
  }

  saveProduct(e) {
    var data = {
      productName: this.state.productName,
      productCategory: this.state.productCategory,
      productPrice: this.state.productPrice,
      productDiscount: this.state.productDiscount,
      productDescription: this.state.productDescription
    };

    ProductDataService.create(data)
      .then(response => {
        this.setState({
            validationErrors: response.data.validationErrors
        })
        if (this.state.validationErrors == null && this.state.dbErrors == null) {
            this.props.history.push('/products')
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
        <div className="submit-form">
            <div>
                <div className="form-row">
                <div className="col-6 mb-3">
                    <label htmlFor="productName">Product</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      required
                      value={this.state.productName}
                      onChange={this.onChangeName}
                      name="productName"
                    />
                </div>

                <div className="col-6 mb-3">
                    <label htmlFor="productCategory">Category</label>
                    <select
                      className="custom-select"
                      id="productCategory"
                      required
                      value={this.state.productCategory}
                      onChange={this.onChangeCategory}
                      name="productCategory"
                    >
                        <option disabled value="">Choose...</option>
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
                      required
                      value={this.state.productPrice}
                      onChange={this.onChangePrice}
                      name="productPrice"
                    />
                </div>

                <div className="col-6 mb-3">
                    <label htmlFor="productDiscount">Discount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productDiscount"
                      value={this.state.productDiscount}
                      onChange={this.onChangeDiscount}
                      name="productDiscount"
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
                        value={this.state.productDescription}
                        onChange={this.onChangeDescription}
                        name="productDescription"
                      ></textarea>
                    </div>
                </div>
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
                Save
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
    );
  }
}