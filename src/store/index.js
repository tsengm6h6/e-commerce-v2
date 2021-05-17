import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization.js'
import customerAPI from '../apis/customer.js'
import { Toast } from '../utils/helper.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    productsList: [],
    isLoading: false,
    cartInfo: {
      cartList: [],
      total: 0,
      final_total: 0
    },
    category: '全部'
  },
  getters: {
    favoriteList(state) {
      const favoriteList = state.productsList.filter(item => item.isFavorite)
      return favoriteList
    },
    filterProductsList(state) {
      const filterProductsList = state.category === '全部' ? state.productsList : state.productsList.filter(item => item.category === state.category)

      return filterProductsList
    },
    categoryList(state) {

      return state.productsList.reduce((prev, curr) => {
        if (!prev.includes(curr.category)) {
          prev.push(curr.category)
        }
        return prev
      }, ['全部'])
    }
  },
  mutations: {
    setLoginStatus(state, success) {
      state.isLogin = success
    },
    setProductsList(state, payload) {

      state.productsList = payload
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setCategory(state, category) {
      state.category = category
    },
    UpdateFavorite(state, productId) {

      return state.productsList.map((item) => {
        if (item.id === productId) {

          return {
            ...item,
            isFavorite: !item.isFavorite
          }
        } else return { ...item }
      })
    },
    setCartInfo(state, cartInfo) {
      state.cartInfo = { ...cartInfo }
    }
  },
  actions: {
    async fetchLoginStatus({ commit }) {
      try {
        const response = await authorizationAPI.checkLogin()
        commit('setLoginStatus', response.data.success)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法確認登入狀態，請重新登入'
        })
      }
    },
    async fetchProducts({ commit }) {
      try {
        commit('setLoading', true)
        const response = await customerAPI.getProducts();
        if (response.data.success !== true) {
          throw new Error()
        }

        // 先對產品清單的isFavorite進行處理，再篩選啟用的產品
        const favoriteIdList =
          JSON.parse(window.localStorage.getItem('favorite_products')) || []
        const productsList = response.data.products.map((item) => ({
          ...item,
          isFavorite: favoriteIdList.includes(item.id)
        })).filter(product => product.is_enabled === 1)
        commit('setProductsList', productsList)
        commit('setLoading', false)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得頁面，請稍後再試'
        })
        commit('setLoading', false)
      }
    },

    // 取得購物車清單、總計價錢
    async fetchCartProducts({ state, commit }) {
      try {
        commit('setLoading', true)
        const response = await customerAPI.getCart()
        if (response.data.success !== true) {
          throw new Error()
        }
        const { data } = response.data
        // 如果 API 購物車沒有東西
        if (!data.carts.length) {
          commit('setLoading', false)
          return
        }
        // 如果 API 中有購物清單，整理成需要的資料再更新
        const newCartList = data.carts.map(item => {
          const recordCartItem = state.cartInfo.cartList.find(record => record.product_id === item.product_id)
          return {
            ...recordCartItem,
            id: item.id,
            qty: item.qty,
            product_id: item.product_id,
            title: item.product.title,
            price: item.product.price,
            image: item.product.image,
            unit: item.product.unit,
            couponCode: item.coupon ? item.coupon.code : '',
            couponPercent: item.coupon ? item.coupon.percent : 100,
            isProcessing: false
          }
        })
        const cartInfo = {
          cartList: newCartList,
          total: data.total,
          final_total: data.final_total
        }
        commit('setCartInfo', cartInfo)
        commit('setLoading', false)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得購物車資料，請稍後再試'
        })
        commit('setLoading', false)
      }
    }
  }
})
