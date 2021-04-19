<template>
  <div>
    <!-- Stepper -->
    <el-row type="flex" justify="center">
      <el-col :xs="20" :sm="18" :md="12">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="確認商品資訊"></el-step>
          <el-step title="填寫報名表單"></el-step>
          <el-step title="完成預定及付款"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <!-- main: 購物車 -> form -> 完成訂單 -->
    <el-main v-if="active === 0">
      <el-row>
        <el-col :span="18" :offset="3">
          <el-table
            stripe
            :data="cartList"
            :summary-method="getSummaries"
            show-summary
            style="width: 100%"
          >
            <el-table-column width="50" align="center">
              <template slot="header"></template>
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="removeCartItem(scope.row.id)"
                  ><i class="el-icon-delete"></i
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column
              min-width="150"
              prop="product.title"
              label="商品名稱"
            >
            </el-table-column>
            <el-table-column
              prop="qty"
              label="數量"
              min-width="50"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="product.unit"
              label="單位"
              min-width="50"
              align="center"
            >
            </el-table-column>
            <el-table-column
              v-if="final_total === total"
              prop="total"
              label="小計"
              min-width="50"
            >
            </el-table-column>
            <el-table-column
              v-else
              prop="final_total"
              label="小計"
              min-width="50"
              align="center"
            >
            </el-table-column>
            <el-table-column min-width="100" align="center">
              <template slot="header">
                <span>備註</span>
              </template>
              <template>
                <el-tag type="success" v-if="final_total !== total"
                  >已套用優惠券</el-tag
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="3">
          <el-input placeholder="請輸入優惠碼" v-model="couponCode">
            <template slot="append">
              <el-button @click.prevent.stop="addCoupon">
                套用優惠碼
              </el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </el-main>

    <!-- Form -->
    <el-main v-if="active === 1">
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

    <!-- 訂單 -->
    <el-main v-if="active === 2">
      <OrderTwo :currOrderId="currOrderId" />
    </el-main>

    <!-- Step control -->
    <el-row type="flex" justify="end">
      <el-col :span="6">
        <el-button v-if="active === 0" style="margin-top: 12px" @click="next"
          >下一步</el-button
        >
        <el-button
          v-if="active === 1"
          type="primary"
          style="margin-top: 12px"
          @click="validateForm('userForm')"
          >送出訂單</el-button
        >
        <el-button
          v-if="active === 2"
          @click="next"
          type="success"
          plain
          style="margin-top: 12px"
          >回首頁</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import customerAPI from "../apis/customer";
import { Toast } from "../utils/helper";
import { mapActions, mapState } from "vuex";
import OrderTwo from "../components/OrderTwo";

export default {
  name: "CartList",
  components: {
    OrderTwo,
  },
  data() {
    return {
      couponCode: "",
      active: 0,
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
      currOrderId: "-MYcUdSKmj1OAV1eEKHh",
    };
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cartInfo.cartList,
      total: (state) => state.cartInfo.total,
      final_total: (state) => state.cartInfo.final_total,
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    ...mapActions(["removeCartItem"]),
    async addCoupon() {
      try {
        const addData = {
          code: this.couponCode,
        };
        console.log(addData);
        const response = await customerAPI.postCoupon({ data: addData });
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
        this.couponCode = ""; // 清空優惠券欄位
        this.$store.dispatch("fetchCartProducts");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: `${error.message}，請重新輸入`,
        });
        this.couponCode = ""; // 清空優惠券欄位
      }
    },
    next() {
      console.log("currStep", this.active);
      this.active++;
      console.log("nextStep", this.active);
      if (this.active > 2) {
        this.$router.push("/");
        this.active = 0;
      }
    },
    getSummaries() {
      if (this.final_total !== this.total) {
        const sums = ["", "", "總價", this.total, "折扣價", this.final_total];
        return sums;
      } else {
        const sums = ["", "", "", "", "總價", this.total];
        return sums;
      }
    },
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通過驗證才送出
          this.confirmOrder();
          // console.log("submit");
          // this.next();
        } else {
          Toast.fire({
            icon: "warning",
            title: "請再次確認資料內容",
          });
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
        this.currOrderId = response.data.orderId;
        this.next();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: `${error.message}，請再次確認`,
        });
      }
    },
  },
};
</script>