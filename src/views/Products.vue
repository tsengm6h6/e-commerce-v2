<template>
  <div>
    <div class="banner">
      <div class="banner-text">
        <h1 class="title">夏日限定</h1>
        <div class="text-wrapper">
          <h1>官網報名全活動</h1>
          <h1>享8折優惠</h1>
        </div>
        <el-button type="danger" @click="doCopy">點我領取優惠</el-button>
      </div>
    </div>
    <el-container direction="vertical" class="products-section">
      <el-row align="bottom" class="bread-crumb-and-select">
        <!-- BreadCrumb -->
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 12, offset: 0 }"
          :md="{ span: 12, offset: 0 }"
          :lg="{ span: 24, offset: 3 }"
        >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <a href="/">首頁</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>所有活動</el-breadcrumb-item>
            <el-breadcrumb-item>{{ category }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <!-- < lg Selector -->
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 8, offset: 4 }"
          :md="{ span: 7, offset: 5 }"
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
        <el-col :md="24" :lg="21">
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
  </div>
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
    ...mapState(["productsList", "isLoading", "category", "currCoupon"]),
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
    async doCopy() {
      try {
        await this.$copyText(this.currCoupon.code);
        this.$message.success("成功複製優惠碼！");
      } catch (err) {
        this.$message.danger("無法複製優惠碼，請稍後再試");
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.products-section {
  padding: 30px;
}

.banner {
  width: 100%;
  height: 60vh;
  position: relative;
  background-image: url("https://i.imgur.com/6jfOJYX.png");
  background-size: cover;
  background-position: 12%;
}

.banner-text {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: white;
  position: absolute;
  top: 10px;
  left: 23%;
}

h1 {
  letter-spacing: 1px;
}

.el-button {
  padding: 12px 20px;
  letter-spacing: 1px;
  font-weight: 600;
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
}

.bread-crumb-and-select {
  margin: 0 0 20px;
}

.el-breadcrumb {
  line-height: 40px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .banner-text {
    align-items: flex-start;
  }

  .text-wrapper {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .products-section {
    padding: 30px 80px 60px;
  }

  /* .coral-bg {
    width: 100%;
    right: -3%;
  } */

  .bread-crumb-and-select {
    margin: 30px 10px 20px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .banner-text {
    top: 0px;
  }

  .products-section {
    padding: 30px 120px 60px;
  }

  .bread-crumb-and-select {
    margin: 30px 20px 20px;
  }
}
</style>