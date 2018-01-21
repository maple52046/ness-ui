<template>
  <div id="date-picker" class="block">
    <!--span class="demonstration">Select Time Range:</span-->
    <el-date-picker
      v-model="dateRange"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="to"
      start-placeholder="Start"
      end-placeholder="End"
      align="right"
      @pick="(dateRange) => emitDateRange(dateRange)"
      @change="(dateRange) => emitDateRange(dateRange)">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last three month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateRange: ''
      };
    },
    methods: {
      emitDateRange: function (date){
        this.$emit('dateRangePicked', date)
      }
    }
  };
</script>
