<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>我的团队</p>
		</div>
		<div class="cnt" ref="cnt">
			<div class="c_i" v-for="(user, i) in team_arr" :key="i">
				<img :src="user.headImgUrl">
				<p>{{user.nickName}}</p>
			</div>
			<p class="m_tips" v-show="b_tips">没有更多的信息</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				team_arr: [],
				pageNum: 1,// 页码
				pageSize: 12,
				pages: 0,// 总页数
				b_net: false,// 是否在请求中
				b_tips: false,// 是否提示没有更多商品
				b_load_move: true// 是否开启加载更多
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
				this.net_cmd_team_info(this.pageNum, 12);
			}
			else {
				console.error("2", this.$util.get_page());
				this.pageNum = pageNum;
				this.net_cmd_team_info(1, pageSize * pageNum);
			}
			// -------end-------
			this.$util.set_scroll_el(this.$refs.cnt, 10, this, this.on_load_more_team);
		},
		methods: {
			on_back: function() {
				this.pageNum = -1;
				this.pageSize = -1;
				this.$router.go(-1);
			},
			net_cmd_team_info: function(pageNum, pageSize) {
				let self = this;
				this.$ajax.get(this.$url.myteam + "&pageSize=" + pageSize +"&pageNum=" + pageNum).then(function(res) {
					console.error(res);
					if (res.data.code == self.CODE.SUCCESS) {
						let arr = self.team_arr;
						if (res.data.body.list.length > 0) {
							res.data.body.list.forEach(item => {
								arr.push(item);
							})
							self.team_arr = arr;
							self.b_net = false;
						}
						else {
							this.$bus.emit("show_noinfo", [false, "暂无团队"]);
						}
						self.pages = res.data.body.pages;
						self.b_tips = false;
					}
					else {
						this.$bus.emit("tips", [true, "服务器开小差，请稍后再试"]);
					}
				}).then(function() {
					// self.$util.scroll_to(self.$util.scroll_top);
					self.b_load_move = true;// 开启加载更多
				})
			},
			on_load_more_team: function() {
				console.error("处理滚动回调");
				if (this.b_load_move) {
					if (this.pages > this.pageNum && !this.b_net) {
						this.b_tips = false;
						this.b_net = true;
						this.pageNum++;
						this.pageSize = 12;
						this.net_cmd_team_info(this.pageNum, this.pageSize);
					}
					else {
						this.b_tips = true;
					}
				}
			}
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			this.$util.save_scroll_top();
			this.$util.set_page(this.pageNum, this.pageSize);
			this.$bus.emit("show_noinfo", [false, "暂无团队"]);
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
	.c_i{
		display: flex;
		width: 100%;
		padding: 0.3rem;
		background: #fff;
		border-bottom: 0.02rem solid #ccc;
	}
	.c_i img{
		width: 1rem;
		height: 1rem;
		border-radius: 100%;
	}
	.c_i p{
		font-size: 0.3rem;
		color: #606060;
		line-height: 1rem;
		margin-left: 0.3rem;
	}
	.m_tips{
		width: 100%;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #999999;
	}
</style>