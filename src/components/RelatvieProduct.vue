<template>
  <section class="relative-product">
    <h3>相關商品</h3>
    <el-divider></el-divider>
    <el-row :gutter="20" class="relative-card">
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="12"
        :md="8"
        :lg="8"
        v-for="product in relativeList"
        :key="product.id"
        class="card"
      >
        <div class="img-wrapper">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img v-if="product.image" :src="product.image" class="image" />
            <el-image v-else>
              <img
                slot="error"
                class="image-slot"
                src="https://i.imgur.com/F5dYi4q.png"
              />
            </el-image>
          </router-link>
        </div>

        <div class="card-content">
          <h3 class="product-title">
            {{ product.title }}
          </h3>
          <p class="price-tag">NT$ {{ product.price }} {{ product.unit }}</p>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RelativeProduct",
  data() {
    return {
      category: "",
      currId: "",
      relativeList: [],
    };
  },
  watch: {
    currId: {
      handler(newId) {
        console.log("watch", this.category, newId);
        this.relativeList = this.productsList
          .filter(
            (item) => item.category === this.category && item.id !== newId
          )
          .slice(0, 3);
      },
    },
  },
  computed: {
    ...mapState(["productsList"]),
  },
};
</script>

<style scoped>
.relative-product {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.card .image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
}

.image-slot {
  width: 50%;
  object-position: center;
  position: relative;
  left: 28%;
  transform: scale(0.5);
}

.card-content {
  text-align: center;
  margin-top: 10px;
}

.card-content .product-title {
  margin-bottom: 10px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .card {
    margin-bottom: 0;
  }

  .card-content p {
    margin-bottom: 10px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
}
</style>