import React, { useContext, useEffect } from 'react';
import CurrencyForm from '../components/CurrencyForm';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import WalletAddress from '../components/WalletAddress';

const Homepage = () => {
  const { account, balance, tokens, pools, isLoading, getData } = useContext(AppContext);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="h-screen relative bg-gray-200 text-gray-700 dark:bg-gray-900">
      <WalletAddress account={account} />
      <div className="container mx-auto pt-40 px-3 sm:px-0">
        {isLoading && (
          <div className="w-full max-w-sm mx-auto bg-slate-200 dark:bg-gray-700 p-8 rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={faBitcoin} size="4x" spin className="text-gray-200" />
          </div>
        )}
        {!isLoading && <CurrencyForm balance={balance} tokens={tokens} pools={pools} />}
      </div>
    </div>
  );
};

export default Homepage;
