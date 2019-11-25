import React from "react";
import { AppContext } from "../App";

const AppContextHOC = (Component) => class AppContextHOC extends React.Component {
    render() {
        return <AppContext.Consumer>
            {(context) => <Component
                {...this.props}
                {...context}
            />}
        </AppContext.Consumer>
    }
};

export { AppContextHOC }