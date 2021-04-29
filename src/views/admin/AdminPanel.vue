<template>
  <el-container style="height: 90vh">
    <AdminSidebar @changeTable="changeTable" />
    <el-container direction="vertical" class="admin-section">
      <!-- <AdminHeader /> -->
      <AdminProductsTable
        @renderPaginator="renderPaginator"
        ref="products"
        v-if="activeIndex === 1"
      />
      <AdminOrdersTable
        @renderPaginator="renderPaginator"
        ref="orders"
        v-if="activeIndex === 2"
      />
      <AdminCouponsTable
        @renderPaginator="renderPaginator"
        ref="coupons"
        v-if="activeIndex === 3"
      />
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
    </el-container>
  </el-container>
</template>

<script>
import AdminSidebar from "../../components/admin/AdminSidebar";
// import AdminHeader from "../../components/admin/AdminHeader";
import AdminProductsTable from "../../components/admin/AdminProductsTable";
import AdminCouponsTable from "../../components/admin/AdminCouponsTable";
import AdminOrdersTable from "../../components/admin/AdminOrdersTable";
import { mapState } from "vuex";

export default {
  name: "AdminProducts",
  components: {
    AdminSidebar,
    // AdminHeader,
    AdminProductsTable,
    AdminOrdersTable,
    AdminCouponsTable,
  },
  data() {
    return {
      activeIndex: 1,
      pagination: {
        category: null,
        current_page: 1,
        has_next: null,
        has_pre: null,
        total_pages: 1,
      },
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  created() {
    if (!this.isLogin) {
      this.$router.push("/admin/signin");
      this.$message.warning("請先登入");
    }
  },
  methods: {
    changeTable(index) {
      this.activeIndex = index;
      this.$router.push({
        path: "/admin/dashboard",
        query: {
          activeIndex: index,
          page: 1,
        },
      });
    },
    renderPaginator(payload) {
      console.log(payload);
      this.pagination = {
        ...payload,
      };
    },
    handlePageChange(val) {
      if (this.activeIndex === 1) this.$refs.products.fetchProductsList;
      if (this.activeIndex === 2) this.$refs.orders.fetchOrdersList(val);
      if (this.activeIndex === 3) this.$refs.products.fetchCouponsList(val);

      this.$router.push({
        path: "/admin/dashboard",
        query: {
          page: val,
          activeIndex: this.activeIndex,
        },
      });
    },
    // TODO: beforeRouteUpdate
  },
};
</script>

<style scoped>
.admin-section {
  margin: 0 20px;
}

.el-pagination {
  margin-top: 20px;
}
</style>
  
