import React, { Component } from 'react';
import { ReactDatez } from 'react-datez';
import countryList from 'react-select-country-list';
import UserDataService from '../../services/userService';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.showHide = this.showHide.bind(this);
        this.saveUser = this.saveUser.bind(this);

        // this.onChangeCountry = this.onChangeCountry.bind(this);
        // this.onChangeCity = this.onChangeCity.bind(this);
        // this.onChangeStreet = this.onChangeStreet.bind(this);
        // this.onChangeHouseNumber = this.onChangeHouseNumber.bind(this);
        // this.onChangeFlatNumber = this.onChangeFlatNumber.bind(this);
        // this.onChangeAdditionalInfo = this.onChangeAdditionalInfo.bind(this);
        // this.onChangePhone = this.onChangePhone.bind(this);

        this.countries = countryList().getData();

        this.state = {
            user: {
                UserId: "",
                FirstName: "",
                LastName: "",
                Birthday: "",
                Email: "",
                Login: "",
                Password: "",
                DefaultAddress_Id: ""
            },

            serverErrors: {
                validationErrors: {},
                dbErrors: {}
            },

            type: 'password',
            score: 'null',

            countries: this.countries,
            address: {
                Address_Id: "",
                Country: "",
                City: "",
                Street: "",
                House_Number: "",
                Flat_Number: "",
                Additional_Info: "",
                Phone: ""
            },

            UIErrors: {
                firstName: "",
                lastName: "",
                birthday: "",
                email: "",
                login: "",
                password: "",
                confirmPassword: ""
            },

            confirmClass: 'notMatch',
            ConfirmPassword: "",
            isMatch: false,

            valid: {
                firstName: false,
                lastName: false,
                birthday: false,
                email: false,
                login: false,
                password: false,
                confirmPassword: false
            }
        }
    }

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'password' ? 'text' : 'password'
        })
    }

    onChangeFirstName(e) {
        const firstName = e.target.value,
            {user} = this.state;

        this.setState({
            user: {
                ...user,
                FirstName: firstName
            }
        })

        this.checkFirstName(firstName);
    }

    checkFirstName(firstName) {
        const {UIErrors, valid} = this.state;

        let format = /^[А-ЯЁа-яё]+|[A-Za-z]+$/;

        if (firstName.length < 2 || firstName.length > 15)
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    firstName: "First name must be from 2 to 15 letters long"
                },
                valid: {
                    ...valid,
                    firstName: false
                }
            })
        } else if (!firstName.match(format))
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    firstName: "First name can only contain letters"
                },
                valid: {
                    ...valid,
                    firstName: false
                }
            })
        } else
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    firstName: ""
                },
                valid: {
                    ...valid,
                    firstName: true
                }
            })
        }
    }

    onChangeLastName(e) {
        const lastName = e.target.value,
            {user} = this.state;

        this.setState({
            user: {
                ...user,
                LastName: lastName
            }
        })

        this.checkLastName(lastName);
    }

    checkLastName(lastName) {
        const {UIErrors, valid} = this.state;

        let format = /^[А-ЯЁа-яё]+|[A-Za-z]+$/;

        if (lastName.length < 2 || lastName.length > 15)
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    lastName: "Last name must be from 2 to 15 letters long"
                },
                valid: {
                    ...valid,
                    lastName: false
                }
            })
        } else if (!lastName.match(format))
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    lastName: "Last name can only contain letters"
                },
                valid: {
                    ...valid,
                    lastName: false
                }
            })
        } else
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    lastName: ""
                },
                valid: {
                    ...valid,
                    lastName: true
                }
            })
        }
    }

    onChangeBirthday(e) {
        let birthday = e.split('-', 3).join(''),
            {user} = this.state;

        birthday = birthday.slice(0, birthday.lastIndexOf('T'));

        this.setState({
            user: {
                ...user,
                Birthday: birthday
            }
        })

        this.checkBirthday(birthday);
    }

    checkBirthday(birthday) {
        const {UIErrors, valid} = this.state;

        let currentYear = new Date().getFullYear(),
            maxYear = currentYear - 16,
            minYear = currentYear - 80,
            maxAge = currentYear - minYear,
            minAge = currentYear - maxYear,
            year = birthday.slice(0, 4);

        if (year < minYear || year > maxYear)
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    birthday: "Supported age: " + minAge + " - " + maxAge
                },
                valid: {
                    ...valid,
                    birthday: false
                }
            })
        } else
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    birthday: ""
                },
                valid: {
                    ...valid,
                    birthday: true
                }
            })
        }
    }

    onChangeEmail(e) {
        const email = e.target.value,
            {user} = this.state;

        this.setState({
            user: {
                ...user,
                Email: email
            }
        })

        this.checkEmail(email);
    }

    checkEmail(email) {
        const {UIErrors, valid} = this.state;

        let format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.length < 2 || email.length > 40)
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    email: "Email must be from 2 to 40 letters long"
                },
                valid: {
                    ...valid,
                    email: false
                }
            })
        } else if (!email.match(format))
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    email: "Email must correspond format: test@test.com"
                },
                valid: {
                    ...valid,
                    email: false
                }
            })
        } else
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    email: ""
                },
                valid: {
                    ...valid,
                    email: true
                }
            })
        }
    }

    onChangeLogin(e) {
        const login = e.target.value,
            {user} = this.state;

        this.setState({
            user: {
                ...user,
                Login: login
            }
        })

        this.checkLogin(login);
    }

    checkLogin(login) {
        const {UIErrors, valid} = this.state;

        let format = /^[0-9a-zA-Z]+$/;

        if (login.length < 5 || login.length > 20)
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    login: "Login must be from 5 to 20 letters long"
                },
                valid: {
                    ...valid,
                    login: false
                }
            })
        } else if (!login.match(format))
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    login: "Login can contain letters and digits only"
                },
                valid: {
                    ...valid,
                    login: false
                }
            })
        } else
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    login: ""
                },
                valid: {
                    ...valid,
                    login: true
                }
            })
        }
    }

    onChangePassword(e) {
        const password = e.target.value,
            {user} = this.state;

        this.setState({
            user: {
                ...user,
                Password: password
            }
        })

        this.checkPassword(password);
    }

    checkPassword(password) {
        const {UIErrors, valid} = this.state;

        let format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;

        if (!password.match(format))
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    password: "Password must be at least 8 - 25 long, and contain one lowercase and uppercase letter, digits, and special symbols"
                },
                valid: {
                    ...valid,
                    password: false
                }
            })
        } else
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    password: ""
                },
                valid: {
                    ...valid,
                    password: true
                }
            })
        }

        if (password === '')
        {
            this.setState({
                score: 'null'
            })
        }
        else
        {
            var pw = zxcvbn(password);

            this.setState({
                score: pw.score
            });
        }
    }

    onChangeConfirmPassword(e) {
        let password = e.target.value;

        this.setState({
            ConfirmPassword: password
        })

        this.checkConfirmPassword(password);
    }

    checkConfirmPassword(password) {
        const {user, UIErrors, valid} = this.state;

        if (password !== user.Password)
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    confirmPassword: "Passwords not match"
                },
                valid: {
                    ...valid,
                    confirmPassword: false
                },
                confirmClass: "notMatch",
                isMatch: false
            })
        } else
        {
            this.setState({
                UIErrors: {
                    ...UIErrors,
                    confirmPassword: ""
                },
                valid: {
                    ...valid,
                    confirmPassword: true
                },
                confirmClass: "match",
                isMatch: true
            })
        }
    }

    saveUser() {
        let {user} = this.state;

        UserDataService.create(user).then(response => {
            this.setState({
                validationErrors: response.data.validationErrors
            })

            if (this.state.validationErrors == null && this.state.dbErrors == null) {
                this.setState({
                    user: {
                        ...user,
                        UserId: response.data.UserId
                    }
                })
            }
        })
    }

    // onChangeCountry(e) {
    //     this.setState({
    //         address: {
    //             Country: e.target.value
    //         }
    //     })
    // }

    // onChangeCity(e) {
    //     this.setState({
    //         address: {
    //             City: e.target.value
    //         }
    //     })
    // }

    // onChangeStreet(e) {
    //     this.setState({
    //         address: {
    //             Street: e.target.value
    //         }
    //     })
    // }

    // onChangeHouseNumber(e) {
    //     this.setState({
    //         address: {
    //             House_Number: e.target.value
    //         }
    //     })
    // }

    // onChangeFlatNumber(e) {
    //     this.setState({
    //         address: {
    //             Flat_Number: e.target.value
    //         }
    //     })
    // }

    // onChangeAdditionalInfo(e) {
    //     this.setState({
    //         address: {
    //             Additional_Info: e.target.value
    //         }
    //     })
    // }

    // onChangePhone(e) {
    //     this.setState({
    //         address: {
    //             Phone: e.target.value
    //         }
    //     })
    // }

    // checkRules() {
    //     if (this.checkFirstName())
    //     {
    //         this.setState({
    //             isEnabled: true
    //         })
    //     }
    //     else
    //     {
    //         this.setState({
    //             isEnabled: false
    //         })
    //     }
    //     // return this.checkFirstName() && this.checkLastName() && this.checkBirthday()
    //     // && this.checkEmail() && this.checkLogin() && this.checkPassword() && this.checkConfirmPassword()
    // }

    render() {
        const {user, UIErrors, valid} = this.state,
            isEnabled = Object.values(valid).every(isValid => isValid === true);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Registration</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="submit-form user">
                            <div className="form-row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="fName">FirstName *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fName"
                                        required
                                        value={this.state.FirstName}
                                        onChange={this.onChangeFirstName}
                                        name="firstName"
                                    />
                                    <>
                                    {UIErrors ? (
                                        <div className="error">
                                            {UIErrors.firstName}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    </>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="lName">LastName *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lName"
                                        required
                                        value={user.LastName}
                                        onChange={this.onChangeLastName}
                                        name="lastName"
                                    />
                                    <>
                                    {UIErrors ? (
                                        <div className="error">
                                            {UIErrors.lastName}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    </>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="birthday">Birthday *</label>
                                    <ReactDatez
                                        id="birthday"
                                        name="birthday"
                                        value={user.Birthday}
                                        handleChange={this.onChangeBirthday}
                                        allowPast={true}
                                        allowFuture={false}
                                        name="birthday"
                                    />
                                    <>
                                    {UIErrors ? (
                                        <div className="error">
                                            {UIErrors.birthday}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    </>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="login">Email *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="login"
                                        value={user.Email}
                                        onChange={this.onChangeEmail}
                                        name="email"
                                    />
                                    <>
                                    {UIErrors ? (
                                        <div className="error">
                                            {UIErrors.email}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    </>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="login">Login *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="login"
                                        value={user.Login}
                                        onChange={this.onChangeLogin}
                                        name="login"
                                    />
                                    <>
                                    {UIErrors ? (
                                        <div className="error">
                                            {UIErrors.login}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    </>
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="password">Password *
                                        <input
                                            type={this.state.type}
                                            className="password__input"
                                            value={user.Password}
                                            onChange={this.onChangePassword}
                                            name="password"
                                        />
                                        <i
                                            className={this.state.type === 'password' ? 'fas fa-2x fa-eye' : 'fas fa-2x fa-eye-slash'}
                                            onClick={this.showHide}
                                        />
                                        <span
                                            className="password__strength"
                                            data-score={this.state.score}
                                        />
                                    </label>
                                    <>
                                    {UIErrors ? (
                                        <div className="error">
                                            {UIErrors.password}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    </>
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="password">Confirm Password *
                                        <input
                                            type={this.state.type}
                                            className={this.state.confirmClass + " password__confirm"}
                                            onChange={this.onChangeConfirmPassword}
                                            name="confirmPassword"
                                        />
                                        <i
                                            className={this.state.type === 'password' ? 'fas fa-2x fa-eye' : 'fas fa-2x fa-eye-slash'}
                                            onClick={this.showHide}
                                        />
                                    </label>
                                    <>
                                    {UIErrors ? (
                                        <div className="error">
                                            {UIErrors.confirmPassword}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    </>
                                </div>
                            </div>

                            {/* <div className="form-row">
                                <div className="col-6 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select
                                        className="custom-select"
                                        id="country"
                                        value={address.Country}
                                        onChange={this.onChangeCountry}
                                        name="country"
                                    >
                                        <option disabled value="">Choose...</option>
                                    { this.state.countries.map((country, index) => (
                                        <option key={index} value={ country.label }>{ country.label }</option>
                                    ))}
                                    </select>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="city">City</label>
                                    <input
                                        className="form-control"
                                        id="city"
                                        value={address.City}
                                        onChange={this.onChangeCity}
                                        name="city"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-6 mb-3">
                                    <label htmlFor="houseNumber">House</label>
                                    <input
                                        className="form-control"
                                        id="houseNumber"
                                        value={address.House_Number}
                                        onChange={this.onChangeHouseNumber}
                                        name="country"
                                    />
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="flat">Flat</label>
                                    <input
                                        className="form-control"
                                        id="flat"
                                        value={address.Flat_Number}
                                        onChange={this.onChangeFlatNumber}
                                        name="flatNumber"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="info">Additional Info</label>
                                    <textarea
                                        className="form-control"
                                        id="info"
                                        value={address.Additional_Info}
                                        onChange={this.onChangeAdditionalInfo}
                                        name="additionalInfo"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        className="form-control"
                                        id="phone"
                                        value={address.Phone}
                                        onChange={this.onChangePhone}
                                        name="phone"
                                    />
                                </div>
                            </div> */}

                            <button
                                onClick={this.saveUser}
                                className="btn btn-success"
                                disabled={!isEnabled}>
                                Register User
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
            </div>
        );
    }

}