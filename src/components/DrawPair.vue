<template>
<div id="draw-pair">
  <line-chart 
    v-if="chartData.datasets.length > 0"
    :chart-data="chartData"
    :height=200>
  </line-chart>
</div>
</template>

<script>
  import axios from 'axios'
  import LineChart from './chartjs/LineChart.js'

  export default {
    props: ['dateRange', 'pair'],
    data(){
      return {
        results: null,
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



        /* fetch data from API server */
        axios.get(api).then(response => {
          var topLine = new Array()
          var middleLine = new Array()
          var bottomLine = new Array()

          this.results = response.data
          response.data.forEach(value => {
            /* update labels */
            this.chartData.labels.push(new Date(value.time).toLocaleTimeString())
            /* update top line */
            console.log("top: " + parseFloat(value["value"]["top"]))
            topLine.push(parseFloat(value["value"]["top"]))
            /* update middle line */
            middleLine.push(parseFloat(value["value"]["middle"]))
            /* update bottom line */
            bottomLine.push(parseFloat(value["value"]["bottom"]))
          })

          this.chartData.datasets = []
          this.chartData.datasets.push({label: "bottom", data: bottomLine, backgroundColor: "#FE2E2E"})
          this.chartData.datasets.push({label: "middle", data: middleLine, backgroundColor: "#04B404"})
          this.chartData.datasets.push({label: "top", data: topLine, backgroundColor: "#FFFF00"})

        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<!-- vim: ts=2 sw=2 expandtab
