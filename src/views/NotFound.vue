<template>
  <div class="container">
    <Octopus />
    <p>404 找不到網頁</p>
  </div>
</template>

<script>
import Octopus from "../components/animation/Octopus";
export default {
  name: "notFound",
  components: {
    Octopus,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 50vh;
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
  /* margin-top: 20px; */
  font-weight: 500;
  letter-spacing: 2px;
  color: #44607a;
}
</style>