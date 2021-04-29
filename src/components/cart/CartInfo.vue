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
            min-width="80"
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
    <!-- <el-row>
      <el-col :span="18" :offset="3">
        <el-input placeholder="請輸入優惠碼" v-model="couponCode">
          <template slot="append">
            <el-button :loading="isLoading" @click.prevent.stop="addCoupon">
              套用優惠碼
            </el-button>
          </template>
        </el-input>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import customerAPI from "../../apis/customer";
import { mapState, mapActions } from "vuex";

export default {
  name: "CartInfo",
  data() {
    return {
      // couponCode: "",
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
    ...mapActions(["updateCartRecord", "postToCart"]),
    async beforeAddCoupon() {
      await Promise.all(
        Array.from(this.cartList, async (item) => {
          console.log("beforeAddCoupon", item);
          const addData = {
            product_id: item.product_id,
            qty: item.qty,
          };
          console.log(addData);
          await this.postToCart({ addData });
        })
      );
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
    // TODO: 總價重新計算
    getSummaries() {
      const sums = ["", "", "", "", "", "", "總價", this.total];
      return sums;
    },
  },
};
</script>