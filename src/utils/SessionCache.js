export function getIndexCache () {
  return window.sessionStorage.getItem('indexCache')
}

export function setIndexCache (cache) {
  window.sessionStorage.setItem('indexCache', cache)
}
