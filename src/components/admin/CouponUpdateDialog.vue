<template>
  <el-dialog
      title="編輯 / 新增產品"
      :visible.sync="UpdateDialogVisible"
      width="40%"
      @close="handleDialogClosed"
    >
      <!-- 表單 -->
      <el-form ref="editForm" :rules="rules" :model="editTarget" status-icon>
        <el-row>
          <el-col :span="24">
            <el-form-item label="標題" prop="title">
              <el-input
                type="text"
                placeholder="請輸入優惠名稱"
                v-model="editTarget.title"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="17">
                <el-form-item label="代碼" prop="code">
                  <el-input
                    type="text"
                    placeholder="請輸入代碼"
                    v-model="editTarget.code"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item label="折扣" prop="percent">
                  <el-input
                    type="number"
                    placeholder="折扣"
                    v-model.number="editTarget.percent"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="優惠期限" prop="due_date">
              <el-input
                type="date"
                placeholder="請輸入優惠期限"
                v-model="editTarget.due_date"
              ></el-input>
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
        <el-button type="primary" @click.prevent.stop="validateForm('editForm', 'Coupon')"
        :loading="loading">確認</el-button
        >
      </span>
    </el-dialog>
</template>

<script>
import adminMixin from '@/utils/adminMixin.js'

export default {
  name: 'CouponUpdateDialog',
  mixins: [adminMixin],
  data () {
    return {
      loading: false,
      UpdateDialogVisible: false,
      editTarget: {},
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
  }
}
</script>
