<template>
  <el-select v-model="value" placeholder="Select"
    @pick="(value) => pickOption(value)"
    @change="(value) => pickOption(value)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: ['options'],
    data() {
      return {
        value: ''
      }
    },
    methods: {
      pickOption: function (data){
        this.$emit('optionPicked', data)
      }
    }
  }
</script>

<!-- vim: ts=2 sw=2 expandtab
