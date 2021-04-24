<template>
  <div>
    <!-- Stepper -->
    <el-row type="flex" justify="center">
      <el-col :xs="20" :sm="18" :md="12">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="確認商品資訊"></el-step>
          <el-step title="填寫報名表單"></el-step>
          <el-step title="完成預定及付款"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <!-- main: 購物車 -> form -> 完成訂單 -->
    <el-main>
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
        @after-pay-order="afterPayOrder"
      />
      <el-container v-if="active === 3">
        <p>訂單已完成，感謝您的預訂</p>
      </el-container>
    </el-main>

    <!-- Step control -->
    <el-row type="flex" justify="end">
      <el-col :span="6">
        <el-button v-if="active === 0" style="margin-top: 12px" @click="next"
          >下一步</el-button
        >
        <el-button
          v-if="active === 1"
          type="primary"
          style="margin-top: 12px"
          @click="handleSubmit"
          >送出訂單</el-button
        >
        <el-button
          v-if="active === 2"
          @click="handlePayOrder"
          type="success"
          plain
          style="margin-top: 12px"
          >確認付款</el-button
        >
        <el-button
          v-if="active === 3"
          @click="next"
          type="success"
          plain
          style="margin-top: 12px"
          >回首頁</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

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