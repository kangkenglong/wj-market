<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>我的收藏</p>
		</div>
		<div class="main" ref="cnt">
			<div class="m_goods" v-for="(goods, i) in clt_list" :key="i">
				<a @click="on_to_goodsinfo(goods.goodsId)">
					<img :src="goods.imageUrl">
					<div class="m_g_d">
						<p class="g_d_n">{{goods.goodsName}}</p>
						<p class="g_d_p">￥{{goods.goodsPrice}}</p>
					</div>
				</a>
				<span class="g_dell" @click="on_del_clt(goods.id, i)"></span>
			</div>
			<p class="m_tips" v-show="b_tips">没有更多的信息</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "shop_car",
		data(){
			return {
				clt_list: [
				],
				b_net: false,// 是否在请求中
				b_tips: false,// 是否提示没有更多商品
				b_load_move: true,// 是否开启加载更多
				pageNum: 1,
				pageSize: 12,
				pages: 0
			}
		},
		methods: {
			on_back: function(){
				this.pageNum = -1;
				this.pageSize = -1;
				this.$router.go(-1);
			},
			net_cmd_clt_list: function(pageNum, pageSize){
				let self = this;
				console.error(pageSize);
				self.$ajax.get(self.$url.cltlist + "&pageNum=" + pageNum + "&pageSize=" + pageSize).then(function (res) {
					console.error("收藏列表", res.data);
					let data = res.data;
					if (data.code == self.CODE.SUCCESS) {
						let arr = self.clt_list;
						let length = data.body.list.length;
						if (length > 0) {
							self.$bus.emit("show_noinfo", [false, ""]);
							data.body.list.forEach(item => {
								let clt = new self.$base.collect();
								clt.goodsId = item.goodsId;
								clt.goodsPrice = item.goodsPrice ? item.goodsPrice : 0;
								clt.imageUrl = item.imageUrl;
								clt.goodsName = item.goodsName;
								clt.goodsDiscount = item.goodsDiscount ? item.goodsDiscount : 1;
								clt.id = item.id;
								clt.collectId = item.collectId;
								arr.push(clt);
							})
							self.clt_list = arr;
							self.b_net = false;
						}
						else {
							self.$bus.emit("show_noinfo", [true, "快把喜欢的宝贝添加进来吧"]);
						}
						self.pages = res.data.body.pages;
						self.b_tips = false;
					}
					else {
						self.$bus.emit("tips", [true, "服务器开小差，请稍后在试"]);
					}
				}).then(function() {
					self.$util.scroll_to(self.$util.scroll_top);
					self.b_load_move = true;// 开启加载更多
				})
			},
			on_load_more_clt: function() {
				console.error("处理滚动回调");
				if (this.b_load_move) {
					if (this.pages > this.pageNum && !this.b_net) {
						this.b_tips = false;
						this.b_net = true;
						this.pageNum++;
						this.pageSize = 12;
						this.net_cmd_clt_list(this.pageNum, this.pageSize);
					}
					else {
						this.b_tips = true;
					}
				}
			},
			on_del_clt: function(id, index) {
				if (id == undefined) return;
				let self = this;
				this.$ajax.get(this.$url.delclt + id).then(function (res) {
					console.error(res);
					if (res.data.code == self.CODE.SUCCESS) {
						self.$bus.emit("tips", [true, "删除成功"]);
						self.clt_list.splice(index, 1);
						self.$util.save_scroll_top();
						 self.b_load_move = false;// 防止后面clt_list至为[]时 触发加载更多
						self.clt_list = [];
						// self.pageSize = 12 * self.pageNum;
						self.net_cmd_clt_list(1, 12 * self.pageNum);
					}
					else {
						self.$bus.emit("tips", [true, "服务器开小差，请稍后再试"]);
					}
				})
			},
			on_to_goodsinfo: function(id){
				console.error(id);
				this.$router.push({path: "/goods_info", query: {"goodsid": id}});
			}
		},
		created(){
			this.$bus.emit("show_nav", false);
		},
		mounted(){
			// ---------回到原来浏览的位置 begin----------
			let pageNum = this.$util.get_page()[0];
			let pageSize = this.$util.get_page()[1];
			if (pageNum == -1 && pageSize == -1) {
				this.$util.reset_scroll_top();
				console.error("1", this.$util.get_page());
				this.net_cmd_clt_list(this.pageNum, 12);
			}
			else {
				console.error("2", this.$util.get_page());
				this.pageNum = pageNum;
				this.net_cmd_clt_list(1, pageSize * pageNum);
			}
			// -------end-------
			this.$util.set_scroll_el(this.$refs.cnt, 10, this, this.on_load_more_clt);
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			this.$util.save_scroll_top();
			this.$util.set_page(this.pageNum, this.pageSize);
			this.$bus.emit("show_noinfo", [false, ""]);
			next();
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
	.m_tips{
		width: 100%;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #999999;
	}
</style>