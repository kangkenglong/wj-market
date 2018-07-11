<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>会员中心</p>
		</div>
		<div class="main">
			<p>已获得收益：9999999</p>
			<span class="m_btn">提现</span>
		</div>
		<div class="main">
			<p>待收收益：9999999</p>
		</div>
		<div class="main">
			<p>正在提现：9999999</p>
		</div>
		<div class="main">
			<p>会员人数：9999999</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
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
	.main{
		position: relative;
		width: 100%;
		padding: 0.3rem 0.2rem;
		background: #fff;
		font-size: 0.3rem;
		color: #707070;
		/* display: flex; */
		border-bottom: 0.02rem solid #ccc;
	}
	.m_btn{
		display: block;
		position: absolute;
		top: 50%;
		right: 0.2rem;
		margin-top: -0.25rem;
		width: 1rem;
		height: 0.5rem;
		font-size: 0.3rem;
		color: #fff;
		line-height: 0.5rem;
		text-align: center;
		background: blue;
		border-radius: 0.1rem;
	}
</style>