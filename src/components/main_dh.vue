<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>我的积分</p>
		</div>
		<div class="top">
			<p class="t_p">可用积分</p>
			<p class="t_g">0</p>
			<div class="t_t">
				<p class="t_t_p" @click="on_shop">积分商城 ></p>
			</div>
		</div>
		<div class="router">
			<p class="t_jf" @click="on_jf">积分纪录   ></p>
			<p class="t_dh">兑换纪录   ></p>
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
			},
			on_jf: function(){
				this.$router.push("/main_jf");
			},
			on_shop: function(){
				this.$router.push("/jf_shop");
			}
		}
	}
</script>

<style scoped>
	.top{
		width: 100%;
		padding-top: 0.5rem;
		padding-bottom: 0.4rem;
		background: rgb(255, 75, 144);
	}
	.t_p{
		font-size: 0.3rem;
		color: rgb(255, 208, 229);
		width: 100%;
		text-align: center;
	}
	.t_g{
		font-size: 0.45rem;
		color: #ffffff;
		width: 100%;
		text-align: center;
		margin-top: 0.2rem;
	}
	.router{
		position: relative;
		display: flex;
		background: #ffffff;
		width: 100%;
		height: 0.8rem;
		/* margin-top: 0.4rem; */
	}
	.router::before{
		content:  "";
		width: 0.03rem;
		height: 0.4rem;
		background: #c7c7c7;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.2rem;
	}
	.t_jf, .t_dh{
		width: 100%;
		text-align: center;
		font-size: 0.28rem;
		color: #818181;
		line-height: 0.8rem;
	}
	.t_dh{
		border-bottom: 0.05rem solid rgb(255, 75, 144);
		color: rgb(255, 75, 144);
	}
	.t_t{
		display: flex;
		justify-content: center;
		margin-top: 0.2rem;
		width: 100%;
	}
	.t_t_p{
		/* width: 1rem; */
		padding: 0.1rem;
		border: 0.02rem solid rgb(255, 230, 255);
		border-radius: 0.5rem;
		width: 1.8rem;
		text-align: center;
		font-size: 0.02rem;
		color: rgb(255, 230, 255);
	}
</style>