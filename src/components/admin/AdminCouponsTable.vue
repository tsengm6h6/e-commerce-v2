<template>
  <el-container direction="vertical">
    <el-main>
      <loading :active.sync="isLoading"></loading>
      <el-table stripe :data="couponsList">
        <el-table-column fixed prop="title" label="優惠券名稱" min-width="150">
        </el-table-column>
        <el-table-column prop="code" label="代碼" min-width="100">
        </el-table-column>
        <el-table-column prop="percent" label="折扣" min-width="100">
        </el-table-column>
        <el-table-column prop="due_date" label="期限" min-width="100">
        </el-table-column>
        <el-table-column prop="is_enabled" label="是否啟用" min-width="100">
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
      width="40%"
      @close="editDialogClosed"
    >
      <!-- 表單 -->
      <el-form ref="editForm" :rules="rules" :model="editCoupon" status-icon>
        <el-row>
          <!-- 文字區 -->
          <el-col :span="24">
            <el-form-item label="標題" prop="title">
              <el-input
                type="text"
                placeholder="請輸入優惠名稱"
                v-model="editCoupon.title"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="17">
                <el-form-item label="代碼" prop="code">
                  <el-input
                    type="text"
                    placeholder="請輸入代碼"
                    v-model="editCoupon.code"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item label="折扣" prop="percent">
                  <el-input
                    type="number"
                    placeholder="折扣"
                    v-model.number="editCoupon.percent"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="優惠期限" prop="due_date">
              <el-input
                type="date"
                placeholder="請輸入優惠期限"
                v-model="editCoupon.due_date"
              ></el-input>
            </el-form-item>

            <el-form-item label="是否啟用" prop="is_enabled">
              <el-checkbox
                v-model="editCoupon.is_enabled"
                :true-label="1"
                :false-label="0"
                >{{
                  editCoupon.is_enabled === 1 ? "啟用" : "未啟用"
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

    <!-- Pagination -->
    <!-- <el-row type="flex" class="row-bg" justify="center">
      <el-pagination
        :page-count="pagination.total_pages"
        :current-page.sync="pagination.current_page"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
      >
      </el-pagination>
    </el-row> -->
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
      couponsList: [],
      isLoading: false,
      editCoupon: {
        code: "",
        due_date: "",
        id: null,
        is_enabled: null,
        num: 0,
        percent: null,
        title: "",
      },
      editDialogVisible: false,
      deleteDialogVisible: false,
      deleteTargetId: "",
      rules: {
        title: [
          {
            required: true,
            message: "優惠券名稱為必填",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "優惠代碼為必填",
            trigger: "blur",
          },
        ],
        due_date: [
          {
            required: true,
            message: "優惠期限為必填",
            trigger: "blur",
          },
        ],
        percent: [
          {
            required: true,
            message: "折扣為必填",
            trigger: "blur",
          },
          {
            type: "number",
            message: "折扣必須為數字",
            trigger: ["blur", "change"],
          },
        ],
      },
      isDeleting: false,
    };
  },
  created() {
    const { page } = this.$route.query;
    this.fetchCouponsList(page);
  },
  methods: {
    async fetchCouponsList(page = 1) {
      try {
        this.isLoading = true;
        const response = await adminAPI.getCoupons(page);
        console.log(response);
        if (response.data.success !== true) {
          throw new Error();
        }
        this.couponsList = response.data.coupons;
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
    showEditDialog(isNew, coupon) {
      this.editCoupon = {
        ...coupon,
      };
      console.log(isNew, this.editCoupon);
      this.editDialogVisible = true;
      console.log(this.editCoupon.is_enabled);
    },
    editDialogClosed() {
      this.resetForm("editForm");
      this.editDialogVisible = false;
    },
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
        console.log({ id: this.editCoupon.id, data: this.editCoupon });
        // 如果沒有id則新增、有id就編輯
        if (this.editCoupon.id) {
          console.log("edit");
          const response = await adminAPI.editCoupon({
            id: this.editCoupon.id,
            data: this.editCoupon,
          });
          if (response.data.success !== true) {
            throw new Error(response.data.message);
          }
          console.log(response);
        } else {
          console.log("add");
          // 向後端 API 要求新增
          const response = await adminAPI.addCoupon({
            data: this.editCoupon,
          });
          if (response.data.success !== true) {
            throw new Error(response.data.message);
          }
          console.log(response);
        }
        // 重新取得優惠列表
        await this.fetchCouponsList();
        // 重置表單（欄位清空、驗證重置）
        this.resetForm("editForm");
        // 關閉對話方塊
        this.editDialogVisible = false;
        this.isLoading = false;
        // this.$store.dispatch("fetchProducts");
      } catch (error) {
        console.log(error);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showDeleteDialog(coupon) {
      this.deleteDialogVisible = true;
      this.deleteTargetId = coupon.id;
    },
    async deleteProduct(couponId) {
      try {
        this.isDeleting = true;
        const response = await adminAPI.removeCoupon(couponId);
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
        console.log(response);
        // 產品清單移除產品
        this.couponsList = this.couponsList.filter(
          (item) => item.id !== couponId
        );
        // 重置
        this.deleteTargetId = "";
        // 關閉對話框
        this.deleteDialogVisible = false;
        this.isDeleting = false;
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
  },
};
</script>