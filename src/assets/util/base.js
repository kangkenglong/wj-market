let base = {
	goods: function (){
		this.goodsId = "";
		this.goodsDiscount = 0;
		this.goodsName = "";
		this.goodsPrice = 0;
		this.goodsSale = 0;
		this.imageUrl = "";
	},
	address: function (){
		this.id = 0;
		this.addressId = "";
		this.city = "";
		this.county = "";
		this.defaultInd = "";
		this.phone = "";
		this.postCode = "510000";
		this.province = "";
		this.receiver = "";
		this.street = "";
	},
	collect: function(){
		this.goodsId = "";
		this.goodsPrice = 0;
		this.imageUrl = "";
		this.goodsName = "";
		this.goodsDiscount = 1;
		this.id = 0;
		this.collectId = 0;
	},
	userInfo: function() {
		this.cstid = 0;// 用户id
		this.username = "";// 用户wx名字
		this.headImgUrl = "";// 头像
		this.introducer = "";// 推荐人
		this.invateCode = "";// 邀请码
		this.totalAmt = "";// 累计佣金
		this.cashAmt = "";// 成功提现
		this.canDrawAmt = "";// 可提现
		this.applyAmt = "";// 已申请提现
		this.score = "";// 积分
		this.cstLevelCd = "";// 身份
	},
	goodsCar: function() {
		this.id = 0;// 主键
		this.cartId = "";// 购物车编号
		this.goodsId = "";// 商品id
		this.goodsTitle = "";// 商品标题
		this.goodsName = "";// 商品名字
		this.goodsPrice = 0;// 商品价格
		this.goodsDiscount = 1;// 折扣
		this.imageUrl = "";// 图片
		this.goodsNum = 0;// 商品数量
		this.select = false;// 商品是否选择
	}
}

export default base
