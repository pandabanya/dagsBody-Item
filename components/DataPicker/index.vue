<template>
	<wu-calendar color="#e9d8c4" :insert="true" :lunar="true" @change="calendarChange"></wu-calendar>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				selected: []
			}
		},
		methods: {
			calendarChange(e) {
				console.log(e);
			},
		}
	}
</script>

<style>
</style>