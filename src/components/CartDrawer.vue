<template>
  <el-drawer title="購物車" :visible.sync="drawer">
    <div class="drawer-container" v-if="cartList.length">
      <div class="item-wrapper">
        <div class="item" v-for="(item, index) in cartList" :key="index">
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
import { mapState } from 'vuex'
import cartMixin from '../utils/cartMixin.js'
export default {
  name: 'CartDrawer',
  data () {
    return {
      drawer: false
    }
  },
  mixins: [cartMixin],
  computed: {
    ...mapState({
      cartList: (state) => state.cartInfo.cartList || [],
      total: (state) => state.cartInfo.total || null,
      final_total: (state) => state.cartInfo.final_total || null
    })
  },
  methods: {
    handleCheckout () {
      this.drawer = false
    }
  }
}
</script>

<style lang='scss' scoped>
.drawer-container,
.empty-cart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 100%;
  overflow: auto;
}

.item-wrapper {
  width: 100%;
  flex-grow: 1;
  max-height: 64vh;
  overflow: auto;
  padding-right: 8px;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar{
    width: 8px;
    background-color: #F5F5F5;
    margin-left: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #00C9C8;
  }
}

.sum-wrapper {
  width: 100%;
  margin-bottom: 15px;
}

.price {
  font-weight: 400;
  margin-bottom: 10px;

  span {
    font-size: 26px;
  }
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

.qty {
  span {
    margin: 0 2rem;
  }

  i {
    cursor: pointer;
  }
}

.el-icon-delete {
  position: relative;
  left: 20px;
}
</style>
