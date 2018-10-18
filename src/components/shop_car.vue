<template>
	<div>
		<div class="main"  ref="cnt">
			<div class="m_goods" v-for="(goods, i) in sc_data" :key="goods.id">
				<span :class="{'m_g_s': true, 'selected': goods.select}"></span>
				<router-link  :to="{path: 'goods_info', query: {'goodsid': goods.goodsId}}">
					<img :src="goods.imageUrl">
					<div class="m_g_d">
						<p class="g_d_n">{{goods.goodsName}}</p>
						<!-- <p class="g_d_t">规格： {{goods.desc}}</p> -->
						<p class="g_d_p">￥{{goods.goodsPrice * goods.goodsDiscount}}</p>
					</div>
				</router-link>
				<div class="m_g_o">
					<span class="g_o_del" @click="on_del_addr(goods.id, i)">删除</span>
					<div class="g_o_ad">
						<span class="o_del" @click="on_del_num(goods.id, goods.goodsNum)"></span>
						<span class="o_num">{{goods.goodsNum}}</span>
						<span class="o_add" @click="on_add_num(goods.id, goods.goodsNum)"></span>
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
				sc_data: [],
				b_op: false,// 是否在修改商品数量
				b_net: false,// 是否在请求中
				b_tips: false,// 是否提示没有更多商品
				b_scroll: false,// 是否加载后滚动
				b_load_move: true,// 是否开启加载更多
				pageNum: 1,
				pageSize: 8,
				pages: 0
			}
		},
		created(){
			this.$bus.emit("show_nav", true);
		},
		mounted() {
			// 测试
			// this.net_cmd_shopcar_list();
			// ---------回到原来浏览的位置 begin----------
			let pageNum = this.$util.get_page()[0];
			let pageSize = this.$util.get_page()[1];
			this.net_cmd_get_pages();
			if (pageNum == -1 && pageSize == -1) {
				this.$util.reset_scroll_top();
				console.error("1", this.$util.get_page());
				this.net_cmd_shopcar_list(this.pageNum, 8);
			}
			else {
				console.error("2", this.$util.get_page());
				this.pageNum = pageNum;
				this.b_scroll = true;
				this.net_cmd_shopcar_list(1, pageSize * pageNum);
			}
			// -------end-------
			this.$util.set_scroll_el(this.$refs.cnt, 10, this, this.on_load_more_goods);
			// 测试

			// if (this.$util.b_login()) {
			// 	this.net_cmd_shopcar_list();
			// }
			// else {
			// 	this.sc_data = [];
			// 	this.$bus.emit("show_noinfo", [true, "亲，购物车空空的"]);
			// }
		},
		methods: {
			on_tosel: function(){
				if (this.$util.b_login()) {
					if (this.sc_data.length > 0)
						this.$router.push("/settlement");
				}
				else {
					this.$bus.emit("tips", [true, "亲，请先登录"]);
				}
			},
			on_del_num: function(id, num) {
				if (this.b_op) return;
				if (num != 1) {
					num--;
					this.net_cmd_goodsNum_change(id, num);
				}
				else {
					this.$bus.emit("tips", [true, "商品数量不能小于1"]);
				}
			},
			on_add_num: function(id, num) {
				if (this.b_op) return;
				num++;
				this.net_cmd_goodsNum_change(id, num);
			},
			update_sc_data: function(id, num) {
				for (let i = 0; i < this.sc_data.length; i++) {
					let goods = this.sc_data[i];
					if (goods.id == id) {
						goods.goodsNum = num;
						break;
					}
				}
			},
			net_cmd_goodsNum_change: function(id, num) {
				this.b_op = true;
				let self = this;
				self.$ajax.post(self.$url.udCar, {
					"id": id,
					"goodsNum" : num
				}).then(function(res) {
					console.error("更改结果", res);
					if (res.data.code == self.CODE.SUCCESS) {
						self.update_sc_data(id, num);
					}
					self.b_op = false;
				})
			},
			net_cmd_shopcar_list: function(pageNum, pageSize) {
				let self = this;
				let userinfo = self.$util.get_userInfo();
				let cstId = userinfo.cstid;
				self.$ajax.get(self.$url.carList + "?cstId=" + "KHBH1809090013" + "&pageSize=" + pageSize +"&pageNum=" + pageNum).then(function(res) {
					console.error("物车列表", res);
					if (res.data.code == self.CODE.SUCCESS) {
						let sc_list = self.sc_data;
						let data = res.data.body.list;
						let length = data.length;
						if (length > 0) {
							data.forEach(item => {
								let gc = new self.$base.goodsCar();
								gc.id = item.id;
								gc.cartId = item.cartId;
								gc.goodsId = item.goodsId;
								gc.goodsName = item.goodsName;
								gc.goodsPrice = item.goodsPrice;
								gc.goodsDiscount = item.goodsDiscount || 1;
								gc.imageUrl = item.imageUrl;
								gc.goodsNum = item.goodsNum;
								sc_list.push(gc);
							})
							self.sc_data = sc_list;
							self.b_net = false;
						}
						else {
							self.$bus.emit("show_noinfo", [true, "购物车空空的"]);
						}
						// self.pages = res.data.body.pages;
						self.b_tips = false;
					}
					else {
						self.$bus.emit("tips", [true, "服务器在开小差，请稍后在试"]);
					}
				}).then(function() {
					if (self.b_scroll)
						self.$util.scroll_to(self.$util.get_scroll_top());
					self.b_load_move = true;// 开启加载更多
				})
			},
			net_cmd_get_pages: function() {
				let self = this;
				let userinfo = self.$util.get_userInfo();
				let cstId = userinfo.cstid;
				self.$ajax.get(self.$url.carList + "?cstId=" + "KHBH1809090013" + "&pageSize=8&pageNum=1").then(function (res) {
					console.error("请求页数", res);
					if (res.data.code == self.CODE.SUCCESS) {
						self.pages = res.data.body.pages;
					}
				})
			},
			on_load_more_goods: function() {
				console.error("处理滚动回调");
				if (this.b_load_move) {
					if (this.pages > this.pageNum && !this.b_net) {
						this.b_tips = false;
						this.b_net = true;
						this.pageNum++;
						this.pageSize = 8;
						this.b_scroll = false;
						this.net_cmd_shopcar_list(this.pageNum, this.pageSize);
					}
					else {
						this.b_tips = true;
					}
				}
			},
			on_del_addr: function(id, index) {
				if (id == undefined) return;
				let self = this;
				this.$ajax.get(this.$url.delCar + "?id=" + id).then(function (res) {
					if (res.data.code == self.CODE.SUCCESS) {
						self.$bus.emit("tips", [true, "删除成功"]);
						self.sc_data.splice(index, 1);
						self.$util.save_scroll_top();
						self.b_scroll = true;
						self.b_load_move = false;// 防止后面sc_data至为[]时 触发加载更多
						self.sc_data = [];
						// self.pageSize = 12 * self.pageNum;
						self.net_cmd_get_pages();
						self.net_cmd_shopcar_list(1, 8 * self.pageNum);
					}
					else {
						self.$bus.emit("tips", [true, "服务器开小差，请稍后再试"]);
					}
				})
			}
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			// this.$util.save_scroll_top();
			let path = to.path;
			if (path == "/main" || path == "/" || path == "/goods_type") {
				this.pageNum = -1;
				this.pageSize = -1;
				this.$util.reset_scroll_top();
			}
			else {
				this.$util.save_scroll_top();
			}
			this.$util.set_page(this.pageNum, this.pageSize);
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