<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>地址管理</p>
		</div>
		<div class="cnt">
			<div class="c_a">
				<div class="a_b">
					<router-link to="/addrinfo">
						<img src="../assets/images/icon27.png">
					</router-link>
				</div>
				<div class="a_i">
					<p class="i_n">lalala 17600000000</p>
					<p class="i_i">广东省深圳市南山区南山大道向南瑞峰花园A座区</p>
				</div>
				<div class="a_d">
					<p>删除</p>
				</div>
			</div>
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

			}
		},
		created(){
			this.$bus.emit("show_nav", false);
		},
		methods: {
			on_back: function(){
				this.$router.go(-1);
			},
			on_add: function(){
				this.$router.push("/addrinfo")
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
		width: 0.6rem;
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
</style>