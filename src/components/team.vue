<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>我的团队</p>
		</div>
		<div class="cnt">
			<div class="c_i">
				<img src="../assets/images/bg1.jpg">
				<p>某区水电工1</p>
			</div>
			<div class="c_i">
				<img src="../assets/images/bg1.jpg">
				<p>某区水电工2</p>
			</div>
			<div class="c_i">
				<img src="../assets/images/bg1.jpg">
				<p>某区水电工3</p>
			</div>
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
			this.$bus.emit("show_nav", false);
		},
		methods: {
			on_back: function(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.cnt{
		width: 100%;
		height: calc(100% - 1rem);
		overflow-y: scroll;
		/* background: #fff; */
	}
	.c_i{
		display: flex;
		width: 100%;
		padding: 0.3rem;
		background: #fff;
		border-bottom: 0.02rem solid #ccc;
	}
	.c_i img{
		width: 1rem;
		height: 1rem;
		border-radius: 100%;
	}
	.c_i p{
		font-size: 0.3rem;
		color: #606060;
		line-height: 1rem;
		margin-left: 0.3rem;
	}
</style>