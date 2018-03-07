import { flatten } from 'flat';

export default class API {
  constructor(apiURL) {
    this.apiURL = apiURL;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async setLanguageAt(env, lang, payload) {
    const body = JSON.stringify(payload);
    const response = await fetch(`${this.apiURL}/${env}/${lang}.json`, {
      method: 'PUT',
      body,
      headers: this.headers,
    });
    const json = await response.json();
    return json;
  }

  async deleteDef(path, env, lang) {
    const response = await fetch(
      `${this.apiURL}/${env}/${lang}/${path.replace(/\./g, '/')}.json`,
      {
        method: 'DELETE',
        headers: this.headers,
      },
    );
    const json = response.json();
    return json;
  }

  async updateLanguage(company, env, lang, def) {
    const url = `https://us-central1-grow-translate.cloudfunctions.net/sanitizeTranslation?company=${company}&env=${env}&lang=${lang}`;
    const body = JSON.stringify(def);
    const response = await fetch(url, {
      method: 'PATCH',
      body,
      headers: this.headers,
    });
    const json = await response.json();
    return json;
  }

  async fetchLanguages(env) {
    const url = `${this.apiURL}/${env}.json?shallow=true`;
    const response = await fetch(url);
    const json = await response.json();
    return Object.keys(json);
  }

  async fetchLanguage(url) {
    const response = await fetch(url);
    const json = await response.json();
    return flatten(json);
  }

  async fetchOrgLanguage(env, lang) {
    const url = `${this.apiURL}/${env}/${lang}.json`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  /**
   * update this so it uses firebase functions to create the lang in all 3 envs.
   * discuss with arjan & dennis on whether or not to do the former.
   * (i.e. language has to be pushed to other environments)
   * @param {*} env 
   * @param {*} countryId 
   * @param {*} payload 
   */
  async createLanguage(company, env, countryId) {
    const response = await fetch(
      `http://localhost:5000/grow-translate/us-central1/createLanguage?&company=${company}&env=${env}&lang=${countryId}`,
    );
    const json = await response.json();
    return json;
  }

  async authenticate(token) {}
}
