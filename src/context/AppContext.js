import React, { createContext, useState, useCallback } from 'react';
export const AppContext = createContext();
import PropTypes from 'prop-types';

const AppContextProvider = (props) => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [pools, setPools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    const getAccount = await fetch('/account.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const getBalance = await fetch('/balances.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const getTokens = await fetch('/tokens.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const getPools = await fetch('/pools.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return Promise.all([getAccount, getBalance, getTokens, getPools])
      .then(async ([account, balance, tokens, pools]) => {
        const accountJson = await account.json();
        const balanceJson = await balance.json();
        const tokensJson = await tokens.json();
        const poolsJson = await pools.json();

        return {
          account: accountJson.address,
          balance: balanceJson.balances,
          tokens: tokensJson.tokens,
          pools: poolsJson.pools,
        };
      })
      .then(function (jsonData) {
        setTimeout(() => {
          setAccount(jsonData.account);
          setBalance(jsonData.balance);
          setTokens(jsonData.tokens);
          setPools(jsonData.pools);
          setIsLoading(false);
        }, 1000); // emulate server response delay
      })
      .catch((error) => {
        console.log('Encountered an error with fetching and parsing data', error);
      });
  }, []);

  return (
    <AppContext.Provider value={{ account, balance, tokens, pools, isLoading, getData }}>
      {props.children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AppContextProvider;
