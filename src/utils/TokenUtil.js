export function getUToken () {
  return window.sessionStorage.getItem('utoken')
}

export function saveUToken (utoken) {
  window.sessionStorage.setItem('utoken', utoken)
}

export function clearUToken () {
  window.sessionStorage.removeItem('utoken')
}
