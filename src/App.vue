<template>
  <div id="app">
    <Navbar />
    <main role="main">
      <router-view />
    </main>
    <Footer v-if="!isLogin" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { mapActions, mapState } from "vuex";
import cartMixin from "./utils/cartMixin";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  mixins: [cartMixin],
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchCartProducts"]),
  },
  mounted() {
    this.fetchProducts();
    this.fetchLocalCart();
    const { isPost = null } = this.getLocalStorage();
    console.log("App.vue 購物車isPost");
    if (isPost) this.$message.warning("上次購物未完成，請盡快完成訂單");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,800&display=swap");

body {
  font-family: "Work Sans", "Noto Sans TC", sans-serif;
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

main {
  margin-top: 60px;
}
</style>