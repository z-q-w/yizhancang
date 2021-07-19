import urlConfig from './config.js'
import tui from '../tui.js'
import constant from '../../constant/constant.js'

const fetch = {
	toast: function(tips) {
		uni.showToast({
			title: tips || "出错啦~",
			icon: 'none',
			duration: 2000
		})
	},
	request: function(url, postData, method, type, hideLoading) {
		//接口请求
		if (hideLoading) {
			uni.showLoading({
				mask: false,
				title: '请稍候...'
			})
		}
		let token = uni.getStorageSync(constant.StorageName.APP_LOGIN_TOKEN)
		return new Promise((resolve, reject) => {
			uni.request({
				url: urlConfig + url,
				data: postData,
				header: {
					'content-type': type ? 'application/x-www-form-urlencoded' : 'application/json',
					"token": token
				},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					hideLoading && uni.hideLoading()
					if (res.data.code == 200 && res.data.success == true) {
						resolve(res.data)
					} else {
						switch (res.data.code) {
							case 700:
								res.data.message = '登录超时请重新登录'
								//清除 Token 用户信息并返回登录页
								uni.setStorageSync(constant.StorageName.APP_LOGIN_TOKEN, "")
								uni.setStorageSync(constant.StorageName.APP_USER_INFO, "")
								//通知用户刷新
								uni.$emit(constant.EventKey.UPDATE_USER_INFO, {
									msg: '用户信息更新'
								})
								uni.navigateTo({
									url: '/pages/client/login/login'
								});
								break
						}
						this.toast(res.data.message)
						reject(res.data)
					}
				},
				fail: (res) => {
					console.log(res)
					this.toast(res)
					if (!hideLoading) {
						reject(res.data)
						this.toast("网络不给力，请稍后再试~")
					}
				}
			})
		})
			
	},
	

	uploadFile: function(src) {
		const that = this
		uni.showLoading({
			title: '请稍候...'
		})
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: 'https://abc.cc',
				filePath: src,
				name: 'file',
				header: {
					'content-type': 'multipart/form-data'
				},
				formData: {},
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data)
					if (d.code === 1) {
						let fileObj = JSON.parse(d.data)[0];
						//文件上传成功后把图片路径数据提交到服务器，数据提交成功后，再进行下张图片的上传
						resolve(fileObj)
					} else {
						that.toast(res.message);
					}
				},
				fail: function(res) {
					reject(res)
					uni.hideLoading();
					that.toast(res.message);
				}
			})
		})
	},

}

module.exports = {
	request: fetch.request,
	toast: fetch.toast
}
