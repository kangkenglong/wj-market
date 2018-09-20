
// let globalURL="http://132.232.58.25/shop-app-pc/"
// let globalURL="/api"
let globalURL="http://www.kwp8.top/shop-app-pc"
let url={
	goodslist: globalURL + "/public/goods/findGoodsList/v1.0",
	goodsinfo: globalURL + "/public/goods/getGoods/v1.0?goodsId=",
	dicgoodslist: globalURL + "/public/goods/findGoodsListForPageHome/v1.0",
	addrlist: globalURL + "/public/address/findAddressList/v1.0?cstId=KHBH1809090013",
	udaddr: globalURL + "/public/address/updateAddress/v1.0",
	ctaddr: globalURL + "/public/address/saveAddress/v1.0",
	deladdr: globalURL + "/public/address/deleteAddress/v1.0",
	addrdef: globalURL + "/public/address/doSetDefault/v1.0",
	vipinfo: globalURL + "/user/cst/getCst/v1.0?cstId=KHBH1809090013",
	myteam: globalURL + "/user/cst/findTeamList/v1.0?introducer=KHBH1809090013",
	savecol: globalURL + "/user/collect/saveGoodsCollect/v1.0",
	cltlist: globalURL + "/user/collect/findGoodsCollectList/v1.0?cstId=KHBH1809090013",
	delclt: globalURL + "/user/collect/deleteGoodsCollect/v1.0?id=",
	getcode: globalURL + "/public/login/getCode/v1.0",
	getacctkn: globalURL + "/public/login/getAccessToken/v1.0",
	getopenid: globalURL + "/public/login/getOpenId/v1.0",
	getuserinfo: globalURL + "/public/login/getUserInfo/v1.0"
}

export default url