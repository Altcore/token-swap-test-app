import React from 'react';
import PropTypes from 'prop-types';

const CurrencyField = ({ name, value, handleChange, onFocus, onBlur }) => {
  return (
    <>
      <input
        type="number"
        name={name}
        id="amount"
        value={value}
        onChange={handleChange}
        placeholder="0.00"
        pattern="[0-9]*"
        onFocus={onFocus}
        onBlur={onBlur}
        className="form-input w-full block pr-24 rounded-md dark:bg-gray-700 dark:text-gray-200"
      />
    </>
  );
};

CurrencyField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default CurrencyField;
