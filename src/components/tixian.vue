<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>提现明细</p>
		</div>
		<div class="cnt">
			<div class="c_i">
				<p class="c_t">2018-07-01 10:00:00</p>
				<div class="c_i_i">
					<p class="i_n">提现：<span>999</span> 元</p>
					<p class="i_s">已提现</p>
				</div>
			</div>
			<div class="c_i">
				<p class="c_t">2018-07-01 10:00:00</p>
				<div class="c_i_i">
					<p class="i_n">提现：<span>666</span> 元</p>
					<p class="i_s">审核中</p>
				</div>
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
	}
	.c_i{
		margin-top: 0.1rem;
		width: 100%;
		padding: 0.2rem 0.3rem;
		background: #fff;
		border-bottom: 0.02rem solid #ccc;
	}
	.c_t{
		font-size: 0.2rem;
		color: #808080;
		padding-bottom: 0.1rem;
		border-bottom: 0.02rem solid #d8d8d8;
	}
	.c_i_i{
		padding: 0.15rem 0px;
	}
	.i_n{
		font-size: 0.3rem;
		color: #606060;
	}
	.i_s{
		width: 100%;
		text-align: right;
		font-size: 0.28rem;
		color: red;
		margin-top: 0.3rem;
	}
	.i_n span{
		font-size: 0.35rem;
		color:  red;
	}
</style>