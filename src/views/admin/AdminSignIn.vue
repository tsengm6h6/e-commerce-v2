<template>
  <el-row type="flex" justify="center" style="margin-top: 100px">
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
import authorizationAPI from "../../apis/authorization";

export default {
  name: "signin",
  data() {
    return {
      signInForm: {
        email: "",
        password: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "請輸入您的密碼",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "請輸入您的 Email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "請輸入正確的 Email 格式",
            trigger: "blur",
          },
        ],
      },
      isLoading: false,
    };
  },
  methods: {
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通過驗證才送出
          this.handleSubmit();
        } else {
          this.$message.error("請再次確認資料內容");
          return false;
        }
      });
    },
    async handleSubmit() {
      try {
        this.isLoading = true;
        const userData = {
          username: this.signInForm.email,
          password: this.signInForm.password,
        };
        const response = await authorizationAPI.signIn(userData);
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
        const { token, expired } = response.data;
        // 儲存cookie
        document.cookie = `hexToken=${token}; expired=${new Date(expired)}`;
        this.$store.commit("setLoginStatus", response.data.success);
        this.isLoading = false;
        this.$router.push("/admin/dashboard?activeIndex=1&page=1");
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.$message.error(`${error.message}，請再試一次`);
      }
    },
  },
};
</script>