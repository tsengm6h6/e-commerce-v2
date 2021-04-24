<template>
  <div>
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      <el-card :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :span="24">
            <router-link :to="{ name: 'product', params: { id: product.id } }">
              <img :src="product.image" class="image" />
              <el-button
                class="heart-icon"
                v-if="product.isFavorite"
                @click.prevent.stop="toggleFavorite(product.id)"
                icon="el-icon-star-on"
                circle
              >
              </el-button>
              <el-button
                class="heart-icon"
                v-else
                @click.prevent.stop="toggleFavorite(product.id)"
                icon="el-icon-star-off"
                circle
              >
              </el-button>
            </router-link>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="card-content">
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
              >
                <h3>
                  {{ product.title }}
                </h3>
              </router-link>
              <!-- <p>{{ product.content }}</p> -->
              <div class="price-tag">
                NT$ {{ product.origin_price }} / {{ product.unit }}
                <i
                  @click.prevent.stop="dialogVisible = true"
                  class="shop-icon el-icon-shopping-cart-2"
                ></i>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <!-- Cart Dialog -->
    <el-dialog
      :title="product.title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="6">
          <img
            :src="product.image"
            alt=""
            style="
              width: 100%;
              height: 180px;
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
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
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
        <el-button type="primary" @click="handleAddToCart"
          >加入購物車</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cartMixin from "../utils/cartMixin";
import mixin from "../utils/cartMixin";

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
  mixins: [cartMixin, mixin],
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
          return time.getTime() < Date.now();
        },
      },
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    handleAddToCart() {
      this.addToCart(this.product, this.selectedNum, this.form);
      this.dialogVisible = false;
      this.resetDialogForm();
    },
    resetDialogForm() {
      (this.selectedNum = ""),
        (this.form = {
          data: "",
          time: "",
        });
    },
    toggleFavorite(productId) {
      console.log("toggle");
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

.image {
  display: block;
  position: relative;
  border-radius: 16px;
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

.heart-icon {
  position: absolute;
  top: 2%;
  right: 5%;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.shop-icon {
  font-size: 24px;
  position: relative;
  top: 2px;
  cursor: pointer;
}

.el-card.is-always-shadow {
  box-shadow: none;
}

.el-card {
  border: none;
}

h3 {
  margin: 0;
  margin-bottom: 10px;
}
</style>