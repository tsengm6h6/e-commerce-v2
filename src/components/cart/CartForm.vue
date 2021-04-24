<template>
  <el-main>
    <el-row>
      <el-col :span="12" :offset="6">
        <h4>訂購人資訊</h4>
        <hr />
      </el-col>
      <el-col :span="12" :offset="6">
        <div style="margin: 20px"></div>
        <el-form
          ref="userForm"
          label-position="top"
          :rules="rules"
          :model="userForm"
          status-icon
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="Email" prop="email">
                <el-input
                  type="email"
                  placeholder="請輸入您的 Email"
                  v-model="userForm.email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="姓名" prop="name">
                <el-input
                  type="text"
                  placeholder="請輸入您的姓名"
                  v-model="userForm.name"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="電話" prop="tel">
                <el-input
                  type="tel"
                  placeholder="請輸入您的電話"
                  v-model.number="userForm.tel"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址" prop="address">
                <el-input
                  placeholder="請輸入您的地址"
                  type="text"
                  v-model="userForm.address"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="留言" prop="message">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="請留言..."
                  v-model="userForm.message"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import customerAPI from "../../apis/customer";

export default {
  name: "CartForm",
  data() {
    return {
      userForm: {
        name: "",
        email: "",
        tel: "",
        address: "",
        message: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "請輸入您的姓名",
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
        tel: [
          {
            required: true,
            message: "請輸入您的電話",
            trigger: "blur",
          },
          { type: "number", message: "電話必須為數字" },
        ],
        address: [
          {
            required: true,
            message: "請輸入您的地址",
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: "請輸入您的留言",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit");
          this.confirmOrder();
        } else {
          this.$message.warning("請再次確認資料內容");
          return false;
        }
      });
    },
    async confirmOrder() {
      try {
        const { name, email, tel, address, message } = this.userForm;
        const user = {
          name,
          email,
          tel,
          address,
        };
        const response = await customerAPI.confirmOrder({
          data: { user },
          message: message.trim(),
        });
        console.log(response);
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
        const cartInfo = {
          cartList: [],
          total: 0,
          final_total: 0,
        };
        // 清空state購物車資料
        this.$store.commit("setCartInfo", cartInfo);
        // 通知父層更新
        this.$emit("after-form-submit", response.data.orderId);
      } catch (error) {
        console.log(error);
        this.$message.warning(`${error.message}，請再次確認`);
      }
    },
  },
};
</script>