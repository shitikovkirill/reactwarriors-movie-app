import React from "react";
import { AppContextHOC } from '../HOC/AppContextHOC';

class User extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <img
                    width="40"
                    className="rounded-circle"
                    src={`https://secure.gravatar.com/avatar/${
                        user.avatar.gravatar.hash
                        }.jpg?s=64"`}
                    alt=""
                />
            </div>
        );
    }
}

export default AppContextHOC(User)