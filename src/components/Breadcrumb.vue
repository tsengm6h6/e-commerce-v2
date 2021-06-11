<template>
  <nav class="breadcrumb">
    <ul class="nav-list">
      <li
        class="nav-item"
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
        @click="pushRouteTo(index)"
      >
        {{ breadcrumb.name }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  methods: {
    updateBreadcrumb () {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
    pushRouteTo (index) {
      if (this.breadcrumbList[index].link) {
        this.$router.push({ name: this.breadcrumbList[index].link })
      }
    }
  },
  mounted () {
    this.updateBreadcrumb()
  }
}
</script>

<style lang='scss' scoped>
ul,
li {
  list-style: none;
}

.nav-list {
  display: flex;
  align-items: baseline;
  line-height: 40px;
  font-weight: 400;
  font-size: 14px;
}

li:not(:last-child) {
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: #44607a;
  }

  &:after {
    content: "/";
    margin: 5px;
  }
}

</style>
