<template>
  <div>
    <el-col :xs="24" :sm="12" :md="8" :lg="8">
      <el-card>
        <div class="image-wrapper">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img v-if="product.image" :src="product.image" class="image" alt="product" />
            <el-image v-else>
              <img
                slot="error"
                class="image-slot"
                src="https://i.imgur.com/I4HLm86.png"
                alt="error"
              />
            </el-image>
            <div class="mask">
              <el-button
                class="favorite-icon"
                @click.prevent.stop="toggleFavorite(product.id)"
                :icon="`el-icon-star-${product.isFavorite ? 'on' : 'off'}`"
                circle
              >
              </el-button>
              <div class="add-to-cart" @click.prevent.stop="$emit('open-dialog', product)">
                加入購物車
              </div>
            </div>
          </router-link>
        </div>

        <div class="card-content">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <h3 class="product-title">
              {{ product.title }}
            </h3>
          </router-link>
          <p class="price-tag">NT$ {{ product.price }} {{ product.unit }}</p>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'productCard',
  props: {
    initProduct: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      product: this.initProduct
    }
  },
  computed: {
    ...mapState(['isLoading'])
  },
  methods: {
    toggleFavorite (productId) {
      this.product.isFavorite = !this.product.isFavorite
      if (this.product.isFavorite) {
        this.$gtm.trackEvent({
          event: 'add-to-wishlist',
          category: '收藏事件',
          action: 'add-to-wishlist',
          label: 'add-to-wishlist',
          value: this.product.price,
          items: this.product.title
        })
      }
      this.$store.commit('updateFavorite', productId)

      const favoriteIdList =
        JSON.parse(window.localStorage.getItem('favorite_products')) || []

      const itemIndex = favoriteIdList.findIndex((Id) => Id === productId)
      itemIndex === -1
        ? favoriteIdList.push(productId)
        : favoriteIdList.splice(itemIndex, 1)

      localStorage.setItem('favorite_products', JSON.stringify(favoriteIdList))
    }
  }
}
</script>

<style lang='scss' scoped>
/* Card */
.el-card {
  border: none;
  background-color: transparent;

  &.is-always-shadow {
    box-shadow: none;
  }
}

.image-slot {
  width: 100%;
  height: 40vh;
  object-fit: contain;
  object-position: center;
  transform: scale(0.5);
}

/* Card Image */
.image {
  display: block;
  position: relative;
  border-radius: 16px;
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

.image-wrapper {
  position: relative;
  &:hover {
    .mask {
      opacity: 1;

      .add-to-cart {
        opacity: 1;
        transform: scale(1, 1);
      }
    }
  }
}

.mask {
  border-radius: 16px;
  width: 100%;
  height: 40vh;
  background: rgba(99, 99, 99, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all ease-out 0.3s;
}

.add-to-cart {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #00c9c8;
  color: #fff;
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 60px;
  text-align: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  opacity: 0;
  transform: scale(1, 0);
  transition: all ease-out 0.4s;
  transform-origin: bottom;
  cursor: pointer;
}

.el-button.favorite-icon {
  background: none;
  border: none;
  font-size: 36px;
  color: #fcfcfc;
  position: relative;
  bottom: 30px;

  &:focus, &:hover {
    background: none;
    color: #fcfcfc;
  }

  &:active {
    color: #fcfcfc;
  }
}

/* Card content */
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product-title {
  margin: 10px 0 0;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
}

</style>
