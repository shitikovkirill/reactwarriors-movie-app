import React from "react";
import CallApi from "../../../api/request";
import {AppContextHOC} from '../../HOC/AppContextHOC';


class LoginForm extends React.Component {

    fieldValidationRules = {
        username: {
            message: "Not empty",
            condition: () => {
                return this.state.username === ""
            }
        },
        password: {
            message: "Not empty",
            condition: () => {
                return this.state.password === ""
            }
        },
        repeatPassword: {
            message: "Password not confirm",
            condition: () => {
                return this.state.password !== this.state.repeatPassword
            }
        }
    };

    state = {
        username: "",
        password: "",
        repeatPassword: "",
        errors: {},
        submitting: false
    };

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                base: null,
                [name]: null
            }
        }));
    };

    handleBlur = (event) => {
        let name = event.target.name;
        let errors = this.validateField(name);
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        }
    };

    validateFields = () => {
        let errors = {};
        for (let field in this.fieldValidationRules) {
            errors = {
                ...errors,
                ...this.validateField(field)
            }
        }
        return errors;
    };

    validateField = (field) => {
        let validator = this.fieldValidationRules[field];
        if (validator.condition()) {
            return {[field]: validator.message};
        }
        return {}
    };

    onSubmit = () => {
        this.setState({
            submitting: true
        });
        CallApi.get('/authentication/token/new')
            .then(data => {
                return CallApi.post('/authentication/token/validate_with_login', {
                    body: {
                        username: this.state.username,
                        password: this.state.password,
                        request_token: data.request_token
                    }
                })
            })
            .then(data => {
                return CallApi.post('/authentication/session/new', {
                    body: {
                        request_token: data.request_token
                    }
                });
            })
            .then(data => {
                this.props.updateSessionId(data.session_id);
                return CallApi.get('/account', {
                    params: {
                        session_id: this.props.session_id
                    }
                });
            })
            .then(user => {
                this.props.updateUser(user);
                this.setState({
                    submitting: false
                });
            })
            .catch(error => {
                console.log("error", error);
                this.setState({
                    submitting: false,
                    errors: {
                        base: error.status_message
                    }
                });
            });
    };

    onLogin = e => {
        e.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        } else {
            this.onSubmit();
        }
    };

    render() {
        const {username, password, repeatPassword, errors, submitting} = this.state;
        return (
            <div className="form-login-container">
                <form className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                        Авторизация
                    </h1>
                    <div className="form-group">
                        <label htmlFor="username">Пользователь</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Пользователь"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Повторите пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="repeatPassword"
                            placeholder="Повторите пароль"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.repeatPassword && (
                            <div className="invalid-feedback">{errors.repeatPassword}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                        disabled={submitting}
                    >
                        Вход
                    </button>
                    {errors.base && (
                        <div className="invalid-feedback text-center">{errors.base}</div>
                    )}
                </form>
            </div>
        );
    }
}

export default AppContextHOC(LoginForm);