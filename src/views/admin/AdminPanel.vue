<template>
  <el-container style="height: 90vh">
    <AdminSidebar @changeTable="changeTable" />
    <el-container direction="vertical" class="admin-section">
      <AdminProductsTable
        v-if="activeIndex === 1"
      />
      <AdminOrdersTable
        v-if="activeIndex === 2"
      />
      <AdminCouponsTable
        v-if="activeIndex === 3"
      />
    </el-container>
  </el-container>
</template>

<script>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminProductsTable from '@/components/admin/AdminProductsTable.vue'
import AdminCouponsTable from '@/components/admin/AdminCouponsTable.vue'
import AdminOrdersTable from '@/components/admin/AdminOrdersTable.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminProducts',
  components: {
    AdminSidebar,
    AdminProductsTable,
    AdminOrdersTable,
    AdminCouponsTable
  },
  metaInfo: {
    title: '',
    titleTemplate: '管理員頁面 | %s'
  },
  data () {
    return {
      activeIndex: 1
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created () {
    if (!this.isLogin) {
      this.$router.push('/admin/signin')
      this.$message.warning('請先登入')
    }
  },
  methods: {
    changeTable (index) {
      this.activeIndex = index
      this.$router.push({
        path: '/admin/dashboard',
        query: {
          activeIndex: index,
          page: 1
        }
      })
    }
  }
}
</script>

<style scoped>
.admin-section {
  margin: 0 20px;
}
</style>
