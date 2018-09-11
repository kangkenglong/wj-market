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
			<p class="m_tips" v-show="is_tips">没有更多的信息</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				team_arr: [],
				pageNum: 1,// 页码
				pages: 0,// 总页数
				is_net: false,// 是否在请求数据
				is_tips: false
			}
		},
		created(){
			this.$bus.emit("show_nav", false);
		},
		mounted(){
			this.net_cmd_team_info();
			this.$util.set_scroll_el(this.$refs.cnt, 10, this, this.on_load_more_team);
		},
		methods: {
			on_back: function() {
				this.$router.go(-1);
			},
			net_cmd_team_info: function() {
				let self = this;
				this.$ajax.get(this.$url.myteam + "&pageSize=8&pageNum=" + self.pageNum).then(function(res) {
					console.error(res);
					if (res.data.code == self.CODE.SUCCESS) {
						let arr = [];
						res.data.body.list.forEach(item => {
							arr.push(item);
						})
						self.pages = res.data.body.pages;
						self.team_arr = arr;
					}
					else {
						this.$bus.emit("tips", [true, "服务器开小差，请稍后再试"]);
					}
				})
			},
			on_load_more_team: function() {
				console.error("处理滚动回调");
				if (this.pages > this.pageNum && !this.is_net) {
					this.is_tips = false;
					this.is_net = true;
					this.pageNum++;
					this.net_cmd_team_info();
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