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
            ><el-button class="left" type="danger" plain
              >了解更多</el-button
            ></router-link
          >
          <router-link to="#" v-scroll-to="'#course'">
            <el-button class="right" type="danger">立即報名</el-button>
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
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  overflow: hidden;
}

.background {
  width: 120%;
  height: 60vh;
  position: relative;
  background-image: url("https://i.imgur.com/zOPciZH.jpg");
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
}

.display span {
  display: block;
}

.display span.top {
  animation: displayTop 0.8s ease-out 1s both;
}

.display span.bottom {
  animation: displayBottom 1s cubic-bezier(0.21, 0.16, 0.59, 1.69) 1s both;
}

.el-button {
  padding: 10px 20px;
  margin: 0 10px 10px 0;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
}

.el-button.left {
  animation: opacity 0.5s ease-in-out 2s both, showUp 0.5s ease-in-out 2s both;
}

.el-button.right {
  animation: opacity 0.5s ease-in-out 2.1s both,
    showUp 0.5s ease-in-out 2.1s both;
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
    transform: translateX(250%);
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

@media only screen and (min-width: 500px) {
  .background {
    width: 100%;
    height: 80vh;
  }

  .display-wrapper {
    top: 35%;
    left: 10%;
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
</style>
