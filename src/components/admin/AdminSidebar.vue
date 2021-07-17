<template>
  <el-aside width="150px">
    <el-menu
      default-active="1"
      style="height: 100%"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >

      <template v-for="item in sideList">
        <el-menu-item :key="item.id" :index="item.id" @click="$emit('changeTable', item.id)">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </el-menu-item>
      </template>

      <el-menu-item :index="(Number(sideList.length)+1).toString()" @click="adminLogOut">
        <i class="el-icon-user"></i>
        <span>登出</span>
        <i class="el-icon-loading" v-if="isLoading"></i>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import authorizationAPI from '@/apis/authorization.js'

export default {
  name: 'AdminSidebar',
  data () {
    return {
      isLoading: false,
      sideList: [
        { id: '1', title: '產品列表', icon: 'el-icon-message' },
        { id: '2', title: '訂單列表', icon: 'el-icon-s-ticket' },
        { id: '3', title: '產品列表', icon: 'el-icon-s-ticket' }
      ]
    }
  },
  methods: {
    async adminLogOut () {
      try {
        this.isLoading = true
        const response = await authorizationAPI.logOut()
        this.$store.commit('setLoginStatus', !response.data.success)
        this.$router.push('/admin/signin')
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$message.error(`${error.message}，請再試一次`)
      }
    }
  }
}
</script>

<style scoped>
.el-aside {
  color: #333;
}
</style>
