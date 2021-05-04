<template>
  <el-container direction="vertical">
    <loading :active.sync="isLoading"></loading>
    <el-table height="100%" stripe :data="OrdersList">
      <el-table-column fixed prop="id" label="訂單編號" min-width="180">
      </el-table-column>
      <el-table-column prop="createdAt" label="日期" min-width="100">
      </el-table-column>
      <el-table-column prop="total" label="總金額" min-width="100">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>訂購人資訊</p>
          <p>姓名：{{ props.row.user.name }}</p>
          <p>信箱：{{ props.row.user.email }}</p>
          <p>電話：{{ props.row.user.tel }}</p>
          <p>地址：{{ props.row.user.address }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="user.name" label="購買人" min-width="100">
      </el-table-column>
      <el-table-column
        prop="is_paid"
        label="付款狀態"
        min-width="100"
        :filters="[
          { text: '已付款', value: true },
          { text: '尚未付款', value: !true },
        ]"
        :filter-method="filterTag"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.is_paid ? 'info' : 'danger'"
            disable-transitions
            >{{ scope.row.is_paid ? "已付款" : "尚未付款" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="paid_date" label="付款日期" min-width="100">
      </el-table-column>
      <el-table-column align="left" min-width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="showEditDialog(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-show"
            @click="showDetailDialog(scope.row)"
            >訂單明細</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- Detail顯示方塊 -->
    <el-dialog title="訂單明細" :visible.sync="detailDialogVisible">
      <el-table ref="productTable" :data="currDetailList" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="product.title" label="商品名稱" width="120">
        </el-table-column>
        <el-table-column property="qty" label="數量" width="120">
        </el-table-column>
        <el-table-column property="product.unit" label="單位" width="120">
        </el-table-column>
        <el-table-column property="product.price" label="單價">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 修改方塊 -->
    <!-- 假設只能修改訂單金額、狀態、訂購人資訊 -->
    <el-dialog
      title="編輯訂單"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="editDialogClosed"
    >
      <!-- 表單 -->
      <el-form ref="editForm" :rules="rules" :model="editOrder" status-icon>
        <el-row>
          <!-- 文字區 -->
          <el-col :span="24">
            <el-row>
              <el-col :span="11">
                <el-form-item label="訂購人姓名" prop="userName">
                  <el-input
                    type="text"
                    placeholder="請輸入訂購人姓名"
                    v-model="editOrder.userName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="1">
                <el-form-item label="訂購人電話" prop="userTel">
                  <el-input
                    type="number"
                    placeholder="訂購人電話"
                    v-model.number="editOrder.userTel"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="訂購人信箱" prop="userEmail">
              <el-input
                type="email"
                placeholder="請輸入訂購人信箱"
                v-model="editOrder.userEmail"
              ></el-input>
            </el-form-item>

            <el-form-item label="訂購人地址" prop="userAddress">
              <el-input
                type="text"
                placeholder="訂購人地址"
                v-model="editOrder.userAddress"
              ></el-input>
            </el-form-item>

            <el-form-item label="總金額" prop="total">
              <el-input
                type="number"
                placeholder="總金額"
                v-model="editOrder.total"
              ></el-input>
            </el-form-item>

            <el-form-item label="付款狀態" prop="is_paid">
              <el-checkbox v-model="editOrder.is_paid">{{
                editOrder.is_paid ? "已付款" : "尚未付款"
              }}</el-checkbox>
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
import mixin from "../../utils/mixin";

export default {
  data() {
    return {
      originOrder: [],
      OrdersList: [],
      isLoading: false,
      editOrder: {
        total: null,
        is_paid: null,
        userName: "",
        userTel: "",
        userAddress: "",
        userEmail: "",
      },
      editDialogVisible: false,
      detailDialogVisible: false,
      currDetailList: [],
      rules: {
        total: [
          {
            required: true,
            message: "總金額為必填",
            trigger: "blur",
          },
        ],
        userTel: [
          {
            required: true,
            message: "訂購人電話為必填",
            trigger: "blur",
          },
          {
            type: "number",
            message: "電話必須為數字",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "訂購人姓名為必填",
            trigger: "blur",
          },
        ],
        userEmail: [
          {
            required: true,
            message: "訂購人信箱為必填",
            trigger: "blur",
          },
          {
            type: "email",
            message: "請輸入正確的 Email 格式",
            trigger: "blur",
          },
        ],
        userAddress: [
          {
            required: true,
            message: "訂購人地址必填",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mixins: [mixin],
  created() {
    const { page } = this.$route.query;
    this.fetchOrdersList(page);
  },
  methods: {
    filterTag(value, row) {
      return row.is_paid === value;
    },
    async fetchOrdersList(page = 1) {
      try {
        this.isLoading = true;
        const response = await adminAPI.getOrders(page);
        if (response.data.success !== true) {
          throw new Error();
        }
        console.log("所有訂單", response.data);
        this.originOrder = response.data.orders;
        this.OrdersList = this.originOrder.map((item) => ({
          createdAt: this.dateFormat(item.create_at) || "",
          id: item.id || "",
          is_paid: item.is_paid || null,
          num: item.num || null,
          paid_date: this.dateFormat(item.paid_date) || "",
          products: item.products,
          total: item.total || null,
          user: { ...item.user } || null,
        }));
        this.$emit("renderPaginator", response.data.pagination);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        return Toast.fire({
          icon: "error",
          title: "無法取得訂單資料，請稍後再試",
        });
      }
    },
    showEditDialog(order) {
      console.log(order);
      const { id, total, is_paid, user } = order;
      console.log(user);
      this.editOrder = {
        id,
        total,
        is_paid,
        userName: user.name || "",
        userTel: user.tel || "",
        userAddress: user.address || "",
        userEmail: user.email || "",
      };
      this.editDialogVisible = true;
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
        const {
          total,
          is_paid,
          userName,
          userTel,
          userAddress,
          userEmail,
        } = this.editOrder;
        const originData = this.originOrder.find(
          (item) => item.id === this.editOrder.id
        );
        const editData = {
          ...originData,
          total,
          is_paid,
          user: {
            name: userName,
            tel: userTel,
            address: userAddress,
            email: userEmail,
          },
        };

        const response = await adminAPI.editOrder({
          id: this.editOrder.id,
          data: editData,
        });
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
        console.log(response);
        // 重新取得訂單列表
        await this.fetchOrdersList();
        // 重置表單（欄位清空、驗證重置）
        this.resetForm("editForm");
        // 關閉對話方塊
        this.editDialogVisible = false;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showDetailDialog(order) {
      this.currDetailList = Object.values(order.products);
      this.detailDialogVisible = true;
    },
  },
};
</script>