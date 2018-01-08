<template>
  <div class="date-time-picker">
    <h3>Select Date Range</h3>
    <DateTimePicker v-on:dateRangePicked="updateDateRange" />
    <div>You can visit: <a v-bind:href="dataURL">api</a> to get data</div>
  </div>
</template>

<script>
import DateTimePicker from './el/DateTimePicker'

export default {
  name: 'backtest',
  data () {
    return {
      start: '',
      end: '',
      dataURL: ''
    }
  },
  components: {
    DateTimePicker    
  },
  methods:{
    updateDateRange: function(dateRange){
      this.start = dateRange[0]
      this.end = dateRange[1]
      this.dataURL = "/api/twse/backtest/pair?start=" + this.start + "&end=" + this.end
    }
  }
}
</script>
