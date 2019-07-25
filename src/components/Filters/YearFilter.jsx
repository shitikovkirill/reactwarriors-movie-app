import React from "react";
import PropTypes from "prop-types";
import getYearList from "../Helpers/YearList"
import Select from "../Elements/Select";


export default class YearFilter extends React.Component {

    static propTypes = {
        year: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        onChangeFilters: PropTypes.func.isRequired
    };

    static defaultProps = {
        options: getYearList()
    };

    render() {
        const {year, onChangeFilters, options} = this.props;
        return (
            <Select
                id="year"
                name="year"
                value={year}
                labelText="Год выпуска:"
                options={options}
                onChange={onChangeFilters}
            />
        );
    }
}
