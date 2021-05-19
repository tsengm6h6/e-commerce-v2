<template>
  <el-container class="background">
    <el-header class="navbar">
      <router-link to="/"
        ><img class="nav-brand" src="https://i.imgur.com/akLAykW.png" alt=""
      /></router-link>
      <input
        type="checkbox"
        v-model="showMenu"
        id="burger"
        class="burger-toggler"
      />
      <label for="burger" class="hamburger">
        <span class="burger"></span>
      </label>

      <el-collapse-transition>
        <div class="nav-menu" v-if="showMenu">
          <ul class="nav-list">
            <li class="nav-item" @click="handleClickMenu">
              <router-link to="/" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item" @click="handleClickMenu">
              <router-link to="/products" class="nav-link"
                >所有活動</router-link
              >
            </li>
            <li class="nav-item" @click="handleClickMenu">
              <router-link to="/question" class="nav-link">
                常見問答
              </router-link>
            </li>
            <li class="nav-item" @click="handleClickMenu">
              <router-link to="/policies" class="nav-link">
                政策與條款
              </router-link>
            </li>
            <li class="nav-item" @click="handleClickMenu">
              <router-link to="/orders" class="nav-link">
                我的訂單
              </router-link>
            </li>
            <li class="nav-item" @click="handleClickMenu">
              <router-link to="/favorites" class="nav-link">
                <img
                  class="img-icon"
                  src="https://i.imgur.com/jRFRLEQ.png"
                  alt=""
                />
                收藏清單
              </router-link>
            </li>
            <li class="nav-item" @click="openDrawerMobile">
              <i class="el-icon-goods"
                ><div v-if="cartLength" class="badge"></div>
              </i>
              <span class="nav-link">購物車</span>
            </li>
            <li class="nav-item" v-if="isLogin" @click="handleClickMenu">
              <router-link to="/admin/dashboard">
                <el-button size="small" type="info" plain>管理員後台</el-button>
              </router-link>
            </li>
          </ul>
        </div>
      </el-collapse-transition>
      <el-menu mode="horizontal" :default-active="$route.path" router>
        <el-menu-item index="/">首頁</el-menu-item>
        <el-menu-item index="/products">所有活動</el-menu-item>
        <el-menu-item index="/question">常見問答</el-menu-item>
        <el-menu-item index="/policies">政策與條款</el-menu-item>
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
    <CartDrawerMobile ref="mobile" />
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import CartDrawer from './CartDrawer.vue'
import CartDrawerMobile from './CartDrawerMobile.vue'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition.js'
import Vue from 'vue'

Vue.component(CollapseTransition.name, CollapseTransition)

export default {
  name: 'Navbar',
  components: {
    CartDrawer,
    CartDrawerMobile
  },
  data () {
    return {
      showMenu: false
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      cartLength: (state) =>
        state.cartInfo.cartList ? state.cartInfo.cartList.length : 0
    })
  },
  methods: {
    openDrawer () {
      this.$refs.drawer.drawer = true
    },
    openDrawerMobile () {
      this.$refs.mobile.drawer = true
      this.showMenu = false
    },
    handleClickMenu () {
      this.showMenu = false
    }
  }
}
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

.burger-toggler {
  display: none;
}

.hamburger {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}

.burger {
  width: 24px;
  height: 3px;
  background-color: #00c9c8;
  position: relative;
  border-radius: 16px;
}

.burger:before,
.burger:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00c9c8;
  border-radius: 16px;
}

.burger:before {
  bottom: 8px;
}

.burger:after {
  top: 8px;
}

.nav-menu {
  padding: 20px;
  background: #fff;
  position: absolute;
  top: 60px;
  right: 0;
  width: 100%;
}

ul,
li {
  list-style: none;
}

.nav-item {
  height: 60px;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
}

.nav-item:not(:last-child) {
  border-bottom: 1px solid #8c8f951e;
}

.nav-link {
  cursor: pointer;
}

.nav-link:hover,
.nav-link:active,
.nav-link:focus {
  color: #00c9c8;
}

.nav-item .img-icon,
.nav-item .el-icon-goods {
  display: inline-block;
  width: 24px;
  height: 24px;
  object-fit: contain;
  position: relative;
  bottom: 0;
  font-size: 24px;
  margin-right: 6px;
}

.nav-item .img-icon {
  top: 6px;
  left: 2px;
}

.el-menu--horizontal {
  display: none;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #00c9c8;
}

.el-menu.el-menu--horizontal,
.el-menu--horizontal > .el-menu-item {
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

  .nav-menu {
    width: 30%;
    height: 460px;
    right: 80px;
    background-color: #fff;
    box-shadow: -3px 4px 10px 0px rgb(125 125 125 / 10%);
  }
}

/* md */
@media only screen and (min-width: 1024px) {
  .navbar {
    padding: 0 120px;
  }
  .el-menu--horizontal {
    display: block;
  }
  .hamburger,
  .nav-menu {
    display: none;
  }
}
</style>
