<template>
<div id="app" align="left">
  <el-collapse v-model="activeNames">
    <!-- Condition Section -->
    <el-collapse-item title="Condition" name="1">
      <!-- The navigation column contains the conditions those provide for user to select the target stocks. -->
      <div id="condition-section">
        <div id="condition-item">
          <SelectDateRange v-on:setDateRange="updateDateRange"/>
        </div>
        <div id="condition-item">
          <SelectStockPair 
            v-model="dateRange" 
            v-bind:dateRange="dateRange"
            v-on:stockPairSelected="updateStockPair"/>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="Results" name="2">
       <!-- The data column contains the results of strategy output -->
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
    </el-collapse-item>
  </el-collapse>
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
      activeNames: ["1"],
      dateRange: [],
      pair: [],
      tabName: 'main',
      chartDate: null
    }
  },
  watch: {
    pair: function(){
      if (this.pair.length > 0)
        this.activeNames = ["2"]
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
  #condition-section {
    text-align: center;
  }
  #condition-item{
    vertical-align: top;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>

<!-- vim: ts=2 sw=2 expandtab
