import { customerApi } from '../utils/helper'

export default {
  getProducts() {
    return customerApi.get('/products/all')
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
  postCoupon({ data }) {
    return customerApi.post('/coupon', { data })
  },
  confirmOrder({ data, message }) {
    return customerApi.post('/order', { data, message })
  },
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