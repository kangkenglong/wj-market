<template>
	<div>
		<div class="head">
			<span class="h_back" @click="on_back"></span>
			<p>地址</p>
		</div>
		<div class="cnt">
			<div class="c_p">
				<p>联系人</p>
				<input type="text" name="" placeholder="请输入联系人姓名" v-model="receiver">
			</div>
			<div class="c_p">
				<p>电&nbsp;&nbsp;&nbsp;话</p>
				<input type="number" name="" placeholder="请输入联系人电话" v-model="phone">
			</div>
			<div class="c_q">
				<p class="q_t">所在地区</p>
				<p class="q_v" @click="on_open_addr" ref="p_area">{{addr_area}}</p>
			</div>
			<div class="c_d">
				<p class="q_t">详细地址</p>
				<textarea placeholder="请输入详细地址" v-model="street"></textarea>
			</div>
		</div>
		<div class="def" @click="on_set_defualt_addr" v-show="set_dft">
			<img :src="img_src">
			<p>设为默认地址</p>
		</div>
		<div class="def" v-show="is_dft">
			<p>该地址为默认地址</p>
		</div>
		<div class="btn" @click="net_cmd_save_addr">
			<p>保&nbsp;&nbsp;&nbsp;存</p>
		</div>
		<div class="bg" v-show="show_flag">
		</div>
		<div class="city" v-show="show_flag">
			<div class="c_t">
				<p @click="on_close">取 消</p>
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
				receiver: "", // 联系人
				phone: "", // 电话
				province: "", // 省
				city: "", // 市
				county: "", // 区
				postCode: 0, // 编码
				addr_area: "请选择地区",
				street: "", // 详细街道
				img_src: require("../assets/images/icon29_0.png"),
				show_flag: false,
				def_flag: 0, // 默认地址
				old_data: null,
				ud_or_save: false, // false 修改地址\ true 新建地址,
				is_dft: false,// 现实默认地址提示
				set_dft: false,// 显示设置默认地址
				dft_changed: false// 默认地址有变化
			}
		},
		created(){
			console.error(this.$route);
			console.error(this.$route.query);
			this.$bus.emit("show_nav", false);
		},
		mounted(){
			let addrinfo = this.$route.query;
			if (addrinfo.addressId) {
				// 修改地址
				this.receiver = addrinfo.receiver;
				this.phone = addrinfo.phone;
				this.addr_area = addrinfo.province + " " + addrinfo.city+ " " + addrinfo.county;
				this.province = addrinfo.province;
				this.city = addrinfo.city;
				this.county = addrinfo.county;
				this.street = addrinfo.street;
				this.def_flag = addrinfo.defaultInd ? addrinfo.defaultInd : 0;
				this.postCode = addrinfo.postCode;
				this.old_data = addrinfo;
				this.ud_or_save = false;
				if (this.def_flag == 1) {
					this.is_dft = true;
				}
				else {
					this.set_dft = true;
				}
			}
			else {
				// 新建地址
				this.ud_or_save = true;
			}
		},
		methods: {
			on_back: function(){
				this.$router.go(-1);
			},
			on_selected: function(data){
				console.error(data);
				this.province = data.province.value;
				this.city = data.city.value;
				this.county = data.area.value;
				this.postCode = data.area.code;
			},
			on_sure: function(){
				if (this.postCode == "") {
					this.$bus.emit("tips", [true, "请选择地区"]);
				}
				else {
					this.addr_area = this.province + " " + this.city + " " + this.county;
					this.show_flag = false;
				}
			},
			on_open_addr: function(){
				this.show_flag = true;
			},
			on_close: function(){
				// this.addr_area = "请选择地区"
				this.show_flag = false;
			},
			on_set_defualt_addr: function() {
				this.def_flag = this.def_flag == 0 ? 1 : 0;
			},
			is_changed: function() {
				let counts = -1;

				if (this.receiver != this.old_data.receiver) {
					counts++;
				}
				if (this.phone != this.old_data.phone) {
					counts++;
				}
				if (this.addr_area != this.old_data.province + " " + this.old_data.city+ " " + this.old_data.county) {
					counts++;
				}
				if (this.street != this.old_data.street) {
					counts++;
				}
				if (this.def_flag != this.old_data.defaultInd) {
					counts++;
					this.dft_changed = true;
				}
				else {
					this.dft_changed = false;
				}

				if (counts != -1) {
					return true;
				}
				return false;
			},
			net_cmd_save_addr: function() {
				if (!this.ud_or_save) {
					if (this.is_changed()) {
						console.error("有修改喔");
						// 修改地址
						this.ud_address_info();
					}
					else {
						this.$bus.emit("tips", [true, "没有修改喔"]);
					}
				}
				else {
					// 新建地址
					this.create_address_info();
				}
			},
			ud_address_info: function() {
				let self = this;
				this.$ajax.post(this.$url.udaddr, {
					"id": this.old_data.id,
					"city": this.city,
					"county": this.county,
					"phone": this.phone,
					"postCode": this.postCode,
					"province": this.province,
					"receiver": this.receiver,
					"street": this.street
				}).then(function(res) {
					console.error("保存成功了吗", res);
					if (res.data.code == self.CODE.SUCCESS) {
						self.$bus.emit("tips", [true, "保存成功"]);
					}
					else {
						self.$bus.emit("tips", [true, "保存失败"]);
					}
				})
				if (this.dft_changed)// 有设置默认地址才请求
					this.$ajax.get(this.$url.addrdef + "?id=" + this.old_data.id).then(function(res) {
						console.error("默认地址", res);
						if (res.data.code == CODE.SUCCESS) {
							self.is_dft = true;
							self.set_dft = false;
						}
						else {
							self.$bus.emit("tips", [true, "保存失败"]);
						}
					})
			},
			create_address_info: function() {
				let self = this;
				if (this.receiver == "") {
					this.$bus.emit("tips", [true, "请填写联系人姓名"]);
					return;
				}
				if (this.phone == "") {
					this.$bus.emit("tips", [true, "请填写联系电话"]);
					return;
				}
				if (this.city == "" || this.county == "" || this.postCode == "" || this.province == "") {
					this.$bus.emit("tips", [true, "请选择地区"]);
					return;
				}
				if (this.street == "") {
					this.$bus.emit("tips", [true, "请填写详细地址"]);
					return;
				}
				else {
					this.$ajax.post(this.$url.ctaddr, {
						"city": this.city,
						"county": this.county,
						"phone": this.phone,
						"postCode": this.postCode,
						"province": this.province,
						"receiver": this.receiver,
						"street": this.street,
						"cstId": "KHBH1809090013"
					}).then(function(res) {
						console.error("保存成功了吗", res);
						if (res.data.code == self.CODE.SUCCESS) {
							self.$bus.emit("tips", [true, "保存成功"]);
						}
						else {
							self.$bus.emit("tips", [true, "保存失败"]);
						}
					})
				}
			}
		},
		components: { VDistpicker },
		watch: {
			def_flag: function(val) {
				console.error(val);
				this.img_src = val == 0 ? require("../assets/images/icon29_0.png") : require("../assets/images/icon29_1.png");
				// this.is_def = val == 0;
			}
		}
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
		color: #111111;
		border-right: 0.02rem solid #ccc;
	}
	.c_p input{
		width: 5rem;
		margin-left: 0.2rem;
		border: 0px;
		font-size: 0.3rem;
		color: #111111;
	}
	.q_t{
		/* width: 1.2rem; */
		height: 0.55rem;
		line-height: 0.55rem;
		padding-right: 0.2rem;
		font-size: 0.3rem;
		color: #111111;
		border-right: 0.02rem solid #ccc;
	}
	.q_v{
		width: 5rem;
		height: 0.55rem;
		margin-left: 0.2rem;
		font-size: 0.3rem;
		line-height: 0.55rem;
		color: #111111;
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
	.def{
		width: 100%;
		padding: 0.2rem 0.3rem;
		display: flex;
	}
	.def img{
		width: 0.3rem;
		height: 0.3rem;
	}
	.def p{
		font-size: 0.3rem;
		line-height: 0.3rem;
		color: #686868;
		margin-left: 0.1rem;
	}
</style>