<template>
  <div class="date-time-picker">
    <h3>Select Date Range</h3>
    <DateTimePicker v-on:dateRangePicked="updateDateRange" />
    <h3>Select Item</h3>
    <p>First stock: <SelectBasic v-on:optionPicked="updateSelectedStocks" v-bind:options="firstStocks" /></p>
    <p>Second stock: <SelectBasic v-on:optionPicked="updateSelectedStocks" v-bind:options="secondStocks" /></p>
    <p v-model=pairs>Selected stocks: {{ selectedPair }}</p>
  </div>
</template>

<script>
import axios from 'axios';

import DateTimePicker from './el/DateTimePicker'
import SelectBasic from './el/SelectBasic'

export default {
  name: 'backtest',
  data () {
    return {
      start: '',
      end: '',
      firstStocks: [],
      secondStocks: [],
      pairs: null,
      selectedPair: []
    }
  },
  components: {
    DateTimePicker,
    SelectBasic
  },
  methods:{
    updateDateRange: function(dateRange){
      this.start = dateRange[0]
      this.end = dateRange[1]
      this.firstStocks = new Array()
      this.pairs = new Array()

      var api = "/api/twse/backtest/pair?start=" + this.start + "&end=" + this.end
      axios.get(api).then(response => {
        this.pairs = response.data[0]
        Object.keys(this.pairs).sort().forEach(stock => {
          this.firstStocks.push({'value': stock, 'label': stock})
	      })
      }).catch(e => {
        console.log(e)
      })
    },
    updateSelectedStocks: function(channel){
      if (this.selectedPair.length < 2){
        this.selectedPair.push(channel)
        if (this.selectedPair.length == 1){
          Object.keys(this.pairs[channel]).sort().forEach(stock => {
            this.secondStocks.push({'value': stock, 'label': stock})
          })
        }
      }
    }
  }
}
</script>

<!-- vim: ts=2 sw=2 expandtab
