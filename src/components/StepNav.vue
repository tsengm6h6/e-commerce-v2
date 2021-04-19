<template>
  <div>
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="確認商品資訊"></el-step>
      <el-step title="填寫報名表單"></el-step>
      <el-step title="完成預定及付款"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  </div>
</template>

<script>
export default {
  name: "stepNav",
  data() {
    return {
      active: 0,
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
  },
};
</script>