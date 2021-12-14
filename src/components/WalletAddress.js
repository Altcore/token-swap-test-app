import React from 'react';
import PropTypes from 'prop-types';

const WalletAddress = ({ account }) => {
  return (
    <div className="truncate absolute top-3 right-20 left-3 sm:left-auto z-10 px-4 py-3 text-base leading-6 rounded-full bg-slate-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
      <b>Wallet address:</b> {account || 'loading...'}
    </div>
  );
};

WalletAddress.propTypes = {
  account: PropTypes.string,
};

export default WalletAddress;
