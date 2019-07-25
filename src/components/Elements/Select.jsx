import React from "react";
import PropTypes from "prop-types";

export default class Select extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        labelText: PropTypes.string.isRequired,
        options: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    render() {
        const {id, name, value, onChange, labelText, options} = this.props;
        return (
            <div className="form-group">
                <label htmlFor={id}>{labelText}</label>
                <select
                    id={id}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}
