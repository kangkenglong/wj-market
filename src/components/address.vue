<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>地址管理</p>
		</div>
		<div class="cnt" ref="cnt">
			<div class="c_a" v-for="(addr, i) in addr_list" :key="addr.id">
				<div class="a_b" @click="on_to_addrinfo(addr)">
					<img src="../assets/images/icon27.png">
				</div>
				<div class="a_i">
					<p class="i_n">{{addr.receiver}} {{addr.phone}}</p>
					<p class="i_i">{{addr.province}}{{addr.city}}{{addr.county}}{{addr.street}}</p>
				</div>
				<div class="a_d">
					<p @click="on_del_addr(addr.id, i)">删除</p>
				</div>
			</div>
			<p class="m_tips" v-show="b_tips">没有更多的信息</p>
		</div>
		<div class="btn">
			<p @click="on_add">新&nbsp;&nbsp;&nbsp;增</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				addr_list: [],
				b_net: false,// 是否在请求中
				b_tips: false,// 是否提示没有更多商品
				b_load_move: true,// 是否开启加载更多
				pageNum: 1,
				pageSize: 12,
				pages: 0
			}
		},
		created(){
			this.$bus.emit("show_nav", false);
		},
		mounted(){
			let pageNum = this.$util.get_page()[0];
			let pageSize = this.$util.get_page()[1];
			if (pageNum == -1 && pageSize == -1) {
				this.$util.reset_scroll_top();
				console.error("1", this.$util.get_page());
				this.net_cmd_addr_list(this.pageNum, 12);
			}
			else {
				console.error("2", this.$util.get_page());
				this.pageNum = pageNum;
				this.net_cmd_addr_list(1, pageSize * pageNum);
			}
			this.$util.set_scroll_el(this.$refs.cnt, 10, this, this.on_load_more_addr);
		},
		methods: {
			on_back: function(){
				this.pageNum = -1;
				this.pageSize = -1;
				this.$router.go(-1);
			},
			on_add: function(){
				this.$router.push("/addrinfo")
			},
			on_to_addrinfo: function(data){
				console.error(data);
				this.$bus.emit("save_data", data);
				this.$router.push({path: "/addrinfo", query: data});
			},
			net_cmd_addr_list: function(pageNum, pageSize){
				console.error("请求", pageNum, pageSize);
				let self = this;
				this.$ajax.get(this.$url.addrlist + "&pageSize=" + pageSize +"&pageNum=" + pageNum).then(function (res) {
					console.error(res);
					if (res.data.code == self.CODE.SUCCESS) {
						let addr_list = self.addr_list;
						let length = res.data.body.list.length;
						if (length > 0) {
							self.$bus.emit("show_noinfo", [false, "快来添加地址吧"]);
							res.data.body.list.forEach(item => {
								let addr =  new self.$base.address();
								addr.addressId = item["addressId"];
								addr.id = item["id"];
								addr.city = item["city"];
								addr.county = item["county"];
								addr.defaultInd = item["defaultInd"];
								addr.phone = item["phone"];
								addr.postCode = item["postCode"];
								addr.province = item["province"];
								addr.receiver = item["receiver"];
								addr.street = item["street"];
								addr_list.push(addr);
							})
							self.addr_list = addr_list;
							self.b_net = false;
						}
						else {
							self.$bus.emit("show_noinfo", [true, "快来添加地址吧"]);
						}
						self.pages = res.data.body.pages;
						self.b_tips = false;
					}
					else {
						self.$bus.emit("tips", [true, "服务器开小差，请稍后再试"]);
					}
				}).then(function() {
					self.$util.scroll_to(self.$util.scroll_top);
					self.b_load_move = true;// 开启加载更多
				})
			},
			on_load_more_addr: function() {
				console.error("处理滚动回调");
				if (this.b_load_move) {
					if (this.pages > this.pageNum && !this.b_net) {
						this.b_tips = false;
						this.b_net = true;
						this.pageNum++;
						this.pageSize = 12;
						this.net_cmd_addr_list(this.pageNum, this.pageSize);
					}
					else {
						this.b_tips = true;
					}
				}
			},
			on_del_addr: function(id, index) {
				if (id == undefined) return;
				let self = this;
				this.$ajax.get(this.$url.deladdr + "?id=" + id).then(function (res) {
					console.error(res);
					if (res.data.code == self.CODE.SUCCESS) {
						self.$bus.emit("tips", [true, "删除成功"]);
						self.addr_list.splice(index, 1);
						self.$util.save_scroll_top();
						 self.b_load_move = false;// 防止后面addr_list至为[]时 触发加载更多
						self.addr_list = [];
						// self.pageSize = 12 * self.pageNum;
						self.net_cmd_addr_list(1, 12 * self.pageNum);
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
			this.$util.save_scroll_top();
			this.$util.set_page(this.pageNum, this.pageSize);
			this.$bus.emit("show_noinfo", [false, "快来添加地址吧"]);
			next();
		}
	}
</script>

<style scoped>
	.cnt{
		width: 100%;
		height: calc(100% - 1rem);
		overflow-y: scroll;
		/* background: #fff; */
	}
	.c_a{
		width: 100%;
		padding: 0.3rem;
		background: #ffffff;
		display: flex;
		border-bottom: 0.02rem solid #ccc;
	}
	.a_b{
		display: flex;
		justify-content: center;
		/* vertical-align: middle; */
		align-items: center;
		width: 0.5rem;
		margin-right: 0.2rem;
	}
	.a_b img{
		display: block;
		width: 0.5rem;
		height: 0.5rem;
	}
	.i_n{
		font-size: 0.3rem;
		color: #606060;
	}
	.i_i{
		width: 5.5rem;
		font-size: 0.27rem;
		color: #707070;
		margin-top: 0.1rem;
		line-height: 0.3rem;
	}
	.a_d{
		width: 0.65rem;
		display: flex;
		justify-content: center;
		/* vertical-align: middle; */
		align-items: center;
	}
	.a_d p{
		font-size: 0.25rem;
		color: red;
		text-align: center;
	}
	.btn{
		width: 100%;
		height: 1rem;
		position: fixed;
		left: 0px;
		bottom: 0px;
		padding: 0.15rem 0px;
		display: flex;
		justify-content: center;
	}
	.btn p{
		width: 5rem;
		height: 0.7rem;
		border-radius: 5rem;
		background: red;
		color: #fff;
		font-size: 0.3rem;
		text-align: center;
		line-height: 0.7rem;
	}
	.m_tips{
		width: 100%;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #999999;
		margin-bottom: 1rem;
	}
</style>