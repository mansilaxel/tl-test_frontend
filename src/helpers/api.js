import axios from 'axios'

let baseUrl = 'http://localhost:8080/api/'

export function get (url) {
  return axios({
    method: 'GET',
    url: baseUrl + url
  })
}

export function post (url, payload) {
  return axios({
    method: 'POST',
    url: baseUrl + url,
    data: payload
  })
}

export function del (url) {
  return axios({
    method: 'DELETE',
    url: baseUrl + url
  })
}
