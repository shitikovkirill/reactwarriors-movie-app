import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import {AppContextHOC} from "../../HOC/AppContextHOC";

class Login extends React.Component {

    render() {
        const {showLoginForm, toggleLoginForm} = this.props;
        return (
            <div>
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={toggleLoginForm}
                >
                    Login
                </button>
                <Modal isOpen={showLoginForm} toggle={toggleLoginForm}>
                    <ModalBody>
                        <LoginForm />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default AppContextHOC(Login)