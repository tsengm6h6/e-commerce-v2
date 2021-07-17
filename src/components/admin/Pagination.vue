<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-pagination
      :page-count="pagination.total_pages"
      :current-page.sync="pagination.current_page"
      @current-change="handlePageChange"
      layout="prev, pager, next"
    >
    </el-pagination>
  </el-row>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  methods: {
    handlePageChange (val) {
      this.$emit('handlePageChange', val)
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
