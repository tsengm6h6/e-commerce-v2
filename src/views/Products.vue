<template>
  <el-container>
    <!-- aside -->
    <el-aside width="150px">Aside</el-aside>

    <!-- main -->
    <el-main>
      <el-row :gutter="20">
        <ProductCard
          v-for="product in productsList"
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
import { mapState } from "vuex";

export default {
  name: "Products",
  components: {
    ProductCard,
  },
  data() {
    return {
      pagination: {},
    };
  },
  computed: {
    ...mapState(["productsList", "isLoading"]),
  },
  methods: {
    toggleFavorite(productId) {
      // 提交mutation去改變商品狀態
      this.$store.commit("UpdateFavorite", productId);
      console.log("emit toggle");
      // 更新localStorage的資料
      const favoriteIdList =
        JSON.parse(window.localStorage.getItem("favorite_products")) || [];

      const itemIndex = favoriteIdList.findIndex((Id) => Id === productId);
      // 如果沒有item，就新增;有就移除
      itemIndex === -1
        ? favoriteIdList.push(productId)
        : favoriteIdList.splice(itemIndex, 1);

      localStorage.setItem("favorite_products", JSON.stringify(favoriteIdList));
    },
  },
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>