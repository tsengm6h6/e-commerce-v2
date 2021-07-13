<template>
  <el-dialog
      title="編輯訂單"
      :visible.sync="UpdateDialogVisible"
      width="40%"
      @close="handleDialogClosed"
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
                  type="string"
                  placeholder="訂購人電話"
                  v-model="editOrder.userTel"
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
              v-model.number="editOrder.total"
            ></el-input>
          </el-form-item>

          <el-form-item label="付款狀態" prop="isPaid">
            <el-checkbox v-model="editOrder.isPaid">{{
              editOrder.isPaid ? "已付款" : "尚未付款"
            }}</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.prevent.stop="handleDialogClosed">取消</el-button>
      <el-button type="primary" @click.prevent.stop="beforeValidateForm"
      :loading='loading'>確認</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import adminMixin from '@/utils/adminMixin.js'
import { rules } from '@/utils/helper.js'

export default {
  name: 'OrderUpdateDialog',
  mixins: [adminMixin],
  data () {
    const { required, telPattern, telLength, email, priceRange } = rules
    return {
      loading: false,
      originData: {}, // 原始資料
      editOrder: {}, // 可以編輯的內容
      editTarget: {}, // 編輯後的整包資料
      UpdateDialogVisible: false,
      rules: {
        total: [required, priceRange],
        userTel: [required, telPattern, telLength],
        userName: [required],
        userEmail: [required, email],
        userAddress: [required]
      }
    }
  },
  methods: {
    showEditDialog (order, initOriginData) {
      this.originData = { ...initOriginData } // 複製原有的資料

      const { id, total, isPaid, user } = order // 假設只能修改訂單金額、狀態、訂購人資訊
      this.editOrder = {
        id,
        total,
        isPaid,
        userName: user.name || '',
        userTel: user.tel || '',
        userAddress: user.address || '',
        userEmail: user.email || ''
      }
      this.UpdateDialogVisible = true
    },
    beforeValidateForm () {
      const {
        total,
        isPaid,
        userName,
        userTel,
        userAddress,
        userEmail
      } = this.editOrder

      // 整理呈後端 API 原本的形式（eg. user 物件）
      this.editTarget = {
        ...this.originData,
        total,
        is_paid: isPaid,
        user: {
          name: userName,
          tel: userTel,
          address: userAddress,
          email: userEmail
        }
      }
      this.validateForm('editForm', 'Order')
    }
  }
}
</script>
