import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization'
import customerAPI from '../apis/customer'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helper';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    productsList: [], // 存放API拿到的產品資料
    isLoading: false,
    cartInfo: {
      cartList: [], // 拿到的購物車資料
      total: 0,
      final_total: 0
    },
    category: '全部',
    currCoupon: {}
  },
  getters: {
    favoriteList(state) {
      console.log('products', state.productsList)
      const favoriteList = state.productsList.filter(item => item.isFavorite)
      // 當productList裡的isFavorite改變時，同步更新收藏清單（有用到才會console.log）
      console.log('favorite list', favoriteList)
      return favoriteList
    },
    filterProductsList(state) {
      const filterProductsList = state.category === '全部' ? state.productsList : state.productsList.filter(item => item.category === state.category)
      console.log('filter list', filterProductsList)
      return filterProductsList
    },
    categoryList(state) {
      console.log('cate change')
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
      console.log('mutations setProductList', payload)
      state.productsList = payload
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setCategory(state, category) {
      state.category = category
    },
    UpdateFavorite(state, productId) {
      console.log('update favorite')
      return state.productsList.map((item) => {
        if (item.id === productId) {
          console.log('update item isFavorite', item.isFavorite)
          return {
            ...item,
            isFavorite: !item.isFavorite
          }
        } else return { ...item }
      })
    },
    // set購物車資料
    setCartInfo(state, cartInfo) {
      console.log('setCartInfo', cartInfo)
      state.cartInfo = { ...cartInfo }
    },
    setCurrCoupon(state, coupon) {
      console.log('setCurrCoupon', coupon.title)
      state.currCoupon = { ...coupon }
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

        // 先對產品清單的isFavorite進行處理，再篩選啟用的產品
        const favoriteIdList =
          JSON.parse(window.localStorage.getItem('favorite_products')) || []
        const productsList = response.data.products.map((item) => ({
          ...item,
          isFavorite: favoriteIdList.includes(item.id) // 如果包含在收藏清單中則為true
        })).filter(product => product.is_enabled === 1)

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
    async fetchCartProducts({ state, commit }) {
      try {
        commit('setLoading', true)
        const response = await customerAPI.getCart()
        console.log('fetchCartProducts')
        console.log(response.data)
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
          console.log('newCartList', item)
          // 找到原有紀錄中的product
          const recordCartItem = state.cartInfo.cartList.find(record => record.product_id === item.product_id)
          return {
            ...recordCartItem,
            id: item.id, // 操作刪除API使用該筆商品資訊id
            qty: item.qty,
            product_id: item.product_id, // 商品本人的id
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
          cartList: newCartList, // 更新清單紀錄
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

    // 取得優惠券
    async fetchCouponsList({ commit }, page) {
      try {
        commit('setLoading', true)
        const response = await adminAPI.getCoupons(page);
        console.log('store', response);
        if (response.data.success !== true) {
          throw new Error()
        }
        const activeCoupon = response.data.coupons.filter(coupon => coupon.is_enabled === 1)[0] // 只取一個
        commit('setCurrCoupon', activeCoupon)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        return Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        })
      }
    },
  },
  modules: {
  }
})
