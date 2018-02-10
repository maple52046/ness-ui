<template>
<div id="app">
  <el-row id="top-row">
    <!-- The navigation column contains the conditions those provide for user to select the target stocks. -->
    <el-col id="nav-col">
      <SelectDateRange v-on:setDateRange="updateDateRange"/>
      <SelectStockPair 
        v-model="dateRange" 
        v-bind:dateRange="dateRange"
        v-on:stockPairSelected="updateStockPair"/>
    </el-col>

    <!-- The data column contains the results of strategy output -->
    <el-col id="data-col">
        <h3 align="center">Results</h3>
        <!--el-tabs v-model="tabName"-->
          <!--el-tab-pane label="Results" name="main"-->
            <el-alert
              v-if="pair.length < 2"
              title="No data to display"
              type="info">
            </el-alert>
            <div v-if="pair.length >= 2">
              <el-row id="main-results-row">
                <DrawPair :dateRange="dateRange" :pair="pair"/>
              </el-row>
            </div>
          <!--/el-tab-pane-->

          <!--el-tab-pane label="Debug" name="debug">
            <h3>Dynamic Data</h3>
            <ul>
              <li v-model="dateRange">Date Range: {{ dateRange }}</li>
              <li v-model="pair">Stock Pair: {{ pair }}</li>
            </ul> 
          </el-tab-pane>

        </el-tabs-->
    </el-col>
  </el-row>
</div>
</template>

<script>

import SelectDateRange from './SelectDateRange'
import SelectStockPair from './SelectStockPair'
import DrawPair from './DrawPair'


export default {
  components: {
    SelectDateRange,
    SelectStockPair,
    DrawPair
  },
  data(){
    return {
      dateRange: [],
      pair: [],
      tabName: 'main',
      chartDate: null
    }
  },
  methods: {
    updateDateRange: function(dateRange){
      this.dateRange = dateRange
    },
    updateStockPair: function(pair){
      this.pair = pair
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
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #nav-col {
    width: 20%;
  }
  #data-col {
    width: 80%;
  }
</style>

<!-- vim: ts=2 sw=2 expandtab
