<template>
  <div class="cart-form">
    <!-- 訂單 -->
    <el-collapse class="collapse">
      <el-collapse-item title="購物車明細">
        <div class="collapse-table">
          <ol>
            <li v-for="(item, index) in cartList" :key="index">
              {{ index + 1 }}. {{ item.date }} {{ item.time }} {{ item.title }}*
              {{ item.qty }} {{ item.unit }} - NT$
              {{ item.price * item.qty }} 元
            </li>
          </ol>
          <p>總價：NT$ {{ total }} 元</p>
          <span v-if="final_total">折扣價：NT$ {{ final_total }} 元</span>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- coupon & form -->
    <div class="coupon">
      <h3>
        套用優惠碼<el-tag v-if="isCoupon" type="success">已套用優惠券</el-tag>
      </h3>

      <el-input
        placeholder="請輸入優惠碼"
        v-model="couponCode"
        :disabled="isCoupon"
      >
        <template slot="append">
          <el-button
            :loading="isLoading"
            @click.prevent.stop="addCoupon"
            :disabled="isCoupon"
          >
            套用優惠碼
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="form">
      <h3>填寫訂購人資訊</h3>
      <el-form
        ref="userForm"
        label-position="top"
        :rules="rules"
        :model="userForm"
        status-icon
      >
        <el-form-item label="Email" prop="email">
          <el-input
            type="email"
            placeholder="請輸入您的 Email"
            v-model="userForm.email"
          ></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input
            type="text"
            placeholder="請輸入您的姓名"
            v-model="userForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="手機號碼" prop="tel">
          <el-input
            type="tel"
            placeholder="請輸入您的手機號碼（eg. 0912-345-678）"
            v-model="userForm.tel"
          ></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input
            placeholder="請輸入您的地址"
            type="text"
            v-model="userForm.address"
          ></el-input>
        </el-form-item>

        <el-form-item label="留言給我們" prop="message">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="請輸入留言..."
            v-model="userForm.message"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import customerAPI from '@/apis/customer.js'
import { mapState } from 'vuex'
import cartMixin from '@/utils/cartMixin.js'

export default {
  name: 'CartForm',
  data () {
    return {
      couponCode: '',
      isCoupon: false,
      userForm: {
        name: '',
        email: '',
        tel: '',
        address: '',
        message: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '姓名為必填',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: ' Email為必填',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Email 格式不正確',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            message: '手機號碼為必填',
            trigger: 'blur'
          },
          {
            pattern: /\d{4}-\d{3}-\d{3}/,
            message: '格式須為10碼數字含符號（eg. 0912-345-678）',
            trigger: 'blur'
          },
          { len: 12, message: '數字最多為10碼', trigger: 'blur' }
        ],
        address: [
          {
            required: true,
            message: '地址為必填',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mixins: [cartMixin],
  computed: {
    ...mapState({
      cartList: (state) => state.cartInfo.cartList,
      total: (state) => state.cartInfo.total,
      final_total: (state) => state.cartInfo.final_total,
      isLoading: (state) => state.isLoading
    })
  },
  methods: {
    async addCoupon () {
      try {
        this.$store.commit('setLoading', true)
        const addData = {
          code: this.couponCode
        }
        const response = await customerAPI.postCoupon({ data: addData })
        if (response.data.success !== true) {
          throw new Error(response.data.message)
        }
        this.isCoupon = true
        await this.$store.dispatch('fetchCartProducts')
        this.updateLocalCartStatus('final_total', this.final_total)
        this.$message.success('購物明細已更新')
        this.$store.commit('setLoading', false)
      } catch (error) {
        this.$message.error(`${error.message}，請重新輸入`)
        this.couponCode = ''
        this.$store.commit('setLoading', false)
      }
    },
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmOrder()
        } else {
          this.$message.warning('請再次確認資料內容')
          return false
        }
      })
    },
    async confirmOrder () {
      try {
        this.$store.commit('setLoading', true)
        const { name, email, tel, address, message } = this.userForm
        const user = {
          name,
          email,
          tel,
          address
        }
        const response = await customerAPI.confirmOrder({
          data: { user },
          message: message.trim()
        })

        if (response.data.success !== true) {
          throw new Error(response.data.message)
        }
        // 重置購物車資料
        this.resetCartInfo()
        this.$store.commit('setLoading', false)
        // 通知父層更新
        this.$emit('after-form-submit', response.data.orderId)
      } catch (error) {
        this.$message.warning(`${error.message}，請再次確認`)
        this.$store.commit('setLoading', false)
      }
    },
    resetCartInfo () {
      // 清空state及LocalStorage購物車資料
      this.$store.commit('setCartInfo', {
        cartList: [],
        total: 0,
        final_total: 0
      })
      this.setLocalStorage({ cartList: [], total: 0 })
    }
  }
}
</script>

<style scoped>
.cart-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
}

.collapse,
.coupon,
.form {
  width: 100%;
}

ol {
  margin-bottom: 20px;
}

li {
  list-style: decimal;
}

.collapse-table span {
  font-size: 18px;
  font-style: italic;
  line-height: 24px;
  color: #f56c6c;
}

h3 {
  font-size: 16px;
  line-height: 40px;
  color: #44607a;
  font-weight: 500;
  margin-top: 20px;
}

.el-tag {
  margin: 10px;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 400;
}

.el-input,
.el-textarea {
  font-size: 16px;
}

/* md */
@media only screen and (min-width: 992px) {
  .collapse,
  .coupon,
  .form {
    width: 100%;
  }
}
</style>
