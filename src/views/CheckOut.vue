<template>
  <div class="checkout-section">
    <!-- Stepper -->
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm='18'  :md='16'>
        <el-steps :active="active" simple>
          <el-step title="確認商品" icon="el-icon-shopping-cart-2"></el-step>
          <el-step title="訂購資訊" icon="el-icon-edit"></el-step>
          <el-step title="付款完成" icon="el-icon-bank-card"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <!-- panel: 購物車 -> form -> 完成訂單 -->
    <el-row type="flex" justify="center" class="main-section">
      <el-col :xs="24" :sm='18'  :md='16'>
        <CartInfo ref="cartInfo" v-if="active === 0" />
        <CartForm
          v-if="active === 1"
          ref="cartForm"
          @after-form-submit="afterFormSubmit"
        />
        <el-alert
          v-if="active === 2 && !isLoading"
          title="訂單尚未完成，請盡快完成付款，待款項確認後，將寄出預約確認信給您，報名才算成功呦！"
          type="info"
          show-icon
          :closable="false"
        >
        </el-alert>
        <Order
          v-if="active === 2"
          ref="order"
          :currOrderId="currOrderId"
          :from-checkout="true"
          @after-pay-order="afterPayOrder"
        />
        <el-alert
          v-if="active === 3"
          title="感謝您的預訂，報名確認信將於3日內寄出，期待與您相見：)"
          type="success"
          show-icon
          :closable="false"
          effect="dark"
        >
        </el-alert>
      </el-col>
    </el-row>

    <!-- Step control -->
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm='18' :md='16'>
        <el-button
          v-if="active === 0"
          @click="handleConfirmCart"
          type="primary"
          :loading="isLoading"
          v-scroll-to="'#navbar'"
          >確認商品</el-button
        >
        <el-button
          v-if="active === 1"
          type="primary"
          @click="handleSubmit"
          :loading="isLoading"
          v-scroll-to="'#navbar'"
          class="order-btn"
          >送出訂單</el-button
        >
        <el-button
          v-if="active === 2"
          @click="handlePayOrder"
          type="primary"
          :loading="isLoading"
          v-scroll-to="'#navbar'"
          >確認付款</el-button
        >

        <div v-if="active === 3" class="btn-wrapper">
            <router-link to="/orders" v-scroll-to="'#navbar'">
              <el-button @click="next" type="primary" plain
                >查看訂單紀錄</el-button
              >
            </router-link>
            <router-link to="/" v-scroll-to="'#navbar'">
              <el-button @click="next" type="primary" class="home-btn">回首頁</el-button>
            </router-link>
        </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Order from '../components/Order.vue'
import CartInfo from '../components/cart/CartInfo.vue'
import CartForm from '../components/cart/CartForm.vue'
import cartMixin from '../utils/cartMixin.js'

export default {
  name: 'CartList',
  components: {
    Order,
    CartInfo,
    CartForm
  },
  metaInfo: {
    title: '購物車結帳'
  },
  mixins: [cartMixin],
  data () {
    return {
      active: 0,
      currOrderId: ''
    }
  },
  computed: {
    ...mapState(['isLoading'])
  },
  created () {
    const { isPost = null } = this.getLocalStorage()
    // 如果已經Post過，直接進入Step 2
    if (isPost) this.next()
  },
  methods: {
    next () {
      this.active++

      if (this.active > 3) {
        this.active = 0
      }
    },
    async handleConfirmCart () {
      try {
        await this.$confirm('請再次確認商品，下一步後將無法更改', 'Warning', {
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        await this.$refs.cartInfo.postLocalCartListToCart()
        this.next()
      } catch (error) {
        this.$message.error('無法確認商品，請稍後再試')
      }
    },
    handleSubmit () {
      this.$refs.cartForm.validateForm('userForm')
    },
    afterFormSubmit (orderId) {
      this.currOrderId = orderId
      this.next()
    },
    handlePayOrder () {
      this.$refs.order.payOrder(this.currOrderId)
    },
    afterPayOrder () {
      this.next()
    }
  }
}
</script>

<style scoped>
.checkout-section {
  padding: 50px 30px 30px;
}

.main-section {
  margin-top: 30px;
}

.el-button {
  width: 100%;
  margin-top: 50px;
}

.el-button.order-btn,
.el-button.home-btn{
  margin-top: 20px;
}

.el-alert {
  padding: 16px;
  margin-bottom: 20px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .checkout-section {
    padding: 50px 80px 30px;
  }

  .el-button.home-btn{
    margin-top: 50px;
    margin-left: 10px;
  }
  .btn-wrapper{
    display: flex;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .checkout-section {
    padding: 50px 120px 30px;
  }
}
</style>
