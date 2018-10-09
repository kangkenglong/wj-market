import util from "./util"

let wx_login = {
	// 登录中间页
	set_login_page: function() {
		return this.get_href_path() + "#/login";
	},
	// 解析地址栏 取#前面的数据
	get_href_path: function() {
		let path = window.location.href.split("#")[0];
		console.error("wlf_path", path);
		return path;
	},
	// 保存登录路径
	set_login_back_url: function(path) {
		if (!path) return;
		// this.login_back_url = path;
		this.set_sessionStorage("backurl", path);
	},
	/**
	* 登录
	* @param path 回调路径
	*/
	on_login: function() {
		let cstid = this.get_userInfo_id();// 先判断是否有用户数据
		if (cstid == -1) {
			// 先静默请求openid
			this.net_cmt_get_code(this.set_login_page());
		}
	},
	// 处理微信回调code
	on_login_code: function() {
		let code = this.get_query_string("code");
		if (!code) {
			// 没有code 重新走on_login
			this.on_login();
		}
		else {
			let state = this.$util.get_query_string("code");
			if (!state) {
				this.$bus.emit("tips", "参数有误，请与客服联系");
			}
			else {
				if (state == "base") {
					// 静默
					console.error("on_login_code snsapi_base");
					this.net_cmt_snsapi_base(code);
				}
				else if (state == "userinfo") {
					// 非静默
					console.error("on_login_code snsapi_userinfo");
					// this.net_cmd_get_userinfo();
				}
			}
		}
	},
	// 静默请求 path回调地址
	net_cmt_get_code: function(path) {
		console.error("net_cmt_get_code", url.getcode + "?redirect_uri=" + path);
		// window.location.href = url.getcode + "?redirect_uri=" + path;
	},
	// 把微信回调code传给后端
	net_cmt_snsapi_base: function(code) {
		axios.get(url.getopenid + "?code=" + code + "&redirect_uri=" + this.set_login_page()).then(function(res) {
			console.error("net_cmt_snsapi_base", res);
			if (res.data.code == 10000) {
				let data = res.data.body;
				if (data.cstId) {
					// 存在用户数据 缓存数据
					let userinfo = new base.userInfo();
					userinfo.cstid = data.cstId;
					userinfo.username = data.nickName;
					userinfo.totalAmt = data.totalAmt ? data.totalAmt : 0;
					userinfo.score = data.score ? data.score : 0;
					userinfo.username = data.nickName;
					userinfo.cstLevelCd = data.cstLevelCd;
					this.set_userInfo(userinfo);
				}
				else {
					// 没有请求到用户数据

				}
			}
		})
	}
}

export default wx_login;