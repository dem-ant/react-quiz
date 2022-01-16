import axios from 'axios'
import { AUTH_SUCCESS, AUTO_LOGOUT } from './actionTypes'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdtVxuMF0J8cLRPnzrQCepgZ39Stdpn-8'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdtVxuMF0J8cLRPnzrQCepgZ39Stdpn-8'
    }

    const response = await axios.post(url, authData)
    
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

    localStorage.setItem('token', response.data.idToken)
    localStorage.setItem('userId', response.data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(response.data.idToken))
    dispatch(autoLogout(response.data.expiresIn))
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
  return {
    type: AUTO_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if(!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}