<template>
<div id="draw-pair">
  <line-chart 
    v-if="chartData.datasets.length > 0"
    :chart-data="chartData">
  </line-chart>
  <!--p v-model="chartData">Chart Data: {{ chartData }}</p-->
</div>
</template>

<script>
  import axios from 'axios'
  import LineChart from './chartjs/LineChart.js'

  export default {
    props: ['dateRange', 'pair'],
    data(){
      return {
        chartData: {
          labels: [],
          datasets: []
        },
        chartOptions:{
          responsive: false, 
          maintainAspectRatio: false
        }
      }
    },
    components: {
      LineChart
    },
    created() {
      if (this.dateRange.length == 2 && this.pair.length==2){
        var start = this.dateRange[0].toISOString()
        var end = this.dateRange[1].toISOString()
        var api = "/api/twse/strategy?id=1&start=" + start + "&end=" + end + "&primary=" +
          this.pair[0] + "&secondary=" + this.pair[1]
        /* initialize chart data and options */
        this.chartData.labels = new Array()
        this.chartData.datasets = new Array()
        axios.get(api).then(response => {
          var values = new Array()
          response.data.forEach(value => {
            this.chartData.labels.push(new Date(value.time).toLocaleTimeString())
            values.push(parseFloat(value.value))
          })
          this.chartData.datasets.push({
            label: this.pair[0] + "/" + this.pair[1],
            data: values
          })
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<!-- vim: ts=2 sw=2 expandtab
