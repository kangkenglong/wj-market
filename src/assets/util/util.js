
let Util={
	// 滚动文档对象
	self: null,
	scroll_el: null,
	scroll_callback: null,
	scroll_flag: true,
	scroll_top: 0,
	scroll_dis: 0,
	set_scroll_el: function(el, dis) {
		if (!el) return;
		if(dis == undefined) return;
		this.scroll_el = el;
		this.scroll_dis = dis;
		return this;
	},
	ser_scroll_event: function(call, callback) {
		if (typeof callback != "function") return;
		if (!this.scroll_el) return;
		this.self = call;
		this.scroll_callback = callback;
		this.scroll_el.addEventListener("scroll", this.scroll_event);
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
			self.scroll_flag = false;
			Util.scroll_callback.call(self.self);
		}
	},
	save_scroll_top: function() {
		this.scroll_top = this.scroll_el.scrollTop;
	},
	scroll_to: function(num) {
		this.scroll_el.scrollTop = num;
	}
}
export default Util