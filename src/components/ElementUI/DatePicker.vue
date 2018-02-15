<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Select Date"
      @pick="(value) => pickDate(value)"
      @change="(value) => pickDate(value)">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      };
    },
    methods: {
      pickDate: function(value){
        this.$emit('datePicked', value)
      }
    }
  };
</script>

<!-- vim: ts=2 sw=2 expandtab
