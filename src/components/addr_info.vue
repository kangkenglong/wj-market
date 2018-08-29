<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>地址</p>
		</div>
		<div class="cnt">
			<div class="c_p">
				<p>联系人</p>
				<input type="text" name="">
			</div>
			<div class="c_p">
				<p>电&nbsp;&nbsp;&nbsp;话</p>
				<input type="text" name="">
			</div>
			<div class="c_q">
				<p class="q_t">所在地区</p>
				<p class="q_v" @click="on_open_addr">{{addr_area}}</p>
			</div>
			<div class="c_d">
				<p class="q_t">详细地址</p>
				<textarea></textarea>
			</div>
		</div>
		<div class="btn">
			<p>保&nbsp;&nbsp;&nbsp;存</p>
		</div>
		<div class="bg" v-show="show_flag">
		</div>
		<div class="city" v-show="show_flag">
			<div class="c_t">
				<p>取 消</p>
				<p @click="on_sure">确 定</p>
			</div>
			<div class="c_l">
				<v-distpicker type="mobile" @selected="on_selected"></v-distpicker>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import VDistpicker from 'v-distpicker'
	export default {
		data(){
			return {
				province: "",
				city: "",
				area: "",
				addr_area: "",
				show_flag: false
			}
		},
		created(){
			this.$bus.emit("show_nav", false);
		},
		methods: {
			on_back: function(){
				this.$router.go(-1);
			},
			on_selected: function(data){
				console.error(data);
				this.province = data.province.value;
				this.city = data.city.value;
				this.area = data.area.value;
			},
			on_sure: function(){
				this.addr_area = this.province + " " + this.city + " " + this.area;
				this.show_flag = false;
			},
			on_open_addr: function(){
				this.show_flag = true;
			}
		},
		components: { VDistpicker }

	}
</script>

<style scoped>
	.cnt{
		width: 100%;
		padding: 0px 0.35rem;
		background:  #ffffff;
	}
	.c_p, .c_q, .c_d{
		width: 100%;
		display: flex;
		padding: 0.2rem 0px;
		border-bottom: 0.02rem solid #ccc;
	}
	.c_p p{
		width: 1.2rem;
		height: 0.55rem;
		line-height: 0.55rem;
		padding-right: 0.2rem;
		font-size: 0.3rem;
		color: #686868;
		border-right: 0.02rem solid #ccc;
	}
	.c_p input{
		width: 5rem;
		margin-left: 0.2rem;
		border: 0px;
		font-size: 0.3rem;
	}
	.q_t{
		/* width: 1.2rem; */
		height: 0.55rem;
		line-height: 0.55rem;
		padding-right: 0.2rem;
		font-size: 0.3rem;
		color: #686868;
		border-right: 0.02rem solid #ccc;
	}
	.q_v{
		width: 5rem;
		height: 0.55rem;
		margin-left: 0.2rem;
		font-size: 0.3rem;
		line-height: 0.55rem;
	}
	.c_d{
		border: 0px;
	}
	.c_d textarea{
		width: 5rem;
		margin-left: 0.2rem;
		height: 1.5rem;
		background: #fff;
		/* border: 0.02rem solid #ccc; */
		border: 0px;
		border-radius: 0.1rem;
		font-size: 0.3rem;
		line-height: 0.55rem;
		resize: none;
	}
	.btn{
		width: 100%;
		height: 1rem;
		position: absolute;
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
	.bg{
		position: absolute;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		background: rgba(10, 10, 10, 0.6);
	}
	.city{
		background: #fff;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0px;
	}
	.c_t{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 0.8rem;
		padding: 0.2rem;
		font-size: 0.3rem;
		line-height: 0.4rem;
		border-bottom: 0.02rem solid #ccc;
	}
	.c_t p:nth-child(1) {
		color: red;
	}
	.c_t p:nth-child(2) {
		color: #686868;
	}
	.c_l{
		width: 100%;
		height: 5rem;
		overflow-y: scroll;
		font-size: 0.3rem;
	}
	.distpicker-address-wrapper .address-container{
		height: 3rem!important;
	}
</style>