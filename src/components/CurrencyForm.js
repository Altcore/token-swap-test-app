import React, { useState, useEffect } from 'react';
import { NUMERIC_SCALE } from '../helpers/constants';
import CurrencySelect from '../components/CurrencySelect';
import CurrencyField from '../components/CurrencyField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const CurrencyForm = ({ balance, tokens, pools }) => {
  const [currentCurrencyType, setCurrentCurrencyType] = useState(pools[0].tokenA);
  const [resultCurrencyType, setResultCurrencyType] = useState(pools[0].tokenB);
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [resultCurrency, setResultCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [resultAmountHasFocus, setResultAmountFieldFocus] = useState(false);

  const [isErrorOnConversion, setErrorOnConversion] = useState(false);
  const [isBalanceError, setBalanceError] = useState(false);
  const [isEmptyInputError, setEmptyInputError] = useState(false);

  const isSubmitDisabled = () => {
    return isErrorOnConversion || isBalanceError || isEmptyInputError;
  };

  const isBalanceEnough = (type, currentCurrency, balance) => {
    const chosenCurrencyBalance = balance.filter((item) => item.token === type);
    if (chosenCurrencyBalance.length) {
      return Number(chosenCurrencyBalance[0].balance) >= Number(currentCurrency);
    }

    return [];
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!currentCurrency || Number(currentCurrency) === 0) setEmptyInputError(true);
    if (isSubmitDisabled() || !currentCurrency) return;
    setCurrentCurrency('');
    setResultCurrency('');
  };

  const handleFieldsChange = ({ target: { value, name } }) => {
    switch (name) {
      case 'amount':
        setCurrentCurrency(value !== '' ? Math.abs(Number(value)) : '');
        value === '' || Number(value) === 0 ? setEmptyInputError(true) : setEmptyInputError(false);
        break;
      case 'amount_type':
        setCurrentCurrencyType(value);
        break;
      case 'result_amount':
        setResultCurrency(value !== '' ? Math.abs(Number(value)) : '');
        break;
      case 'result_type':
        setResultCurrencyType(value);
        break;
      default:
        console.log(`${name} field has to be defined before`);
    }
  };

  useEffect(() => {
    const setExchangeRateFromPools = (pools) => {
      const possibleRates = pools.filter(
        (item) => item.tokenA === currentCurrencyType && item.tokenB === resultCurrencyType,
      );

      if (possibleRates.length) {
        setErrorOnConversion(false);
        setExchangeRate(possibleRates[0].price);
      } else {
        setErrorOnConversion(true);
        setExchangeRate('');
      }
    };

    setExchangeRateFromPools(pools);
  }, [currentCurrencyType, resultCurrencyType]);

  useEffect(() => {
    const checkBalance = () => {
      if (currentCurrency && Number(currentCurrency) !== 0) {
        isBalanceEnough(currentCurrencyType, currentCurrency, balance) ? setBalanceError(false) : setBalanceError(true);
      }
    };

    checkBalance();
  }, [currentCurrency]);

  useEffect(() => {
    const calculateExchangeResult = () => {
      if (currentCurrencyType === resultCurrencyType) {
        resultAmountHasFocus ? setCurrentCurrency(resultCurrency) : setResultCurrency(currentCurrency);
      } else if (isErrorOnConversion) {
        resultAmountHasFocus ? setCurrentCurrency('') : setResultCurrency('');
      } else if (Number(currentCurrency) > 0 || Number(resultCurrency) > 0) {
        resultAmountHasFocus
          ? setCurrentCurrency(Number((resultCurrency / exchangeRate).toFixed(NUMERIC_SCALE)))
          : setResultCurrency(Number((currentCurrency * exchangeRate).toFixed(NUMERIC_SCALE)));
      } else {
        resultAmountHasFocus ? setCurrentCurrency('') : setResultCurrency('');
      }
    };

    calculateExchangeResult();
  }, [currentCurrencyType, resultCurrencyType, currentCurrency, exchangeRate, resultCurrency]);

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-slate-200 dark:bg-gray-700 dark:text-gray-200 pt-6 pb-8 px-8 rounded-xl border-solid border-4 border-slate-400"
    >
      <label htmlFor="amount" className="block text-md font-medium text-gray-700 dark:text-gray-200">
        Swap
      </label>
      <div className="relative mt-2">
        <CurrencyField name="amount" value={currentCurrency} handleChange={handleFieldsChange} />
        <CurrencySelect
          name="amount_type"
          currencies={tokens}
          currencyType={currentCurrencyType}
          handleChange={handleFieldsChange}
        />
      </div>
      <div className="relative text-center -mt-2 -mb-3 z-10">
        <FontAwesomeIcon
          icon={faArrowAltCircleDown}
          size="2x"
          className="shadow-xl bg-white text-violet-800 rounded-full p-0.5 dark:bg-gray-700 dark:text-indigo-500"
        />
      </div>
      <div className="relative">
        <CurrencyField
          name="result_amount"
          value={resultCurrency}
          handleChange={handleFieldsChange}
          onFocus={() => setResultAmountFieldFocus(true)}
          onBlur={() => setResultAmountFieldFocus(false)}
        />
        <CurrencySelect
          name="result_type"
          currencies={tokens}
          currencyType={resultCurrencyType}
          handleChange={handleFieldsChange}
        />
      </div>
      {!isErrorOnConversion && (
        <p className="mt-1 text-gray-700 text-right dark:text-gray-200">
          {`1 ${resultCurrencyType} = ${Number((1 / exchangeRate).toFixed(NUMERIC_SCALE))} ${currentCurrencyType}`}
        </p>
      )}
      {isErrorOnConversion && <p className="mt-2 leading-tight text-red-500">Direct conversion is not possible.</p>}
      {isBalanceError && (
        <p className="mt-2 leading-tight text-red-500">The balance is insufficient for the transaction.</p>
      )}
      {isEmptyInputError && (
        <p className="mt-2 leading-tight text-red-500">The field cannot be empty. Please enter a value.</p>
      )}
      <button
        type="submit"
        disabled={isSubmitDisabled()}
        className={`w-full py-2 px-4 mt-4 font-medium text-white rounded-md ${
          isSubmitDisabled() ? 'bg-slate-500' : 'bg-indigo-500 hover:bg-indigo-700'
        }`}
      >
        Perform Swap
      </button>
    </form>
  );
};

CurrencyForm.propTypes = {
  balance: PropTypes.array,
  tokens: PropTypes.array,
  pools: PropTypes.array,
};

export default CurrencyForm;
