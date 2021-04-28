<template>
  <div>
    <section class="background">
      <div class="display-wrapper">
        <div class="display">跨出冒險的第一步 <br />Let's Dive In !</div>
        <div class="button">
          <el-button type="danger" plain>了解更多</el-button>
          <el-button type="danger">立即報名</el-button>
        </div>
      </div>
    </section>
    <FeatureSection />
    <TripSection />
    <CourseSection />
    <GallerySection />
    <Footer />
  </div>
</template>

<script>
import FeatureSection from "../components/landingPage/FeatureSection";
import TripSection from "../components/landingPage/TripSection";
import CourseSection from "../components/landingPage/CourseSection";
import GallerySection from "../components/landingPage/GallerySection";
import Footer from "../components/landingPage/Footer";

export default {
  name: "LandingPage",
  components: {
    FeatureSection,
    TripSection,
    CourseSection,
    GallerySection,
    Footer,
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 120vh;
  position: relative;
  background-image: url("https://i.imgur.com/SDKxaOF.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.display-wrapper {
  position: absolute;
  top: 30%;
  left: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.display {
  font-size: 56px;
  font-weight: 600;
  color: #fcfcfc;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.el-button {
  padding: 12px 40px;
  letter-spacing: 1px;
  font-weight: 600;
}
</style>