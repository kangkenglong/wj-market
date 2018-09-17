<template>
	<div>
		<div class="main">
			<span class="btn_back" @click="on_back">
				<!-- <router-link :to="on_back"></router-link> -->
			</span>
			<div class="m_g_img">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(img, i) in imageList" :key="i"><img class="m_top" :src="img.imageUrl"></div>
					</div>
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>
				</div>
			</div>
			<div class="m_g_np gdiv">
				<p style="color: #000;">{{goodsName}}</p>
				<p style="color: red;" v-if="!is_yh">￥ {{goodsPrice}}</p>
				<p style="color: red;" v-else="is_yh">￥ {{goodsPrice * goodsDiscount}} <del style="font-size: 0.3rem;color: #555;">¥ {{goodsPrice}}</del></p>
			</div>
			<div class="m_g_cts gdiv">
				<p>运费：{{freeInd}} 元</p>
				<p>剩余：{{goodsNum}}</p>
				<p>销量：{{goodsSale}}</p>
			</div>
			<div class="m_g_tips gdiv">
				<p><span style="color: green;">XXX担保</span> 请放心购买</p>
			</div>
			<!-- <div class="m_g_iftxt">
				<p>供应商</p>
			</div> -->
			<div class="m_g_sop gdiv">
				<img src="../assets/images/bg.png" />
				<p>XXX五金</p>
			</div>
			<div class="m_g_iftxt">
				<p>商品详情</p>
			</div>
			<div class="m_g_inf gdiv">
				<!-- <div class="m_g_cnt" v-html="test_html"></div> -->
				<div class="m_g_cnt">
					<p>{{description}}</p>
					<img v-for="(img, i) in imageList" :key="i" :src="img.imageUrl" />
				</div>
			</div>
			<div class="g_buy">
				<div class="g_b_kf" @click="on_kf">客服</div>
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
	import Swiper from 'swiper';
	export default {
		name: 'Goods_info',
		data(){
			return {
				goodsId: 0,
				goodsName: "开关",
				goodsPrice: 999,
				goodsDiscount: 0,
				freeInd: 0,
				goodsNum: 999,
				goodsSale: 999,
				test_html: "<img src='/img/bg.png' />",
				islove: false,
				imageList: [],
				imageUrl: "",
				description: "",
				is_yh: false// 是否优惠
			}
		},
		methods: {
			on_back: function(){
				return window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
				// this.$router.go(-1);
			},
			on_kf: function(){
				this.$bus.emit("tips", [true, "暂无客服人员"]);
			},
			on_coll: function(){
				// this.islove = !this.islove;
				this.net_cmd_save_collent();
			},
			net_cmd_goods_info: function(){
				let self = this;
				let goods_arr = self.test_data;
				self.$ajax.get(self.$url.goodsinfo + self.goodsId).then(function (res) {
					console.error("商品详情", res.data);
					if (res.data.code == self.CODE.SUCCESS) {
						self.goodsName = res.data.body.goodsName ? res.data.body.goodsName : "暂无该商品名称，与管理员联系";
						self.goodsPrice = res.data.body.goodsPrice ? res.data.body.goodsPrice : 0;
						self.goodsDiscount = res.data.body.goodsDiscount ? res.data.body.goodsDiscount : 1;
						self.freeInd = res.data.body.freeInd ? res.data.body.freeInd : 0.00;
						self.goodsNum = res.data.body.goodsNum ? res.data.body.goodsNum : 0;
						self.goodsSale = res.data.body.goodsSale ? res.data.body.goodsSale : 0;
						self.description = res.data.body.description ? res.data.body.description : "";
						self.imageList = res.data.body.imageList ? res.data.body.imageList : [];
						self.is_yh = res.data.body.goodsDiscount ? true : false;
					}
					else {
						self.$bus.emit("tips", [true, "服务器在开小差，请稍后在试"]);
					}
				}).
				then(function() {
					new Swiper('.swiper-container', {
						// autoplay:1000,//可选选项，自动滑动loop: true,
						autoplay: {
							delay: 2000,
							stopOnLastSlide: false,
							disableOnInteraction: false,
						},
						speed:1000,
						loop : true,
						pagination: {
							el: '.swiper-pagination',
						 }
					})
				})
			},
			net_cmd_save_collent: function() {
				let self = this;
				let goods_arr = self.test_data;
				self.$ajax.post(self.$url.savecol, {
					"cstId": "KHBH1809090013",
					"goodsId": self.goodsId
				}).then(function (res) {
					console.error("收藏", res.data);
					if (res.data.code == self.CODE.SUCCESS) {
						self.islove = true;
					}
					else {
						self.$bus.emit("tips", [true, "服务器在开小差，请稍后在试"]);
					}
				})
			}
		},
		created(){
			this.$bus.emit("show_nav", false);
			console.error(this.$route);
			this.goodsId = this.$route.query.goodsid;
		},
		mounted(){
			this.net_cmd_goods_info();
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
	/* .m_g_img img{
		width: 100%;
		height: 100%;
	} */
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	.swiper-slide {
		display: flex;
		align-items: center;
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
		font-size: 0.27rem;
		color: #666;
		padding-top: 0px;
		/*padding-bottom: 0px;*//*
		border-bottom: 0.02rem solid #ccc;*/
	}
	.m_g_iftxt{
		width: 100%;
		height: 0.7rem;
		padding: 0.2rem 0px;
		font-size: 0.25rem;
		color: #666;
		text-align: center;
	}
	.m_g_cts p:nth-child(2){
		text-align: center;
	}
	.m_g_cts p:nth-child(3){
		text-align: right;
	}
	.m_g_tips{
		padding-top: 0px;
		font-size: 0.25rem;
		color: #000;
		padding-bottom: 0px;
	}
	.m_g_tips p{
		padding: 0.2rem 0px;
		border-top: 0.02rem solid #e9e9e9;
		border-bottom: 0.02rem solid #e9e9e9;
	}
	.m_g_sop{
		/* margin-top: 0.2rem; */
		display: flex;
		/* padding-bottom: 0px; */
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
		/* border-top: 0.02rem solid #ccc; */
		/* padding-top: 0.3rem; */
	},
	.m_g_cnt img {
		width: 100%;
	}
	.m_g_inf{
		/* margin-top: 0.2rem; */
		margin-bottom: 1rem;
	}
	.m_g_cnt p{
		font-size: 0.3rem;
		color: #555555;
		margin-bottom: 0.1rem;
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
		background: url('../assets/images/icon8.png') no-repeat center 0.13rem;
		background-size: 0.45rem 0.4rem;
	}
</style>