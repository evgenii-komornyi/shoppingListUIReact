import React, { Component } from 'react';
import ProductDataService from '../../services/productService';
import * as CurrencyFormat from 'react-currency-format';
const imgUrl = "http://127.0.0.1:8887/img/products/";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory_Id = this.onChangeCategory_Id.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFile_Id = this.onChangeFile_Id.bind(this);
        this.onFileChange = this.onFileChange.bind(this);

        this.retrieveCategories = this.getCategories.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.retrieveFiles = this.getFiles.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.increaseQty = this.increaseQty.bind(this);
        this.decreaseQty = this.decreaseQty.bind(this);

        this.state = {
            currentProduct: {
                Name: "",
                Category: "",
                Category_Id: "",
                Price: "",
                Discount: "",
                ActPrice: "",
                Description: "",
                File_Id: "",
                FileName: ""
            },

            new_File_Id: null,
            new_FileName: "",

            message: "",

            errors: {
                validationErrors: {},
                dbErrors: {}
            },

            categories: [],

            user: {
                name: localStorage.getItem('name'),
                role: localStorage.getItem('role'),
                cartId: localStorage.getItem('cartId'),
            },

            qty: 1,
            min: 1,
            max: 10,
            File: "",
            File_Category: "product",
            BaseUrl: "",

            files: []
        };
    }

    componentDidMount() {
        Promise.all([this.getProduct(this.props.match.params.id), this.getCategories(), this.getFiles()]);
    }

    getProduct(id) {
        ProductDataService.get(id).then(response => {
            this.setState({
                currentProduct: {
                    id: response.data.product.id,
                    Name: response.data.product.name,
                    Category: response.data.product.category,
                    Category_Id: response.data.product.category_id,
                    Price: response.data.product.regPrice,
                    Discount: response.data.product.discount,
                    ActPrice: response.data.product.actPrice,
                    Description: response.data.product.description,
                    File_Id: response.data.product.file_id,
                    FileName: response.data.product.image_path
                },
                errors: {
                    validationErrors: response.data.product.validationErrors
                }
            });
            if (this.state.errors.validationErrors == "Product not Found")
            {
                this.props.history.push("/products");
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    getCategories() {
        ProductDataService.getCategories().then(response => {
            this.setState({
                categories: response.data.categories
            })
        })
        .catch(e => {
            console.log(e);
        });
    }

    getFiles() {
        ProductDataService.getFiles().then(response => {
            this.setState({
                files: response.data.files
            })
        })
        .catch(e => {
            console.log(e);
        });
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    Name: name
                }
            };
        });
    }

    onChangeCategory_Id(e) {
        const category_id = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    Category_Id: category_id
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
                Price: price
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
                    Discount: discount
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentProduct: {
                ...prevState.currentProduct,
                Description: description
            }
        }));
    }

    onFileUpload() {
        ProductDataService.upload(this.state.File.name, this.state.File_Category, this.state.File).then(res => {
            this.setState({
                new_File_Id: res.data.Id,
                new_FileName: res.data.File
            });
            console.log('newFile: ', this.state.new_FileName, ', newId: ', this.state.new_File_Id, ', oldFile: ', this.state.currentProduct.FileName)
            alert("Uploaded");

            this.getFiles();
        });
    };

    onChangeFile_Id(e) {
        const file_Id = e.target.value;

        this.setState(prevState => ({
            currentProduct: {
                ...prevState.currentProduct,
                File_Id: file_Id
            }
        }));
    }

    onFileChange(e) {
        this.setState({
            File: e.target.files[0],
            FileUrl: URL.createObjectURL(e.target.files[0])
        });
    };

    updateProduct() {
        ProductDataService.update(this.state.currentProduct.id, this.state.currentProduct).then(response => {
            this.setState({
                message: "The product was updated successfully!",
                validationErrors: response.data.validationErrors,
                dbErrors: response.data.dbErrors
            });

            if (this.state.validationErrors == null && this.state.dbErrors == null) {
                alert(this.state.message);
                window.location.reload();
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteProduct() {
        ProductDataService.delete(this.state.currentProduct.id).then(response => {
            this.setState({
                message: "The product was deleted successfully!",
                validationErrors: response.data.validationErrors,
                dbErrors: response.data.dbErrors
            });

            if (this.state.validationErrors == null && this.state.dbErrors == null) {
                alert(this.state.message);
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    increaseQty() {
        if  (this.state.qty < this.state.max) {
            this.setState({
                qty: this.state.qty + 1
            })
        }
    }

    decreaseQty() {
        if (this.state.qty > this.state.min) {
            this.setState({
                qty: this.state.qty - 1
            })
        }
    }

    fileData = () => {
        if (this.state.File) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.File.name}</p>
                    <p>File Type: {this.state.File.type}</p>
                    <p>Size: {this.state.File.size}</p>
                </div>
            );
        } else {
            return (
                <>

                </>
            );
        }
    };

    editForm = () => {
        const { currentProduct } = this.state;
        if (this.state.new_File_Id != null) {
            currentProduct.File_Id = this.state.new_File_Id
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Edit Product</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-row">
                            <div className="col-6 mb-3">
                                <label htmlFor="Name">Product</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={ currentProduct.Name }
                                    onChange={ this.onChangeName }
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="Category">Category</label>
                                <select
                                    className="custom-select"
                                    id="category_id"
                                    value={ currentProduct.Category_Id }
                                    onChange={ this.onChangeCategory_Id }
                                >
                                    <option
                                        style={{ fontWeight: 'bold', color: 'white', background: 'black' }}
                                        value={ currentProduct.Category_Id }>
                                            { currentProduct.Category }
                                    </option>
                                { this.state.categories.map((cat, index) => (
                                    <option
                                        key={ index }
                                        value={ cat.id }>
                                            { cat.category }
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="Price">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    value={ currentProduct.Price }
                                    onChange={ this.onChangePrice }
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="Discount">Discount</label>
                                <input
                                    type="text"
                                    className = "form-control"
                                    id="discount"
                                    value={ currentProduct.Discount }
                                    onChange={ this.onChangeDiscount }
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-12 mb-3">
                                <label htmlFor="Description">Description</label>
                                <div className="input-group">
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        value={ currentProduct.Description }
                                        onChange={ this.onChangeDescription }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-6 mb-3">
                                <label htmlFor="File">Image</label>
                                <div className="input-group">
                                    <input
                                        type="file"
                                        onChange={this.onFileChange}
                                    />
                                    <input
                                        type="hidden"
                                        value={this.state.File_Category}
                                        onChange={this.onChangeFile_Category}
                                    />
                                    <button style={{marginLeft: 50 + 'px'}} onClick={this.onFileUpload}>
                                        Upload file
                                    </button>
                                </div>
                                {this.fileData()}
                            </div>
                            <div className="col-6 mb-3">
                                { this.state.FileUrl ? (
                                <img
                                    src={this.state.FileUrl}
                                    className="thumbnail"
                                    alt="Image"
                                />
                                ) : (
                                <>
                                    <br/>
                                    <h5>Choose file before Pressing the Upload button</h5>
                                </>
                                )}
                            </div>
                            <div className="col-4 mb-3">
                                { this.state.new_File_Id != null ? (
                                <>
                                    <label htmlFor="FileName">New Image</label>
                                    <input
                                        type="hidden"
                                        value={ currentProduct.File_Id }
                                        onChange={ this.onChangeFile_Id }
                                        checked
                                    />
                                    <img
                                        style={{ width: 150 + 'px' }}
                                        id="FileName"
                                        src={ imgUrl + this.state.new_FileName }
                                    />
                                </>
                                ) : (
                                <>
                                    <label htmlFor="FileName">Current Image</label>
                                    <input
                                        type="hidden"
                                        value={ currentProduct.File_Id }
                                        onChange={ this.onChangeFile_Id }
                                        checked
                                    />
                                    <img
                                        style={{ width: 150 + 'px' }}
                                        id="FileName"
                                        src={ imgUrl + currentProduct.FileName }
                                    />
                                </>
                                )}
                            </div>

                            <div className="col-6 mb-3">
                                { this.state.files.map((file, index) => (
                                <label key={ index }>
                                    <input
                                        type="radio"
                                        value={ file.Id }
                                        name="File_Id"
                                        onChange={ this.onChangeFile_Id }
                                    />
                                    <img
                                        src={ imgUrl + file.File }
                                    />
                                </label>
                                ))}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-12 mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    onClick={ this.updateProduct }
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger mr-2"
                                    onClick={ this.deleteProduct }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        { this.state.validationErrors ? (
                        <div className="errors">
                            <ul>
                            { this.state.validationErrors.map((validationError, index) => (
                                <li key={ index }>
                                    { validationError }
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
                                <li key={ index }>
                                    { dbError }
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
        )
    }

    render() {
        const { currentProduct, user } = this.state;

        return (
            <>
            { user.role != "admin" ? (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="product_info">
                            <div className="image">
                                <img src={ imgUrl + currentProduct.FileName } alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="product_info">
                            <div className="name">
                                <h4>{ currentProduct.Name }</h4>
                            </div>
                            <div className="category">
                                <h4>Category: { currentProduct.Category } </h4>
                            </div>
                            <div className="prices">
                            { currentProduct.Discount != 0 ? (
                                <>
                                    <div className="discount">
                                        -<CurrencyFormat value={currentProduct.Discount} displayType={'text'} suffix="%" />
                                    </div>
                                    <div className="regPrice">
                                        <CurrencyFormat value={currentProduct.Price} displayType={'text'} prefix="&euro;" />
                                    </div>
                                    <div className="actPrice">
                                        <CurrencyFormat value={currentProduct.ActPrice} displayType={'text'} prefix="&euro;" />
                                    </div>
                                </>
                                ) : (
                                <div className="actPrice">
                                    <CurrencyFormat value={currentProduct.ActPrice} displayType={'text'} prefix="&euro;" />
                                </div>
                                )}
                            </div>
                            <div className="cartFunctional">
                                <button className="btn btn-outline-secondary decr" id="decrease" onClick={ this.decreaseQty }>-</button>
                                <input type="number" className="qty" value={ this.state.qty } readOnly />
                                <button className="btn btn-outline-secondary incr" id="increase" onClick={ this.increaseQty }>+</button>
                                <button className="btn btn-outline-success add-to-cart">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="product_info">
                            <h4 className="description">Description</h4>
                            <div className="description">
                                { currentProduct.Description }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
            <div className="container">
                { this.editForm() }
            </div>
            )}
            </>
        );
    }
}