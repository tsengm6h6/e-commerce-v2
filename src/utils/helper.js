import axios from 'axios'

const baseURL = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}`

export const authorizationApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

export const customerApi = axios.create({
  baseURL
})

export const adminApi = axios.create({
  baseURL
})
