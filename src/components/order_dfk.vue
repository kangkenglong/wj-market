<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>订单</p>
		</div>
		<div class="nav">
			<router-link to="/order">全部</router-link>
			<a href="javascript:void(0)" class="selected">待付款</a>
			<router-link to="/order_dfh">待发货</router-link>
			<router-link to="/order_dsh">待收货</router-link>
			<router-link to="/order_sh">售后</router-link>
		</div>
		<div class="main">
			<div class="m_goods">
				<div class="m_g_t">
					<p class="g_time">2018-06-01 09:01:00</p>
					<p class="g_status">待付款</p>
				</div>
				<div class="m_g_i" @click="on_show_info">
					<img src="../assets/images/g0.png">
					<div class="g_i_i">
						<p>开关</p>
						<p>规格：三插座</p>
						<p>数量：1</p>
					</div>
					<p class="m_p">¥ 999</p>
				</div>
				<p class="m_g_p"><span>共1件商品 合计：</span>¥999</p>
				<div class="m_g_b">
					<a href="javascript:void(0)">取消订单</a>
					<a href="javascript:void(0)">立即付款</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "Order_dfk",
		data(){
			return {

			}
		},
		created(){
			this.$bus.emit("show_nav", false);
		},
		methods: {
			on_back: function(){
				this.$router.push("/main");
			},
			on_show_info: function(){
				this.$router.push("/order_info")
			}
		},
		// beforeRouteLeave (to, from, next) {
		// 	// 导航离开该组件的对应路由时调用
		// 	// 可以访问组件实例 `this`
		// 	this.$bus.emit("show_nav", true);
		// 	next();
		// }
	}
</script>

<style scoped>
	.nav{
		width: 100%;
		height: 0.8rem;
		padding: 0px 0.2rem;
		display: flex;
		justify-content: space-between;
		background: #fff;
	}
	.nav a{
		width: 1rem;
		height: 0.77rem;
		color: #606060;
		font-size: 0.3rem;
		padding-top: 0.25rem;
		text-align: center;
	}
	.selected{
		color: red!important;
		border-bottom: 0.03rem solid red;
	}
	.main{
		width: 100%;
		height: calc(100% - 1.8rem);
		padding-top: 0.2rem;
	}
	.m_goods{
		width: 100%;
		margin-bottom: 0.2rem;
		background: #fff;
		padding: 0.3rem;
	}
	.m_g_t{
		width: 100%;
		padding-bottom: 0.2rem;
		font-size: 0.3rem;
		color: #555555;
		display: flex;
		border-bottom: 0.02rem solid #d9d9d9;
		justify-content: space-between;
	}
	.g_status{
		color: red;
	}
	.m_g_i{
		position: relative;
		width: 100%;
		padding: 0.2rem 0px;
		display: flex;
		border-bottom: 0.02rem solid #d9d9d9;
	}
	.m_p{
		position: absolute;
		top: 0.2rem;
		right: 0px;
		font-size: 0.35rem;
		color: rgb(255, 79, 71);
		/* width: 100%; */
	}
	.m_g_i img{
		width: 1.5rem;
		height: 1.5rem;
	}
	.g_i_i{
		font-size: 0.25rem;
		margin-left: 0.2rem;
	}
	.g_i_i p:nth-child(1){
		font-size: 0.35rem;
		color: #333;
	}
	.g_i_i p:nth-child(2){
		color: #666;
		margin-top: 0.1rem;
	}
	/* .g_i_i p:nth-child(3){
		color: red;
		margin-top: 0.1rem;
	} */
	.g_i_i p:nth-child(3){
		color: #000;
		margin-top: 0.1rem;
	}
	.m_g_p{
		font-size: 0.35rem;
		color: rgb(255, 79, 71);
		text-align: right;
		padding: 0.3rem 0px 0px;
	}
	.m_g_p span{
		font-size: 0.3rem;
		color: #686868;
	}
	.m_g_b {
		width: 100%;
		margin-top: 0.2rem;
		padding: 0.2rem 0px 0px;
		display: flex;
		justify-content: flex-end;
		border-top: 0.02rem solid #d9d9d9;
	}
	.m_g_b a {
		font-size: 0.3rem;
		display: block;
		padding: 0.15rem 0.25rem;
		border:  0.02rem solid #ccc;
		border-radius: 0.15rem;
	}
	.m_g_b a:nth-child(1) {
		margin-right: 0.2rem;
		color: #999999;
		border-color: #999999;
	}
	.m_g_b a:nth-child(2) {
		color: #f84352;
		border-color: #f84352;
	}
</style>