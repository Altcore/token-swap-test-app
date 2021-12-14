import React from 'react';
import PropTypes from 'prop-types';

const CurrencyForm = () => {
  return (
    <form
      action="#"
      className="w-full max-w-sm mx-auto bg-slate-200 pt-6 pb-8 px-8 rounded-xl border-solid border-4 border-slate-400"
    >
      <label className="block text-md font-medium text-gray-700">Swap</label>
    </form>
  );
};

CurrencyForm.propTypes = {
  balance: PropTypes.array,
  tokens: PropTypes.array,
  pools: PropTypes.array,
};

export default CurrencyForm;
