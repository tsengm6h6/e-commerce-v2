<template>
  <Loading v-if="spinner" class="spinner" />
  <div v-else>
    <div class="banner">
      <div class="banner-text">
        <h1 class="title">夏日限定</h1>
        <div class="text-wrapper">
          <h1>官網報名全活動</h1>
          <h1>享8折優惠</h1>
        </div>
        <el-button type="danger" @click="doCopy">點我領取優惠</el-button>
      </div>
    </div>
    <el-container direction="vertical" class="products-section">
      <el-row align="bottom" class="bread-crumb-and-select">
        <!-- BreadCrumb -->
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 12, offset: 0 }"
          :md="{ span: 12, offset: 0 }"
          :lg="{ span: 24, offset: 3 }"
        >
          <div class="breadcrumb">
            <Breadcrumb />
            <span class="category">{{ category }}</span>
          </div>
        </el-col>
        <!-- < lg Selector -->
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 8, offset: 4 }"
          :md="{ span: 7, offset: 5 }"
          class="hidden-lg-and-up"
        >
          <el-select v-model="category">
            <el-option
              v-for="item in categoryList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <!-- > lg sideMenu -->
        <el-col :lg="3" class="hidden-md-and-down">
          <AsideMenu />
        </el-col>

        <!-- Cards -->
        <el-col :md="24" :lg="21">
          <el-row :gutter="0">
            <ProductCard
              v-for="product in filterProductsList"
              :key="product.id"
              :init-product="product"
              @open-dialog="handleOpenDialog"
            />
          </el-row>
        </el-col>
      </el-row>
    </el-container>
    <AddToCartDialog ref="dialog" />
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import AsideMenu from '../components/AsideMenu.vue'
import { mapGetters, mapState } from 'vuex'
import Loading from '../components/Loading.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import AddToCartDialog from '../components/AddToCartDialog.vue'

export default {
  name: 'Products',
  components: {
    ProductCard,
    AsideMenu,
    Loading,
    Breadcrumb,
    AddToCartDialog
  },
  metaInfo () {
    return {
      title: '所有活動',
      meta: [
        { vmid: 'description', name: 'description', content: 'PADI 認證五星潛水中心，小班制的專業教學及活動安排，帶各位夥伴一起上山下海，不定期推出國內外潛水旅遊或探險新企劃，不怕沒有伴、只怕你不來' },
        { property: 'og:title', content: 'DIVE IN 戶外冒險團隊 | 所有活動' },
        { property: 'og:url', content: 'https://tsengm6h6.github.io/e-commerce-v2/products' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://imgur.com/fWhPYSU' }
      ]
    }
  },
  data () {
    return {
      pagination: {},
      spinner: false
    }
  },
  computed: {
    ...mapState(['productsList', 'isLoading', 'category', 'currCoupon']),
    ...mapGetters(['filterProductsList', 'categoryList']),
    category: {
      get () {
        return this.$store.state.category
      },
      set (value) {
        this.$store.commit('setCategory', value)
      }
    }
  },
  methods: {
    handleOpenDialog (product) {
      this.$refs.dialog.handleOpen(product)
    },
    async doCopy () {
      try {
        await this.$copyText('summervibe')
        this.$message.success('成功複製優惠碼！')
      } catch (err) {
        this.$message.danger('無法複製優惠碼，請稍後再試')
      }
    }
  }
}
</script>

<style scoped>
.spinner {
  margin-top: 30px;
}

.products-section {
  padding: 30px;
}

.banner {
  width: 100%;
  height: 60vh;
  position: relative;
  background-image: url("~@/assets/image/banner.webp");
  background-size: cover;
  background-position: 30%;
}

.banner-text {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: white;
  position: absolute;
  top: 10px;
  left: 23%;
}

h1 {
  letter-spacing: 1px;
}

.el-button {
  padding: 12px 20px;
  letter-spacing: 1px;
  font-weight: 600;
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
}

.bread-crumb-and-select {
  margin: 0 0 20px;
}

.breadcrumb {
  display: flex;
  align-items: baseline;
}

.category {
  font-size: 14px;
}

.category::before {
  content: "/";
  margin: 5px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .banner-text {
    align-items: flex-start;
  }

  .text-wrapper {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .products-section {
    padding: 30px 80px 60px;
  }

  .bread-crumb-and-select {
    margin: 30px 10px 20px;
  }
}

/* md */
@media only screen and (min-width: 992px) {

  .banner-text {
    top: 0px;
  }

  .products-section {
    padding: 30px 120px 60px;
  }

  .bread-crumb-and-select {
    margin: 30px 20px 10px;
  }
}
</style>
