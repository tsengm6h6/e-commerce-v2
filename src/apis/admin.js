import { adminApi } from '../utils/helper'
const getCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

export default {
  getProducts(page) {
    return adminApi.get(`/admin/products?page=${page}`, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  // 刪除
  removeProduct(productId) {
    return adminApi.delete(`/admin/product/${productId}`, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  addProduct({ data }) {
    return adminApi.post('/admin/product', { data }, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  editProduct({ id, data }) {
    return adminApi.put(`/admin/product/${id}`, { data }, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  uploadFile(data) {
    return adminApi.post('/admin/upload', data, {
      headers: {
        Authorization: getCookie,
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getOrders(page) {
    return adminApi.get(`/admin/orders?page=${page}`, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  editOrder({ id, data }) {
    return adminApi.put(`/admin/order/${id}`, { data }, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  getCoupons(page) {
    return adminApi.get(`/admin/coupons?page=${page}`, {
      headers: {
        Authorization: getCookie,
      }
    })
  },
  addCoupon({ data }) {
    return adminApi.post('/admin/coupon', { data }, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  editCoupon({ id, data }) {
    return adminApi.put(`/admin/coupon/${id}`, { data }, {
      headers: {
        Authorization: getCookie
      }
    })
  },
  removeCoupon(couponId) {
    return adminApi.delete(`/admin/coupon/${couponId}`, {
      headers: {
        Authorization: getCookie
      }
    })
  },
}