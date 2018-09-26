import url from "./DataInterface"
import axios from 'axios'
import base from './base'

let Util={
	// 滚动文档对象
	self: null,
	scroll_el: null,
	scroll_callback: null,
	scroll_flag: true,// 是否开启滚动执行回调
	scroll_top: 0,
	scroll_dis: 0,// 触发距离
	pageNum: -1,
	pageSize: -1,
	// 设置滚动事件
	set_scroll_el: function(el, dis, call, callback) {
		if (!el) return;
		if(dis == undefined) return;
		this.scroll_el = el;
		this.scroll_dis = dis;
		if (typeof callback != "function") return;
		if (!this.scroll_el) return;
		this.self = call;
		this.scroll_callback = callback;
		this.scroll_el.addEventListener("scroll", this.scroll_event);
	},
	ser_scroll_event: function(call, callback) {
	},
	// 释放滚动
	del_scroll_event: function() {
		if (!this.scroll_el) return;
		this.scroll_el.removeEventListener("scroll", this.scroll_event);
	},
	// 滚动触发回调函数
	scroll_event: function() {
		let self = Util;
		let oDiv = self.scroll_el;
		console.error(oDiv.scrollTop, oDiv.offsetHeight, oDiv.scrollHeight);
		let topHeight = oDiv.scrollTop;
		if (topHeight + oDiv.offsetHeight + self.scroll_dis >= oDiv.scrollHeight && self.scroll_flag) {
			Util.scroll_callback.call(self.self);
		}
	},
	// 缓存当前滚动的高度
	save_scroll_top: function() {
		// 记录当前滚动位置
		// this.scroll_top = this.scroll_el.scrollTop;
		this.set_sessionStorage("srltop", this.scroll_el.scrollTop.toString());
	},
	// 获取混存的滚动高度
	get_scroll_top: function() {
		let str = this.get_sessionStorage_by_key("srltop");
		return parseInt(str);
	},
	// 滚动至最顶部
	reset_scroll_top: function() {
		this.set_sessionStorage("srltop", "0");
		// this.scroll_top = 0;
	},
	// 滚动至指定位置
	scroll_to: function(num) {
		console.error("滚动位置", num);
		this.scroll_el.scrollTop = num;
	},
	// 获取当前滚动高度
	get_scrollTop: function() {
		console.error(this.scroll_el.scrollTop, this.scroll_el.offsetHeight);
		return this.scroll_el.scrollTop;
	},
	// 缓存页数
	set_page: function(pageNum, pageSize) {
		// this.pageNum = pageNum;
		// this.pageSize = pageSize;
		let obj = {"pageNum": pageNum, "pageSize": pageSize};
		this.set_sessionStorage("page", JSON.stringify(obj));
	},
	// 获取页数
	get_page: function() {
		let str = this.get_sessionStorage_by_key("page");
		if (!str) return [-1, -1];
		console.error(str);
		let obj = JSON.parse(str);
		return [obj.pageNum, obj.pageSize];
	},
	// 缓存当前路径
	set_path: function(path) {
		console.error("保存当前路径", path);
		this.set_sessionStorage("path", path);
	},
	// 获取当前路径
	get_path: function() {
		let path = this.get_sessionStorage_by_key("path");
		if (!path) return -1;
		console.error(window.location.href);
		return path;
	},
	// 缓存用户信息
	set_userInfo: function(userinfo) {
		let str = JSON.stringify(userinfo);
		console.error("userinfo", str);
		this.set_sessionStorage("userinfo", str);
	},
	// 获取用户id
	get_userInfo_id: function() {
		let str = this.get_sessionStorage_by_key("userinfo");
		if (!str) return -1;
		let userinfo = JSON.parse(str);
		return userinfo.cstid;
	},
	// 获取用户信息
	get_userInfo: function() {
		let str = this.get_sessionStorage_by_key("userinfo");
		if (!str) return -1;
		let userinfo = JSON.parse(str);
		return userinfo;
	},
	// 缓存数据
	set_sessionStorage: function(key, val) {
		window.sessionStorage.setItem(key,val);
	},
	// 通过key获取缓存数据
	get_sessionStorage_by_key: function(key) {
		return window.sessionStorage.getItem(key);
	},
	// 通过key删除缓存数据
	del_sessionStorage_by_key: function(key) {
		window.sessionStorage.removeItem(key);
	},
	// 解析地址栏参数 name 为参数
	get_query_string: function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return unescape(r[2]);
		return null;
	},
	// 登录中间页
	set_login_page: function() {
		// return this.get_href_path() + "#/login";
		this.set_sessionStorage("loginUrl", this.get_href_path + "#/login");
	},
	get_login_page: function() {
		let url = this.get_sessionStorage_by_key("loginUrl");
		if (!str) return -1;
		return url;
	},
	// 解析地址栏 取#前面的数据
	get_href_path: function() {
		let path = window.location.href.split("#")[0];
		console.error("wlf_path", path);
		return path;
	},
	// 保存跳转登录页之前的路径
	set_login_back_url: function(path) {
		if (!path) return;
		// this.login_back_url = path;
		this.set_sessionStorage("backurl", path);
	},
	// 获取跳转登录页之前的路径
	get_login_back_url: function() {
		let url = this.get_sessionStorage_by_key("backurl");
		if (!url) return -1;
		return url;
	}
	/**
	* 登录
	* @param path 回调路径
	*/
	on_login: function() {
		let cstid = this.get_userInfo_id();// 先判断是否有用户数据
		if (cstid == -1) {
			// 先静默请求openid
			this.net_cmt_get_sb_code(this.set_login_page());
		}
	},
	// 微信重定向至login.vue时 处理微信回调code
	on_login_code: function() {
		let code = this.get_query_string("code");
		if (!code) {
			// 没有code 重新走on_login
			// this.on_login();
		}
		else {
			let state = this.$util.get_query_string("state");
			if (!state) {
				// this.$bus.emit("tips", "参数有误，请与客服联系");
			}
			else {
				if (state == "base") {
					// 静默
					console.error("on_login_code snsapi_base");
					this.net_cmt_snsapi_base_code(code);
				}
				else if (state == "userinfo") {
					// 非静默
					console.error("on_login_code snsapi_userinfo");
					this.net_cmt_snsapi_userinfo_code(code);
				}
			}
		}
	},
	// 静默请求 获取code path回调地址
	net_cmt_get_sb_code: function(path) {
		console.error("net_cmt_get_sb_code", url.getcode + "?redirect_uri=" + path);
		// window.location.href = url.getcode + "?redirect_uri=" + path;
	},
	// 非静默请求 获取code
	net_cmt_get_su_code: function() {
		let path = this.get_login_page();
		console.error("net_cmt_get_su_code", url.getacctkn + "?redirect_uri=" + path);
		// window.location.href = url.getacctkn + "?redirect_uri=" + path;
	},
	// 把微信回调code传给后端
	net_cmt_snsapi_base_code: function(code) {
		let self = this;
		axios.get(url.getopenid + "?code=" + code + "&redirect_uri=" + self.get_login_page()).then(function(res) {
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
					self.set_userInfo(userinfo);
					self.on_router_push(self.get_login_back_url());
				}
				else {
					// 没有请求到用户数据
					self.net_cmt_get_su_code();
				}
			}
		})
	},
	// 非静默重定向请求
	net_cmt_snsapi_userinfo_code: function(code) {
		let self = this;
		axios.get(url.getuserinfo + "?code=" + code).then(function(res) {
			console.error("net_cmt_snsapi_userinfo_code", res);
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
				self.set_userInfo(userinfo);
				self.on_router_push(self.get_login_back_url());
			}
			else {
				return -1;
			}
		})
	},
	// 重定向至指定位置
	on_router_push: function(path) {
		window.location.href = path;
	}
}
export default Util