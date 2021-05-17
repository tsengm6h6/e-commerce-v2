<template>
  <Loading v-if="isLoading" />
  <div v-else>
    <el-container>
      <h4>訂單編號：{{ currOrderId }}</h4>
      <el-button
        v-if="!orderIsPaid && showPayBtn"
        @click="payOrder(currOrderId)"
        type="warning"
        size="small"
        :loading="isLoading"
        >確認付款</el-button
      >
    </el-container>
    <el-divider></el-divider>
    <p class="title">訂購人資訊</p>
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
    <div class="order-info">
      <p class="title">訂單明細</p>
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
    </div>
  </div>
</template>

<script>
import customerAPI from "../apis/customer.js";
import mixin from "../utils/mixin.js";
import { mapState } from "vuex";
import Loading from "../components/Loading.vue";

export default {
  name: "Order",
  props: {
    currOrderId: {
      type: String,
      require: true,
    },
    fromCheckout: {
      type: Boolean,
      require: true,
    },
  },
  mixins: [mixin],
  components: {
    Loading,
  },
  data() {
    return {
      orderIsPaid: false,
      orderList: [],
      productsList: [],
      showPayBtn: false,
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    async fetchOrder(orderId) {
      try {
        this.$store.commit("setLoading", true);
        const response = await customerAPI.getOrder(orderId);
        if (response.data.success !== true) {
          throw new Error();
        }
        const {
          create_at: createdAt,
          id,
          is_paid: isPaid,
          products,
          total,
          user,
        } = response.data.order;

        this.orderIsPaid = isPaid;
        if (this.fromCheckout) {
          this.showPayBtn = false;
        } else {
          this.showPayBtn = !isPaid;
        }
        this.orderList.push({
          id,
          orderDate: this.dateFormat(createdAt),
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
        this.$store.commit("setLoading", false);
        this.$emit("openDialog");
      } catch (error) {
        this.$message.error("無法取得訂單，請稍後再試");
        this.$store.commit("setLoading", false);
      }
    },
    async payOrder(orderId) {
      try {
        this.$store.commit("setLoading", true);
        const response = await customerAPI.payOrder(orderId);
        if (response.data.success !== true) {
          throw new Error();
        }
        this.orderList = this.orderList.map((item) => ({
          ...item,
          isPaid: "已付款",
        }));
        this.orderIsPaid = true;
        this.$store.commit("setLoading", false);
        this.$emit("after-pay-order");
      } catch (error) {
        this.$message.error("無法完成付款，請稍後再試");
        this.$store.commit("setLoading", false);
      }
    },
  },
  created() {
    this.fetchOrder(this.currOrderId);
  },
};
</script>

<style scoped>
.el-button {
  margin-left: 10px;
}

h4,
.title {
  letter-spacing: 2px;
  font-weight: 500;
}

.title {
  line-height: 24px;
  margin-bottom: 20px;
}

.order-info {
  margin-top: 30px;
}

.el-table th > .cell {
  letter-spacing: 3px;
  font-weight: 500;
}
</style>
