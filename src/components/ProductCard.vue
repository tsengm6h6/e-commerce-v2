<template>
  <div>
    <el-col :xs="24" :sm="12" :md="8" :lg="8">
      <el-card>
        <div class="image-wrapper">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img :src="product.image" class="image" />
          </router-link>
          <div class="mask">
            <el-button
              class="favorite-icon"
              v-if="product.isFavorite"
              @click.prevent.stop="toggleFavorite(product.id)"
              icon="el-icon-star-on"
              circle
            >
            </el-button>
            <el-button
              class="favorite-icon"
              v-else
              @click.prevent.stop="toggleFavorite(product.id)"
              icon="el-icon-star-off"
              circle
            >
            </el-button>
            <div class="add-to-cart" @click.prevent.stop="dialogVisible = true">
              加入購物車
            </div>
          </div>
        </div>

        <div class="card-content">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <h3 class="product-title">
              {{ product.title }}
            </h3>
          </router-link>
          <p class="price-tag">NT$ {{ product.price }} / {{ product.unit }}</p>
        </div>
      </el-card>
    </el-col>

    <!-- Cart Dialog -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="75%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :xs="24" :md="12">
          <img :src="product.image" alt="" class="dialog-image" />
        </el-col>
        <el-col :xs="24" :md="12" class="dialog-info">
          <h1>{{ product.title }}</h1>
          <p>NT$ {{ product.price }}</p>
          <span class="info-link">
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
          <el-button type="primary" @click="handleAddToCart"
            >加入購物車</el-button
          >
        </el-col>
      </el-row>
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
/* Card */
.el-card {
  border: none;
}

.el-card.is-always-shadow {
  box-shadow: none;
}

/* Card Image */
.image {
  display: block;
  position: relative;
  border-radius: 16px;
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

.image-wrapper {
  position: relative;
}

.image-wrapper:hover .mask {
  opacity: 1;
}

.image-wrapper:hover .mask .add-to-cart {
  opacity: 1;
  transform: scale(1, 1);
}

.mask {
  border-radius: 16px;
  width: 100%;
  height: 40vh;
  background: rgba(99, 99, 99, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all ease-out 0.3s;
}

.add-to-cart {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #00c9c8;
  color: #fff;
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 60px;
  text-align: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  opacity: 0;
  transform: scale(1, 0);
  transition: all ease-out 0.4s;
  transform-origin: bottom;
  cursor: pointer;
}

.el-button.favorite-icon {
  background: none;
  border: none;
  font-size: 36px;
  color: #fcfcfc;
  position: relative;
  bottom: 30px;
}

.el-button.favorite-icon:focus,
.el-button.favorite-icon:hover {
  background: none;
  color: #fcfcfc;
}

.el-button.favorite-icon:active {
  color: #fcfcfc;
}

/* Card content */
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product-title {
  margin: 10px 0;
  font-size: 20px;
  letter-spacing: 1px;
}

/* Dialog */

/* TODO:改不到 */
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
}

/* md */
@media only screen and (min-width: 992px) {
  .dialog-info * {
    margin-bottom: 20px;
  }

  .dialog-info > h1 {
    margin-top: 0;
    letter-spacing: 1px;
  }

  .dialog-image {
    height: 50vh;
  }
}
</style>