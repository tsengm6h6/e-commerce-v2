<template>
  <el-container direction="vertical">
    <Loading v-if="isLoading" />
    <template v-else>
      <div class="title">
        <h3>訂單列表</h3>
        <p>如有任何問題，請洽專人客服</p>
      </div>
      <Breadcrumb class="breadcrumb" />
      <el-row>
        <el-col :span="24">
          <el-table stripe :data="orders" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <Order
                  :currOrderId="props.row.id"
                  @after-pay-order="afterPayOrder"
                />
              </template>
            </el-table-column>

            <el-table-column
              min-width="100"
              label="日期"
              prop="createdAt"
              align="center"
            ></el-table-column>
            <el-table-column
              min-width="200"
              label="訂單編號"
              prop="id"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="is_paid"
              label="付款狀態"
              min-width="100"
              align="center"
              :filters="[
                { text: '已付款', value: true },
                { text: '尚未付款', value: false },
              ]"
              :filter-method="filterTag"
            >
              <template slot-scope="scope">
                <el-tag
                  size="small"
                  :type="scope.row.is_paid ? 'info' : 'danger'"
                  disable-transitions
                  >{{ scope.row.is_paid ? "已付款" : "尚未付款" }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column
              min-width="100"
              label="總計"
              prop="total"
              align="center"
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="訂購人"
              prop="userName"
              align="center"
            ></el-table-column>
          </el-table>
          <!-- Pagination -->
          <el-row type="flex" class="row-bg" justify="center">
            <el-pagination
              :page-count="pagination.total_pages"
              :current-page.sync="pagination.current_page"
              @current-change="handlePageChange"
              layout="prev, pager, next"
            >
            </el-pagination>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </el-container>
</template>

<script>
import Order from "../components/Order.vue";
import customerAPI from "../apis/customer.js";
import mixin from "../utils/mixin.js";
import Loading from "../components/Loading.vue";
import Breadcrumb from "../components/Breadcrumb.vue";

export default {
  name: "orders",
  components: {
    Order,
    Loading,
    Breadcrumb,
  },
  metaInfo: {
    title: "我的訂單",
  },
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      currOrderId: "",
    };
  },
  mixins: [mixin],
  methods: {
    async fetchOrders(page = 1) {
      try {
        this.isLoading = true;
        const response = await customerAPI.getOrders(page);
        if (response.data.success !== true) {
          throw new Error();
        }
        this.orders = response.data.orders.map((item) => {
          const { create_at: createdAt, id, is_paid, num, total, user } = item;
          return {
            createdAt: this.dateFormat(createdAt),
            id,
            is_paid,
            num,
            total,
            userName: user ? user.name : "-",
          };
        });
        this.pagination = { ...response.data.pagination };
        this.isLoading = false;
      } catch (error) {
        this.$message.error("無法取得訂單列表，請稍後再試");
        this.isLoading = false;
      }
    },
    handlePageChange(page) {
      this.fetchOrders(page);
      this.$router.push({
        path: "/orders",
        query: {
          page: page,
        },
      });
    },
    filterTag(value, row) {
      return row.is_paid === value;
    },
    afterPayOrder() {
      const { page } = this.$route.query;
      this.fetchOrders(page);
    },
  },
  created() {
    const { page } = this.$route.query;
    this.fetchOrders(page);
  },
};
</script>

<style scoped>
.el-container {
  padding: 30px;
}

.breadcrumb {
  margin-left: 10px;
}

.title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.title h3 {
  margin-bottom: 10px;
}

.el-pagination {
  margin-top: 30px;
}

.el-breadcrumb {
  margin-left: 10px;
  margin-bottom: 20px;
}

.el-checkbox__label,
.el-table-filter__bottom button {
  font-size: 14px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .el-container {
    padding: 30px 80px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .el-container {
    padding: 30px 120px;
  }
}
</style>