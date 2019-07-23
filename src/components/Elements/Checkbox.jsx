import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({type = 'checkbox', name, value, checked = false, onChange}) => (
    <input type={type} name={name} value={value} checked={checked} onChange={onChange}/>
);

Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;