export default {
  methods: {
    getLocalStorage () {
      return JSON.parse(window.localStorage.getItem('cart')) || {}
    },
    setLocalStorage (cartInfo) {
      return window.localStorage.setItem('cart', JSON.stringify(cartInfo))
    },
    fetchLocalCart () {
      const { cartList = [], total, final_total: finalTotal } = this.getLocalStorage()
      const CartInfo = {
        cartList,
        total,
        final_total: finalTotal
      }
      this.$store.commit('setCartInfo', CartInfo)
    },
    // **** 更新購物狀態 **** //
    updateLocalCartStatus (key, value) {
      const cartInfo = this.getLocalStorage()
      cartInfo[key] = value

      this.setLocalStorage(cartInfo)
    },
    // **** 檢查購物狀態 **** //
    checkStatus () {
      const { isPost = null } = this.getLocalStorage()
      if (isPost) {
        this.$message.error('上次購物未完成，無法更新購物車，請先完成訂單')
        return false
      }
      return true
    },
    // **** 共用方法 **** //
    sameItemInCart (item) {
      return function (record) {
        return record.product_id === item.product_id && record.date === item.date && record.time === item.time
      }
    },
    saveCartInfo (cartList) {
      const newCartInfo = {
        cartList,
        total: this.updateCartTotal(cartList),
        final_total: this.updateCartTotal(cartList)
      }
      // store 及 LocalStorage 各存一份
      this.$store.commit('setCartInfo', newCartInfo)
      this.setLocalStorage(newCartInfo)
    },
    updateCartTotal (cartList) {
      return cartList.reduce((prev, curr) => {
        return prev + curr.price * curr.qty
      }, 0)
    },
    // **** 新增購物車內容 ***** //
    addToCart (product, form) {
      if (!this.checkStatus()) return
      const addData = {
        product_id: product.id,
        qty: form.selectedNum,
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
        return
      }
      // 如果記錄中有商品，則尋找是否有相同商品
      const recordCartItem = cartList.find(this.sameItemInCart(addData))

      if (!recordCartItem) {
        this.pushProductToCart(cartList, addData)
      } else {
        this.incrementItemQty(cartList, addData, recordCartItem)
      }
    },
    pushProductToCart (cartList, addData) {
      cartList.push(addData)
      this.saveCartInfo(cartList)
      this.$message.success('商品已加入購物車')
    },
    incrementItemQty (cartList, addData, recordCartItem) {
      if (recordCartItem.qty + addData.qty > 10) {
        this.$message.warning('10 人以上報名，請聯繫專人客服')
        return
      }
      recordCartItem.qty += addData.qty
      this.saveCartInfo(cartList)
      this.$message.success('商品已加入購物車')
    },
    // **** 更新購物車明細 **** //
    updateCartRecord ({ cartItem, action }) {
      if (!this.checkStatus()) return

      let { cartList = [] } = this.getLocalStorage()
      const sameItem = cartList.find(this.sameItemInCart(cartItem))

      if (action === 'REDUCE') {
        this.handleReduceQty(sameItem)
      } else if (action === 'INCREASE') {
        this.handleIncreaseQty(sameItem)
      } else {
        cartList = this.handleRemove(cartList, sameItem)
      }
      this.saveCartInfo(cartList)
    },
    handleReduceQty (sameItem) {
      if (sameItem.qty === 1) return
      return sameItem.qty--
    },
    handleIncreaseQty (sameItem) {
      if (sameItem.qty >= 10) return this.$message.warning('10 人以上報名，請聯繫專人客服')
      return sameItem.qty++
    },
    handleRemove (cartList, sameItem) {
      return cartList.filter(item => item !== sameItem)
    }
  }
}
