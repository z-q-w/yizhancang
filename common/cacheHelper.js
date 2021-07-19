import api from './api/api.js'
import utils from '../utils/util.js'
import constant from '../constant/constant.js'
const cache = {
	setToken: function(token) {
		uni.setStorageSync(constant.StorageName.APP_LOGIN_TOKEN, token)
		// if (!utils.isNullOrEmpty(token)) {
		// 	this.updateUserInfo()
		// }
	},
	
	toLogin: function(){
		uni.showModal({
			title: '温馨提示',
			content: '登录后可享受更多服务',
			confirmText: '去登陆',
			success(res) {
				if(res.confirm){
					uni.navigateTo({
						url: '/pages/client/login/login'
					})
				}
			}
		})
	},

	getToken() {	
		return uni.getStorageSync(constant.StorageName.APP_LOGIN_TOKEN)
	},
	isLogin: function() {
		return !utils.isNullOrEmpty(uni.getStorageSync(constant.StorageName.APP_LOGIN_TOKEN)) ? true : false
	},
	isLoginOnclick: function() {
         if(this.isLogin()){
			 return true
		 }else{
			 uni.navigateTo({
			     url: '/pages/client/login/login'
			 });
			 return false
		 }
	},
	webURL: function() {
		return "https://www.thorui.cn/wx"
	},
	updateUserInfo: function() {
		if (utils.isNullOrEmpty(this.getToken())) {
			return
		}
		// let token = uni.getStorageSync(constant.StorageName.APP_LOGIN_TOKEN)
		api.getUserInfo({
			// token:token
		}).then((res) => {
			var user = JSON.stringify(res.data);
			console.log(res.data)
			uni.setStorageSync(constant.StorageName.APP_USER_INFO, user)
			// alert(uni.getStorageSync(constant.StorageName.APP_USER_INFO))
			uni.$emit(constant.EventKey.UPDATE_USER_INFO, {
				msg: '用户信息更新'
			})
		}).catch((err) => {	
			console.log(err)
		})
	},
	appUser() {
		if (utils.isNullOrEmpty(uni.getStorageSync(constant.StorageName.APP_USER_INFO))) {
            return null
		}
		return JSON.parse(uni.getStorageSync(constant.StorageName.APP_USER_INFO))
	},
}



module.exports = {
	getToken: cache.getToken,
	setToken: cache.setToken,
	isLogin: cache.isLogin,
	webURL: cache.webURL,
	updateUserInfo: cache.updateUserInfo,
	appUser: cache.appUser,
	isLoginOnclick:cache.isLoginOnclick,
	tologin: cache.toLogin
}
