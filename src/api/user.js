import {apiGet, apiPost, setToken} from '../utils/requests'

export const createUser = async (params) => {
  console.log("****** params: ", params)
  // TODO - add password hash
  let ret = apiPost('users', {username: params.username, password: params.password})
  return ret
}

export const checkUsername = async (params) => {
  let ret = await apiGet('users/checkUsername', params)
  let existed = ret.length > 0;
  return existed;
}

export const login = async (params) => {
  // TODO - add password hash
  let ret = await apiPost('login', params)
  if (ret.success) {
    setToken(ret.token)
    sessionStorage.setItem('token', ret.token)
  }
  return ret
}
