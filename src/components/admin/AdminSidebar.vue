<template>
  <el-aside width="150px">
    <el-menu
      default-active="1"
      style="height: 100%"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="handleChange(1)">
        <i class="el-icon-message"></i>
        <span>產品列表</span>
      </el-menu-item>
      <el-menu-item index="2" @click="handleChange(2)">
        <i class="el-icon-menu"></i>
        <span>訂單列表</span>
      </el-menu-item>
      <el-menu-item index="3" @click="handleChange(3)">
        <i class="el-icon-s-ticket"></i>
        <span>優惠券</span>
      </el-menu-item>
      <el-menu-item index="4" @click="adminLogOut">
        <i class="el-icon-user"></i>
        <span>登出</span>
        <i class="el-icon-loading" v-if="isLoading"></i>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>


<script>
import authorizationAPI from "@/apis/authorization.js";

export default {
  name: "AdminSidebar",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    handleChange(index) {
      this.$emit("changeTable", index);
    },
    async adminLogOut() {
      try {
        this.isLoading = true;
        const response = await authorizationAPI.logOut();
        this.$store.commit("setLoginStatus", !response.data.success);
        this.$router.push("/admin/signin");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.$message.error(`${error.message}，請再試一次`);
      }
    },
  },
};
</script>

<style scoped>
.el-aside {
  color: #333;
}
</style>