export default {
  methods: {
    addToCart(product, selectedNum, form) {
      const addData = {
        product_id: product.id,
        qty: selectedNum,
        title: product.title,
        price: product.price,
        image: product.image,
        unit: product.unit,
        date: form.date,
        time: form.time,
      };
      console.log(addData)
      this.$store.dispatch('addItemToRecordCart', addData)
    }
  }
}