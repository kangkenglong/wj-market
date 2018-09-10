
// let globalURL="http://132.232.58.25/shop-app-pc/"
let globalURL="/api"
let url={
	goodslist: globalURL + "/public/goods/findGoodsList/v1.0",
	addrlist: globalURL + "/public/address/findAddressList/v1.0?cstId=KHBH1809090013",
	udaddr: globalURL + "/public/address/updateAddress/v1.0",
	ctaddr: globalURL + "/public/address/saveAddress/v1.0",
	addrdef: globalURL + "/public/address/doSetDefault/v1.0"
}

export default url