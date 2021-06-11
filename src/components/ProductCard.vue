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
                v-if="product.isFavorite"
                @click.prevent.stop="toggleFavorite(product.id)"
                icon="el-icon-star-on"
                circle
              >
              </el-button>
              <el-button
                class="favorite-icon"
                v-else
                @click.prevent.stop="toggleFavorite(product.id)"
                icon="el-icon-star-off"
                circle
              >
              </el-button>
              <div class="add-to-cart" @click.prevent.stop="handleOpenDialog">
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

    <AddToCartDialog ref="dialog" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddToCartDialog from './AddToCartDialog.vue'

export default {
  name: 'productCard',
  props: {
    initProduct: {
      type: Object,
      require: true
    }
  },
  components: {
    AddToCartDialog
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
    handleOpenDialog () {
      this.$refs.dialog.handleOpen(this.product)
    },
    toggleFavorite (productId) {
      this.product.isFavorite = !this.product.isFavorite
      this.$emit('toggle-favorite', productId)
    }
  }
}
</script>

<style scoped>
/* Card */
.el-card {
  border: none;
  background-color: transparent;
}

.el-card.is-always-shadow {
  box-shadow: none;
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
}

.image-wrapper:hover .mask {
  opacity: 1;
}

.image-wrapper:hover .mask .add-to-cart {
  opacity: 1;
  transform: scale(1, 1);
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
}

.el-button.favorite-icon:focus,
.el-button.favorite-icon:hover {
  background: none;
  color: #fcfcfc;
}

.el-button.favorite-icon:active {
  color: #fcfcfc;
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

/* Dialog */
.dialog-image {
  width: 100%;
  height: 30vh;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
}

.dialog-info {
  padding: 0 20px;
}

.dialog-info * {
  margin-bottom: 10px;
}

.dialog-info > h1 {
  margin-top: 20px;
}

.dialog-info > p {
  font-weight: 600;
  font-size: 20px;
  color: #44607a;
}

.dialog-info .info-link {
  text-decoration: underline;
  color: #00c9c8;
  display: block;
  text-align: end;
  margin-bottom: 20px;
}

.dialog-info .info-link > a {
  color: #00c9c8;
}

.dialog-info .el-button {
  width: 100%;
}

/* md */
@media only screen and (min-width: 992px) {
  .dialog-info * {
    margin-bottom: 20px;
  }

  .dialog-info > h1 {
    margin-top: 0;
    letter-spacing: 1px;
  }

  .dialog-image {
    height: 365px;
  }
}
</style>
