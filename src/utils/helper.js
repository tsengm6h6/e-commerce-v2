import axios from 'axios'
import Swal from 'sweetalert2'

const apiPath = 'myvueable'
const baseURL = `https://vue-course-api.hexschool.io/api/${apiPath}`

export const authorizationApi = axios.create({
  baseURL: 'https://vue-course-api.hexschool.io'
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