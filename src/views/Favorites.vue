<template>
  <el-container direction="vertical">
    <div class="title">
      <h3>收藏清單</h3>
      <p>不要再猶豫，趕快手刀報名！</p>
    </div>
    <el-row :gutter="20">
      <ProductCard
        v-for="product in favoriteList"
        :key="product.id"
        :init-product="product"
        @toggle-favorite="toggleFavorite"
      />
    </el-row>
  </el-container>
</template>

<style scoped>
.el-container {
  padding: 30px;
}

.title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.title h3 {
  margin-bottom: 10px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .el-container {
    padding: 30px 80px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .el-container {
    padding: 30px 120px;
  }
}
</style>

<script>
import ProductCard from "../components/ProductCard";
import { mapGetters } from "vuex";

export default {
  name: "Favorites",
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters(["favoriteList"]),
  },
  methods: {
    toggleFavorite(productId) {
      // 提交mutation去改變商品狀態
      this.$store.commit("UpdateFavorite", productId);

      const favoriteIdList =
        JSON.parse(window.localStorage.getItem("favorite_products")) || [];

      const itemIndex = favoriteIdList.findIndex((Id) => Id === productId);
      itemIndex === -1
        ? favoriteIdList.push(productId)
        : favoriteIdList.splice(itemIndex, 1);

      localStorage.setItem("favorite_products", JSON.stringify(favoriteIdList));
    },
  },
};
</script>