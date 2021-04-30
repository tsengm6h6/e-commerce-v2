<template>
  <el-container class="background">
    <el-header class="navbar">
      <router-link to="/"
        ><img class="nav-brand" src="https://i.imgur.com/akLAykW.png" alt=""
      /></router-link>
      <el-menu class="el-menu-demo" mode="horizontal" default-active="/" router>
        <el-menu-item index="/">首頁</el-menu-item>
        <el-menu-item index="/products">所有活動</el-menu-item>
        <el-menu-item index="/question">常見問答</el-menu-item>
        <el-menu-item index="/policies">退換貨政策</el-menu-item>
        <el-menu-item index="/orders">我的訂單</el-menu-item>
        <el-menu-item index="/favorites">
          <el-tooltip
            class="item"
            effect="light"
            content="收藏清單"
            placement="bottom"
          >
            <img
              class="img-icon"
              src="https://i.imgur.com/jRFRLEQ.png"
              alt=""
            />
          </el-tooltip>
        </el-menu-item>
        <el-menu-item @click="openDrawer">
          <i class="el-icon-goods"
            ><div v-if="cartLength" class="badge"></div
          ></i>
        </el-menu-item>
        <el-menu-item v-if="isLogin" index="/admin/dashboard"
          ><el-button size="small" type="info" plain
            >管理員後台</el-button
          ></el-menu-item
        >
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
      isLogin: (state) => state.isLogin,
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
  background: rgba(255, 255, 255);
}

.nav-brand {
  width: 100%;
  height: 60px;
  cursor: pointer;
  object-fit: contain;
  object-position: center;
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

.img-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  position: relative;
  bottom: 4px;
}

.el-menu-item [class^="el-icon-"] {
  font-size: 24px;
  position: relative;
  bottom: 4px;
}

.badge {
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