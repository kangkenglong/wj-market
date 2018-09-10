<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>优惠专区</p>
		</div>
		<div class="m_cnt">
			<div class="m_c_g">
				<div class="c_g_god">
					<div class="goods" v-for="goods in test_data" :key="goods.id">
						<router-link to="/goods_info" style="display: block;">
							<!-- <img src="../assets/images/g0.png"/> -->
							<img class="g_img" src="../assets/images/g0.png" />
							<p class="g_nme">{{goods.name}}</p>
							<p class="g_pri">￥ {{goods.price}}&nbsp;&nbsp;<del>¥ 99.00</del></p>
						</router-link>
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
					{"id": 6, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 7, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 8, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
					{"id": 9, "price": 999, "name": "开关", "img": "../assets/images/g0.png"},
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
	.m_cnt{
		width: 100%;
		height: calc(100% - 1rem);
		overflow-y: scroll;
		padding: 0.2rem;
		/* margin-bottom: 1rem; */
		/* background: #fff; */
	}
	.m_c_g{
		width: 100%;
	/*	height: 1rem;
		background: #000;*/
	}
	.c_g_god{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goods{
		width: 3.45rem;
		height: 4.5rem;
		margin-bottom: 0.15rem;
		background: #fff;
	}
	.goods p{
		padding: 0px 0.2rem;
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
		font-size: 0.3rem;
		color: red;
	}
	.g_pri del{
		font-size: 0.2rem;
		color: #606060;
	}
	.c_g_tlt, .c_g_mor{
		font-size: 0.3rem;
	}
</style>