<template>
  <el-dialog
    title="編輯 / 新增產品"
    :visible.sync="UpdateDialogVisible"
    width="70%"
    :before-close="handleBeforeClose"
    @close="handleDialogClosed"
  >
    <!-- 表單 -->
    <el-form ref="editForm" :rules="rules" :model="editTarget" status-icon>
      <el-row :gutter="15">
        <!-- 圖片區 -->
        <el-col :span="10">
          <el-form-item label="輸入圖片網址">
            <el-input
              type="text"
              placeholder="請輸入圖片連結"
              v-model="editTarget.image"
            ></el-input>
          </el-form-item>
          <el-form-item label="或" prop="image">
            <el-upload
              ref="upload"
              :action="uploadPath"
              :headers="imageHeader"
              :before-upload="beforeAvatarUpload"
              :on-success="handleUplaodSuccess"
              :multiple="false"
            >
              <el-tooltip
                class="item"
                effect="light"
                content="圖片檔需小於 1 MB"
                placement="right-end"
              >
                <el-button size="small" type="primary" icon="el-icon-upload"
                  >上傳圖片</el-button
                >
              </el-tooltip>
            </el-upload>
            <img
              v-if="editTarget.image"
              width="100%"
              :src="editTarget.image"
              alt=""
            />
          </el-form-item>
        </el-col>
        <!-- 文字區 -->
        <el-col :span="14">
          <el-form-item label="標題" prop="title">
            <el-input
              type="text"
              placeholder="請輸入產品名稱"
              v-model="editTarget.title"
            ></el-input>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="分類" prop="category">
                <el-button
                  v-if="!addCategory"
                  size="mini"
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  @click="addCategory = true"
                  >新增分類</el-button
                >
                <template v-else>
                  <el-button
                    size="mini"
                    plain
                    icon="el-icon-close"
                    @click="handleCancelAddCategory"
                    >取消</el-button
                  >
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-check"
                    @click="handleConfirmAddCategory"
                    >確認</el-button
                  >
                </template>

                <el-select
                  style="width: 100%"
                  v-if="!addCategory"
                  v-model="editTarget.category"
                  placeholder="請選擇類別"
                  :disabled="addCategory"
                >
                  <el-option
                    v-for="item in categoryList.slice(1)"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <el-input
                  v-else
                  :disabled="!addCategory"
                  placeholder="請輸入新的分類"
                  v-model="cacheCategory"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="單位" prop="unit">
                <el-input
                  type="text"
                  placeholder="單位"
                  v-model="editTarget.unit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="售價（官網價格）" prop="price">
                <el-input
                  type="number"
                  placeholder="請輸入售價"
                  v-model="editTarget.price"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
            <el-popover
              placement="top-start"
              title="輸入格式：標題及結尾用 # 隔開，內容用 | 分開"
              width="400"
              trigger="hover"
            >
              <div>
                <p>費用包含 # [內容1] | [內容2] | [內容3] #</p>
                <p>行程內容 # [內容1] | [內容2] | [內容3] | [內容4] #</p>
                <p>報名條件 # [內容1] | [內容2] | [內容3] #</p>
              </div>
              <el-input
                slot="reference"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4 }"
                placeholder="請輸入產品描述"
                v-model="editTarget.description"
              >
              </el-input>
            </el-popover>
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
      <el-button @click.prevent.stop="handleDialogClosed">取消</el-button>
      <el-button
        type="primary"
        :loading="isLoading"
        @click.prevent.stop="validateForm('editForm')"
        >確認</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import adminAPI from "@/apis/admin.js";

export default {
  name: "ProductUpdateDialog",
  data() {
    return {
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
      addCategory: false,
      cacheCategory: "",
      UpdateDialogVisible: false,
      imageHeader: {
        Authorization: document.cookie.replace(
          /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        ),
      },
      uploadPath: process.env.VUE_APP_UPLOAD_URL,
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
    };
  },
  computed: {
    ...mapGetters(["categoryList"]),
  },
  methods: {
    // ***** 對話框控制 ****** //
    handleOpenDialog(product) {
      this.editTarget = {
        ...product,
      };
      this.UpdateDialogVisible = true;
    },
    async handleBeforeClose(done) {
      try {
        await this.$confirm("確定不存檔關閉嗎？");
        this.handleDialogClosed();
        done();
      } catch (error) {
        return;
      }
    },
    handleDialogClosed() {
      this.resetForm("editForm");
      this.UpdateDialogVisible = false;
    },
    // ***** 表單行為 ****** //
    handleConfirmAddCategory() {
      this.editTarget = {
        ...this.editTarget,
        category: this.cacheCategory,
      };
    },
    handleCancelAddCategory() {
      this.cacheCategory = "";
      this.editTarget.category = "";
      this.addCategory = false;
    },
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit();
        } else {
          return false;
        }
      });
    },
    async handleSubmit() {
      try {
        this.isLoading = true;
        // 如果有id就編輯、沒有id則新增
        if (this.editTarget.id) {
          await this.submitEdit({
            id: this.editTarget.id,
            data: this.editTarget,
          });
        } else {
          await this.submitCreate({ data: this.editTarget });
        }
        // 通知父層重新取得產品列表（管理員列表更新）
        this.$emit("after-submit");
        this.resetForm("editForm");
        this.UpdateDialogVisible = false;
        this.isLoading = false;
        // 請store重新取得所有產品（客戶首頁產品更新）
        this.$store.dispatch("fetchProducts");
      } catch (error) {
        this.isLoading = false;
        this.UpdateDialogVisible = false;
        this.$message.error(`無法更新資料，請稍後再試`);
      }
    },
    async submitEdit({ id, data }) {
      try {
        const response = await adminAPI.editProduct({
          id,
          data,
        });
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async submitCreate({ data }) {
      try {
        const response = await adminAPI.addProduct({
          data,
        });
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    resetForm(formName) {
      this.cacheCategory = "";
      this.addCategory = false;
      this.$refs[formName].resetFields();
    },
    // ***** 圖片處理 ****** //

    // 上傳前確認格式及大小，並整理成formData
    beforeAvatarUpload(file) {
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
    // 上傳成功 -> 存下回傳的url
    handleUplaodSuccess(res) {
      if (res.success !== true) {
        return this.$message.error(`${res.message}`);
      }
      this.editTarget.image = res.imageUrl;
    },
    // 上傳失敗 -> 回傳錯誤訊息
    handleError(err) {
      return this.$message.error(`${err.message}`);
    },
  },
};
</script>