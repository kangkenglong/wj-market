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
		this.id = 0,
		this.addressId = "",
		this.city = "",
		this.county = "",
		this.defaultInd = "",
		this.phone = "",
		this.postCode = "510000",
		this.province = "",
		this.receiver = "",
		this.street = ""
	}
}

export default base
