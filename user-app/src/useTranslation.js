// src/useTranslation.js
import en from './locales/en';
import fa from './locales/fa';
import { useLanguage } from './LanguageContext';

const translations = {
  en,
  fa,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    return translations[language][key] || key;
  };

  return { t };
};
