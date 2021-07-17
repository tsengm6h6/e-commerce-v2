<template>
  <div class="container">
    <section class="background">
      <div class="display-wrapper">
        <div class="display">
          <span class="top">跨出冒險的第一步</span>
          <span class="bottom">Let's Dive In !</span>
        </div>
        <div class="button">
          <router-link to="#" v-scroll-to="'#feature'"
            ><el-button class="left" type="danger" plain @click="sendGTMHandler('learn-more')"
              >了解更多</el-button
            ></router-link
          >
          <router-link to="#" v-scroll-to="'#course'">
            <el-button class="right" type="danger" @click="sendGTMHandler('enroll-now')">立即報名</el-button>
          </router-link>
        </div>
      </div>
    </section>
    <FeatureSection id="feature" />
    <TripSection />
    <CourseSection id="course" />
    <GallerySection />
  </div>
</template>

<script>
import FeatureSection from '../components/landingPage/FeatureSection.vue'
import TripSection from '../components/landingPage/TripSection.vue'
import CourseSection from '../components/landingPage/CourseSection.vue'
import GallerySection from '../components/landingPage/GallerySection.vue'

export default {
  name: 'LandingPage',
  components: {
    FeatureSection,
    TripSection,
    CourseSection,
    GallerySection
  },
  methods: {
    sendGTMHandler (btn) {
      this.$gtm.trackEvent({
        event: 'click-event',
        category: '點擊事件', // 類別 字元(必填)
        action: 'click', // 動作 字元(必填)
        label: `${btn} button clicked`, // 標籤 字元(選填)
        value: null // 標籤 數字(選填)
      })
    }
  },
  metaInfo () {
    return {
      meta: [
        { property: 'og:title', content: 'DIVE IN 戶外冒險團隊 | PADI水肺潛水 | AIDA 自由潛水 | 台灣潛水旅遊' },
        { property: 'og:url', content: 'https://tsengm6h6.github.io/e-commerce-v2' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://imgur.com/fWhPYSU' }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  overflow: hidden;
}

.background {
  width: 100%;
  height: 60vh;
  position: relative;
  background-image:url('~@/assets/image/bg-img.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 60%;
  animation: opacity 1.5s ease;
}

.display-wrapper {
  position: absolute;
  top: 41%;
  left: 6%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.display {
  font-size: 30px;
  font-weight: 600;
  color: #fcfcfc;
  text-transform: uppercase;
  margin-bottom: 10px;

  span {
    display: block;

    &.top {
      animation: displayTop 0.8s ease-out 1s both;
    }

    &.bottom {
      animation: displayBottom 1s cubic-bezier(0.21, 0.16, 0.59, 1.69) 1s both;
    }
  }
}

.el-button {
  padding: 10px 20px;
  margin: 0 10px 10px 0;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;

  &.left {
    animation: opacity 0.5s ease-in-out 2s both, showUp 0.5s ease-in-out 2s both;
  }

  &.right {
    animation: opacity 0.5s ease-in-out 2.1s both,
    showUp 0.5s ease-in-out 2.1s both;
  }
}

/* 大螢幕 */
@media only screen and (min-width: 768px) {
  .background {
    height: calc(100vh - 60px);
    background-position: 0% 25%;
  }

  .display-wrapper {
    top: 30%;
    left: 15%;
  }

  .display {
    font-size: 56px;
  }

  .el-button {
    padding: 12px 40px;
    font-size: 20px;
  }
}

@keyframes displayTop {
  from {
    transform: translateX(-150%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes displayBottom {
  from {
    transform: translateX(300%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes opacity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes showUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
</style>
