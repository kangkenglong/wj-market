<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>积分商城</p>
		</div>
		<div class="top">
			<p class="t_p">可用积分</p>
			<p class="t_g">0</p>
		</div>
		<div class="title">
			<p class="t_tlt">兑换专区</p>
		</div>
		<div class="content">
			<div class="glist">
				<div class="goods" v-for="goods in test_data" :key="goods.id">
					<img class="g_img" src="../assets/images/g0.png" />
					<div class="g_div">
						<p class="g_nme">{{goods.name}}</p>
						<p class="g_nme">库存：999</p>
					</div>
					<div class="g_div">
						<p class="g_pri">积分： {{goods.price}}</p>
						<div class="g_btn">兑换</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				test_data: [
					{"id": 1, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 2, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 3, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 4, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 5, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 6, "price": 999, "name": "开关", "img": "../assets/images/g0.png"}
				]
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
	.title{
		background: #ffffff;
		width: 100%;
		height: 0.8rem;
	}
	.t_tlt{
		width: 100%;
		text-align: center;
		font-size: 0.28rem;
		color: #818181;
		line-height: 0.8rem;
	}
	.content{
		padding: 0.1rem;
		overflow-y: scroll;
		width: 100%;
		height: calc(100% - 3.45rem) ;
	}
	.glist{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goods{
		width: 3.6rem;
		/* height: 4.5rem; */
		margin-bottom: 0.15rem;
		background: #fff;
	}
	.g_img{
		width: 100%;
		height: 3.45rem;
		margin-bottom: 0.1rem;
	}
	.g_nme{
		font-size: 0.28rem;
		margin-bottom: 0.1rem;
		color: #000;
	}
	.g_pri{
		font-size: 0.25rem;
		color: red;
	}
	.g_div{
		width: 100%;
		padding: 0px 0.1rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.1rem;
	}
	.g_btn{
		padding: 0.1rem 0.2rem;
		color: #ffffff;
		border-radius: 0.1rem;
		background: red;
	}
</style>