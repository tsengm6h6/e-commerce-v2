<template>
  <el-container>
    <el-row>
      <el-col :span="24" class="background"></el-col>
      <el-col :span="20" :offset="2">
        <div class="title">
          <h2>所有活動</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, at.
            Illo neque odit non modi unde sequi hic, quo deserunt?
          </p>
        </div>
      </el-col>
      <el-col :xs="6" :md="4" :offset="16">
        <el-select v-model="value" placeholder="Select">
          <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> -->
        </el-select>
      </el-col>
      <el-col :span="20" :offset="2">
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
      value: "",
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
.background {
  width: 100%;
  height: 60vh;
  background-image: url("https://storage.googleapis.com/vue-course-api.appspot.com/myvueable%2F1618471200335.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Lw%2B%2BBfb4VT0xs6qvBq04Nu62LttfkMhEu9%2FB1V0HjrB5ThhnSN4p36BzKJPpw05a3wWW4C7x%2FP%2BYxsO%2FDM8MNxN1gEu8EIxDHDo%2BBwzFyGlvpM%2FaCWpdsRtasTPNpdr6%2BfDg4e0tzzxBdd83QiTlbvmPahfMWZvR3gCCIUkPPN7vVxmjiomNUylh8dOyKaMj3YsAqnxo4OUD%2FG%2FYFn%2FAsYCoNMKSOyH6KdhtjNAyleSQmpxctzTkzexspkKm9y9Q8U3LzXdJ6Z7ylBY8D3Onu9BEK3YQNE2GsOmbJXZvN8qa7pJNFEt0%2BzSpq8lVi5qsNYFrnlRUPTiNm1g0MbiQ5Q%3D%3D");
  background-position: left top;
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  width: 100%;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>