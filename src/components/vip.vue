<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>会员中心</p>
		</div>
		<div class="info">
			<img src="../assets/images/bg1.jpg">
			<div class="i_i">
				<p class="i_n">不给摘的小橙花</p>
				<p class="i_t">推荐人：啦啦啦</p>
				<p class="i_y">邀请码：JD888888</p>
			</div>
		</div>
		<div class="g_d">
			<p class="g_t">累计佣金：</p>
			<p class="g_v">999.99 <span>元</span></p>
		</div>
		<div class="g_d">
			<p class="g_t">可提现佣金：</p>
			<p class="g_v">999.99 <span>元</span></p>
			<div class="g_b">提 现</div>
		</div>
		<div class="g_d">
			<p class="g_t">成功提现佣金：</p>
			<p class="g_v">999.99 <span>元</span></p>
		</div>
		<router-link to="/yongjin" class="m_m_c item">
			<img src="../assets/images/icon24.png">
			<p>佣金明细</p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
		<router-link to="/tixian" class="m_a_o item">
			<img src="../assets/images/icon25.png">
			<p>提现明细</p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
		<router-link to="/team" class="m_a_o item">
			<img src="../assets/images/icon26.png">
			<p>我的团队</p>
			<img class="a_o_i" src="../assets/images/icon16.png">
		</router-link>
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
	.info{
		/* display: flex; */
		width: 100%;
		padding: 0.3rem;
		text-align: center;
		background: rgb(122, 220, 0);
	}
	.info img{
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 100%;
	}
	.i_i{
		margin-top: 0.1rem;
	}
	.i_n{
		font-size: 0.33rem;
		color: #ffffff;
	}
	.i_t, .i_y{
		margin-top: 0.1rem;
		font-size: 0.26rem;
		color: #ffffff;
	}
	.gold{
		width: 100%;
		padding: 0.3rem;
	}
	.g_d{
		width: 100%;
		display: flex;
		padding: 0.3rem 0.3rem;
		background: #ffffff;
		border-bottom: 0.02rem solid #ccc;
		position: relative;
	}
	.g_t{
		font-size: 0.28rem;
		color: #606060;
	}
	.g_v{
		font-size: 0.28rem;
		color: red;
		/* margin: 0.15rem; */
	}
	.g_v span{
		font-size: 0.2rem;
		color: #606060;
	}
	.g_b{
		position: absolute;
		top: 50%;
		right: 0.3rem;
		margin-top: -0.25rem;
		font-size: 0.25rem;
		text-align: center;
		color: #fff;
		line-height: 0.5rem;
		width: 1rem;
		height: 0.5rem;
		background: rgb(100, 216, 239);
		border-radius: 0.1rem;
	}
	.m_m_c, .m_a_o{
		width: 100%;
		/* height: 1rem; */
		display: flex;
		background: #fff;
		padding: 0.2rem 0.3rem;
		position: relative;
		margin-top: 0.2rem;
	}
	.m_a_o{
		margin-top: 0px;
		border-top: 0.02rem solid #ccc;
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