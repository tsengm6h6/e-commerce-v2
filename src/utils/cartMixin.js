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

    },
    updateLocalCartStatus(key, value) {
      const cartInfo = this.getLocalStorage()
      cartInfo[key] = value

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

      const { cartList = [] } = this.getLocalStorage()
      if (!cartList.length) {
        this.pushProductToCart(cartList, addData)
        this.saveCartInfo(cartList)
        return
      }
      // 如果記錄中有商品，則尋找是否有相同商品
      const recordCartItem = cartList.find(record => record.product_id === addData.product_id && record.date === addData.date && record.time === addData.time)

      if (!recordCartItem) {
        this.pushProductToCart(cartList, addData)
      } else {
        this.incrementItemQty(cartList, addData)
      }
      this.saveCartInfo(cartList)
    },
    saveCartInfo(cartList) {
      const newTotal = this.updateCartTotal(cartList)
      const newCartInfo = {
        cartList,
        total: newTotal
      }
      // store 及 LocalStorage 各存一份
      this.$store.commit('setCartInfo', newCartInfo)
      this.setLocalStorage(newCartInfo)
      this.$message.success('商品已加入購物車')
      return
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
      if (action === 'REDUCE') {
        this.handleReduceQty(cartList, cartItem)
      } else if (action === 'INCREASE') {
        this.handleIncreaseQty(cartList, cartItem)
      } else {
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
