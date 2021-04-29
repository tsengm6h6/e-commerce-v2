<template>
  <section class="feature-section">
    <div class="descript">
      <h1>Dive in ocean | Dive in Life</h1>
      <p>
        Dive
        In由一群冒險愛好者組成，以海洋為主的戶外活動起家，為提供專業的知識及更多樣的課程，在東北角龍洞成立潛水中心，不僅提供專業潛水課程，更要帶各位夥伴一起上山下海，一起加入冒險的行列！
      </p>
    </div>
    <el-row class="feature-card">
      <el-col
        :xs="24"
        :sm="8"
        :md="8"
        :lg="8"
        class="card"
        v-for="(feature, index) in featureList"
        :key="index"
      >
        <img :src="feature.image" alt="" />
        <div class="info">
          {{ feature.info }}
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "FeatureSection",
  data() {
    return {
      featureList: [
        {
          image: "https://i.imgur.com/1ex8OSw.png",
          info:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatisullam ducimus ipsum ratione molestiae eos, reiciendis",
        },
        {
          image: "https://i.imgur.com/dTCWG3a.png",
          info:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatisullam ducimus ipsum ratione molestiae eos, reiciendis",
        },
        {
          image: "https://i.imgur.com/nlAq9In.png",
          info:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatisullam ducimus ipsum ratione molestiae eos, reiciendis",
        },
      ],
    };
  },
};
</script>

<style scoped>
.feature-section {
  padding: 30px;
}

.feature-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feature-section .descript {
  margin-bottom: 50px;
  text-align: center;
}

.feature-section .descript h1 {
  margin-bottom: 20px;
}

.feature-section .descript p {
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

.card img {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
}

.card .info {
  width: 80%;
  text-align: center;
}

/* sm */
@media only screen and (min-width: 768px) {
  .feature-section {
    padding: 80px;
  }

  .feature-section .descript {
    padding: 0 80px;
  }

  .card {
    margin-bottom: 0;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .feature-section {
    padding: 120px;
  }

  .feature-section .descript {
    padding: 0 150px;
  }
}
</style>