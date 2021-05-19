<template>
  <section class="trip-section">
    <div class="descript">
      <h1>潛旅，旅行到繽紛的海底</h1>
      <p>
        每年不定期釋出的潛旅行程，是 DIVE IN
        最搶手的活動，由專業教練群配合當地導潛，帶領學員一起在國內外各潛點進行水下導覽。參與潛旅必須取得水肺初階潛水員證照（OW），世界很大、海底遼闊，只要你準備好了，隨時可以跟著我們出發！
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
import { mapState } from 'vuex'

export default {
  name: 'TripSection',
  computed: {
    ...mapState({
      tripList: (state) =>
        state.productsList
          .filter((item) => item.category === '潛水旅遊')
          .slice(0, 4)
    })
  }
}
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
  letter-spacing: 1px;
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
  letter-spacing: 1px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .trip-section {
    padding: 80px;
  }
  .trip-section .descript {
    margin: 0 0 50px;
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
