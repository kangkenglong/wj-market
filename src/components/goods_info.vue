<template>
	<div>
		<div class="main">
			<span class="btn_back" @click="on_back">
				<!-- <router-link :to="on_back"></router-link> -->
			</span>
			<div class="m_g_img">
				<img src="../assets/images/g0_big.png" />
			</div>
			<div class="m_g_np gdiv">
				<p style="color: #000;">{{name}}</p>
				<p style="color: red;">￥ {{price}}</p>
			</div>
			<div class="m_g_cts gdiv">
				<p>运费：{{freight}}</p>
				<p>剩余：{{counts}}</p>
				<p>销量：{{sail}}</p>
			</div>
			<div class="m_g_tips gdiv">
				<p><span style="color: green;">XXX担保</span> 请放心购买</p>
			</div>
			<div class="m_g_sop gdiv">
				<img src="../assets/images/bg.png" />
				<p>XXX五金</p>
			</div>
			<div class="m_g_inf gdiv">
				<!-- <div class="m_g_cnt" v-html="test_html"></div> -->
				<div class="m_g_cnt">
					<img src="../assets/images/bg.png" />
					<p>好用好用好用</p>
					<img src="../assets/images/bg.png" />
					<p>好用好用好用</p>
					<img src="../assets/images/bg.png" />
					<p>好用好用好用</p>
					<img src="../assets/images/bg.png" />
					<p>好用好用好用</p>
					<img src="../assets/images/bg.png" />
					<p>好用好用好用</p>
					<img src="../assets/images/bg.png" />
					<p>好用好用好用</p>
				</div>
			</div>
			<div class="g_buy">
				<div class="g_b_kf">客服</div>
				<div :class="{'g_b_sc': true, 'g_b_set': islove}" @click="on_coll">收藏</div>
				<div class="g_b_gwc">购物车</div>
				<div class="g_b_add">
					<p>加入购物车</p>
				</div>
				<div class="g_b_buy">
					<router-link to="/">立即购买</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'Goods_info',
		data(){
			return {
				name: "开关",
				price: 999,
				freight: "免运费",
				counts: 999,
				sail: 999,
				test_html: "<img src='/img/bg.png' />",
				islove: false
			}
		},
		methods: {
			on_back: function(){
				return window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
				// this.$router.go(-1);
			},
			on_coll: function(){
				this.islove = !this.islove;
			}
		},
		created(){
			this.$bus.emit("show_nav", false);
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}
	.m_g_img{
		width: 7.5rem;
		height: 7.5rem;
	}
	.m_g_img img{
		width: 100%;
		height: 100%;
	}
	.btn_back{
		position: fixed;
		z-index: 999;
		width: 0.8rem;
		height: 0.8rem;
		top: 0.3rem;
		left: 0.3rem;
		background: rgba(70, 70, 70, 0.5);
		background-image: url('../assets/images/goback.png');
		background-size: 0.5rem 0.5rem;
		background-position: 0.15rem center;
		background-repeat: no-repeat;
		border-radius: 0.4rem;
	}
	.btn_back a{
		display: block;
		width: 100%;
		height: 100%;
	}
	.gdiv{
		width: 100%;
		padding: 0.2rem;
		background: #fff;
	}
	.m_g_np{
		font-size: 0.4rem;
		line-height: 0.5rem;
	}
	.m_g_cts{
		display: flex;
		justify-content: space-between;
		font-size: 0.25rem;
		color: #ccc;
		padding-top: 0px;
		/*padding-bottom: 0px;*//*
		border-bottom: 0.02rem solid #ccc;*/
	}
	.m_g_tips{
		padding-top: 0px;
		font-size: 0.25rem;
		color: #000;
	}
	.m_g_tips p{
		padding-top: 0.2rem;
		border-top: 0.02rem solid #e9e9e9;
	}
	.m_g_sop{
		margin-top: 0.2rem;
		display: flex;
		padding-bottom: 0px;
	}
	.m_g_sop img{
		width: 1rem;
		height: 1rem;
	}
	.m_g_sop p{
		font-size: 0.5rem;
		color: #000;
		line-height: 1rem;
		margin-left: 0.2rem;
	}
	.m_g_cnt{
		width: 100%;
		border-top: 0.02rem solid #ccc;
		padding-top: 0.3rem;
	}
	.m_g_inf{
		margin-bottom: 1rem;
	}
	.g_buy{
		position: fixed;
		z-index: 99999;
		left: 0px;
		bottom: 0px;
		width: 100%;
		height: 1rem;
		background: #fff;
		display: flex;
	}
	.g_b_kf, .g_b_sc, .g_b_gwc{
		/*flex-grow: 1;*/
		width: 1rem;
		height: 1rem;
		font-size: 0.2rem;
		color: #606060;
		padding-top: 0.65rem;
		text-align: center;
	}
	.g_b_add{
		/*flex-grow: 1.8;*/
		width: 2.25rem;
		height: 1rem;
		background: #ff8855;
	}
	.g_b_buy{
		/*flex-grow: 1.8;*/
		width: 2.25rem;
		height: 1rem;
		background: #ff4444;
	}
	.g_b_add p{
		width: 100%;
		font-size: 0.3rem;
		text-align: center;
		line-height: 1rem;
		color: #fff;
	}
	.g_b_buy a{
		display: block;
		width: 100%;
		font-size: 0.3rem;
		text-align: center;
		line-height: 1rem;
		color: #fff;
	}
	.g_b_kf{
		background: url('../assets/images/icon20.png') no-repeat center 0.08rem;
		background-size: 0.6rem 0.6rem;
	}
	.g_b_sc{
		background: url('../assets/images/icon19.png') no-repeat center 0.095rem;
		background-size: 0.5rem 0.5rem;
	}
	.g_b_set{
		background: url('../assets/images/icon21.png') no-repeat center 0.12rem;
		background-size: 0.4rem 0.4rem;
	}
	.g_b_gwc{
		background: url('../assets/images/icon8.png') no-repeat center 0.08rem;
		background-size: 0.5rem 0.5rem;
	}
</style>