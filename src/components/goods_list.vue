<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>商品</p>
		</div>
		<div class="filtrae">
			<div @click="on_cut_filtare('zh')">
				<p :class="{'f_s': fil_sta == 'zh' }">综合</p>
			</div>
			<div  @click="on_cut_filtare('jg')">
				<p :class="{'f_s': fil_sta == 'jg' }">价格</p>
				<img :src="img_jg">
			</div>
			<div  @click="on_cut_filtare('xl')">
				<p :class="{'f_s': fil_sta == 'xl' }">销量</p>
				<img :src="img_xl">
			</div>
		</div>
		<div class="m_cnt" ref="cnt">
			<div class="m_c_g">
				<div class="c_g_god">
					<div class="goods" v-for="goods in test_data" :key="goods.id">
						<router-link to="/goods_info" style="display: block;">
							<!-- <img src="../assets/images/g0.png"/> -->
							<img class="g_img" :src="goods.imageUrl" />
							<p class="g_nme">{{goods.goodsName}}</p>
							<p class="g_pri">￥ {{goods.goodsPrice}}&nbsp;&nbsp;</p>
						</router-link>
					</div>
				</div>
			</div>
			<p class="m_tips" v-show="is_tips">没有更多的商品</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				fil_sta: "zh",
				img_jg: require("../assets/images/icon28_0.png"),
				cnum_jg: 0,// 0位价格大->小 1位价格小->大
				img_xl: require("../assets/images/icon28_0.png"),
				cnum_xl: 0,// 0为销量大->小 1为销量小->大
				page: 1,
				pageSize: 0,
				is_net: false,// 是否在请求中 防止滚动到末尾多次请求数据
				is_tips: false,// 是否显示已无更多的商品提示
				test_data: [
				]
			}
		},
		mounted(){
			this.$bus.emit("show_nav", false);
			this.on_cmd_get_goods_list();
			this.$util.set_scroll_el(this.$refs.cnt, 10).ser_scroll_event(this, this.on_load_more_goods);
		},
		methods: {
			on_back: function(){
				this.$router.go(-1);
			},
			on_cmd_get_goods_list: function(){
				let self = this;
				let goods_arr = self.test_data;
				self.$ajax.get(self.$url.goodslist + "?pageNum=" + self.page +"&pageSize=8").then(function (res) {
					console.error("商品列表", res.data);
					let data = res.data;
					self.pageSize = data.body.pages;
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
					self.$util.scroll_flag = true;
					self.is_net = false;
					self.on_filtare_arr(goods_arr);
				})
			},
			on_cut_filtare: function(type){
				console.error(type);
				if (this.fil_sta == type && type == "zh") return;
				this.fil_sta = type;
				switch(type) {
					case "zh":
						this.img_jg = require("../assets/images/icon28_0.png");
						this.img_xl = require("../assets/images/icon28_0.png");
						this.cnum_jg = 0;
						this.cnum_xl = 0;

						this.on_reset_net_data();
						this.on_cmd_get_goods_list();
						break;
					case "jg":
						this.img_xl = require("../assets/images/icon28_0.png");
						this.cnum_xl = 0;
						if (this.cnum_jg == 0) {
							this.img_jg = require("../assets/images/icon28_1.png");
							this.cnum_jg++;
						}
						else {
							this.img_jg = require("../assets/images/icon28_2.png");
							this.cnum_jg--;
						}

						this.on_reset_net_data();
						this.on_cmd_get_goods_list();
						break;
					case "xl":
						this.img_jg = require("../assets/images/icon28_0.png");
						this.cnum_jg = 0;
						if (this.cnum_xl == 0) {
							this.img_xl = require("../assets/images/icon28_1.png");
							this.cnum_xl++;
						}
						else {
							this.img_xl = require("../assets/images/icon28_2.png");
							this.cnum_xl--;
						}

						this.on_reset_net_data();
						this.on_cmd_get_goods_list();
						break;
				}
			},
			on_filtare_arr: function(arr) {
				if (this.fil_sta == "zh") {
					this.test_data = arr;
				}
				else if (this.fil_sta == "jg") {
					if (this.cnum_jg == 1) {
						arr.sort(function (a, b) {
							return a.goodsPrice - b.goodsPrice;
						})
						this.test_data = arr;
					}
					else {
						arr.sort(function (a, b) {
							return b.goodsPrice - a.goodsPrice;
						})
						this.test_data = arr;
					}
					console.error("价格数据", this.test_data);
				}
				else if (this.fil_sta == "xl") {
					if (this.cnum_xl == 1) {
						arr.sort(function (a, b) {
							return a.goodsSale - b.goodsSale;
						})
						this.test_data = arr;
					}
					else {
						arr.sort(function (a, b) {
							return b.goodsSale - a.goodsSale;
						})
						this.test_data = arr;
					}
					console.error("销量数据", this.test_data);
				}
			},
			arr_sort: function(a, b) {
				return a - b;
			},
			on_reset_net_data: function() {
				this.page = 1;
				this.is_tips = false;
				this.test_data = [];
				this.$util.scroll_to(0);
			},
			on_load_more_goods: function() {
				console.error("处理滚动回调");
				if (this.page < this.pageSize && !this.is_net) {
					this.is_tips = false;
					this.is_net = true;
					this.page++;
					this.on_cmd_get_goods_list();
				}
				else {
					this.$util.scroll_flag = true;
					this.is_tips = true;
				}
			}
		}
	}
</script>

<style scoped>
	.m_cnt{
		width: 100%;
		height: calc(100% - 1.7rem);
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
	.filtrae{
		width: 100%;
		height: 0.7rem;
		background: #ffffff;
		display: flex;
		justify-content: space-around;
		align-items:  center;
		font-size: 0.3rem;
		color: #686868;
	}
	.filtrae div{
		display: flex;
	}
	.filtrae img{
		width: 0.2rem;
		height: 0.3rem;
		margin-left: 0.05rem;
	}
	.f_s{
		color: red;
	}
	.m_tips{
		width: 100%;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #999999;
	}
</style>