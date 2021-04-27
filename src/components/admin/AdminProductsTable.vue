<template>
  <el-container>
    <!-- 產品列表 -->
    <el-main>
      <loading :active.sync="isLoading"></loading>
      <el-table stripe :data="productsList">
        <el-table-column fixed prop="title" label="產品名稱" min-width="180">
        </el-table-column>
        <el-table-column prop="category" label="分類" min-width="80">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>描述：</p>
            <p>{{ props.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="簡介" min-width="180">
        </el-table-column>
        <el-table-column prop="origin_price" label="原價" min-width="80">
        </el-table-column>
        <el-table-column prop="price" label="售價" min-width="80">
        </el-table-column>
        <el-table-column prop="is_enabled" label="是否啟用" min-width="80">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.is_enabled === 1 ? 'success' : 'info'"
              disable-transitions
              >{{ scope.row.is_enabled === 1 ? "啟用" : "未啟用" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="180">
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
    </el-main>

    <ProductUpdateDialog ref="dialog" @after-submit="handleAfterSubmit" />
  </el-container>
</template>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>

<script>
import adminAPI from "../../apis/admin";
import { Toast } from "../../utils/helper";
import ProductUpdateDialog from "../admin/ProductUpdateDialog";

export default {
  name: "AdminProductsTable",
  components: {
    ProductUpdateDialog,
  },
  data() {
    return {
      productsList: [],
      isLoading: false,
    };
  },
  created() {
    const { page } = this.$route.query;
    this.fetchProductsList(page);
  },
  methods: {
    async fetchProductsList(page = 1) {
      try {
        this.isLoading = true;
        const response = await adminAPI.getProducts(page);
        // 取得的Products為{ }物件 轉成陣列
        if (response.data.success !== true) {
          throw new Error();
        }
        const { products } = response.data;
        this.productsList = Object.values(products).map((item) => ({
          category: item.category || "",
          content: item.content || "",
          description: item.description || "目前尚無詳細描述",
          id: item.id,
          image: item.image || "",
          is_enabled: item.is_enabled,
          origin_price: item.origin_price ? item.origin_price : "",
          price: item.price,
          title: item.title || "",
          unit: item.unit || "",
        }));
        this.$emit("renderPaginator", response.data.pagination);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        return Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    showUpdateDialog(product) {
      this.$refs.dialog.handleOpenDialog(product);
    },
    async handleAfterSubmit() {
      try {
        this.isLoading = true;
        const { page } = this.$route.query;
        await this.fetchProductsList(page);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.$message.error("無法取得資料，請稍後再試");
      }
    },
    async confirmDelete(productId) {
      try {
        await this.$confirm("產品將永久刪除，是否繼續？", "警告", {
          confirmButtonText: "確認",
          cancelButtonText: "取消",
          type: "warning",
          beforeClose: async (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "刪除中...";
              try {
                const response = await adminAPI.removeProduct(productId);
                if (response.data.success !== true) {
                  throw new Error(response.data.message);
                }
                console.log(response);
                // 產品清單移除產品
                this.productsList = this.productsList.filter(
                  (item) => item.id !== productId
                );
                // store 重新取得產品清單
                this.$store.dispatch("fetchProducts");
                instance.confirmButtonLoading = false;
                done();
              } catch (error) {
                console.log(error);
                this.$message({
                  type: "info",
                  message: "刪除失敗，請再試一次",
                });
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = "確認";
              }
            } else {
              done();
            }
          },
        });
        this.$message({
          type: "success",
          message: "已刪除產品",
        });
      } catch (error) {
        this.$message({
          type: "info",
          message: "取消刪除",
        });
      }
    },
    // 上傳前確認格式、大小，並整理成formData
    beforeAvatarUpload(file) {
      console.log(this.$refs.upload.input);
      if (!file) return;
      const isLt1M = file.size < 1 * 1024 * 1024;
      const isJPG = file.type === "image/jpeg";
      if (!isLt1M) {
        this.$message.error("檔案必須小於 1 MB");
        return isLt1M;
      }
      if (!isJPG) {
        this.$message.error("檔案格式錯誤");
        return isJPG;
      }
      const formData = new FormData();
      return formData.append("file-to-upload", file);
    },
    // 上傳成功則存下回傳的url
    handleAvatarSuccess(res, file) {
      console.log("成功", res, file);
      if (res.success !== true) {
        return this.$message.error(`${res.message}`);
      }
      this.editTarget.image = res.imageUrl;
    },
    // 上傳失敗回傳錯誤訊息
    handleError(err) {
      return this.$message.error(`${err.message}`);
    },
  },
};
</script>