<template>
<div id="draw-pair">
  <div id="chart">
    <h3 align="center">Chart</h3>
      <line-chart 
        v-if="chartData.datasets.length > 0"
        :chart-data="chartData"
        :height=100>
      </line-chart>
  </div>

  <div id="signal-table">
    <h3 align="center">Signal Table</h3>
      <el-table
        :data="signals"
        height="250"
        style="width: 100%">
        <el-table-column 
          prop="time"
          label="Time">
        </el-table-column>
        <el-table-column
          prop="ratio"
          label="Ratio">
        </el-table-column>
        <el-table-column
          prop="pos"
          label="Position">
        </el-table-column>
      </el-table>
    </h3>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import LineChart from './chartjs/LineChart.js'

  export default {
    props: ['dateRange', 'pair'],
    data(){
      return {
        activeNames: ['1'],
        results: null,
        chartData: {
          labels: [],
          datasets: []
        },
        chartOptions:{
          responsive: false, 
          maintainAspectRatio: false,
          chartArea: { backgroundColor: 'rgba(21, 21, 21, 1)' }
        },
        signals: []
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
        this.signals = new Array()

        /* fetch data from API server */
        axios.get(api).then(response => {
          var topLine = new Array()
          var middleLine = new Array()
          var bottomLine = new Array()
          var valueLine = new Array()
          var pos = 0

          this.results = response.data
          response.data.forEach(value => {
            /* update labels */
            var dataTime = new Date(value.time).toLocaleTimeString()
            var band = value.bands
            var ratio = parseFloat(value.value)
            this.chartData.labels.push(dataTime)
            /* update top line */
            topLine.push(parseFloat(band.top))
            /* update middle line */
            middleLine.push(parseFloat(band.middle))
            /* update bottom line */
            bottomLine.push(parseFloat(band.bottom))
            /* ratio value line */
            valueLine.push(ratio)

            if (ratio > parseFloat(band.top) && pos < 1){
              this.signals.push({time: dataTime, ratio: ratio, pos: 1})
              pos = 1
            }else if (ratio < parseFloat(band.bottom) && pos > -1){
              this.signals.push({time: dataTime, ratio: ratio, pos: -1})
              pos = -1
            }else
              pos = 0
          })

          this.chartData.datasets = []
          this.chartData.datasets.push({
            label: "Bottom band", 
            data: bottomLine, 
            backgroundColor: "transparent", 
            pointBackgroundColor: "#3ADF00",
            borderColor: "#3ADF00",
            pointRadius: 0,
            borderWidth: 2
          })
          this.chartData.datasets.push({
            label: "Middle band", 
            data: middleLine, 
            backgroundColor: "transparent", 
            pointBackgroundColor: "#FFBF00",
            borderColor: "#FFBF00",
            pointRadius: 0,
            borderWidth: 2
          })
          this.chartData.datasets.push({
            label: "Top band", 
            data: topLine, 
            backgroundColor: "transparent", 
            pointBackgroundColor: "#FF0000",
            borderColor: "#FF0000",
            pointRadius: 0,
            borderWidth: 2
          })
          this.chartData.datasets.push({
            label: "Traiding Pair", 
            data: valueLine,
            backgroundColor: "#CEE3F6", 
            pointBackgroundColor: "#0080FF",
            borderColor: "#0080FF"
          })

        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<!-- vim: ts=2 sw=2 expandtab
