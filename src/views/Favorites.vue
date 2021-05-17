<template>
  <el-container direction="vertical">
    <div class="title">
      <h3>收藏清單</h3>
      <p v-if="favoriteList.length">不要再猶豫，趕快手刀報名！</p>
    </div>
    <Breadcrumb class="breadcrumb" />
    <el-row :gutter="20">
      <div class="wrapper" v-if="!favoriteList.length">
        <Octopus />
        <p>目前沒有收藏唷</p>
      </div>
      <ProductCard
        v-for="product in favoriteList"
        :key="product.id"
        :init-product="product"
        @toggle-favorite="toggleFavorite"
      />
    </el-row>
  </el-container>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import Octopus from "../components/animation/Octopus.vue";
import { mapGetters } from "vuex";
import Breadcrumb from "../components/Breadcrumb.vue";

export default {
  name: "Favorites",
  components: {
    ProductCard,
    Octopus,
    Breadcrumb,
  },
  metaInfo: {
    title: "收藏清單",
  },
  computed: {
    ...mapGetters(["favoriteList"]),
  },
  methods: {
    toggleFavorite(productId) {
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

<style scoped>
.el-container {
  padding: 30px;
}

.breadcrumb {
  margin-left: 15px;
  margin-bottom: 20px;
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

.wrapper {
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0)
  );
}

p {
  /* margin-top: 20px; */
  font-weight: 500;
  letter-spacing: 2px;
  color: #44607a;
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
