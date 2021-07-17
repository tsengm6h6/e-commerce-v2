<template>
  <!-- Cart Dialog -->
  <el-dialog :visible.sync="dialogVisible" width="80%">
      <div class="dialog-image">
        <img :src="product.image" alt="product" />
      </div>
      <div class="dialog-info">
        <h1>{{ product.title }}</h1>
        <p>NT$ {{ product.price }}</p>
        <span class="info-link" @click="dialogVisible = false">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            更多資訊
          </router-link>
        </span>
        <el-form
        ref="submitForm"
        label-position="top"
        :rules="rules"
        :model="submitForm"
        status-icon
        >
          <el-form-item label="日期" prop="date">
            <el-date-picker
              type="date"
              placeholder="請選擇日期"
              v-model="submitForm.date"
              style="width: 100%"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="時段" prop="time">
            <el-time-select
              v-model="submitForm.time"
              :picker-options="{
                start: '07:00',
                step: '02:00',
                end: '15:00',
              }"
              placeholder="請選擇時段"
              style="width: 100%"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item :label="'人數（單位：'+product.unit+'）'">
            <el-select
              v-model="submitForm.selectedNum"
              placeholder="請選擇報名人數"
              style="width: 100%"
            >
              <el-option v-for="num in 10" :key="num" :label="num" :value="num">
                選購 {{ num }} {{ product.unit }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn-wrapper">
          <el-button type="primary" @click="validateForm ('submitForm')"
            >加入購物車</el-button
          >
          <el-button type="danger" @click="handleBuyNow">立即購買</el-button>
        </div>
      </div>
  </el-dialog>
</template>

<script>
import cartMixin from '../utils/cartMixin.js'
import { rules } from '../utils/helper.js'

export default {
  name: 'AddToCartDialog',
  mixins: [cartMixin],
  data () {
    const { required } = rules
    return {
      dialogVisible: false,
      product: {},
      submitForm: {
        date: '',
        time: '',
        selectedNum: 1
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        date: [required],
        time: [required]
      }
    }
  },
  methods: {
    handleOpen (initProduct) {
      this.product = { ...initProduct }
      this.resetDialogForm()
      this.dialogVisible = true
    },
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleAddToCart()
        } else {
          return false
        }
      })
    },
    handleAddToCart () {
      this.addToCart(this.product, this.submitForm)
      this.dialogVisible = false
      this.resetDialogForm()
      this.$gtm.trackEvent({
        event: 'add-to-cart',
        category: '購買事件',
        action: 'add-to-cart',
        label: 'add-to-cart',
        items: this.product.title,
        value: this.product.price * this.submitForm.selectedNum
      })
    },
    handleBuyNow () {
      this.handleAddToCart()
      this.$router.push('/checkout')
    },
    resetDialogForm () {
      this.submitForm = {
        data: '',
        time: '',
        selectedNum: 1
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.dialog-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.dialog-info {
  padding: 20px;

  h1 {
    font-size: 26px;
  }

  p {
    font-weight: 600;
    font-size: 20px;
    color: #44607a;
  }

  .info-link {
    text-decoration: underline;
    color: #00c9c8;
    display: block;
    text-align: end;
    margin-bottom: 20px;
    a {
      color: #00c9c8;
    }
  }

  .el-button {
    width: 100%;
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.el-form--label-top /deep/ .el-form-item__label {
  padding: 10px 0 10px;
}

/deep/ .el-form-item__label {
  line-height: 16px;
}

.el-input,
.el-textarea {
  font-size: 16px;
}

/* md */
@media only screen and (min-width: 992px) {
  /deep/.el-dialog__body {
    display: flex;
  }

  .dialog-image,
  .dialog-info {
    flex: 1;
  }

  .dialog-info {
    padding: 0 0 0 20px;
    h1 {
      font-size: 32px;
      letter-spacing: 1px;
    }

    .el-button {
      flex: 1;
      &:not(:last-child) {
        margin: 0 10px 0 0;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
