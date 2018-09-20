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
	del_scroll_event: function() {
		if (!this.scroll_el) return;
		this.scroll_el.removeEventListener("scroll", this.scroll_event);
	},
	scroll_event: function() {
		let self = Util;
		let oDiv = self.scroll_el;
		console.error(oDiv.scrollTop, oDiv.offsetHeight, oDiv.scrollHeight);
		let topHeight = oDiv.scrollTop;
		if (topHeight + oDiv.offsetHeight + self.scroll_dis >= oDiv.scrollHeight && self.scroll_flag) {
			Util.scroll_callback.call(self.self);
		}
	},
	save_scroll_top: function() {
		// 记录当前滚动位置
		// this.scroll_top = this.scroll_el.scrollTop;
		this.set_sessionStorage("srltop", this.scroll_el.scrollTop.toString());
	},
	get_scroll_top: function() {
		let str = this.get_sessionStorage_by_key("srltop");
		return parseInt(str);
	},
	reset_scroll_top: function() {
		this.set_sessionStorage("srltop", "0");
		// this.scroll_top = 0;
	},
	scroll_to: function(num) {
		console.error("滚动位置", num);
		this.scroll_el.scrollTop = num;
	},
	get_scrollTop: function() {
		console.error(this.scroll_el.scrollTop, this.scroll_el.offsetHeight);
		return this.scroll_el.scrollTop;
	},
	set_page: function(pageNum, pageSize) {
		// this.pageNum = pageNum;
		// this.pageSize = pageSize;
		let obj = {"pageNum": pageNum, "pageSize": pageSize};
		this.set_sessionStorage("page", JSON.stringify(obj));
	},
	get_page: function() {
		let str = this.get_sessionStorage_by_key("page");
		if (!str) return [-1, -1];
		console.error(str);
		let obj = JSON.parse(str);
		return [obj.pageNum, obj.pageSize];
	},
	set_sessionStorage: function(key, val) {
		window.sessionStorage.setItem(key,val);
	},
	get_sessionStorage_by_key: function(key) {
		return window.sessionStorage.getItem(key);
	},
	del_sessionStorage_by_key: function(key) {
		window.sessionStorage.removeItem(key);
	},
	get_query_string: function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return unescape(r[2]);
		return null;
	}
}
export default Util