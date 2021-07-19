const tui = {
	toast: function(text, duration, success) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	constNum: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android" ? 300 : 0;
	},
	px: function(num) {
		return uni.upx2px(num) + 'px';
	},
	previewImage:function(index,imageList) {//预览图片   第一个参数是索引  第二参数是数组
		uni.previewImage({
			current: imageList[index],
			loop: true,
			urls: imageList
		})
		console.log(index,imageList)
	},
}



module.exports = {
	toast: tui.toast,
	constNum: tui.constNum,
	px: tui.px,
	previewImage:tui.previewImage
}
