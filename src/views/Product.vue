<template>
  <div>單一商品頁</div>
</template>

<script>
import customerAPI from "../apis/customer";
import { Toast } from "../utils/helper";

export default {
  name: "product",
  components: {},
  data() {
    return {
      product: {
        category: "",
        content: "",
        description: "",
        id: "",
        image: "",
        is_enabled: 0,
        num: 1,
        origin_price: null,
        price: null,
        title: "",
        unit: "",
      },
      selectedNum: 1,
      isAdding: false,
      isLoading: false,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchProduct(id);
  },
  methods: {
    async fetchProduct(id) {
      try {
        this.isLoading = true;
        const response = await customerAPI.getProduct({ id });
        if (response.data.success !== true) {
          throw new Error();
        }
        this.product = {
          ...this.product,
          ...response.data.product,
        };
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得頁面，請稍後再試",
        });
        this.isLoading = false;
      }
    },
    async addToCart() {
      this.isAdding = true;
      const addData = {
        product_id: this.product.id,
        qty: this.selectedNum,
      };
      await this.$store.dispatch("addProductToCart", { addData });
      this.isAdding = false;
    },
  },
};
</script>