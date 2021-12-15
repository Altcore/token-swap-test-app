import React from 'react';
import PropTypes from 'prop-types';

const CurrencySelect = ({ name, currencies, currencyType, handleChange }) => {
  return (
    <div className="absolute right-0 top-0">
      <select
        name={name}
        value={currencyType}
        onChange={handleChange}
        className="form-select pr-7 pl-1 border-transparent bg-transparent"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrencySelect.propTypes = {
  name: PropTypes.string,
  currencies: PropTypes.array,
  currencyType: PropTypes.string,
  handleChange: PropTypes.func,
};

export default CurrencySelect;
