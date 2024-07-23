var _ = require('lodash/core');

export function useSessionStorage() {

  function hasSessionValue(key) {
    let value = sessionStorage.getItem(key);
    return !_.isUndefined(value) && !_.isEmpty(value)
  }

  function getSessionValue(key) {

    if (!hasSessionValue(key)) {
      return null;
    }

    let value = sessionStorage.getItem(key);
    try {
      JSON.parse(value);
    } catch (e) {
      return value;
    }
    return JSON.parse(value)

  }

  function setSessionObject(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  function setSessionString(key, value) {
    sessionStorage.setItem(key, value);
  }

  function removeSessionValue(key, value) {
    sessionStorage.removeItem(key, value);
  }

  return { hasSessionValue, setSessionObject, getSessionValue,setSessionString,removeSessionValue };
}


export function useLocalStorage() {

  function hasLocalValue(key) {
    return !_.isEmpty(localStorage.getItem(key))
  }

  function getLocalValue(key) {
    localStorage.getItem(key);
  }

  function setLocalValue(key, value) {
    localStorage.setItem(key, value);
  }

  return { hasLocalValue, getLocalValue, setLocalValue };
}