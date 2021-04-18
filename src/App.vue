<template>
  <div id="app">
    <Navbar />
    <main role="main" class="mt-5 bg-white">
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
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