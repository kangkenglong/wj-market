<template>
	<div>
		<div class="main">
			<div class="m_top">
				<img src="../assets/images/bg0.jpg">
			</div>
			<div class="m_cnt">
				<div class="m_c_l">
					<div class="c_l_type" v-for="type in test_type" :key="type.id">
						<p :class="{'l_t_p': true, 'type_std': type.id == index}" @click="on_choose(type.id)">{{type.type}}</p>
					</div>
				</div>
				<div class="m_c_r">
					<div class="c_r_g"  v-for="goods in test_data" :key="goods.id">
						<router-link to="/goods_info">
							<img src="../assets/images/g0.png" />
							<div class="r_g_d">
								<p class="r_g_n">{{goods.name}}</p>
								<p class="r_g_p">¥{{goods.price}}</p>
							</div>
						</router-link>
						<span class="c_r_add"></span>
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
				index: 0,
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
					{"id": 10, "price": 999, "name": "开关", "img": "../assets/images/g0.png"}
				],
				test_type: [
					{"id": 0, "type": "开关"},
					{"id": 1, "type": "开关"},
					{"id": 2, "type": "开关"},
					{"id": 3, "type": "开关"},
					{"id": 4, "type": "开关"},
					{"id": 5, "type": "开关"},
					{"id": 6, "type": "开关"}
				]
			}
		},
		methods: {
			on_choose: function(id){
				// return id == 1;
				console.error(id);
				this.index = id;
			}
		},
		created(){
			this.$bus.emit("show_nav", true);
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100%;
		/* position: relative; */
	}
	.m_top{
		width: 100%;
		height: 3rem;
		background: #000;
	}
	.m_top img{
		width: 100%;
		height: 100%;
	}
	.m_cnt{
		/* position: absolute;
		top: 3rem;
		bottom: 1rem;
		left: 0rem;
		right: 0rem; */
		/* z-index: 99999; */
		width: 100%;
		/* height: 9.34rem; */
		height: calc(100% - 3rem);
		/* height: -webkit-calc(100% - 4rem); */
		/* padding: 0.2rem; */
		display: flex;
		margin-bottom: 1rem;
		/* background: #fff; */
	}
	.m_c_l{
		width: 2rem;
		height: 100%;
		overflow-y: scroll;
		padding-bottom: 1rem;
		border-right: 0.02rem solid #ccc;
	}
	.m_c_r{
		width: 5.48rem;
		height: 100%;
		padding-bottom: 1rem;
		overflow-y: scroll;
	}
	.c_l_type{
		width: 100%;
		height: 1rem;
		border-bottom: 0.02rem solid #ccc;
	}
	.l_t_p{
		padding-left: 0.5rem;
		line-height: 0.98rem;
		font-size: 0.3rem;
		color: #999;
	}
	.type_std{
		background: #fff;
		font-size: 0.31rem;
		color: #000;
		border-left: 0.05rem solid red;
	}
	.c_r_g{
		position: relative;
		width: 100%;
		height: 1.5rem;
		background: #fff;
		border-bottom: 0.02rem solid #ccc;
		padding: 0.2rem;
	}
	.c_r_g a{
		display: flex;
		width: 100%;
		height: 100%;
	}
	.c_r_g img{
		width: 1.1rem;
		height: 1.1rem;
	}
	.r_g_d{
		margin-left:  0.1rem;
	}
	.r_g_n{
		font-size: 0.3rem;
		color:  #000;
	}
	.r_g_p{
		font-size: 0.25rem;
		color: red;
		margin-top: 0.1rem;
	}
	.c_r_add{
		position: absolute;
		display: block;
		background-image: url('../assets/images/icon0.png');
		background-size: 100% 100%;
		width: 0.5rem;
		height: 0.5rem;
		bottom: 0.2rem;
		right: 0.2rem;
	}
</style>