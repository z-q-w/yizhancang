
import userList from '../../tim_commen/tim/user.js'

import {
	mapState
} from "vuex";

const MessageMixin = {
	name: 'record',
	data() {
		return {
			// conversationList: [],
			userList: userList,
			friendList:[],
			isActive: 0, //默认聊天记录
			userAddConversationList:[]
		}
	},
	computed: {
		...mapState({
			isLogin: state => state.isLogin,
			isSDKReady: state => state.isSDKReady,
			conversationList: state => state.conversationList,
		})
	},
	watch: {
		isSDKReady(val) {
			//isSDKReady == true 请求会话列表
			if (val) {
				this.getConversationList()
			}
		},
		conversationList(val){
			this.getUserInfo(val)
		}
	
	},
	methods: {
		//注销登录
		outLoginBtn(){
			let promise = this.tim.logout();
			promise.then(res=> {
				this.$store.commit('reset')
				uni.reLaunch({
					url: '../index/index'
				})
			}).catch(err=> {
			   console.log('退出失败')
			});
		},
		//聊天的节点加上外层的div
		nodesFliter(str){
			let nodeStr = '<div style="align-items: center;word-wrap:break-word;">'+str+'</div>' 
			return nodeStr
		},
		//切换tab
		changeTabBtn(_index) {
			this.isActive = _index
			if (this.isSDKReady) {
				this.getConversationList()
			}
		},
		//获取消息列表
		getConversationList() {
			// 拉取会话列表
			let promise = this.tim.getConversationList();
			promise.then((res) => {
				let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
				if (conversationList.length) {
					//将返回的会话列表拼接上 用户的基本资料  
					//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
					this.$store.commit("updateConversationList", conversationList);
				}
	
			}).catch((err) => {
				console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
			});
		},
		//根据消息列表请求聊天对象的用户信息 并完成数据拼接
		getUserInfo(conversationList) {
			 this.userAddConversationList = []
			conversationList.forEach(item => {
				let obj = {}
				obj.conversation = item
				userList.forEach(item1 => {
					if (item.toAccount == item1.userId) {
						obj.user = item1
					}
				})
				this.userAddConversationList.push(JSON.parse(JSON.stringify(obj)))
			})
		},
		toRoom(item) {
			this.$store.commit('updateConversationActive', item)
			uni.navigateTo({
				url: './pages/tim/room.vue'
			})
		},
		//选择用户聊天
		checkUserToRoom(toUserInfo) {
			this.$store.commit('createConversationActive', toUserInfo.userId)
			uni.navigateTo({
				url: './room'
			})
		}
	
	},
	onShow() {
		if (this.isSDKReady) {
			console.log('2222')
			this.getConversationList()
		}else{
			console.log('333333')
		}
	},
	onLoad(){
		let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		this.friendList = []
		userList.forEach(item=>{
			if(item.userId != userInfo.userId){
				console.log(item)
				this.friendList.push(item)
			}
		})
		
	}
}

export default MessageMixin;
