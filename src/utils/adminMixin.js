import adminAPI from '@/apis/admin.js'
export default {
  methods: {
    // **** 對話框開關 **** //
    // content 預設值從父層傳入
    handleOpenDialog (content) {
      this.editTarget = {
        ...content
      }
      this.UpdateDialogVisible = true
    },
    handleDialogClosed () {
      this.resetForm('editForm')
      this.UpdateDialogVisible = false
    },
    // **** 表單行為 **** //
    validateForm (formName, actionName) { // 紀錄來源
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit(actionName)
        } else {
          return false
        }
      })
    },
    async handleSubmit (actionName) {
      try {
        this.loading = true
        // 如果有id就編輯、沒有id則新增
        if (this.editTarget.id) {
          await this.submitEdit({
            id: this.editTarget.id,
            data: this.editTarget
          }, actionName)
        } else {
          await this.submitCreate({ data: this.editTarget }, actionName)
        }
        this.afterSubmit(actionName)
      } catch (error) {
        this.loading = false
        this.UpdateDialogVisible = false
        this.$message.error('無法更新資料，請稍後再試')
      }
    },
    async submitEdit ({ id, data }, actionName) {
      try {
        const response = await adminAPI[`edit${actionName}`]({
          id,
          data
        })
        if (response.data.success !== true) {
          throw new Error(response.data.message)
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async submitCreate ({ data }, actionName) {
      try {
        const response = await adminAPI[`add${actionName}`]({
          data
        })
        if (response.data.success !== true) {
          throw new Error(response.data.message)
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    afterSubmit (actionName) {
      // 通知父層重新取得產品列表（管理員列表更新）
      this.$emit(`after-${actionName.toLowerCase()}-submit`)
      this.handleDialogClosed()
      this.loading = false
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
