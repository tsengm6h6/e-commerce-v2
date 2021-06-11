<template>
  <section class="feature-section">
    <div class="descript">
      <h1>DIVE IN Life</h1>
      <p>
        DIVE IN
        由一群冒險愛好者組成，以海洋為主的戶外活動起家，為提供專業的知識及更多樣的活動，在東北角成立潛水中心，不僅提供專業潛水課程，更要帶各位夥伴一起上山下海，DIVE
        IN ocean DIVE IN life！
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
        <img :src="feature.image" alt="feature" />
        <h3 class="title">
          {{ feature.title }}
        </h3>
        <div class="info">
          {{ feature.info }}
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'FeatureSection',
  data () {
    return {
      featureList: [
        {
          image: require('@/assets/image/feature-icons/diverx1.svg'),
          title: '專業、安全為優先',
          info:
            '為 PADI 認證五星潛水中心，小班制的專業教學及活動安排，活動期間遵守教練指示，都能放膽玩、安心玩'
        },
        {
          image: require('@/assets/image/feature-icons/coralx1.svg'),
          title: '夥伴同行不孤單',
          info:
            '創造學員社群，只要參與過 DIVE IN 的課程都可以加入，不論是尋找潛伴或是揪團冒險，不怕沒有伴、只怕你不來'
        },
        {
          image: require('@/assets/image/feature-icons/boatx1.svg'),
          title: '精采生活零設限',
          info:
            '不定期推出國內外潛水旅遊或探險新企劃，哪裡好玩我們就去哪裡，拋開壓力與煩惱，玩樂生活自己創造'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.feature-section {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .descript {
    margin-bottom: 50px;
    text-align: center;
  }

  h1 {
    margin-bottom: 20px;
  }

  span {
    font-weight: 400;
    margin: 0 10px;
  }

  p {
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 30px;
  }
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  img {
    width: 120px;
    height: 120px;
  }

  h3 {
    margin: 25px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .info {
    width: 80%;
    text-align: center;
    letter-spacing: 1px;
    line-height: 30px;
  }
}

/* sm */
@media only screen and (min-width: 768px) {
  .feature-section {
    padding: 80px;
    .descript {
      padding: 0 80px;
    }
  }

  .feature-section
  .card {
    margin-bottom: 0;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .feature-section {
    padding: 120px;
    .descript {
      padding: 0 150px;
    }
  }
}
</style>
