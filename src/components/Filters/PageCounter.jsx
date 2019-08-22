import React from "react";
import PropTypes from "prop-types";

export default class PageCounter extends React.Component {
    static propTypes = {
        page: PropTypes.number,
        totalPage: PropTypes.number,
    };

    render() {
        const {page, totalPage} = this.props;
        return (
            <div>
                {page} of {totalPage}
            </div>
        );
    }
}