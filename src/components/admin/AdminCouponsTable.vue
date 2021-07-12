<template>
  <el-container direction="vertical">
    <loading :active.sync="isLoading"></loading>
    <el-table stripe :data="couponsList">
      <el-table-column fixed prop="title" label="優惠券名稱" min-width="150">
      </el-table-column>
      <el-table-column prop="code" label="代碼" min-width="100">
      </el-table-column>
      <el-table-column prop="percent" label="折扣" min-width="100">
      </el-table-column>
      <el-table-column prop="due_date" label="期限" min-width="100">
      </el-table-column>
      <el-table-column prop="is_enabled" label="是否啟用" min-width="100">
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.is_enabled === 1 ? 'success' : 'info'"
            disable-transitions
            >{{ scope.row.is_enabled === 1 ? "啟用" : "未啟用" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="left" min-width="180">
        <template slot="header">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="showEditDialog(true, null)"
            >新增優惠券</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="showEditDialog(false, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="confirmDelete(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改產品內容 對話方塊-->
    <CouponUpdateDialog ref="coupon" @after-coupon-update="fetchCouponsList" />

  </el-container>
</template>

<script>
import adminAPI from '@/apis/admin.js'
import CouponUpdateDialog from './CouponUpdateDialog.vue'

export default {
  name: 'AdminCouponsTable',
  metaInfo: {
    title: '優惠券列表'
  },
  components: {
    CouponUpdateDialog
  },
  data () {
    return {
      couponsList: [],
      isLoading: false
    }
  },
  created () {
    const { page } = this.$route.query
    this.fetchCouponsList(page)
  },
  methods: {
    async fetchCouponsList (page = 1) {
      try {
        this.isLoading = true
        const response = await adminAPI.getCoupons(page)

        if (response.data.success !== true) {
          throw new Error()
        }
        this.couponsList = response.data.coupons
        this.$emit('renderPaginator', response.data.pagination)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        return this.$message.error('無法取得優惠券資料，請稍後再試')
      }
    },
    showEditDialog (isNew, coupon) {
      this.$refs.coupon.showEditDialog(isNew, coupon)
    },
    async confirmDelete (couponId) {
      try {
        await this.$confirm('優惠券將永久刪除，是否繼續？', '警告', {
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '刪除中...'
              try {
                const response = await adminAPI.removeCoupon(couponId)
                if (response.data.success !== true) {
                  throw new Error(response.data.message)
                }
                // 畫面移除產品
                this.couponsList = this.couponsList.filter(
                  (item) => item.id !== couponId
                )
                instance.confirmButtonLoading = false
                done()
              } catch (error) {
                this.$message({
                  type: 'info',
                  message: '刪除失敗，請再試一次'
                })
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '確認'
              }
            } else {
              done()
            }
          }
        })
        this.$message({
          type: 'success',
          message: '已刪除優惠券'
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消刪除'
        })
      }
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
