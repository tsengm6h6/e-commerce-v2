<template>
  <el-container class="background">
    <el-header class="navbar">
      <router-link to="/" class="nav-brand">品牌名稱</router-link>
      <el-menu class="el-menu-demo" mode="horizontal" default-active="/" router>
        <el-menu-item index="/">首頁</el-menu-item>
        <el-menu-item index="/products">所有活動</el-menu-item>
        <el-submenu index="3">
          <template slot="title">證照課程</template>
          <el-menu-item index="3-1">水肺潛水</el-menu-item>
          <el-menu-item index="3-2">自由潛水</el-menu-item>
        </el-submenu>
        <el-menu-item index="/favorites">收藏清單</el-menu-item>
        <el-menu-item index="/orders">我的訂單</el-menu-item>
        <el-menu-item @click="openDrawer">
          <i class="el-icon-goods"></i>
        </el-menu-item>
      </el-menu>
    </el-header>
    <CartDrawer ref="drawer" />
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import CartDrawer from "./CartDrawer";

export default {
  name: "Navbar",
  components: {
    CartDrawer,
  },
  computed: {
    ...mapState({
      cartLength: (state) =>
        state.cartInfo.cartList ? state.cartInfo.cartList.length : 0,
    }),
  },
  methods: {
    openDrawer() {
      this.$refs.drawer.drawer = true;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 800;
  background: rgba(255, 255, 255, 0.95);
}

.nav-brand {
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  /* padding: 0 20px; */
}

.el-menu {
  display: none;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu:focus,
.el-menu--horizontal > .el-submenu:hover {
  color: #00c9c8;
}

/* TODO: submenu 改不到 */
.el-menu.el-menu--horizontal,
.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu.el-submenu__title {
  color: #242323;
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
  color: #00c9c8;
}

.el-badge__content {
  height: 20px;
}

.el-menu-item:last-child {
  padding-right: 0px;
}

.el-menu-item [class^="el-icon-"] {
  font-size: 24px;
  position: relative;
  bottom: 4px;
}

.el-menu-item [class^="el-icon-"]::after {
  content: "";
  width: 8px;
  height: 8px;
  position: absolute;
  top: 3px;
  right: -2px;
  border-radius: 50%;
  background: #f56c6c;
}

/* sm */
@media only screen and (min-width: 768px) {
  .navbar {
    padding: 0 80px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .navbar {
    padding: 0 120px;
  }
  .el-menu {
    display: block;
  }
}
</style>