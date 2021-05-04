// cartInfo :{
//   cartList:[],
//   total: 0,
// }

export default {
  methods: {
    getLocalStorage() {
      return JSON.parse(window.localStorage.getItem('cart')) || {}
    },
    setLocalStorage(cartInfo) {
      return window.localStorage.setItem('cart', JSON.stringify(cartInfo))
    },
    fetchLocalCart() {
      const { cartList = [], total } = this.getLocalStorage()
      const CartInfo = {
        cartList,
        total
      }
      this.$store.commit('setCartInfo', CartInfo)
      console.log('fetchLocalCart')
    },
    updateLocalCartStatus(key, value) {
      const cartInfo = this.getLocalStorage()
      cartInfo[key] = value
      console.log('updateCart', cartInfo)
      this.setLocalStorage(cartInfo)
    },
    // **** 新增購物車內容 ***** //
    addToCart(product, selectedNum, form) {
      const addData = {
        product_id: product.id,
        qty: selectedNum,
        title: product.title,
        price: product.price,
        image: product.image,
        unit: product.unit,
        date: form.date,
        time: form.time
      }
      // 取出localStorage裡的購物車資料
      const { cartList = [] } = this.getLocalStorage()
      // 如果購物紀錄沒有商品，直接新增並返回
      if (!cartList.length) {
        this.pushProductToCart(cartList, addData)
        const newTotal = this.updateCartTotal(cartList)
        // commit 一份給 store儲存
        const newCartInfo = {
          cartList,
          total: newTotal
        }
        this.$store.commit('setCartInfo', newCartInfo)
        // 更新一份放回 LocalStorage
        this.setLocalStorage(newCartInfo)
        this.$message.success('商品已加入購物車')
        return
      }
      // 如果記錄中有商品，則尋找是否有相同商品
      const recordCartItem = cartList.find(record => record.product_id === addData.product_id && record.date === addData.date && record.time === addData.time)
      // 沒有相同商品 pushProductToCart
      if (!recordCartItem) {
        this.pushProductToCart(cartList, addData)
      } else {
        // 已有此商品 incrementItemQty
        this.incrementItemQty(cartList, addData)
      }
      // updateCartTotal
      const newTotal = this.updateCartTotal(cartList)
      // commit 一份給 store儲存
      const newCartInfo = {
        cartList,
        total: newTotal
      }
      this.$store.commit('setCartInfo', newCartInfo)
      // 更新一份放回 LocalStorage
      this.setLocalStorage(newCartInfo)
      this.$message.success('商品已加入購物車')
    },
    pushProductToCart(cartList, addData) {
      return cartList.push(addData)
    },
    incrementItemQty(cartList, addData) {
      const target = cartList.find(item => item.product_id === addData.product_id)
      target.qty += addData.qty
      return cartList
    },
    updateCartTotal(cartList) {
      const newTotal = cartList.reduce((prev, curr) => {
        return prev + curr.price * curr.qty
      }, 0)
      return newTotal
    },

    // **** 更新購物車明細 **** //
    updateCartRecord({ cartItem, action }) {
      let { cartList = [] } = this.getLocalStorage()
      console.log(cartItem, action)
      if (action === 'REDUCE') {
        console.log('REDUCE')
        this.handleReduceQty(cartList, cartItem)
      } else if (action === 'INCREASE') {
        console.log('INCREASE')
        this.handleIncreaseQty(cartList, cartItem)
      } else {
        console.log('REMOVE')
        cartList = this.handleRemove(cartList, cartItem)
      }
      const updateTotal = this.updateCartTotal(cartList)
      const updateCartInfo = {
        cartList,
        total: updateTotal
      }
      this.$store.commit('setCartInfo', updateCartInfo)
      this.setLocalStorage(updateCartInfo)
    },
    handleReduceQty(cartList, cartItem) {
      const product = cartList.find(item => item.product_id === cartItem.product_id)
      if (product.qty === 1) return
      return product.qty--
    },
    handleIncreaseQty(cartList, cartItem) {
      const product = cartList.find(item => item.product_id === cartItem.product_id)
      if (product.qty === 10) return this.$message.warning('10 人以上報名，請聯繫專人客服')
      return product.qty++
    },
    handleRemove(cartList, cartItem) {
      return cartList.filter(item => item.product_id !== cartItem.product_id)
    }
  }
}
