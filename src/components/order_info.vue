<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>订单详情</p>
		</div>
		<!-- <div class="addr">
			<img src="../assets/images/icon22.png">
			<p class="a_p">请添加收获地址</p>
		</div> -->
		<div class="content">
			<div class="addr">
				<img src="../assets/images/icon22.png">
				<!-- <p>请添加收获地址</p> -->
				<div class="a_i">
					<div class="a_n">
						<p>lalala</p>
						<p>17000000000</p>
					</div>
					<div class="a_d">
						<p>广东省 深圳市 宝安区 xxxxxxxx</p>
						<p>修改</p>
					</div>
				</div>
			</div>
			<div class="cnt">
				<div class="c_i">
					<img src="../assets/images/g0.png">
					<div class="i_i">
						<p class="i_n">开关</p>
						<p class="i_s">颜色分类：蓝色</p>
						<p class="i_p">¥ 66.00</p>
						<p class="i_num">x1</p>
					</div>
				</div>
				<div class="c_i">
					<img src="../assets/images/g0.png">
					<div class="i_i">
						<p class="i_n">开关</p>
						<p class="i_s">颜色分类：蓝色</p>
						<p class="i_p">¥ 66.00</p>
						<p class="i_num">x1</p>
					</div>
				</div>
				<div class="c_p">
					<p>宝贝总价</p>
					<p>¥ 66.00</p>
				</div>
				<div class="c_p">
					<p>优惠金额</p>
					<p>-¥ 0.00</p>
				</div>
				<div class="c_p">
					<p>运费</p>
					<p>包邮</p>
				</div>
				<p class="c_pn">共1件宝贝，合计：<span>¥ 66.00</span></p>
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
	.content{
		width: 100%;
		height: calc(100% - 1rem);
		overflow-y: scroll;
	}
	.addr{
		display: flex;
		width: 100%;
		padding: 0.4rem 0.3rem;
		background: #ffffff;
	}
	.addr img{
		width: 0.4rem;
		height: 0.4rem;
	}
	.a_p{
		font-size: 0.25rem;
		color: #808080;
		line-height: 0.4rem;
		margin-left: 0.1rem;
	}
	.a_i{
		width: 100%;
		margin-left: 0.2rem;
	}
	.a_n, .a_d{
		display: flex;
		justify-content: space-between;
		font-size: 0.3rem;
		color: #303030;
		width: 100%;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	.a_d{
		color: #808080;
		font-size: 0.25rem;
	}
	.cnt{
		width: 100%;
		padding: 0.3rem;
		background: #fff;
		margin-top: 0.2rem;
		margin-bottom: 1rem;
	}
	.c_i, .c_p{
		display: flex;
		width: 100%;
		padding: 0.3rem 0px;
		border-bottom: 0.02rem solid #f3f3f3;
		justify-content: space-between;
	}
	.c_i img{
		/* flex: 1; */
		width: 1.2rem;
		height: 1.2rem;
		/* margin-right: 0.2rem; */
	}
	.i_i{
		/* flex: 5; */
		/* margin-left: 0.2rem; */
		/* width: 100%; */
		width: calc(100% - 1.4rem);
		position: relative;
	}
	.i_n{
		font-size: 0.35rem;
		color: #606060;
	}
	.i_s{
		font-size: 0.25rem;
		color: #909090;
		margin-top: 0.15rem;
	}
	.i_p{
		font-size: 0.3rem;
		color: #606060;
		margin-top: 0.15rem;
	}
	.i_num{
		position: absolute;
		right: 0px;
		bottom: 0px;
		font-size: 0.4rem;
		color: #606060;
	}
	.c_p{
		font-size: 0.28rem;
		color: #707070;
	}
	.c_pn{
		font-size: 0.28rem;
		color: #505050;
		width: 100%;
		padding: 0.3rem 0px;
		text-align: right;
	}
	.c_pn span{
		color: red;
	}
</style>