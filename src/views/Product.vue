<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- Carousel -->
    <div class="block">
      <el-carousel height="60vh" indicator-position="none" arrow="never">
        <el-carousel-item v-for="item in 4" :key="item">
          <el-image
            :src="product.image"
            style="
              width: 100%;
              height: auto;
              object-fit: cover;
              object-position: top;
            "
          ></el-image>
          <el-image style="width: 100%; height: 100%">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- Info -->
    <el-row>
      <!-- 商品資訊、簡介 -->
      <el-col :span="18">
        <!-- TODO: 內容待更新 -->
        <div class="placeholder"></div>
      </el-col>

      <!-- 報名資料填寫 -->
      <el-col :span="6">
        <div>
          <el-row>
            <el-col :span="24">
              <del>NT$ {{ product.origin_price }}</del>
            </el-col>
            <el-col :span="24">
              <div>NT$ {{ product.price }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker
                type="date"
                placeholder="請選擇日期"
                v-model="form.date"
                style="width: 100%"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-col>
            <el-col :span="24">
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
            </el-col>
            <el-col :span="24">
              <el-select
                v-model="selectedNum"
                placeholder="請選擇報名人數"
                style="width: 100%"
              >
                <el-option
                  v-for="num in 10"
                  :key="num"
                  :label="num"
                  :value="num"
                >
                  選購 {{ num }} {{ product.unit }}
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-button type="primary" @click="handleAddToCart"
                >加入購物車</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- More Info -->
    <el-row>
      <el-col :span="24">
        <!-- TODO: 內容待更新 -->
        <div class="placeholder2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import customerAPI from "../apis/customer";
import { Toast } from "../utils/helper";
import cartMixin from "../utils/cartMixin";

export default {
  name: "product",
  components: {},
  data() {
    return {
      product: {
        category: "",
        content: "",
        description: "",
        id: "",
        image: "",
        is_enabled: 0,
        num: 1,
        origin_price: null,
        price: null,
        title: "",
        unit: "",
      },
      isAdding: false,
      isLoading: false,
      selectedNum: "",
      form: {
        data: "",
        time: "",
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  mixins: [cartMixin],
  created() {
    const { id } = this.$route.params;
    this.fetchProduct(id);
  },
  methods: {
    async fetchProduct(id) {
      try {
        this.isLoading = true;
        const response = await customerAPI.getProduct({ id });
        if (response.data.success !== true) {
          throw new Error();
        }
        this.product = {
          ...this.product,
          ...response.data.product,
        };
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得頁面，請稍後再試",
        });
        this.isLoading = false;
      }
    },
    handleAddToCart() {
      this.isAdding = true;
      this.addToCart(this.product, this.selectedNum, this.form);
      this.isAdding = false;
      this.resetDialogForm();
    },
    resetDialogForm() {
      (this.selectedNum = ""),
        (this.form = {
          data: "",
          time: "",
        });
    },
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.image-slot {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder {
  width: 100%;
  height: 30vh;
  background: #c4c4c4;
}

.placeholder2 {
  width: 100%;
  height: 50vh;
  background: #dddddd;
}
</style>