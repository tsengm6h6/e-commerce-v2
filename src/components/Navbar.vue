<template>
  <el-container class="background">
    <el-header class="navbar">
      <router-link to="/" class="nav-brand">品牌名稱</router-link>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="transparent"
        text-color="#c4c4c4"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">首頁</el-menu-item>
        <el-menu-item index="/products">所有活動</el-menu-item>
        <el-submenu index="3">
          <template slot="title">證照課程</template>
          <el-menu-item index="3-1">水肺潛水</el-menu-item>
          <el-menu-item index="3-2">自由潛水</el-menu-item>
        </el-submenu>
        <el-menu-item index="/favorites">收藏清單</el-menu-item>
        <el-menu-item index="/orders">我的訂單</el-menu-item>
        <!-- TODO: 調整位置和value-->
        <el-badge :value="cartLength" class="cartBadge">
          <el-menu-item index="/checkout/cart-list">購物車</el-menu-item>
        </el-badge>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState({
      cartLength: (state) => state.cartInfo.cartList.length || 0,
    }),
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 120px;
}

.nav-brand {
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>