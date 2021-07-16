<template>
  <el-dialog title="訂單明細" :visible.sync="detailDialogVisible">
    <el-table ref="productTable" :data="currDetailList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="product.title" label="商品名稱" width="150">
      </el-table-column>
      <el-table-column property="qty" label="數量" width="100" align="center">
      </el-table-column>
      <el-table-column property="product.unit" label="單位" width="120" align="center">
      </el-table-column>
      <el-table-column property="product.price" label="單價" width="100" align="center">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'OrderDetailDialog',
  data () {
    return {
      detailDialogVisible: false,
      currDetailList: []
    }
  },
  methods: {
    showDetailDialog (list) {
      this.currDetailList = list
      this.detailDialogVisible = true
    }
  }
}
</script>
