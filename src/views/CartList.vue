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
          <el-table stripe :data="cartList" style="width: 100%">
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
      <!-- 自製的總價計算TODO: 金額不會連動，還是要用現成的總價計算 -->
      <el-row>
        <el-col :span="18" :offset="3">
          <el-table
            :show-header="false"
            stripe
            :data="sumList"
            style="width: 100%"
          >
            <el-table-column min-width="100" align="center">
              <template slot="header"></template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="總計"
              min-width="100"
              align="right"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="金額"
              min-width="100"
              align="right"
            >
            </el-table-column>
            <el-table-column min-width="100" align="center">
              <template slot="header"></template>
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
    <!-- TODO: 驗證未通過要擋Submit -->
    <el-main v-if="active === 1">
      <el-row>
        <el-col :span="12" :offset="6">
          <h4>訂購人資訊</h4>
          <hr />
        </el-col>
        <el-col :span="12" :offset="6">
          <div style="margin: 20px"></div>
          <el-form
            ref="form"
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
      <el-row>
        <el-col :span="18" :offset="3">
          <h4>訂單編號：{{ currOrder.id }}</h4>
          <p>請盡快完成付款</p>
          <el-divider></el-divider>
          <div>
            <p>訂購人資訊</p>
            <p>姓名：{{ currOrder.user.name }}</p>
            <p>電話：{{ currOrder.user.tel }}</p>
            <p>地址：{{ currOrder.user.address }}</p>
            <p>信箱：{{ currOrder.user.email }}</p>
          </div>
          <el-divider></el-divider>
        </el-col>
        <el-col :span="18" :offset="3">
          <p>訂單明細</p>
          <el-table :data="currOrder.productsList" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <p>產品名稱：{{ props.row.product.title }}</p>
                <p>數量：{{ props.row.qty }} / {{ props.row.product.unit }}</p>
                <p>單價：{{ props.row.product.price }}</p>
                <!-- <p>Zip: {{ props.row.zip }}</p> -->
              </template>
            </el-table-column>
            <el-table-column label="日期" prop="createdAt"></el-table-column>
            <el-table-column label="付款狀態" prop="isPaid"> </el-table-column>
            <el-table-column label="總計" prop="final_total"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
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
          @click="next"
          >送出訂單</el-button
        >
        <el-button
          v-if="active === 2"
          type="success"
          plain
          style="margin-top: 12px"
          @click="next"
        >
          <router-link to="/"> 回首頁 </router-link>
        </el-button>
        <el-button
          v-if="active === 2"
          @click="payOrder"
          type="success"
          style="margin-top: 12px"
          >確認付款</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import customerAPI from "../apis/customer";
import { Toast } from "../utils/helper";
import { mapActions, mapState } from "vuex";

export default {
  name: "CartList",
  data() {
    return {
      couponCode: "",
      active: 0,
      sumList: [
        {
          name: "總價",
          price: this.$store.state.cartInfo.total,
        },
        {
          name: "折扣價",
          price: this.$store.state.cartInfo.final_total,
        },
      ],
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
      currOrderId: "",
      currOrder: {
        createdAt: "",
        id: "",
        isPaid: null,
        message: "",
        productsList: [],
        total: null,
        user: {},
      },
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
    async next() {
      try {
        if (this.active === 1) {
          await this.confirmOrder();
          await this.fetchOrder(this.currOrderId);
          return this.active++;
        }
        this.active++;
        if (this.active > 2) this.active = 0;
      } catch (error) {
        console.log(error);
      }
    },
    async confirmOrder() {
      try {
        // TODO: message必填驗證
        const { name, email, tel, address, message } = this.userForm;
        const user = {
          name,
          email,
          tel,
          address,
        };
        console.log(user, message);
        const response = await customerAPI.confirmOrder({
          data: { user },
          message: message.trim(),
        });
        if (response.data.success !== true) {
          throw new Error(response.data.message);
        }
        const orderId = response.data.orderId;
        this.currOrderId = orderId;
        // this.$router.push({ name: "order", params: { order_id: orderId } });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: `${error.message}，請再次確認`,
        });
      }
    },
    async fetchOrder(orderId) {
      try {
        // this.isLoading = true;
        const response = await customerAPI.getOrder(orderId);
        if (response.data.success !== true) {
          throw new Error();
        }
        console.log(response.data);
        const {
          create_at: createdAt,
          id,
          is_paid: isPaid,
          message,
          products,
          total,
          user,
        } = response.data.order;

        // 轉換日期格式
        const date = new Date(createdAt);
        const yyyy = date.getFullYear();
        const mm =
          (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        const dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
        this.currOrder = {
          id,
          message,
          productsList: Object.values(products).map((item) => ({
            ...item,
            createdAt: `${yyyy}-${mm}-${dd}`,
            isPaid: isPaid ? "已付款" : "尚未付款",
            total,
          })),
          user: { ...user } || {},
        };
        if (!isPaid) {
          Toast.fire({
            icon: "warning",
            title: "您的訂單已建立，請盡快完成付款",
          });
        }
        // this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得訂單，請稍後再試",
        });
        // this.isLoading = false;
      }
    },
    async payOrder() {
      // ...
      this.next();
    },
  },
};
</script>