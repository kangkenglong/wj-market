<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>我的收藏</p>
		</div>
		<div class="main">
			<div class="m_goods" v-for="goods in test_data" :key="goods.id">
				<router-link to="/goods_info">
					<img src="../assets/images/g0.png">
					<div class="m_g_d">
						<p class="g_d_n">{{goods.name}}</p>
						<p class="g_d_t">规格： {{goods.desc}}</p>
						<p class="g_d_p">￥{{goods.price}}</p>
					</div>
				</router-link>
				<span class="g_dell"></span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "shop_car",
		data(){
			return {
				test_data: [
					{'id': 0, 'name': '开关', 'desc': '三插座', 'price': 999, 'num': 1, 'select': true},
					{'id': 1, 'name': '开关1', 'desc': '三插座1', 'price': 999, 'num': 2, 'select': false},
					{'id': 2, 'name': '开关2', 'desc': '三插座2', 'price': 999, 'num': 1, 'select': true},
					{'id': 3, 'name': '开关3', 'desc': '三插座3', 'price': 999, 'num': 10, 'select': false},
					{'id': 4, 'name': '开关4', 'desc': '三插座4', 'price': 999, 'num': 2, 'select': true},
					{'id': 5, 'name': '开关5', 'desc': '三插座5', 'price': 999, 'num': 1, 'select': false},
					{'id': 6, 'name': '开关6', 'desc': '三插座6', 'price': 999, 'num': 1, 'select': false},
				]
			}
		},
		methods: {
			on_back: function(){
				this.$router.go(-1);
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
		height: calc(100% - 1rem);
		overflow-y: scroll;
		/* padding-bottom: 2rem; */
	}
	.m_goods{
		position: relative;
		width: 100%;
		height: 2rem;
		background: #fff;
		padding: 0.3rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 0.02rem solid #e7e7e7;
	}
	.m_goods a{
		display: flex;
	}
	.m_goods img{
		width: 1.4rem;
		height: 1.4rem;
	}
	.m_g_s{
		position: absolute;
		top: 50%;
		left: 0.3rem;
		width: 0.5rem;
		height: 0.5rem;
		margin-top: -0.25rem;
		background: url('../assets/images/icon5.png') no-repeat center center;
		background-size: 100% 100%;
	}
	.selected{
		background: url('../assets/images/icon4.png') no-repeat center center;
		background-size: 100% 100%;
	}
	.m_g_d{
		margin-left: 0.2rem;
		text-align: left;
	}
	.g_d_n{
		font-size: 0.30rem;
		color: #000;
	}
	.g_d_t{
		font-size: 0.25rem;
		color: #a9a9a9;
		margin-top: 0.15rem;
	}
	.g_d_p{
		font-size: 0.25rem;
		color: red;
		margin-top: 0.15rem;
	}
	.g_dell{
		width: 0.45rem;
		height: 100%;
		background: url('../assets/images/icon18.png') no-repeat center center;
		background-size: 100% 0.45rem;
	}
</style>