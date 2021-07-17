<template>
  <el-container direction="vertical">
    <loading :active.sync="isLoading"></loading>
    <el-table height="90%" stripe :data="OrdersList">
      <el-table-column fixed prop="id" label="訂單編號" min-width="180">
      </el-table-column>
      <el-table-column prop="createdAt" label="日期" min-width="100">
      </el-table-column>
      <el-table-column prop="total" label="總金額" min-width="100">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>訂購人資訊</p>
          <ul>
            <li>姓名：{{ props.row.user.name }}</li>
            <li>信箱：{{ props.row.user.email }}</li>
            <li>電話：{{ props.row.user.tel }}</li>
            <li>地址：{{ props.row.user.address }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="user.name" label="購買人" min-width="100">
      </el-table-column>
      <el-table-column
        prop="isPaid"
        label="付款狀態"
        min-width="100"
        :filters="[
          { text: '已付款', value: true },
          { text: '尚未付款', value: !true },
        ]"
        :filter-method="filterTag"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.isPaid ? 'info' : 'danger'"
            disable-transitions
            >{{ scope.row.isPaid ? "已付款" : "尚未付款" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="paid_date" label="付款日期" min-width="100">
      </el-table-column>
      <el-table-column align="left" min-width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="showEditDialog(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-show"
            @click="showDetailDialog(scope.row)"
            >訂單明細</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination :pagination='pagination' @handlePageChange='changePage'/>

    <!-- Detail顯示方塊 -->
    <OrderDetailDialog ref='orderDetail' />

    <!-- 修改方塊 -->
    <OrderUpdateDialog ref="orderUpdate" @after-order-submit='afterOrderSubmit' />

  </el-container>
</template>

<script>
import adminAPI from '@/apis/admin.js'
import mixin from '@/utils/mixin.js'
import OrderDetailDialog from './OrderDetailDialog.vue'
import OrderUpdateDialog from './OrderUpdateDialog.vue'
import Pagination from './Pagination.vue'

export default {
  metaInfo: {
    name: 'AdminOrdersTable',
    title: '訂單列表'
  },
  components: {
    OrderDetailDialog,
    OrderUpdateDialog,
    Pagination
  },
  data () {
    return {
      originOrder: [], // API 回傳的原始資料
      OrdersList: [], // 處理過的資料
      isLoading: false,
      pagination: {}
    }
  },
  mixins: [mixin],
  created () {
    const { page } = this.$route.query
    this.fetchOrdersList(page)
  },
  methods: {
    filterTag (value, row) {
      return row.isPaid === value
    },
    async fetchOrdersList (page = 1) {
      try {
        this.isLoading = true
        const response = await adminAPI.getOrders(page)
        if (response.data.success !== true) {
          throw new Error()
        }

        this.originOrder = response.data.orders
        this.OrdersList = this.originOrder.map((item) => ({
          createdAt: this.dateFormat(item.create_at) || '',
          id: item.id || '',
          isPaid: item.is_paid || null,
          num: item.num || null,
          paid_date: this.dateFormat(item.paid_date) || '',
          products: item.products,
          total: item.total || null,
          user: { ...item.user } || null
        }))
        this.pagination = { ...response.data.pagination }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        return this.$message.error('無法取得訂單資料，請稍後再試')
      }
    },
    showEditDialog (order) {
      const originData = this.originOrder.find(
        (item) => item.id === order.id
      )
      this.$refs.orderUpdate.showEditDialog(order, originData)
    },
    afterOrderSubmit () {
      const { page } = this.$route.query
      this.fetchOrdersList(page)
    },
    showDetailDialog (order) {
      const currDetailList = Object.values(order.products)
      this.$refs.orderDetail.showDetailDialog(currDetailList)
    },
    changePage (val) {
      const { activeIndex } = this.$route.query
      this.fetchOrdersList(val)
      this.$router.push({
        path: '/admin/dashboard',
        query: {
          page: val,
          activeIndex: activeIndex
        }
      })
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
}

ul {
  margin: 10px 0 0 20px;
}

</style>
