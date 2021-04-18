<template>
  <el-container class="background">
    <el-header class="navbar">
      <a class="nav-brand">品牌名稱</a>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="transparent"
        text-color="#c4c4c4"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">首頁</el-menu-item>
        <el-submenu index="2">
          <template slot="title">所有活動</template>
          <el-menu-item index="2-1">浮潛體驗</el-menu-item>
          <el-menu-item index="2-2">水肺潛水</el-menu-item>
          <el-menu-item index="2-3">自由潛水</el-menu-item>
          <el-menu-item index="2-4">SUP立槳</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">證照課程</template>
          <el-menu-item index="3-1">水肺潛水</el-menu-item>
          <el-menu-item index="3-2">自由潛水</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">潛水旅遊</template>
          <el-menu-item index="4-1">小琉球</el-menu-item>
          <el-menu-item index="4-2">綠島</el-menu-item>
          <el-menu-item index="4-3">蘭嶼</el-menu-item>
          <el-menu-item index="4-4">墾丁</el-menu-item>
        </el-submenu>
        <el-menu-item index="5">收藏清單</el-menu-item>
        <el-menu-item index="6">購物車</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script>
export default {
  name: "Navbar",
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