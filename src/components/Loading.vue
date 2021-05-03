<template>
  <div class="container">
    <PufferFish />
    <p>網頁載入中</p>
  </div>
</template>

<script>
import PufferFish from "../components/animation/PufferFish";
export default {
  name: "Loading",
  components: {
    PufferFish,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0)
  );
}

p {
  font-weight: 500;
  letter-spacing: 2px;
  color: #44607a;
}
</style>