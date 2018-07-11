<template>
	<div class="main">
		<div class="m_mdl">
			<div @click="to_index" class="m_r">
				<!-- 首页 -->
				<div :class="{'m_sy': true, 'sy_slt': sy_slt}"></div>
				<span :class="{'sy_s': sy_slt, 's_tlt': true}">首页</span>
			</div>
		</div>
		<div class="m_mdl">
			<div @click="to_type" class="m_r">
				<!-- 分类 -->
				<div :class="{'m_fl': true, 'fl_slt': fl_slt}"></div>
				<span :class="{'fl_s': fl_slt, 's_tlt': true}">分类</span>
			</div>
		</div>
		<div class="m_mdl">
			<div @click="to_shopcar" class="m_r">
				<!-- 购物车 -->
				<div :class="{'m_gwc': true, 'gwc_slt': gwc_slt}"></div>
				<span :class="{'gwc_s': gwc_slt, 's_tlt': true}">购物车</span>
			</div>
		</div>
		<div class="m_mdl">
			<div @click="to_main" class="m_r">
				<!-- 个人 -->
				<div  :class="{'m_gr': true, 'gr_slt': gr_slt}"></div>
				<span :class="{'gr_s': gr_slt, 's_tlt': true}">个人</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				sy_slt: true,
				fl_slt: false,
				gwc_slt: false,
				gr_slt: false,
			}
		},
		methods: {
			to_index: function(){
				this.$router.push("/");
				this.sy_slt = true;
				this.fl_slt = false;
				this.gwc_slt = false;
				this.gr_slt = false;
			},
			to_type: function(){
				this.$router.push("/goods_type");
				this.sy_slt = false;
				this.fl_slt = true;
				this.gwc_slt = false;
				this.gr_slt = false;
			},
			to_shopcar: function(){
				this.$router.push("/shop_car");
				this.sy_slt = false;
				this.fl_slt = false;
				this.gwc_slt = true;
				this.gr_slt = false;
			},
			to_main: function(){
				this.$router.push("/main");
				this.sy_slt = false;
				this.fl_slt = false;
				this.gwc_slt = false;
				this.gr_slt = true;
			}
		}
	}
</script>

<style scoped>
	.main{
		position: fixed;
		z-index: 99999;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 1rem;
		background: #fff;
		border-top: 0.03rem solid #e7e7e7;
		display: flex;
	}
	.m_mdl{
		flex: 1;
		flex-grow: 1;
		height: 100%;
	}
	.m_r{
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		padding: 0.1rem 0px;
		/* position: relative; */
	}
	.m_r div{
		/* position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.2rem;
		margin-left: -0.2rem; */
		width: 0.4rem;
		height: 0.4rem;
	}
	.m_sy{
		background-image: url('../assets/images/icon6.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.m_fl{
		background-image: url('../assets/images/icon7.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.m_gwc{
		background-image: url('../assets/images/icon8.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.m_gr{
		background-image: url('../assets/images/icon9.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.s_tlt{
		font-size: 0.22rem;
		color: #8a8a8a;
	}
	.sy_slt{
		background-image: url('../assets/images/icon6_1.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.fl_slt{
		background-image: url('../assets/images/icon7_1.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.gwc_slt{
		background-image: url('../assets/images/icon8_1.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.gr_slt{
		background-image: url('../assets/images/icon9_1.png');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.sy_s, .fl_s, .gwc_s, .gr_s{
		color: #000000;
	}
</style>