<template>
  <el-dialog
      title="編輯 / 新增產品"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="editDialogClosed"
    >
      <!-- 表單 -->
      <el-form ref="editForm" :rules="rules" :model="editCoupon" status-icon>
        <el-row>
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
        :loading="loading">確認</el-button
        >
      </span>
    </el-dialog>
</template>

<script>
import adminAPI from '@/apis/admin.js'

export default {
  name: 'CouponUpdateDialog',
  data () {
    return {
      loading: false,
      editCoupon: {
        code: '',
        due_date: '',
        id: null,
        is_enabled: null,
        num: 0,
        percent: null,
        title: ''
      },
      editDialogVisible: false,
      rules: {
        title: [
          {
            required: true,
            message: '優惠券名稱為必填',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '優惠代碼為必填',
            trigger: 'blur'
          }
        ],
        due_date: [
          {
            required: true,
            message: '優惠期限為必填',
            trigger: 'blur'
          }
        ],
        percent: [
          {
            required: true,
            message: '折扣為必填',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '折扣必須為數字',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    showEditDialog (isNew, coupon) {
      this.editCoupon = {
        ...coupon
      }
      this.editDialogVisible = true
    },
    editDialogClosed () {
      this.resetForm('editForm')
      this.editDialogVisible = false
    },
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit()
        } else {
          return false
        }
      })
    },
    async handleSubmit () {
      try {
        this.loading = true

        // 如果沒有id則新增、有id就編輯
        if (this.editCoupon.id) {
          const response = await adminAPI.editCoupon({
            id: this.editCoupon.id,
            data: this.editCoupon
          })
          if (response.data.success !== true) {
            throw new Error(response.data.message)
          }
        } else {
          const response = await adminAPI.addCoupon({
            data: this.editCoupon
          })
          if (response.data.success !== true) {
            throw new Error(response.data.message)
          }
        }
        // 通知父層重新取得優惠列表，重置表單並關閉對話框
        this.$emit('after-coupon-update', 1)
        this.resetForm('editForm')
        this.editDialogVisible = false
        this.loading = false
      } catch (error) {
        this.loading = false
        return this.$message.error('無法更新優惠券資料，請稍後再試')
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
