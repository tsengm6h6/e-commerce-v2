import axios from 'axios'
import Swal from 'sweetalert2'

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

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})