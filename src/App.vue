<template>
  <div id="app" class="main-container">
    <Navbar id="navbar" />
    <main role="main">
      <router-view />
    </main>
    <Footer v-if="!isLogin" />
    <div id=”fb-root”></div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { mapActions, mapState } from 'vuex'
import cartMixin from './utils/cartMixin.js'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  metaInfo: {
    title: 'PADI水肺潛水 | AIDA 自由潛水 | 台灣潛水旅遊',
    titleTemplate: 'DIVE IN 戶外冒險團隊 | %s'
  },
  mixins: [cartMixin],
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created () {
    this.fetchProducts()
    this.fetchLocalCart()
    const { isPost = null } = this.getLocalStorage()
    if (isPost) this.$message.warning('上次購物未完成，請盡快完成訂單')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap');

html {
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: "Noto Sans TC","Microsoft Yahei", sans-serif;
  color: #242323;
  letter-spacing: 1px;
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
  flex: 1;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
