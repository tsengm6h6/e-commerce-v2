<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <loading :active.sync="isLoading"></loading>
      <el-container>
        <h4>訂單編號：{{ currOrderId }}</h4>
        <div style="display: flex; align-items: center">
          <el-button
            v-if="!orderIsPaid"
            @click="payOrder(currOrderId)"
            type="warning"
            size="small"
            >確認付款</el-button
          >
        </div>
      </el-container>
      <el-divider></el-divider>
      <p>訂購人資訊</p>
      <el-table :data="orderList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>信箱：{{ props.row.userEmail }}</p>
            <p>電話：{{ props.row.userTel }}</p>
            <p>地址：{{ props.row.userAddress }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="訂購人資訊"
          prop="userName"
          min-width="180"
        ></el-table-column>
        <el-table-column label="訂購日期" prop="orderDate" min-width="100">
        </el-table-column>
        <el-table-column label="訂單狀態" prop="isPaid" min-width="100">
        </el-table-column>
        <el-table-column
          label="總金額"
          prop="orderSum"
          min-width="100"
        ></el-table-column>
      </el-table>
      <p>訂單明細</p>
      <el-table :data="productsList" style="width: 100%">
        <el-table-column prop="productName" label="商品名稱" width="180">
        </el-table-column>
        <el-table-column prop="qty" label="數量" min-width="50">
        </el-table-column>
        <el-table-column prop="productUnit" label="單位" min-width="50">
        </el-table-column>
        <el-table-column prop="originPrice" label="單價" min-width="100">
        </el-table-column>
        <el-table-column prop="isCoupon" label="套用優惠券" min-width="100">
        </el-table-column>
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
      orderIsPaid: null,
      orderList: [],
      productsList: [],
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
          products,
          total,
          user,
        } = response.data.order;

        this.orderIsPaid = isPaid;
        // 轉換日期格式
        const date = new Date(createdAt);
        const yyyy = date.getFullYear();
        const mm =
          (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        const dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
        this.orderList.push({
          id,
          orderDate: `${yyyy}-${mm}-${dd}`,
          isPaid: isPaid ? "已付款" : "尚未付款",
          orderSum: total,
          userName: user ? user.name : "-",
          userEmail: user ? user.email : "-",
          userAddress: user ? user.address : "-",
          userTel: user ? user.tel : "-",
        });
        this.productsList = Object.values(products).map((item) => ({
          isCoupon: item.coupon ? "已套用" : "",
          qty: item.qty,
          originPrice: item.product.price,
          productName: item.product.title,
          productUnit: item.product.unit,
        }));
        this.isLoading = false;
        this.$emit("openDialog");
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
        this.orderList = this.orderList.map((item) => ({
          ...item,
          isPaid: "已付款",
        }));
        this.orderIsPaid = true;
        this.isLoading = false;
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