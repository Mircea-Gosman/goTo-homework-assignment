import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="App font-Inter">
      bruh
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='font-Inter'>
          {t('signIn.title')}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
