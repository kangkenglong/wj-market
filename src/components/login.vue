<template>
	<div>
		<div class="cnt">

			<div class="c_l">
				<img src="../assets/images/defhead.jpg">
				<div class="c_btn">
					<p>登&nbsp;&nbsp;&nbsp;录</p>
				</div>
				<div class="c_cal" @click="on_back">
					<p>暂不登录</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				code: ""// 微信回调code 需传给后端
			}
		},
		created() {
			this.$bus.emit("show_nav", false);
		},
		mounted() {
			this.$util.on_login_code();
		},
		methods: {
			on_back: function() {
				let path = this.$util.get_login_router_path();
				let url = this.$util.get_href_path();
				console.error(path, url);
				if (path == "/main") {
					this.$bus.emit("dontexit");
					window.location.href = url + "#/";
				}
				else {
					window.location.href = url + "#" +path;
				}
			}
		}
	}
</script>

<style scoped>
	.cnt{
		width: 100%;
		height: 100%;
		background: rgb(255, 255, 255);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.c_l {
		width: 3rem;
		text-align: center;
	}
	.c_btn, .c_cal{
		width: 3rem;
		height: 0.8rem;
		background: rgb(67, 175, 223);
		border-radius: 0.15rem;
		font-size: 0.3rem;
		line-height: 0.8rem;
		text-align: center;
		color: #ffffff;
	}
	.c_l img {
		width: 1.5rem;
		height: 1.5rem;
		margin-bottom: 0.2rem;
	}
	.c_cal {
		margin-top: 0.2rem;
		background: #ffffff;
		border: 0.02rem solid #ccc;
		color: #555555;
	}
</style>