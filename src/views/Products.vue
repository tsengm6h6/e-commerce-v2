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
          <el-breadcrumb-item>所有活動</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- < lg Selector -->
      <el-col
        :xs="{ span: 10, offset: 0 }"
        :sm="{ span: 8, offset: 0 }"
        :md="{ span: 6, offset: 0 }"
        class="hidden-lg-and-up"
      >
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <!-- > lg sideMenu -->
      <el-col :lg="3" class="hidden-md-and-down">
        <el-menu mode="vertical" default-active="1">
          <el-menu-item index="1">
            <span>所有活動</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>體驗系列</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>水肺潛水</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>自由潛水</span>
          </el-menu-item>
          <el-menu-item index="5">
            <span>潛水旅遊</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!-- Cards -->
      <el-col :md="24" :lg="20">
        <el-row :gutter="0">
          <ProductCard
            v-for="product in productsList"
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
import { mapState } from "vuex";

export default {
  name: "Products",
  components: {
    ProductCard,
  },
  data() {
    return {
      pagination: {},
      value: "all",
      options: [
        {
          index: 1,
          label: "所有活動",
          value: "all",
        },
        {
          index: 2,
          label: "體驗系列",
          value: "experience",
        },
        {
          index: 3,
          label: "水肺潛水",
          value: "scuba",
        },
        {
          index: 4,
          label: "自由潛水",
          value: "free",
        },
        {
          index: 5,
          label: "潛水旅遊",
          value: "trip",
        },
      ],
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

.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
  letter-spacing: 1px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: transparent;
}

.el-menu-item.is-active,
.el-menu-item:hover {
  font-weight: 600;
  color: #00c9c8;
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