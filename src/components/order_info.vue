<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>订单信息</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {

			}
		},
		created(){

		},
		methods: {
			on_back: function(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	
</style>