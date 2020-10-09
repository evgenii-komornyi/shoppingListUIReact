import React, { Component } from 'react';
import ProductDataService from '../../services/productService';
const imgUrl = "http://127.0.0.1:8887/img/products/";

export default class AddNewProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory_Id = this.onChangeCategory_Id.bind(this);
        this.onChangeFile_Id = this.onChangeFile_Id.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.onFileUpload = this.onFileUpload.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.retrieveCategories = this.getCategories.bind(this);
        this.retrieveFiles = this.getFiles.bind(this);

        this.state = {
            Name: "",
            Category_Id: "",
            Price: "",
            Discount: "",
            Description: "",
            File_Id: "",
            File: "",
            File_Category: "product",

            errors: {
                validationErrors: {},
                dbErrors: {}
            },

            categories: [],

            FileUrl: "",

            files: []
        };
    }

    componentDidMount() {
        Promise.all([this.getCategories(), this.getFiles()]);
    }

    getCategories() {
        ProductDataService.getCategories().then(response => {
            this.setState({
                categories: response.data.categories
            })
            console.log(response);
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
        this.setState({
            Name: e.target.value
        });
    }

    onChangeCategory_Id(e) {
        this.setState({
            Category_Id: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            Price: e.target.value
        });
    }

    onChangeDiscount(e) {
        this.setState({
            Discount: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            Description: e.target.value
        });
    }

    onFileChange = event => {
        this.setState({
            File: event.target.files[0],
            FileUrl: URL.createObjectURL(event.target.files[0])
        });
    };

    onChangeFile_Id(e) {
        this.setState({
            File_Id: e.target.value
        });
    }

    onFileUpload = () => {
        console.log("upload ", this.state.File_Category)
        ProductDataService.upload(this.state.File.name, this.state.File_Category, this.state.File).then(res => {
            alert("Uploaded");
            this.state.File_Id = res.data.Id;
            this.getFiles();
        });
    };

    saveProduct() {
        let data = {
            Name: this.state.Name,
            Category_Id: this.state.Category_Id,
            Price: this.state.Price,
            Discount: this.state.Discount,
            Description: this.state.Description,
            File_Id: this.state.File_Id
        };

        ProductDataService.create(data).then(response => {
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

    render() {
        return (
            <div className="submit-form">
                <div className="form-row">
                    <div className="col-6 mb-3">
                        <label htmlFor="Name">Product</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.Name}
                            onChange={this.onChangeName}
                            name="Name"
                        />
                    </div>

                    <div className="col-6 mb-3">
                        <label htmlFor="Category">Category</label>
                        <select
                            className="custom-select"
                            id="category"
                            required
                            value={this.state.Category_Id}
                            onChange={this.onChangeCategory_Id}
                            name="Category_Id"
                        >
                            <option disabled value="">Choose...</option>
                        { this.state.categories.map((cat, index) => (
                            <option key={index} value={ cat.id }>{ cat.category }</option>
                        ))}
                        </select>
                    </div>

                    <div className="col-6 mb-3">
                        <label htmlFor="Price">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            required
                            value={this.state.Price}
                            onChange={this.onChangePrice}
                            name="Price"
                        />
                    </div>

                    <div className="col-6 mb-3">
                        <label htmlFor="Discount">Discount</label>
                        <input
                            type="text"
                            className="form-control"
                            id="discount"
                            value={this.state.Discount}
                            onChange={this.onChangeDiscount}
                            name="Discount"
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
                                value={this.state.Description}
                                onChange={this.onChangeDescription}
                                name="Description"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-6 mb-3">
                        <input
                            type="hidden"
                            value={this.state.File_Id}
                            onChange={this.onChangeFile_Id}
                        />
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
                </div>

                <button
                    onClick={this.saveProduct}
                    className="btn btn-success">
                    Save product
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
        );
    }
}