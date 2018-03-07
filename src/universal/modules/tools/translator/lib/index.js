import LanguageDefinitions from './language-defs';
import FirebaseAPI from './http/firebase';

export const formatLanguageDefinitions = keys =>
  keys.map(lang => ({
    display: LanguageDefinitions[lang] || `ERROR: ${lang}`,
    value: lang,
  }));

export const filterLanguageDefinitions = langKeys =>
  Object.keys(LanguageDefinitions).filter(key => langKeys.indexOf(key) === -1);

export { LanguageDefinitions, FirebaseAPI };
