<template>
  <el-menu mode="vertical" default-active="1">
    <el-menu-item index="1">
      <span>所有活動</span>
    </el-menu-item>
    <el-menu-item index="2">
      <span>體驗系列</span>
    </el-menu-item>
    <el-menu-item index="3">
      <span>水肺潛水</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span>自由潛水</span>
    </el-menu-item>
    <el-menu-item index="5">
      <span>潛水旅遊</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AsideMenu",
  data() {
    return {
      category: "all",
    };
  },
  // methods: {
  //   handleSelect(value) {
  //     console.log(value);
  //     this.$store.commit("setCategory", value);
  //   },
  // },
};
</script>

<script>
export default {
  name: "AsideMenu",
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
  letter-spacing: 1px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: transparent;
}

.el-menu-item.is-active,
.el-menu-item:hover {
  font-weight: 500;
  color: #00c9c8;
}
</style>