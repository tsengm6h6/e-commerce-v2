import { customerApi } from '../utils/helper'

export default {
  getProducts() {
    return customerApi.get('/products')
  },
  getProduct({ id }) {
    return customerApi.get(`/product/${id}`)
  },
  postToCart({ data }) {
    return customerApi.post('/cart', { data })
  },
  getCart() {
    return customerApi.get('/cart')
  },
  removeCartItem(id) {
    return customerApi.delete(`/cart/${id}`)
  },
  // 套用優惠券
  postCoupon({ data }) {
    return customerApi.post('/coupon', { data })
  },
  // 建立訂單
  confirmOrder({ data, message }) {
    return customerApi.post('/order', { data, message })
  },
  // 取得訂單列表
  getOrders(page) {
    return customerApi.get(`orders?page=${page}`)
  },
  getOrder(orderId) {
    return customerApi.get(`/order/${orderId}`)
  },
  payOrder(orderId) {
    return customerApi.post(`/pay/${orderId}`)
  }
}