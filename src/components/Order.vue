<template>
  <el-row>
    <loading :active.sync="isLoading"></loading>
    <el-col :span="18" :offset="3">
      <el-container>
        <h4>訂單編號：{{ currOrder.id }}</h4>
        <div style="display: flex; align-items: center">
          <el-button
            v-if="!currOrder.isPaid"
            @click="payOrder(currOrderId)"
            type="warning"
            size="small"
            >確認付款</el-button
          >
        </div>
      </el-container>
      <el-divider></el-divider>
      <div>
        <p>訂購人資訊</p>
        <p>姓名：{{ currOrder.user.name }}</p>
        <p>電話：{{ currOrder.user.tel }}</p>
        <p>地址：{{ currOrder.user.address }}</p>
        <p>信箱：{{ currOrder.user.email }}</p>
      </div>
      <el-divider></el-divider>
    </el-col>
    <el-col :span="18" :offset="3">
      <p>訂單明細</p>
      <el-table :data="currOrder.productsList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>產品名稱：{{ props.row.product.title }}</p>
            <p>數量：{{ props.row.qty }} / {{ props.row.product.unit }}</p>
            <p>單價：{{ props.row.product.price }}</p>
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="createdAt"></el-table-column>
        <el-table-column label="付款狀態" prop="isPaid"></el-table-column>
        <el-table-column label="總計" prop="final_total"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import customerAPI from "../apis/customer";
import { Toast } from "../utils/helper";
export default {
  name: "Order",
  props: {
    currOrderId: {
      type: String,
      require: true,
    },
  },
  watch: {
    currOrderId: {
      handler(newId) {
        this.fetchOrder(newId);
      },
    },
  },
  data() {
    return {
      currOrder: {
        createdAt: "",
        id: "",
        isPaid: null,
        message: "",
        productsList: [],
        total: null,
        user: {},
      },
      isLoading: false,
    };
  },
  methods: {
    async fetchOrder(orderId) {
      try {
        this.isLoading = true;
        const response = await customerAPI.getOrder(orderId);
        if (response.data.success !== true) {
          throw new Error();
        }
        console.log(response.data);
        const {
          create_at: createdAt,
          id,
          is_paid: isPaid,
          message,
          products,
          total,
          user,
        } = response.data.order;

        // 轉換日期格式
        const date = new Date(createdAt);
        const yyyy = date.getFullYear();
        const mm =
          (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        const dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
        this.currOrder = {
          id,
          message,
          isPaid,
          productsList: Object.values(products).map((item) => ({
            ...item,
            createdAt: `${yyyy}-${mm}-${dd}`,
            isPaid: isPaid ? "已付款" : "尚未付款",
            total,
          })),
          user: { ...user } || {},
        };
        if (!isPaid) {
          Toast.fire({
            icon: "warning",
            title: "您的訂單已建立，請盡快完成付款",
          });
        }
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得訂單，請稍後再試",
        });
        this.isLoading = false;
      }
    },
    async payOrder(orderId) {
      try {
        this.isLoading = true;
        const response = await customerAPI.payOrder(orderId);
        if (response.data.success !== true) {
          throw new Error();
        }
        await this.fetchOrder(this.currOrderId);
        this.currOrder.isPaid = true;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法完成付款，請稍後再試",
        });
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchOrder(this.currOrderId);
  },
};
</script>