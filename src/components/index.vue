<template>
	<div>
		<div class="main">
			<router-link to="/search" class="m_search">
				<p>搜索商品</p>
			</router-link>
			<!-- <div class="m_top"></div> -->
			<!-- <img class="m_top" src="../assets/images/bg0.jpg"> -->
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img class="m_top" src="../assets/images/bg0.jpg"></div>
					<div class="swiper-slide"><img class="m_top" src="../assets/images/bg3.jpg"></div>
					<div class="swiper-slide"><img class="m_top" src="../assets/images/bg4.jpg"></div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>
			</div>
			<div class="m_cnt">
				<div class="m_c_g">
					<div class="c_g_top">
						<p class="c_g_tlt">今日热销</p>
						<span class="c_g_mor" @click="on_toGoodsList">更多</span>
					</div>
					<div class="c_g_god">
						<div class="goods" v-for="goods in goods_arr" :key="goods.id">
							<router-link :to="{path: '/goods_info', query: {'goodsid': goods.goodsId}}" style="display: block;">
								<!-- <img src="../assets/images/g0.png"/> -->
								<img class="g_img" :src="goods.imageUrl" />
								<p class="g_nme">{{goods.goodsName}}</p>
								<p class="g_pri">￥ {{goods.goodsPrice}}&nbsp;&nbsp;</p>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="m_cnt0">
				<div class="m_c_g">
					<div class="c_g_top">
						<p class="c_g_tlt">优惠专区</p>
						<span class="c_g_mor" @click="on_toYh">更多</span>
					</div>
					<div class="c_g_god">
						<div class="goods" v-for="goods in dic_goods_arr" :key="goods.id">
							<router-link :to="{path: '/goods_info', query: {'goodsid': goods.goodsId}}" style="display: block;">
								<!-- <img src="../assets/images/g0.png"/> -->
								<img class="g_img" :src="goods.imageUrl" />
								<p class="g_nme">{{goods.goodsName}}</p>
								<p class="g_pri">￥ {{goods.goodsPrice * goods.goodsDiscount}}&nbsp;&nbsp;<del>¥ {{goods.goodsPrice}}</del></p>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Swiper from 'swiper';
	// import 'swiper/dist/css/swiper.min.css';
	export default {
		data(){
			return {
				goods_arr: [],
				dic_goods_arr: []
			}
		},
		created(){
			this.$util.set_href_path();
			// console.error(1);
			this.$bus.emit("show_nav", true);
			// this.$bus.emit("show_nav", true);
			// this.on_cmd_get_goods_list();
			// this.$ajax.get("/api/pagingLjContactUsList", function(req, res){
			// 	console.error(res);
			// })
		},
		mounted(){
			new Swiper('.swiper-container', {
				// autoplay:1000,//可选选项，自动滑动loop: true,
				autoplay: {
					delay: 1500,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				speed:300,
				loop : true,
				pagination: {
					el: '.swiper-pagination',
				 }
			})
			this.on_cmd_get_goods_list();
			this.on_cmd_get_dic_goods_list();
		},
		methods: {
			on_toYh: function(){
				this.$router.push("/youhui");
			},
			on_cmd_get_goods_list: function(){
				let self = this;
				let goods_arr = self.goods_arr;
				self.$ajax.get(self.$url.goodslist + "?pageNum=1&pageSize=4").then(function (res) {
					console.error("商品列表", res.data);
					let data = res.data;
					data.body.list.forEach( item => {
						let goods = new self.$base.goods();
						goods.goodsId = item["goodsId"];
						goods.goodsDiscount = item["goodsDiscount"];
						goods.goodsName = item["goodsName"];
						goods.goodsPrice = item["goodsPrice"];
						goods.imageUrl = item["imageUrl"];
						goods.goodsSale = item["goodsSale"];
						goods_arr.push(goods);
					})
					self.goods_arr = goods_arr;
				})
			},
			on_cmd_get_dic_goods_list: function(){
				let self = this;
				let goods_arr = self.dic_goods_arr;
				self.$ajax.get(self.$url.dicgoodslist + "?pageNum=1&pageSize=4").then(function (res) {
					console.error("商品列表", res.data);
					let data = res.data;
					data.body.list.forEach( item => {
						let goods = new self.$base.goods();
						goods.goodsId = item["goodsId"];
						goods.goodsDiscount = item["goodsDiscount"];
						goods.goodsName = item["goodsName"];
						goods.goodsPrice = item["goodsPrice"];
						goods.imageUrl = item["imageUrl"];
						goods.goodsSale = item["goodsSale"];
						goods_arr.push(goods);
					})
					self.dic_goods_arr = goods_arr;
				})
			},
			on_toGoodsList: function(){
				this.$router.push("/goodslist");
			}
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			// this.$util.save_scroll_top();
			if (to.path == "/goods_info") {
				this.$util.set_goodsinfo_from_path("/");
			}
			next();
		}
	}
</script>

<style scoped>
	.main{
		overflow: scroll;
		width: 100%;
		height: 100%;
	}
	.m_search{
		display: block;
		width: 100%;
		height: 0.8rem;
		padding: 0.15rem;
	}
	.m_search p{
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
	.m_top{
		width: 100%;
		height: 3rem;
		background: #000;
	}
	.swiper-container{
		width: 7.5rem;
		height: 3rem;
	}
	.m_cnt, .m_cnt0{
		width: 100%;
		padding: 0.2rem;
		margin-bottom: 1rem;
		background: #fff;
		border-bottom: 0.02rem solid #ccc;
	}
	.m_cnt{
		margin-bottom: 0px;
	}
	.m_c_g{
		width: 100%;
	/*	height: 1rem;
		background: #000;*/
	}
	.c_g_top{
		width: 100%;
		height: 0.6rem;
		font-size: 0.35rem;
		padding: 0.125rem 0px;
		margin-bottom: 0.1rem;
		display: flex;
		justify-content: space-between;
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