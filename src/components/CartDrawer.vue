<template>
  <el-drawer title="購物車" :visible.sync="drawer">
    <div class="drawer-container" v-if="cartList.length">
      <div class="item-wrapper">
        <div class="item" v-for="item in cartList" :key="item.product_id">
          <div class="avatar">
            <el-avatar
              shape="square"
              :size="80"
              :src="item.image"
              fit="cover"
            ></el-avatar>
          </div>
          <div class="info">
            <h3>{{ item.title }}</h3>
            <p class="price-tag">NT$ {{ item.price }}</p>
            <p class="qty">
              <i
                class="el-icon-remove"
                @click="updateCartRecord({ cartItem: item, action: 'REDUCE' })"
              ></i>
              <span>{{ item.qty }}</span>
              <i
                class="el-icon-circle-plus"
                @click="
                  updateCartRecord({
                    cartItem: item,
                    action: 'INCREASE',
                  })
                "
              ></i>
              <i
                class="el-icon-delete"
                @click="updateCartRecord({ cartItem: item, action: 'REMOVE' })"
              ></i>
            </p>
          </div>
        </div>
      </div>
      <div class="sum-wrapper">
        <p class="price">
          小計：<span>NT$ {{ total }}</span>
        </p>
        <router-link to="/checkout">
          <el-button type="success" @click="handleCheckout">
            前往結帳
          </el-button>
        </router-link>
      </div>
    </div>
    <div class="empty-cart" v-else>購物車空空的</div>
  </el-drawer>
</template>

<script>
import { mapState } from "vuex";
import cartMixin from "../utils/cartMixin";
export default {
  name: "CartDrawer",
  data() {
    return {
      drawer: false,
    };
  },
  mixins: [cartMixin],
  // watch: {
  //   total: {
  //     handler() {
  //       this.drawer = true; // 控制購物車自動打開
  //     },
  //   },
  // },
  computed: {
    ...mapState({
      cartList: (state) =>
        state.cartInfo.cartList ? state.cartInfo.cartList : [],
      total: (state) => state.cartInfo.total || null,
      final_total: (state) => state.cartInfo.final_total || null,
    }),
  },
  methods: {
    // ...mapActions(["updateCartRecord"]),
    handleCheckout() {
      this.drawer = false;
    },
  },
  created() {
    console.log(this.cartList);
  },
};
</script>

<style scoped>
.drawer-container,
.empty-cart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 100%;
}

.item-wrapper {
  width: 100%;
  flex-grow: 1;
}

.sum-wrapper {
  width: 100%;
  margin-bottom: 20px;
}

.price {
  font-weight: 400;
  margin-bottom: 20px;
}

.price span {
  font-size: 26px;
}

.el-button {
  width: 100%;
}

.item {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #72767b3b;
}

.avatar {
  margin-right: 10px;
}

.info {
  flex-grow: 1;
}

.info h3,
.price-tag {
  margin-bottom: 5px;
  font-weight: 400;
}

.qty span {
  margin: 0 2rem;
}

.qty i {
  cursor: pointer;
}

.el-icon-delete {
  position: relative;
  left: 20px;
}
</style>