<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24">
        <el-table
          stripe
          :data="cartList"
          :summary-method="getSummaries"
          show-summary
          style="width: 100%"
        >
          <el-table-column min-width="80" align="center">
            <!-- TODO: 圖片待處理 -->
            <template slot-scope="scope">
              <div class="block">
                <el-avatar
                  shape="square"
                  :size="50"
                  :src="scope.row.image"
                  fit="fill"
                ></el-avatar>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="120" prop="title" label="商品名稱">
          </el-table-column>
          <el-table-column
            min-width="100"
            prop="date"
            label="日期"
            align="center"
          >
          </el-table-column>
          <el-table-column
            min-width="80"
            prop="time"
            label="時段"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="qty"
            label="數量"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <i
                class="el-icon-remove"
                style="cursor: pointer"
                @click="
                  updateCartRecord({ cartItem: scope.row, action: 'REDUCE' })
                "
              ></i>
              <span style="margin: 0 10px">{{ scope.row.qty }}</span>
              <i
                class="el-icon-circle-plus"
                style="cursor: pointer"
                @click="
                  updateCartRecord({
                    cartItem: scope.row,
                    action: 'INCREASE',
                  })
                "
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="單位"
            min-width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="單價"
            min-width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column label="小計" min-width="80" align="center">
            <template slot-scope="scope">
              {{ scope.row.price * scope.row.qty }}
            </template>
          </el-table-column>
          <el-table-column width="50" align="center">
            <template slot="header"></template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="
                  updateCartRecord({ cartItem: scope.row, action: 'REMOVE' })
                "
                ><i class="el-icon-delete"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import customerAPI from "../../apis/customer";
import { mapState } from "vuex";
import cartMixin from "../../utils/cartMixin";

export default {
  name: "CartInfo",
  mixins: [cartMixin],
  watch: {
    cartList: {
      handler() {
        if (!this.cartList.length) {
          this.$message.success("購物車空空的，歡迎繼續購物");
          return this.$router.push("/products");
        }
      },
    },
  },
  created() {
    if (!this.cartList.length) return this.$router.push("/products");
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cartInfo.cartList,
      total: (state) => state.cartInfo.total,
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    // ...mapActions(["postToCart"]),
    async postLocalCartListToCart() {
      this.$store.commit("setLoading", true);
      await Promise.all(
        Array.from(this.cartList, async (item) => {
          console.log("postLocalToAPICart", item);
          const addData = {
            product_id: item.product_id,
            qty: item.qty,
          };
          console.log(addData);
          await this.postToCart({ addData });
        })
      );
      this.updateLocalCartStatus("isPost", true);
      this.$store.commit("setLoading", false);
      console.log("All post!");
    },
    async postToCart({ addData }) {
      try {
        // addData 只需要id、qty
        const response = await customerAPI.postToCart({ data: addData });
        if (response.data.success !== true || !response.data.data.id) {
          throw new Error(response.data.message);
        }
        console.log("postToCart response", response);
      } catch (error) {
        console.log(error);
        this.$message.error("無法確認購物車數量，請稍後再試");
        this.$store.commit("setLoading", false);
      }
    },
    // async addCoupon() {
    //   try {
    //     await this.beforeAddCoupon();
    //     const addData = {
    //       code: this.couponCode,
    //     };
    //     const response = await customerAPI.postCoupon({ data: addData });
    //     if (response.data.success !== true) {
    //       throw new Error(response.data.message);
    //     }
    //     console.log(response);
    //     this.couponCode = ""; // 清空優惠券欄位
    //     this.$store.dispatch("fetchCartProducts");
    //     console.log("addCoupon dispatch fexthProducts");
    //   } catch (error) {
    //     console.log(error);
    //     this.$message.error(`${error.message}，請重新輸入`);
    //     this.couponCode = ""; // 清空優惠券欄位
    //   }
    // },
    getSummaries() {
      const sums = ["", "", "", "", "", "", "總價", this.total];
      return sums;
    },
  },
};
</script>