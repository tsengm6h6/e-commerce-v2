<template>
  <div id="app">
    <Navbar />
    <main role="main" class="mt-5 bg-white">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchCartProducts"]),
  },
  mounted() {
    this.fetchProducts();
    this.fetchCartProducts();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,800&display=swap");

body {
  font-family: "Work Sans", "Noto Sans TC", sans-serif;
  /* font-family: "Work Sans", sans-serif; */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #242323;
}
</style>