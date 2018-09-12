<template>
	<div>
		<div class="main">
			<div class="m_goods" v-for="goods in test_data" :key="goods.id">
				<span :class="{'m_g_s': true, 'selected': goods.select}"></span>
				<router-link to="/goods_info">
					<img src="../assets/images/g0.png">
					<div class="m_g_d">
						<p class="g_d_n">{{goods.name}}</p>
						<p class="g_d_t">规格： {{goods.desc}}</p>
						<p class="g_d_p">￥{{goods.price}}</p>
					</div>
				</router-link>
				<div class="m_g_o">
					<span class="g_o_del">删除</span>
					<div class="g_o_ad">
						<span class="o_del"></span>
						<span class="o_num">{{goods.num}}</span>
						<span class="o_add"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="settlement">
			<div class="s_l">
				<span class="s_l_s"></span>
				<p>全选</p>
				<p class="s_l_p">合计：¥0</p>
			</div>
			<div class="s_r" @click="on_tosel">结 算</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "shop_car",
		data(){
			return {
				test_data: [
					// {'id': 0, 'name': '开关', 'desc': '三插座', 'price': 999, 'num': 1, 'select': true},
					// {'id': 1, 'name': '开关1', 'desc': '三插座1', 'price': 999, 'num': 2, 'select': false},
					// {'id': 2, 'name': '开关2', 'desc': '三插座2', 'price': 999, 'num': 1, 'select': true},
					// {'id': 3, 'name': '开关3', 'desc': '三插座3', 'price': 999, 'num': 10, 'select': false},
					// {'id': 4, 'name': '开关4', 'desc': '三插座4', 'price': 999, 'num': 2, 'select': true},
					// {'id': 5, 'name': '开关5', 'desc': '三插座5', 'price': 999, 'num': 1, 'select': false},
					// {'id': 6, 'name': '开关6', 'desc': '三插座6', 'price': 999, 'num': 1, 'select': false},
				]
			}
		},
		created(){
			this.$bus.emit("show_nav", true);
			this.$bus.emit("show_noinfo", [true, "亲，购物车空空的"]);
		},
		methods: {
			on_tosel: function(){
				this.$router.push("/settlement");
			}
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			// this.$util.save_scroll_top();
			this.$bus.emit("show_noinfo", [false, ""]);
			next();
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		padding-bottom: 2rem;
	}
	.m_goods{
		position: relative;
		width: 100%;
		height: 2rem;
		background: #fff;
		padding: 0.3rem;
		display: flex;
		border-bottom: 0.02rem solid #e7e7e7;
	}
	.m_goods a{
		display: flex;
	}
	.m_goods img{
		width: 1.4rem;
		height: 1.4rem;
		margin-left: 0.7rem;
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
	.m_g_o{
		position: absolute;
		top: 0.3rem;
		right: 0.3rem;
		text-align: right;
	}
	.g_o_del{
		font-size: 0.3rem;
		color: #a1a1a1;
	}
	.g_o_ad{
		margin-top: 0.6rem;
		display: flex;
	}
	.g_o_ad span{
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		border: 0.02rem solid #a1a1a1;
	}
	.o_del{
		background: url('../assets/images/icon2.png') no-repeat center center;
		background-size: 0.4rem 0.4rem;
	}
	.o_add{
		background: url('../assets/images/icon3.png') no-repeat center center;
		background-size: 0.3rem 0.3rem;
	}
	.o_num{
		width: 0.8rem!important;
		font-size: 0.3rem!important;
		text-align: center;
		line-height: 0.5rem;
	}
	.settlement{
		position: fixed;
		bottom: 1rem;
		left: 0px;
		width: 100%;
		height: 1rem;
		display: flex;
	}
	.s_l{
		width: 5.5rem;
		height: 100%;
		padding: 0.25rem;
		display: flex;
		background: #fff;
	}
	.s_r{
		width: 2rem;
		height: 100%;
		line-height: 1rem;
		text-align: center;
		background: red;
		color: #fff;
		font-size: 0.3rem;
	}
	.s_l_s{
		display: block;
		width: 0.5rem;
		height: 100%;
		background: url('../assets/images/icon5.png') no-repeat center center;
		background-size: 0.4rem 0.4rem;
		margin-left: 0.06rem;
		/* margin-right: 0.1rem; */
	}
	.s_l p{
		font-size: 0.3rem;
		line-height: 0.5rem;
		color: #a1a1a1;
	}
	.s_l p.s_l_p{
		color: red;
		margin-left: 2rem;
	}
</style>