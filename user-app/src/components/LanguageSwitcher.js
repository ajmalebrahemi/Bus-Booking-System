// src/components/LanguageSwitcher.js
import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageSwitcher = () => {
  const { changeLanguage } = useLanguage();

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fa')}>فارسی</button>
    </div>
  );
};

export default LanguageSwitcher;
