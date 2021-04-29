<template>
  <div class="checkout-section">
    <!-- Stepper -->
    <el-row type="flex" justify="center">
      <el-col :xs="22" :md="24">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="確認商品"></el-step>
          <el-step title="填寫報名"></el-step>
          <el-step title="完成訂單"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <!-- main: 購物車 -> form -> 完成訂單 -->
    <el-row type="flex" justify="center" class="main-section">
      <el-col :xs="24">
        <CartInfo v-if="active === 0" />
        <CartForm
          v-if="active === 1"
          ref="cartForm"
          @after-form-submit="afterFormSubmit"
        />
        <OrderTwo
          v-if="active === 2"
          ref="order"
          :currOrderId="currOrderId"
          :from-checkout="true"
          @after-pay-order="afterPayOrder"
        />
        <el-container v-if="active === 3">
          <p>訂單已完成，感謝您的預訂</p>
        </el-container>
      </el-col>
    </el-row>

    <!-- Step control -->
    <el-row type="flex" justify="end">
      <el-col :xs="24" :sm="8" :md="6">
        <el-button v-if="active === 0" @click="next">下一步</el-button>
        <el-button
          v-if="active === 1"
          type="primary"
          @click="handleSubmit"
          :loading="isLoading"
          >送出訂單</el-button
        >
        <el-button
          v-if="active === 2"
          @click="handlePayOrder"
          type="success"
          plain
          :loading="isLoading"
          >確認付款</el-button
        >
        <el-button v-if="active === 3" @click="next" type="success" plain
          >回首頁</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.checkout-section {
  padding: 50px 30px 30px;
}

.main-section {
  /* min-height: 120vh; */
  margin-top: 30px;
}

.el-button {
  width: 100%;
  margin-top: 50px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .checkout-section {
    padding: 50px 80px 30px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .checkout-section {
    padding: 50px 120px 30px;
  }
}
</style>

<script>
import { mapState } from "vuex";
import OrderTwo from "../components/OrderTwo";
import CartInfo from "../components/cart/CartInfo";
import CartForm from "../components/cart/CartForm";

export default {
  name: "CartList",
  components: {
    OrderTwo,
    CartInfo,
    CartForm,
  },
  data() {
    return {
      active: 0,
      currOrderId: "",
    };
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cartInfo.cartList,
      total: (state) => state.cartInfo.total,
      final_total: (state) => state.cartInfo.final_total,
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    next() {
      this.active++;
      console.log("current step", this.active);
      // if (this.active === 2) {
      //   this.$refs.order.showPayBtn = false;
      // }
      if (this.active > 3) {
        this.$router.push("/");
        this.active = 0;
      }
    },
    handleSubmit() {
      this.$refs.cartForm.validateForm("userForm");
    },
    afterFormSubmit(orderId) {
      console.log(orderId);
      this.currOrderId = orderId;
      this.next();
    },
    handlePayOrder() {
      this.$refs.order.payOrder(this.currOrderId);
    },
    afterPayOrder() {
      this.next();
    },
  },
};
</script>