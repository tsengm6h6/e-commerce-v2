<template>
  <el-select
    v-model="category"
    placeholder="Select"
    @change="handleChange"
    :disabled="addCategory"
  >
    <el-option
      v-for="item in categoryList"
      :key="item"
      :label="item"
      :value="item"
    >
    </el-option>
  </el-select>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CategorySelect",
  props: ["initCategory", "addCategory"],
  data() {
    return {
      // formCategory: this.initCategory,
    };
  },
  computed: {
    category: {
      get() {
        return this.$store.state.category;
      },
      set(value) {
        console.log("set new Cat", value);
        this.$store.commit("setCategory", value);
      },
    },
    ...mapGetters(["categoryList"]),
  },
  methods: {
    handleChange() {
      console.log("change", this.category);
      // this.$emit("select-change", this.category);
    },
  },
};
</script>