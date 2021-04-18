import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization'
import customerAPI from '../apis/customer'
import { Toast } from '../utils/helper';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    productsList: [], // 存放API拿到的產品資料
    isLoading: false,
    cartInfo: {
      cartList: [], // API拿到的購物車資料
      total: 0,
      final_total: 0
    }
  },
  getters: {
    favoriteList(state) {
      // 當productList裡的isFavorite改變時，同步更新收藏清單（有用到才會console.log）
      return state.productsList.filter(item => item.isFavorite)
    }
  },
  mutations: {
    setLoginStatus(state, success) {
      state.isLogin = success
    },
    setProductsList(state, payload) {
      console.log('mutations setProductList')
      state.productsList = payload
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    UpdateFavorite(state, productId) {
      state.productsList = state.productsList.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            isFavorite: !item.isFavorite
          }
        } else return { ...item }
      })
    },
    // set購物車資料
    setCartInfo(state, cartInfo) {
      console.log('serCartInfo')
      state.cartInfo = { ...cartInfo }
    }
  },
  actions: {
    // 切換頁面時確認登入狀態
    async fetchLoginStatus({ commit }) {
      try {
        const response = await authorizationAPI.checkLogin()
        commit('setLoginStatus', response.data.success)
      } catch (error) {
        console.log(error)
      }
    },

    // 取得所有產品
    async fetchProducts({ commit }) {
      try {
        commit('setLoading', true)
        const response = await customerAPI.getProducts();
        if (response.data.success !== true) {
          throw new Error()
        }
        console.log('fetch Products')

        // 先對產品清單的isFavorite進行處理
        const favoriteIdList =
          JSON.parse(window.localStorage.getItem('favorite_products')) || []
        const productsList = response.data.products.map((item) => ({
          ...item,
          isFavorite: favoriteIdList.includes(item.id) // 如果包含在收藏清單中則為true
        }))

        // 提交給 mutation 去改變state
        commit('setProductsList', productsList)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得頁面，請稍後再試'
        })
        commit('setLoading', false)
      }
    },

    // 取得購物車清單、總計價錢
    async fetchCartProducts({ commit }) {
      try {
        commit('setLoading', true)
        const response = await customerAPI.getCart()
        console.log('fetchCartProducts')
        console.log(response.data)
        if (response.data.success !== true) {
          throw new Error()
        }
        const { data } = response.data
        const cartList = data.carts.map((item) => ({
          ...item,
          isProcessing: false
        }))
        const cartInfo = {
          cartList,
          total: data.total,
          final_total: data.final_total
        }
        commit('setCartInfo', cartInfo)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得購物車資料，請稍後再試'
        })
        commit('setLoading', false)
      }
    },

    // 刪除購物車商品
    async removeCartItem(context, itemId) {
      try {
        // 更改狀態
        context.commit('setLoading', true)
        // 向 API 移除商品
        const response = await customerAPI.removeCartItem(itemId)
        if (response.data.success !== true) {
          throw new Error()
        }
        // 向 API 取得購物車清單及 *** 更新金額 ***
        context.dispatch('fetchCartProducts')
        // 狀態交給fetchCartProducts更新
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法移除購物車商品，請稍後再試'
        })
        context.commit('setLoading', false)
      }
    },

    // 新增購物車清單
    async addProductToCart(context, { addData }) {
      try {
        context.commit('setLoading', true)
        const response = await customerAPI.postToCart({ data: addData })
        if (response.data.success !== true || !response.data.data.id) {
          throw new Error(response.data.message);
        }
        Toast.fire({
          icon: 'success',
          title: '商品已加入購物車',
        });
        // 重新取得購物車資料，Loading狀態由fetchCartProducts更新
        context.dispatch('fetchCartProducts')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法加入購物車，請稍後再試'
        });
        context.commit('setLoading', false)
      }
    },
  },
  modules: {
  }
})
