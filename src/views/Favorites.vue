<template>
  <el-container>
    <el-main>
      <h3>我的收藏清單</h3>
      <hr />
      <el-row :gutter="20">
        <ProductCard
          v-for="product in favoriteList"
          :key="product.id"
          :init-product="product"
          @toggle-favorite="toggleFavorite"
        />
      </el-row>
    </el-main>
  </el-container>
</template>

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