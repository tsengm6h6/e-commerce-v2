<template>
  <div class="product-section">
    <Loading v-if="isLoading" />
    <template v-else>
      <div class="title-wrapper">
        <h1>{{ product.title }}</h1>
        <p>{{ product.content }}</p>
      </div>

      <!-- 大圖 -->
      <el-image :src="product.image" fit="cover">
        <img
          slot="error"
          class="image-slot"
          src="https://i.imgur.com/m4YOpWy.png"
          alt="error"
        />
      </el-image>

      <div class="info-wrapper">
        <!-- Info -->
        <el-row>
          <!-- 商品資訊、簡介 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="14">
            <div
              class="info"
              v-for="(descript, index) in product.description"
              :key="index"
            >
              <h3>{{ descript.title }}</h3>
              <ul>
                <li v-for="(info, index) in descript.infos" :key="index">
                  {{ info }}
                </li>
              </ul>
            </div>
          </el-col>

          <el-col :xs="{ span: 22, offset: 1 }" :sm="12" :md="12" :lg="10">
            <div class="price-wrapper">
              <div class="price-tag-wrapper">
                <p>
                  <span class="price-tag">${{ product.price }}</span
                  >{{ product.unit }}
                </p>
                <del v-if="product.origin_price"
                  >${{ product.origin_price }}{{ product.unit }}</del
                >
              </div>
              <hr />
              <p>開放報名中</p>
              <el-button type="danger" @click.prevent.stop="handleOpenDialog"
                >立即報名</el-button
              >
              <p>三人團報、平日班，享有每人$500折扣優惠，最多可折$1000每人。</p>
            </div>
          </el-col>

          <AddToCartDialog ref="dialog"/>
        </el-row>
      </div>
    </template>

    <RelativeProduct ref="relative" />
  </div>
</template>

<script>
import customerAPI from '../apis/customer.js'
import cartMixin from '../utils/cartMixin.js'
import AddToCartDialog from '../components/AddToCartDialog.vue'
import RelativeProduct from '../components/RelatvieProduct.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'product',
  components: {
    AddToCartDialog,
    RelativeProduct,
    Loading
  },
  metaInfo () {
    return {
      title: this.product.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.product.description },
        { property: 'og:title', content: `DIVE IN 戶外冒險團隊 | ${this.product.title}` },
        { property: 'og:url', content: `https://tsengm6h6.github.io/e-commerce-v2/product/${this.product.id}` },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.product.image }
      ]
    }
  },
  data () {
    return {
      product: {
        category: '',
        content: '',
        description: '',
        id: '',
        image: '',
        is_enabled: 0,
        num: 1,
        origin_price: null,
        price: null,
        title: '',
        unit: ''
      },
      isLoading: false
    }
  },
  mixins: [cartMixin],
  created () {
    const { id } = this.$route.params
    this.fetchProduct(id)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchProduct(id)
    next()
  },
  methods: {
    async fetchProduct (id) {
      try {
        this.isLoading = true
        const response = await customerAPI.getProduct({ id })
        if (response.data.success !== true) {
          throw new Error()
        }
        // 處理描述
        const description = response.data.product.description
        const descript = description ? description.split('#').slice(0) : []
        const descriptTitle = []
        const descriptInfo = []
        descript.forEach((item, index) => {
          if (index % 2 === 0) {
            descriptTitle.push(item)
          } else {
            const items = item.split('|')
            descriptInfo.push(items)
          }
        })
        const desctiptionFormat = descriptTitle.map((title, index) => {
          return {
            title: title,
            infos: descriptInfo[index]
          }
        })
        this.product = {
          ...this.product,
          ...response.data.product,
          description: desctiptionFormat
        }
        this.isLoading = false
        this.$refs.relative.category = this.product.category
        this.$refs.relative.currId = this.product.id
      } catch (error) {
        this.$message.error('無法取得頁面，請稍後再試')
        this.isLoading = false
      }
    },
    handleOpenDialog () {
      this.$refs.dialog.handleOpen(this.product)
    }
  }
}
</script>

<style lang='scss' scoped>
.product-section {
  padding: 0 20px;
}

.title-wrapper {
  padding-top: 60px;

  h1 {
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  p {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
  }
}

.el-image,
.info-wrapper {
  padding-top: 30px;
}

.el-image {
  width: 100%;
  height: 50vh;
}

.image-slot {
  width: 50%;
  object-position: center;
  position: relative;
  top: 50px;
  left: 30%;
}

.info-wrapper .info {
  font-weight: 400;
  letter-spacing: 1px;
  margin: 0 20px 20px;

  &:not(:first-child) {
    margin-top: 20px;
  }

  li {
    position: relative;
    left: 15px;
    line-height: 30px;

    &:first-child {
      margin-top: 10px;
    }
  }
}

.price-wrapper {
  width: 100%;
  border: 1px solid #8c8f95;
  padding: 30px;
  border-radius: 16px;
  letter-spacing: 1px;
  margin-top: 20px;

  P {
    margin: 10px 0;
  }

  .price-tag {
    font-size: 20px;
    font-weight: 400;
    color: #f56c6c;
    font-style: italic;
  }

  .el-button {
    width: 100%;
    margin: 10px 0;
  }
}

.price-tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
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

    .price-tag {
      font-size: 28px;
    }
  }

}
</style>
