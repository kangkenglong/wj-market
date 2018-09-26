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
		this.usernam = "";// 用户wx名字
		this.headImgUr = "";// 头像
		this.introduce = "";// 推荐人
		this.invateCod = "";// 邀请码
		this.totalAm = "";// 累计佣金
		this.cashAm = "";// 成功提现
		this.canDrawAm = "";// 可提现
		this.applyAm = "";// 已申请提现
		this.scor = "";// 积分
		this.cstLevelCd = "";// 身份
	}
}

export default base
