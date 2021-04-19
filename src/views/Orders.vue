<template>
  <el-main>
    <!-- <el-button type="text" @click="dialogTableVisible = true"
      >open a Table nested Dialog</el-button
    > -->
    <loading :active.sync="isLoading"></loading>
    <el-row>
      <el-col :span="24">
        <loading :active.sync="isLoading"></loading>
        <h2>所有訂單</h2>
        <el-divider></el-divider>
        <el-table stripe height="500" :data="orders" style="width: 100%">
          <el-table-column width="50" align="center">
            <el-table-column type="expand">
              <template slot-scope="props">
                <OrderTwo :currOrderId="props.row.id" />
              </template>
            </el-table-column>
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
            min-width="100"
            label="付款狀態"
            prop="isPaid"
            align="center"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="數量"
            prop="num"
            align="center"
          ></el-table-column>
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
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import OrderTwo from "../components/OrderTwo";
import customerAPI from "../apis/customer";
import { Toast } from "../utils/helper";

export default {
  name: "orders",
  components: {
    OrderTwo,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      currOrderId: "",
    };
  },
  methods: {
    async fetchOrders() {
      try {
        this.isLoading = true;
        const response = await customerAPI.getOrders();
        if (response.data.success !== true) {
          throw new Error();
        }
        this.orders = response.data.orders.map((item) => {
          const {
            create_at: createdAt,
            id,
            is_paid: isPaid,
            num,
            total,
            user,
          } = item;
          const date = new Date(createdAt);
          const yyyy = date.getFullYear();
          const mm =
            (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
          const dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
          return {
            createdAt: `${yyyy}-${mm}-${dd}`,
            id,
            isPaid: isPaid ? "已付款" : "尚未付款",
            num,
            total,
            userName: user ? user.name : "-",
          };
        });
        console.log(this.orders);
        this.pagination = { ...response.data.pagination };
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得訂單列表，請稍後再試",
        });
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>