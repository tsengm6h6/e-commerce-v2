<template>
  <section class="trip-section">
    <div class="descript">
      <h1>準備好了，我們一起去冒險</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        dolore, sit perspiciatis eum aliquid eligendi natus, eos incidunt,
        officiis laudantium ex! Voluptas explicabo dignissimos ab sit corrupti
        incidunt, aperiam aspernatur!
      </p>
    </div>
    <el-row :gutter="20" class="trip-card">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        :lg="6"
        v-for="product in tripList"
        :key="product.id"
        class="card"
      >
        <div class="img-wrapper">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img v-if="product.image" :src="product.image" class="image" />
            <img
              v-else
              src="https://i.imgur.com/0dqbpfY.png"
              class="empty-image"
            />
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
  name: "TripSection",
  computed: {
    ...mapState({
      tripList: (state) =>
        state.productsList
          .filter((item) => item.category === "潛水旅遊")
          .slice(0, 4), // 只取4個
    }),
  },
};
</script>

<style scoped>
.trip-section {
  padding: 30px;
  background-color: #242323;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.trip-section .descript {
  margin: 50px 0;
  text-align: center;
  color: #fcfcfc;
}

.trip-section .descript h1 {
  margin-bottom: 20px;
}

.trip-section .descript p {
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 26px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.card .image,
.card .empty-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
}

.card .empty-image {
  object-fit: contain;
  transform: scale(0.5);
}

.card-content {
  color: #fcfcfc;
  text-align: center;
  margin-top: 20px;
}

.card-content .product-title {
  margin-bottom: 10px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .trip-section {
    padding: 80px;
  }
  .trip-section .descript {
    padding: 0 80px;
  }

  .card {
    margin-bottom: 0;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .trip-section {
    padding: 120px;
  }

  .trip-section .descript {
    padding: 0 150px;
  }
}
</style>