import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 20000,
});

export const setToken = (token) => {
  instance.defaults.headers.common['token'] = token;
}

export const apiGet = async (url, params) => {
  let {data} = await instance.get(url, {params})
  return data
}

export const apiPost = async (url, params) => {
  let {data} = await instance.post(url, params)
  return data
}

export const apiPut = async (url, params) => {
  let {data} = await instance.put(url, params)
  return data
}

export const apiDelete = async (url, params) => {
  let {data} = await instance.delete(url, {params})
  return data
}
