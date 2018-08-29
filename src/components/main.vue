<template>
	<div>
		<div class="m_top">
			<img src="../assets/images/bg2.jpg">
			<div class="m_name">
				<p class="m_n_l">尊贵的XXX<span>(一级分销商)</span></p>
				<p class="m_n_r">收益：999999</p>
			</div>
		</div>
		<div class="m_order">
			<router-link to="/order">
				<img src="../assets/images/icon11.png">
				<p>待付款</p>
			</router-link>
			<router-link to="/order">
				<img src="../assets/images/icon12.png">
				<p>待付款</p>
			</router-link>
			<router-link to="/order">
				<img src="../assets/images/icon13.png">
				<p>待付款</p>
			</router-link>
			<router-link to="/order">
				<img src="../assets/images/icon14.png">
				<p>待付款</p>
			</router-link>
		</div>
		<router-link to="/order" class="m_a_o item">
			<img src="../assets/images/icon15.png">
			<p>全部订单</p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
		<router-link to="/vip" class="m_m_c item">
			<img src="../assets/images/icon17.png">
			<p>会员中心</p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
		<router-link to="/main_jf" class="m_a_o item">
			<img src="../assets/images/icon23.png">
			<p>我的积分：<span class="m_jf">999</span></p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
		<router-link to="/collection" class="m_a_o item">
			<img src="../assets/images/icon19.png">
			<p>我的收藏</p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
		<router-link to="/address" class="m_a_o item">
			<img src="../assets/images/icon22.png">
			<p>地址管理</p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
	</div>
</template>

<script type="text/javascript">
	export default {
		created(){
			console.error(1);
			this.$bus.emit("show_nav", true);
		}
	}
</script>

<style scoped>
	.m_top{
		position: relative;
		width: 100%;
		height: 3.5rem;
		background: #ccc;
	}
	.m_top img{
		width: 100%;
		height: 100%;
	}
	.m_name{
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 100%;
		height: 0.6rem;
		background: rgba(100, 100, 100, 0.6);
		padding: 0.1rem 0.4rem;
		display: flex;
		justify-content: space-between;
	}
	.m_name p{
		font-size: 0.3rem;
		color: #fff;
		line-height: 0.4rem;
	}
	.m_n_l span{
		color:  #ff0400;
	}
	.m_order{
		width: 100%;
		/* height: 1.5rem; */
		padding: 0.3rem 0.4rem;
		display: flex;
		justify-content: space-between;
		background: #fff;
	}
	.m_order a{
		display: block;
		width: 1rem;
		text-align: center;
	}
	.m_order a img{
		width: 0.5rem;
	}
	.m_order a p{
		font-size: 0.2rem;
		text-align: center;
		margin-top: 0.1rem;
		color: #606060;
	}
	.m_a_o{
		width: 100%;
		/* height: 1rem; */
		display: flex;
		background: #fff;
		padding: 0.2rem 0.2rem;
		position: relative;
		border-top: 0.02rem solid #ccc;
	}
	.m_m_c{
		width: 100%;
		/* height: 1rem; */
		display: flex;
		background: #fff;
		padding: 0.2rem 0.2rem;
		position: relative;
		margin-top: 0.2rem;
	}
	.item img{
		width: 0.5rem;
		height: 0.5rem;
	}
	.item p{
		font-size: 0.28rem;
		line-height: 0.5rem;
		margin-left: 0.1rem;
		color: #606060;
	}
	.a_o_i{
		width: 0.3rem!important;
		height: 0.3rem!important;
		position: absolute;
		right: 0.4rem;
		top: 50%;
		margin-top: -0.15rem;
	}
	.m_jf{
		color: red;
		font-size: 0.3rem;
	}
</style>