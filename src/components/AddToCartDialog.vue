<template>
  <!-- Cart Dialog -->
  <el-dialog :visible.sync="dialogVisible" width="75%">
    <el-row>
      <el-col :xs="24" :md="12">
        <img :src="product.image" alt="" class="dialog-image" />
      </el-col>
      <el-col :xs="24" :md="12" class="dialog-info">
        <h1>{{ product.title }}</h1>
        <p>NT$ {{ product.price }}</p>
        <span class="info-link" @click="dialogVisible = false">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            更多資訊
          </router-link>
        </span>
        <el-date-picker
          type="date"
          placeholder="請選擇日期"
          v-model="form.date"
          style="width: 100%"
          :picker-options="pickerOptions"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-time-select
          v-model="form.time"
          :picker-options="{
            start: '07:00',
            step: '02:00',
            end: '15:00',
          }"
          placeholder="請選擇時段"
          style="width: 100%"
        >
        </el-time-select>
        <el-select
          v-model="selectedNum"
          placeholder="請選擇報名人數"
          style="width: 100%"
        >
          <el-option v-for="num in 10" :key="num" :label="num" :value="num">
            選購 {{ num }} {{ product.unit }}
          </el-option>
        </el-select>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleAddToCart"
            >加入購物車</el-button
          >
          <el-button type="danger" @click="handleBuyNow">立即購買</el-button>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import cartMixin from '../utils/cartMixin.js'

export default {
  name: 'AddToCartDialog',
  mixins: [cartMixin],
  data () {
    return {
      dialogVisible: false,
      product: {},
      selectedNum: '',
      form: {
        data: '',
        time: ''
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  methods: {
    handleOpen (initProduct) {
      this.product = { ...initProduct }
      this.dialogVisible = true
    },
    handleAddToCart () {
      if (!this.product || !this.selectedNum || !this.form) {
        return this.$message.warning(
          '所有欄位為必填，請確認選購日期、時段及人數'
        )
      }
      this.addToCart(this.product, this.selectedNum, this.form)
      this.dialogVisible = false
      this.resetDialogForm()
    },
    handleBuyNow () {
      this.handleAddToCart()
      this.$router.push('/checkout')
    },
    resetDialogForm () {
      this.selectedNum = ''
      this.form = {
        data: '',
        time: ''
      }
    }
  }
}
</script>

<style scoped>
.el-dialog {
  width: 80%;
}

.dialog-image {
  width: 100%;
  height: 30vh;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
}

.dialog-info {
  padding: 0 20px;
}

.dialog-info * {
  margin-bottom: 10px;
}

.dialog-info > h1 {
  font-size: 26px;
  margin-top: 20px;
}

.dialog-info > p {
  font-weight: 600;
  font-size: 20px;
  color: #44607a;
}

.dialog-info .info-link {
  text-decoration: underline;
  color: #00c9c8;
  display: block;
  text-align: end;
  margin-bottom: 20px;
}

.dialog-info .info-link > a {
  color: #00c9c8;
}

.dialog-info .el-button {
  width: 100%;
  margin: 0 0 10px;
}

/* md */
@media only screen and (min-width: 992px) {
  .dialog-info * {
    margin-bottom: 20px;
  }

  .dialog-info > h1 {
    margin-top: 0;
    font-size: 32px;
    letter-spacing: 1px;
  }

  .dialog-image {
    height: 376px;
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0px;
  }

  .dialog-info .el-button {
    width: 48%;
  }
}
</style>
