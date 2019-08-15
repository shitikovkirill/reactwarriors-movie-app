import React from "react";
import PropTypes from "prop-types";

export default class PageCounter extends React.Component {
    static propTypes = {
        page: PropTypes.number.isRequired,
        totalPage: PropTypes.number.isRequired,
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