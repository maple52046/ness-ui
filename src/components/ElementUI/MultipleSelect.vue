<template>
  <el-select v-model="value" multiple multiple-Limit=2 placeholder="Select"
    @pick="(value) => pickOptions(value)"
    @change="(value) => pickOptions(value)">
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
      return{
        value: []
      }
    },
    methods: {
      pickOptions: function(data){
        this.$emit('optionsPicked', data)
      }
    }
  }
</script>

<!-- vim: ts=2 sw=2 expandtab
