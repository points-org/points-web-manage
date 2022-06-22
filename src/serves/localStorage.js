function setLocalStorage(key, value) {
  if (!window.localStorage) {
    console.error('不支持LocalStorage!');
    return;
  }
  window.localStorage.setItem(key, value);
}

//获取
function getLocalStorage(key) {
  if (!window.localStorage) {
    console.error('不支持sessionStorage!');
    return;
  }
  return window.localStorage.getItem(key);
}

//移除
function removeLocalStorage(key) {
  if (!window.localStorage) {
    console.error('不支持sessionStorage!');
    return;
  }
  window.localStorage.removeItem(key);
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
}
