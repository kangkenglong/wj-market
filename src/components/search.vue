<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>搜索</p>
		</div>
		<div class="m_search">
			<input type="text" placeholder="搜索商品">
		</div>
		<div class="main">
			<div class="goods" v-for="goods in test_data" :key="goods.id">
				<router-link to="/goods_info" style="display: block;">
					<!-- <img src="../assets/images/g0.png"/> -->
					<img class="g_img" src="../assets/images/g0.png" />
					<p class="g_nme">{{goods.name}}</p>
					<p class="g_pri">￥ {{goods.price}}</p>
				</router-link>
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
	.m_search{
		width: 100%;
		height: 0.8rem;
		padding: 0.15rem;
		border-bottom: 0.02rem solid #ccc;
	}
	.m_search input{
		width: 100%;
		height: 100%;
		font-size: 0.25rem;
		line-height: 0.5rem;
		color: #808080;
		padding-left: 0.6rem;
		border-radius: 0.1rem 0.1rem;
		border: 0px;
		background: #fff;
		background-image: url('../assets/images/icon1.png');
		background-size: 0.3rem 0.3rem;
		background-position: 0.15rem center;
		background-repeat: no-repeat;
	}
	.main{
		width: 100%;
		height: calc(100% - 1.8rem);
		overflow-y: scroll;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0.1rem 0.2rem;
	}
	.goods{
		width: 3.45rem;
		height: 4.5rem;
		margin-bottom: 0.15rem;
		background: #fff;
	}
	.g_img{
		width: 100%;
		height: 3.45rem;
		margin-bottom: 0.1rem;
	}
	.g_nme{
		font-size: 0.3rem;
		margin-bottom: 0.1rem;
		color: #000;
	}
	.g_pri{
		font-size: 0.25rem;
		color: red;
	}
	.c_g_tlt, .c_g_mor{
		font-size: 0.3rem;
	}
</style>