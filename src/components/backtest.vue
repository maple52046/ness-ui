<template>
  <div class="date-time-picker">
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h3>Select Date Range</h3>
          <DateTimePicker v-on:dateRangePicked="updateDateRange" />
          <h3>Select Stock</h3>
          <p>Please select two stocks:</p>
          <p><MultipleSelect v-on:optionsPicked="updateSelectedStocks" v-bind:options="stockList"/></p>
          <div><el-button type="danger">Reset</el-button><el-button type="primary">Next</el-button></div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <p v-model=results>{{ results }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

import DateTimePicker from './el/DateTimePicker'
import MultipleSelect from './el/MultipleSelect'

export default {
  name: 'backtest',
  data () {
    return {
      dateRange: [],
      stockList: [],
      pair: [],
      results: null
    }
  },
  components: {
    DateTimePicker,
    MultipleSelect
  },
  methods:{
    updateDateRange: function(dateRange){
      /*
       * After user selected date range, we query stock list from api server with the date range.
       * Then, we let user to pick the first stock of the trading pair.
       */
      this.dateRange = dateRange
      var start = dateRange[0].toISOString()
      var end = dateRange[1].toISOString()
      this.stockList = new Array()

      var api = "/api/twse/stocks?start=" + start + "&end=" + end
      axios.get(api).then(response => {
        /*
         * The original data queried from api server are using "name" and "channel" as the key name,
         * however, we're using ElementUI to present stock selection,
         * so, we have to convert the key name from "name" and "channel" to "label" and "value".
         */
        response["data"].forEach(stock => {
          this.stockList.push({'value': stock.value, 'label': stock.label})
        })
      }).catch(e => {
        console.log(e)
      })
    },
    updateSelectedStocks: function(channels){
      this.pair = channels
      if (this.pair.length == 2){
        var start = this.dateRange[0].toISOString()
        var end = this.dateRange[1].toISOString()
        var api = "/api/twse/strategy?id=1&start=" + start + "&end=" + end + "&primary=" + channels[0] + "&secondary=" + channels[1]
        axios.get(api).then(response => {
          this.results = response.data
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<!-- vim: ts=2 sw=2 expandtab
