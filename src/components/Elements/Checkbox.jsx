import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({type = 'checkbox', title, name, value, checked = false, onChange}) => (
    <label key={value} className="mb-0">
        <input type={type} name={name} value={value} checked={checked} onChange={onChange}/>
        {title}
    </label>
);

Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;