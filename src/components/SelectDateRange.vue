<template>
<div id="select-date-range">
  <h3>Select Date Range</h3>
  <div id="select-date">From:<DatePicker v-on:datePicked="selectDate" /></div>
  <div id="select-date">End: <DatePicker v-on:datePicked="selectDate" /></div>
</div>
</template>

<script>
import DatePicker from './ElementUI/DatePicker'

export default {
	components:{
		DatePicker
	},
	data(){
		return {
			dateRange: []
		}
	},
	methods: {
		selectDate: function(newDate){
			if (this.dateRange.length < 2)
				this.dateRange.push(newDate)

			if (this.dateRange.length == 2)
				this.$emit('setDateRange', this.dateRange)
		}
	}
}
</script>
