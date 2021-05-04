<template>
  <div class="container">
    <section class="background">
      <div class="display-wrapper">
        <div class="display">跨出冒險的第一步 <br />Let's Dive In !</div>
        <div class="button">
          <router-link to="#" v-scroll-to="'#feature'"
            ><el-button type="danger" plain>了解更多</el-button></router-link
          >
          <router-link to="#" v-scroll-to="'#course'">
            <el-button type="danger">立即報名</el-button>
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
import FeatureSection from "../components/landingPage/FeatureSection";
import TripSection from "../components/landingPage/TripSection";
import CourseSection from "../components/landingPage/CourseSection";
import GallerySection from "../components/landingPage/GallerySection";

export default {
  name: "LandingPage",
  components: {
    FeatureSection,
    TripSection,
    CourseSection,
    GallerySection,
  },
};
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

.el-button {
  padding: 10px 20px;
  margin: 0 10px 10px 0;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
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
    height: 120vh;
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