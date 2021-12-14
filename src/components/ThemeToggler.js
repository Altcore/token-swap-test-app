import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeToggler = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button onClick={switchTheme} className="absolute top-3 right-3 z-10">
      <span className="fa-layers w-12 h-12" title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}>
        {theme === 'light' ? (
          <>
            <FontAwesomeIcon icon={faCircle} size="3x" className="text-slate-300" />
            <FontAwesomeIcon
              icon={faSun}
              size="3x"
              transform="shrink-6"
              className="text-yellow-600 hover:text-yellow-800 hover:animate-spin"
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faCircle} size="3x" className="text-gray-700" />
            <FontAwesomeIcon
              icon={faMoon}
              size="3x"
              transform="shrink-6"
              className="text-indigo-400 hover:text-indigo-200 hover:animate-pulse"
            />
          </>
        )}
      </span>
    </button>
  );
};

export default ThemeToggler;
