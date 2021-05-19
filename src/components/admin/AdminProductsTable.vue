<template>
  <div>
    <!-- 產品列表 -->

    <loading :active.sync="isLoading"></loading>
    <el-table stripe :data="productsList" height="80vh">
      <el-table-column fixed prop="title" label="產品名稱" min-width="150">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分類"
        min-width="80"
        :filters="categoryFilter"
        :filter-method="filterCategory"
      >
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>描述：</p>
          <p>{{ props.row.description }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="簡介" min-width="250">
      </el-table-column>
      <el-table-column prop="origin_price" label="原價" min-width="80">
      </el-table-column>
      <el-table-column prop="price" label="售價" min-width="80">
      </el-table-column>
      <el-table-column
        prop="is_enabled"
        label="是否啟用"
        min-width="80"
        :filters="[
          { text: '已啟用', value: 1 },
          { text: '未啟用', value: 0 },
        ]"
        :filter-method="filterIsEnabled"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.is_enabled === 1 ? 'success' : 'info'"
            disable-transitions
            >{{ scope.row.is_enabled === 1 ? "啟用" : "未啟用" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="left" min-width="80">
        <template slot="header">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="showUpdateDialog(null)"
            >新增產品</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="showUpdateDialog(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="confirmDelete(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <ProductUpdateDialog ref="dialog" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import adminAPI from '@/apis/admin.js'
import { Toast } from '@/utils/helper.js'
import ProductUpdateDialog from '../admin/ProductUpdateDialog.vue'

export default {
  name: 'AdminProductsTable',
  components: {
    ProductUpdateDialog
  },
  metaInfo: {
    title: '產品列表'
  },
  data () {
    return {
      productsList: [],
      isLoading: false,
      categoryFilter: [
        {
          text: '水肺潛水',
          value: '水肺潛水'
        },
        {
          text: '自由潛水',
          value: '自由潛水'
        },
        {
          text: '潛水旅遊',
          value: '潛水旅遊'
        },
        {
          text: '體驗系列',
          value: '體驗系列'
        }
      ]
    }
  },
  created () {
    const { page } = this.$route.query
    this.fetchProductsList(page)
  },
  methods: {
    filterCategory (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    filterIsEnabled (value, row) {
      return row.is_enabled === value
    },
    async fetchProductsList (page = 1) {
      try {
        this.isLoading = true
        const response = await adminAPI.getProducts(page)
        if (response.data.success !== true) {
          throw new Error()
        }
        const { products } = response.data
        // 將取得的物件轉成陣列
        this.productsList = Object.values(products).map((item) => ({
          category: item.category || '',
          content: item.content || '',
          description: item.description || '目前尚無詳細描述',
          id: item.id,
          image: item.image || '',
          is_enabled: item.is_enabled,
          origin_price: item.origin_price ? item.origin_price : '',
          price: item.price,
          title: item.title || '',
          unit: item.unit || ''
        }))
        this.$emit('renderPaginator', response.data.pagination)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        return Toast.fire({
          icon: 'error',
          title: '無法取得產品資料，請稍後再試'
        })
      }
    },
    showUpdateDialog (product) {
      this.$refs.dialog.handleOpenDialog(product)
    },
    async handleAfterSubmit () {
      try {
        this.isLoading = true
        const { page } = this.$route.query
        await this.fetchProductsList(page)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$message.error('無法取得產品資料，請稍後再試')
      }
    },
    async confirmDelete (productId) {
      try {
        await this.$confirm('產品將永久刪除，是否繼續？', '警告', {
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '刪除中...'
              try {
                const response = await adminAPI.removeProduct(productId)
                if (response.data.success !== true) {
                  throw new Error(response.data.message)
                }

                // 畫面移除產品
                this.productsList = this.productsList.filter(
                  (item) => item.id !== productId
                )
                // store重新取得產品清單
                this.$store.dispatch('fetchProducts')
                instance.confirmButtonLoading = false
                done()
              } catch (error) {
                this.$message({
                  type: 'info',
                  message: '刪除失敗，請再試一次'
                })
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '確認'
              }
            } else {
              done()
            }
          }
        })
        this.$message({
          type: 'success',
          message: '已刪除產品'
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消刪除'
        })
      }
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
