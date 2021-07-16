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

export const rules = {
  required: {
    required: true,
    message: '此欄位為必填',
    trigger: ['blur', 'change']
  },
  number: {
    type: 'number',
    message: '此欄位必須為數字',
    trigger: ['blur', 'change']
  },
  discountRange: {
    type: 'number',
    message: '折扣必須介於 0 ~ 100',
    min: 0,
    max: 100,
    trigger: ['blur', 'change']
  },
  priceRange: {
    type: 'number',
    message: '金額必須大於 0',
    min: 1,
    trigger: ['blur', 'change']
  },
  email: {
    type: 'email',
    message: 'Email 格式不正確',
    trigger: 'blur'
  },
  telPattern: {
    pattern: /\d{4}\d{3}\d{3}/,
    message: '格式不符，須為 10 碼數字且不含符號（eg. 0912345678）',
    trigger: 'blur'
  },
  telLength: {
    len: 10,
    message: '電話最多為10碼',
    trigger: 'blur'
  }
}
