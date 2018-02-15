<template>
<div id="stock-pair-picker">
	<h3>Select Stocks</h3>
	<p>Please select two stocks:</p>
	<MultipleSelect
		v-bind:options="stocks"
		v-bind:multipleLimit=2
		v-on:optionsPicked="selectStocks"/>
</div>
</template>

<script>
import axios from 'axios';
import MultipleSelect from './ElementUI/MultipleSelect'

export default{
	props: ['dateRange'],
	components: {
		MultipleSelect
	},
	data() {
		return {
			pair: [],
			stocks: null
		}
	},
	watch: {
		dateRange: function(){
			if (this.dateRange.length >= 2){
				var start = this.dateRange[0].toISOString()
				var end = this.dateRange[1].toISOString()
				var api = "/api/twse/stocks?start=" + start + "&end=" + end
				this.stocks = new Array()
				axios.get(api).then(response => {
					/*
					 * The original data queried from api server are using "name" and "channel" as the key name,
					 * however, we're using ElementUI to present stock selection,
					 * so, we have to convert the key name from "name" and "channel" to "label" and "value".
					 */
					response["data"].forEach(stock => {
					  this.stocks.push({'value': stock.value, 'label': stock.label})
					})
				}).catch(e => {
					console.log(e)
				})
			}
		}
	},
	methods: {
		selectStocks: function(pair){
			this.pair = pair
			if (this.pair.length >= 2){
				this.$emit('stockPairSelected', this.pair)
			}
		}
	}
}
</script>
