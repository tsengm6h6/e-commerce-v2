<template>
  <div>
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      <el-card :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :span="24">
            <router-link :to="{ name: 'product', params: { id: product.id } }">
              <img
                :src="product.image"
                class="image"
                style="
                  width: 100%;
                  height: 20vh;
                  object-fit: cover;
                  object-position: center;
                "
              />
            </router-link>
          </el-col>
          <el-col :span="24">
            <div style="padding: 20px">
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
              >
                <h3>
                  <a href="#" class="text-dark">{{ product.title }}</a>
                </h3>
              </router-link>
              <p>{{ product.content }}</p>
              <el-row>
                <el-col :span="24">
                  <div>NT$ {{ product.price }}</div>
                </el-col>
                <el-col :span="24">
                  <del>NT$ {{ product.origin_price }}</del>
                </el-col>
              </el-row>

              <div class="bottom clearfix">
                <el-row>
                  <el-col :span="24">
                    <el-button
                      type="primary"
                      plain
                      @click.prevent.stop="toggleFavorite(product.id)"
                    >
                      {{
                        product.isFavorite ? "取消收藏" : "加入收藏"
                      }}</el-button
                    >
                    <el-button
                      type="primary"
                      @click.prevent.stop="dialogVisible = true"
                      >加到購物車</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <!-- Dialog -->
    <el-dialog
      :title="product.title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="24">
          <img
            :src="product.image"
            alt=""
            style="
              width: 100%;
              height: 60vh;
              object-fit: cover;
              object-position: center;
            "
          />
        </el-col>
        <el-col :span="24">
          <p>{{ product.content }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <del>NT$ {{ product.origin_price }}</del>
        </el-col>
        <el-col :span="12">
          <div>NT$ {{ product.price }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-date-picker
            type="date"
            placeholder="請選擇日期"
            v-model="form.date"
            style="width: 100%"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
        <el-col :span="11" :offset="1">
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
            <el-option v-for="num in 10" :key="num" :label="num" :value="num">
              選購 {{ num }} {{ product.unit }}
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- TODO: 購物車 isloading 效果 & 關閉提示 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="addToCart">加入購物車</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "productCard",
  props: {
    initProduct: {
      type: Object,
      require: true,
    },
  },
  watch: {
    initProduct: {
      deep: true,
      handler(newVal) {
        this.product = {
          ...this.initProduct,
          ...newVal,
        };
      },
    },
  },
  data() {
    return {
      product: this.initProduct,
      selectedNum: "",
      dialogVisible: false,
      form: {
        data: "",
        time: "",
      },
      pickerOptions: {
        disabledDate: (time) => {
          // 參考文章：https://www.cnblogs.com/steamed-twisted-roll/p/9755651.html
          return time.getTime() < Date.now();
        },
      },
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    async addToCart() {
      const addData = {
        product_id: this.product.id,
        qty: this.selectedNum,
      };
      await this.$store.dispatch("addProductToCart", { addData });
      this.dialogVisible = false;
    },
    toggleFavorite(productId) {
      this.$emit("toggle-favorite", productId);
    },
    handleClose(done) {
      this.$confirm("確定取消選購嗎?")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.el-col {
  margin-bottom: 10px;
}
</style>