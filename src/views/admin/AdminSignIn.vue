<template>
  <el-row type="flex" justify="center" style="margin-top: 100px; z-index: 2">
    <el-col :xs="20" :sm="16" :md="12" :lg="6">
      <p style="width: 100%; text-align: center">管理員登入</p>
      <el-form ref="signInForm" :rules="rules" :model="signInForm" status-icon>
        <el-form-item label="Email" prop="email">
          <el-input
            type="email"
            placeholder="請輸入您的Email"
            v-model="signInForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input
            type="text"
            placeholder="請輸入您的密碼"
            v-model="signInForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="validateForm('signInForm')"
            :loading="isLoading"
            >登入</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import authorizationAPI from '@/apis/authorization.js'
import { rules } from '@/utils/helper.js'

export default {
  name: 'signin',
  data () {
    const { required, email } = rules
    return {
      signInForm: {
        email: '',
        password: ''
      },
      rules: {
        password: [required],
        email: [required, email]
      },
      isLoading: false
    }
  },
  methods: {
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit()
        } else {
          this.$message.error('請再次確認資料內容')
          return false
        }
      })
    },
    async handleSubmit () {
      try {
        this.isLoading = true
        const userData = {
          username: this.signInForm.email,
          password: this.signInForm.password
        }
        const response = await authorizationAPI.signIn(userData)
        if (response.data.success !== true) {
          throw new Error(response.data.message)
        }
        const { token, expired } = response.data
        document.cookie = `hexToken=${token}; expired=${new Date(expired)}`
        this.$store.commit('setLoginStatus', response.data.success)
        this.isLoading = false
        this.$router.push('/admin/dashboard?activeIndex=1&page=1')
      } catch (error) {
        this.isLoading = false
        this.$message.error(`${error.message}，請再試一次`)
      }
    }
  }
}
</script>
