<template>
  <el-menu mode="vertical" default-active="1">
    <template v-for="(item, index) in categoryList">
      <el-menu-item
        :index="(index + 1).toString()"
        :key="index + 1"
        @click="handleSelect(item)"
      >
        <span>{{ item }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AsideMenu',
  computed: {
    ...mapGetters(['categoryList'])
  },
  methods: {
    handleSelect (item) {
      this.$store.commit('setCategory', item)
    }
  },
  created () {
    this.$store.commit('setCategory', '全部')
  }
}
</script>

<style lang='scss' scoped>
.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
  letter-spacing: 1px;

  &:focus, &:hover {
    background-color: transparent;
  }

  &.is-active, &:hover {
    font-weight: 500;
    color: #00c9c8;
  }
}
</style>
