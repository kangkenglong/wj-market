
let globalURL="http://132.232.58.25/shop-app-pc"
// let globalURL="/api"
// let globalURL="http://www.kwp8.top/shop-app-pc"
let url={
	goodslist: globalURL + "/public/goods/findGoodsList/v1.0",// 商品列表
	goodsinfo: globalURL + "/public/goods/getGoods/v1.0?goodsId=",// 商品详情
	dicgoodslist: globalURL + "/public/goods/findGoodsListForPageHome/v1.0",// 折扣商品列表
	addrlist: globalURL + "/public/address/findAddressList/v1.0?cstId=KHBH1809090013",// 地址列表
	udaddr: globalURL + "/public/address/updateAddress/v1.0",// 更新地址
	ctaddr: globalURL + "/public/address/saveAddress/v1.0",// 保存地址
	deladdr: globalURL + "/public/address/deleteAddress/v1.0",// 删除地址
	addrdef: globalURL + "/public/address/doSetDefault/v1.0",// 设置默认地址
	vipinfo: globalURL + "/user/cst/getCst/v1.0?cstId=KHBH1809090013",// 会员详情
	myteam: globalURL + "/user/cst/findTeamList/v1.0?introducer=KHBH1809090013",// 我的团队
	savecol: globalURL + "/user/collect/saveGoodsCollect/v1.0",// 收藏商品
	cltlist: globalURL + "/user/collect/findGoodsCollectList/v1.0?cstId=KHBH1809090013",// 收藏列表
	delclt: globalURL + "/user/collect/deleteGoodsCollect/v1.0?id=",//删除收藏(收藏列表)
	getcode: globalURL + "/public/login/getCode/v1.0",// 静默获取code
	getacctkn: globalURL + "/public/login/getAccessToken/v1.0",// 非静默获取code
	getopenid: globalURL + "/public/login/getOpenId/v1.0",// 获取微信用户openid
	getuserinfo: globalURL + "/public/login/getUserInfo/v1.0",// 获取微信用户信息
	goodsIsCol: globalURL + "/user/collect/checkGoodsCollectStatus/v1.0",// 商品是否收藏
	delGIClt: globalURL + "/user/collect/cancelGoodsCollect/v1.0",// 删除商品(商品详情)
	addCar: globalURL + "/user/cart/saveCart/v1.0",// 加入购物车
	carList: globalURL + "/user/cart/findCartList/v1.0",// 购物车列表
	udCar: globalURL + "/user/cart/updateCart/v1.0",// 购物车修改
	delCar: globalURL + "/user/cart/deleteCart/v1.0"// 购物车修改
	// getAccessToken: globalURL + "/public/login/getAccessToken/v1.0"
}

export default url