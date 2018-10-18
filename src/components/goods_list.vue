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
						<router-link :to="{path: 'goods_info', query: {'goodsid': goods.goodsId}}" style="display: block;">
							<!-- <img src="../assets/images/g0.png"/> -->
							<img class="g_img" :src="goods.imageUrl" />
							<p class="g_nme">{{goods.goodsName}}</p>
							<p class="g_pri">￥ {{goods.goodsPrice}}&nbsp;&nbsp;</p>
						</router-link>
					</div>
				</div>
			</div>
			<p class="m_tips" v-show="b_tips">没有更多的商品</p>
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
				pageNum: 1,
				pageSize: 8,
				pages: 0,
				b_net: false,// 是否在请求中 防止滚动到末尾多次请求数据
				b_tips: false,// 是否显示已无更多的商品提示
				b_scroll: false,// 是否加载后滚动
				test_data: [
				]
			}
		},
		mounted(){
			// ---------回到原来浏览的位置 begin----------
			let pageNum = this.$util.get_page()[0];
			let pageSize = this.$util.get_page()[1];
			this.net_cmd_get_pages();
			if (pageNum == -1 && pageSize == -1) {
				this.$util.reset_scroll_top();
				console.error("1", this.$util.get_page());
				this.on_cmd_get_goods_list(this.pageNum, 8);
			}
			else {
				console.error("2", this.$util.get_page());
				this.pageNum = pageNum;
				this.b_scroll = true;
				this.on_cmd_get_goods_list(1, pageSize * pageNum);
			}
			// -------end-------
			this.$bus.emit("show_nav", false);
			this.$util.set_scroll_el(this.$refs.cnt, 10, this, this.on_load_more_goods);
		},
		methods: {
			on_back: function(){
				this.pageNum = -1;
				this.pageSize = -1;
				this.$router.push("/");
			},
			on_cmd_get_goods_list: function(pageNum, pageSize){
				console.error("请求", pageNum, pageSize);
				let self = this;
				self.$ajax.get(self.$url.goodslist + "?pageNum=" + pageNum +"&pageSize=" + pageSize).then(function (res) {
					console.error("商品列表", res.data);
					let data = res.data;
					let length = res.data.body.list.length;
					if (data.code == self.CODE.SUCCESS) {
						let goods_arr = self.test_data;
						if (length > 0) {
							self.$bus.emit("show_noinfo", [false, "暂无商品"]);
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
							self.b_net = false;
							self.on_filtare_arr(goods_arr);
						}
						else {
							self.$bus.emit("show_noinfo", [true, "暂无商品"]);
						}
						// self.pages = res.data.body.pages;
						self.b_tips = false;
					}
					else {
						self.$bus.emit("tips", [true, "服务器开小差，请稍后在试"]);
					}
				}).then(function() {
					if (self.b_scroll) {
						self.$util.scroll_to(self.$util.get_scroll_top());
						// self.b_scroll = false;// 开启加载更多
					}
				})
			},
			net_cmd_get_pages: function() {
				let self = this;
				self.$ajax.get(this.$url.goodslist + "?pageSize=8&pageNum=1").then(function (res) {
					console.error("请求页数", res);
					if (res.data.code == self.CODE.SUCCESS) {
						self.pages = res.data.body.pages;
					}
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
						this.on_cmd_get_goods_list(this.pageNum, this.pageSize);
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
						this.on_cmd_get_goods_list(this.pageNum, this.pageSize);
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
						this.on_cmd_get_goods_list(this.pageNum, this.pageSize);
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
				this.pageNum = 1;
				this.pageSize = 8;
				this.b_tips = false;
				this.test_data = [];
				this.$util.reset_scroll_top();
			},
			on_load_more_goods: function() {
				console.error("处理滚动回调");
				// if (this.b_scroll) {
				if (this.pages > this.pageNum && !this.b_net) {
					this.b_tips = false;
					this.b_net = true;
					this.pageNum++;
					this.pageSize = 8;
					this.b_scroll = false;
					this.on_cmd_get_goods_list(this.pageNum, this.pageSize);
				}
				else {
					this.b_tips = true;
				}
				// }
			}
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			if (to.path == "/goods_info") {
				this.$util.set_goodsinfo_from_path("/goodslist");
			}
			if (this.pageNum == -1 && this.pageSize == -1) {
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