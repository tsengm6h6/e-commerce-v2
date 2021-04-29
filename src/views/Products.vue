<template>
  <el-container direction="vertical" class="products-section">
    <el-row>
      <el-col :span="24">
        <div class="title">
          <h1>東北角人氣冒險團隊</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, at.
            Illo neque odit non modi unde sequi hic, quo deserunt?
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      class="bread-crumb-and-select"
    >
      <!-- BreadCrumb -->
      <el-col
        :xs="{ span: 10, offset: 0 }"
        :sm="{ span: 6, offset: 0 }"
        :md="{ span: 12, offset: 0 }"
        :lg="{ span: 24, offset: 3 }"
      >
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/products' }"
            >所有活動</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ category }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- < lg Selector -->
      <el-col
        :xs="{ span: 10, offset: 0 }"
        :sm="{ span: 8, offset: 0 }"
        :md="{ span: 6, offset: 0 }"
        class="hidden-lg-and-up"
      >
        <el-select v-model="category">
          <el-option
            v-for="item in categoryList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <!-- > lg sideMenu -->
      <el-col :lg="3" class="hidden-md-and-down">
        <AsideMenu />
      </el-col>

      <!-- Cards -->
      <el-col :md="24" :lg="20">
        <el-row :gutter="0">
          <ProductCard
            v-for="product in filterProductsList"
            :key="product.id"
            :init-product="product"
            @toggle-favorite="toggleFavorite"
          />
        </el-row>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import ProductCard from "../components/ProductCard";
import AsideMenu from "../components/AsideMenu";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Products",
  components: {
    ProductCard,
    AsideMenu,
  },
  data() {
    return {
      pagination: {},
    };
  },
  computed: {
    ...mapState(["productsList", "isLoading", "category"]),
    ...mapGetters(["filterProductsList", "categoryList"]),
    category: {
      get() {
        return this.$store.state.category;
      },
      set(value) {
        console.log("set new Cat", value);
        this.$store.commit("setCategory", value);
      },
    },
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
.products-section {
  padding: 30px;
}

.title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title h1 {
  margin-bottom: 23px;
  letter-spacing: 1px;
}

.bread-crumb-and-select {
  margin: 120px 0 35px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .products-section {
    padding: 80px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .products-section {
    padding: 120px;
  }
}
</style>