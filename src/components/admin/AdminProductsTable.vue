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
              @click="showEditDialog(true, null)"
              >新增產品</el-button
            >
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(false, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="showDeleteDialog(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- 修改產品內容 對話方塊  TODO: 上傳圖片-->
    <el-dialog
      title="編輯 / 新增產品"
      :visible.sync="editDialogVisible"
      width="60%"
      @close="editDialogClosed"
    >
      <!-- 表單 -->
      <el-form ref="editForm" :rules="rules" :model="editTarget" status-icon>
        <el-row>
          <!-- 圖片區 -->
          <el-col :span="7">
            <el-form-item label="輸入圖片網址">
              <el-input
                type="text"
                placeholder="請輸入圖片連結"
                v-model="editTarget.image"
              ></el-input>
            </el-form-item>
            <el-form-item label="或 上傳圖片" prop="image">
              <el-upload
                ref="upload"
                action="https://vue-course-api.hexschool.io/api/myvueable/admin/upload"
                :headers="imageHeader"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-error="handleError"
                :multiple="false"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- 文字區 -->
          <el-col :span="16" :offset="1">
            <el-form-item label="標題" prop="title">
              <el-input
                type="text"
                placeholder="請輸入產品名稱"
                v-model="editTarget.title"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="17">
                <el-form-item label="分類" prop="category">
                  <el-input
                    type="text"
                    placeholder="請輸入分類"
                    v-model="editTarget.category"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item label="單位" prop="unit">
                  <el-input
                    type="text"
                    placeholder="單位"
                    v-model="editTarget.unit"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="售價（官網價格）" prop="price">
                  <el-input
                    type="number"
                    placeholder="請輸入售價"
                    v-model="editTarget.price"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="原價" prop="origin_price">
                  <el-input
                    type="number"
                    placeholder="請輸入原價"
                    v-model="editTarget.origin_price"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="內容簡介" prop="content">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="請輸入內容簡介"
                v-model="editTarget.content"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="產品描述" prop="description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4 }"
                placeholder="請輸入產品描述"
                v-model="editTarget.description"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="是否啟用" prop="is_enabled">
              <el-checkbox
                v-model="editTarget.is_enabled"
                :true-label="1"
                :false-label="0"
                >{{
                  editTarget.is_enabled === 1 ? "啟用" : "未啟用"
                }}</el-checkbox
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.prevent.stop="editDialogClosed">取消</el-button>
        <el-button type="primary" @click.prevent.stop="validateForm('editForm')"
          >確認</el-button
        >
      </span>
    </el-dialog>

    <!-- 刪除產品 對話方塊 -->
    <el-dialog
      title="確定要刪除此產品嗎？"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center
      @close="deleteTargetId = ''"
    >
      <span class="btn">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button
          type="danger"
          :loading="isDeleting"
          @click="deleteProduct(deleteTargetId)"
          >確定</el-button
        >
      </span>
    </el-dialog>
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

export default {
  data() {
    return {
      productsList: [],
      isLoading: false,
      editTarget: {
        category: "",
        content: "",
        description: "",
        id: "",
        image: "",
        is_enabled: null,
        origin_price: null,
        price: null,
        title: "",
        unit: "",
      },
      dialogImgVisible: false,
      imageHeader: {
        Authorization: document.cookie.replace(
          /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        ),
      },
      editDialogVisible: false,
      deleteDialogVisible: false,
      deleteTargetId: "",
      rules: {
        title: [
          {
            required: true,
            message: "產品名稱為必填",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "分類為必填",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "簡介為必填",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "售價為必填",
            trigger: "blur",
          },
        ],
        unit: [
          {
            required: true,
            message: "單位為必填",
            trigger: "blur",
          },
        ],
      },
      isDeleting: false,
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
    showEditDialog(isNew, product) {
      this.editTarget = {
        ...product,
      };
      console.log(isNew, this.editTarget);
      this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.resetForm("editForm");
      this.editDialogVisible = false;
    },
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO: 可以刪掉（在這裡console表單出來的結果還未更新）
          this.handleSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async handleSubmit() {
      try {
        this.isLoading = true;
        console.log({ id: this.editTarget.id, data: this.editTarget });
        // 如果沒有id則新增、有id就編輯
        if (this.editTarget.id) {
          console.log("edit");
          // 將 editTarget 資料更新到後端 API（非同步）
          const response = await adminAPI.editProduct({
            id: this.editTarget.id,
            data: this.editTarget,
          });
          if (response.data.success !== true) {
            throw new Error(response.data.message);
          }
        } else {
          console.log("add");
          // 向後端 API 要求新增
          const response = await adminAPI.addProduct({
            data: this.editTarget,
          });
          if (response.data.success !== true) {
            throw new Error(response.data.message);
          }
        }
        // 重新取得產品列表
        await this.fetchProductsList();
        // 重置表單（欄位清空、驗證重置）
        this.resetForm("editForm");
        // 關閉對話方塊
        this.editDialogVisible = false;
        this.isLoading = false;
        // 請store重新取得所有產品
        this.$store.dispatch("fetchProducts");
      } catch (error) {
        console.log(error);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showDeleteDialog(product) {
      this.deleteDialogVisible = true;
      this.deleteTargetId = product.id;
    },
    async deleteProduct(productId) {
      try {
        this.isDeleting = true;
        const response = await adminAPI.removeProduct(productId);
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
        console.log(response);
        // 產品清單移除產品
        this.productsList = this.productsList.filter(
          (item) => item.id !== productId
        );
        // 重置
        this.deleteTargetId = "";
        // 關閉對話框
        this.deleteDialogVisible = false;
        this.isDeleting = false;
        this.$store.dispatch("fetchProducts");
      } catch (error) {
        console.log(error);
        this.deleteDialogVisible = false;
        this.isDeleting = false;
        return Toast.fire({
          icon: "error",
          title: "無法刪除產品，請稍後再試",
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