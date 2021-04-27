<template>
  <div class="product-section">
    <loading :active.sync="isLoading"></loading>
    <div class="title-wrapper">
      <h1>{{ product.title }}</h1>
      <p>{{ product.content }}</p>
    </div>

    <!-- 大圖 -->
    <el-image :src="product.image" fit="cover">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>

    <div class="info-wrapper">
      <!-- Info -->
      <el-row>
        <!-- 商品資訊、簡介 -->
        <el-col :xs="24" :sm="12" :md="12" :lg="14">
          <!-- TODO: 內容待更新 -->
          <div class="info">
            <h3>費用包含</h3>
            <ul>
              <li>遊艇船費（4~4.5小時）</li>
              <li>船長、水手各（1位）</li>
              <li>專業隨團海陸空攝影師（1位）</li>
              <li>水下戒護導潛（1位）</li>
            </ul>
          </div>
          <div class="info">
            <h3>行程內容</h3>
            <ul>
              <li>遊艇船費（4~4.5小時）</li>
              <li>船長、水手各（1位）</li>
              <li>專業隨團海陸空攝影師（1位）</li>
              <li>水下戒護導潛（1位）</li>
            </ul>
          </div>
          <div class="info">
            <h3>報名條件</h3>
            <ul>
              <li>遊艇船費（4~4.5小時）</li>
              <li>船長、水手各（1位）</li>
              <li>專業隨團海陸空攝影師（1位）</li>
              <li>水下戒護導潛（1位）</li>
            </ul>
          </div>
        </el-col>

        <el-col :xs="{ span: 16, offset: 4 }" :sm="12" :md="12" :lg="10">
          <div class="price-wrapper">
            <p>
              <span class="price-tag">${{ product.price }}</span
              >{{ product.unit }}
            </p>
            <hr />
            <p>開放報名中</p>
            <el-button type="danger" @click.prevent.stop="handleOpenDialog"
              >立即報名</el-button
            >
            <p>三人團報、平日班，享有每人$500折扣優惠，最多可折$1000每人。</p>
          </div>
        </el-col>

        <AddToCartDialog ref="dialog" :product="product" />
      </el-row>
    </div>
  </div>
</template>

<script>
import customerAPI from "../apis/customer";
import { Toast } from "../utils/helper";
import cartMixin from "../utils/cartMixin";
import AddToCartDialog from "../components/AddToCartDialog";

export default {
  name: "product",
  components: {
    AddToCartDialog,
  },
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
      isLoading: false,
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
    handleOpenDialog() {
      this.$refs.dialog.handleOpen(this.product);
    },
  },
};
</script>

<style scoped>
.product-section {
  padding: 0 20px;
}

.title-wrapper {
  padding-top: 60px;
  color: #414141;
}

.title-wrapper > h1 {
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 1px;
}

.title-wrapper > p {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
}

.el-image,
.info-wrapper {
  padding-top: 30px;
}

.el-image {
  height: 50vh;
}

.info-wrapper .info {
  font-weight: 400;
  letter-spacing: 1px;
  margin: 20px;
}

.info-wrapper .info li:first-child {
  margin-top: 10px;
}
.info-wrapper li {
  position: relative;
  left: 15px;
}

.price-wrapper {
  width: 100%;
  border: 1px solid #8c8f95;
  padding: 30px;
  border-radius: 16px;
  letter-spacing: 1px;
  margin-top: 20px;
}

.price-wrapper p {
  margin: 10px 0;
}

.price-wrapper .price-tag {
  font-size: 20px;
  font-weight: 400;
  color: #f56c6c;
  font-style: italic;
}

.price-wrapper .el-button {
  width: 100%;
  margin: 10px 0;
}

/* sm */
@media only screen and (min-width: 768px) {
  .product-section {
    padding: 0 80px;
  }

  .el-image {
    height: 80vh;
  }
  .price-wrapper {
    padding: 30px;
    margin-top: 0;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .product-section {
    padding: 0 150px;
  }

  .el-image {
    height: 100vh;
  }

  .price-wrapper {
    padding: 50px;
  }

  .price-wrapper .price-tag {
    font-size: 28px;
  }
}
</style>