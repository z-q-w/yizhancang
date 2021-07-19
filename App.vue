<script>
	var piaconten = {};
	export default {
		computed: {
			//vuex 全局会话列表
			getConversationList() {
				return this.$store.state.conversationList;
			}
		},
		watch: {
			//vuex 全局会话列表监听
			getConversationList(list) {
				console.log(list);
				let unreadCount = 0;
				list.forEach(item => {
					unreadCount = item.unreadCount + unreadCount;
				});
				if (unreadCount > 0) {
					uni.setTabBarBadge({
						index: 1,
						text: `${unreadCount}`
					});
				} else {
					uni.removeTabBarBadge({
						index: 1,
						text: `${unreadCount}`
					});
				}
			}
		},
		mounted() {
			/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
			 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
			 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
			 * */
			// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
			this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
			// 收到新消息
			this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
			// 会话列表更新
			this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
				this.$store.commit('updateConversationList', event.data);
			});
		},
		methods: {
			onReadyStateUpdate({
				name
			}) {
				const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
				//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
				this.$store.commit('toggleIsSDKReady', isSDKReady);
				//sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
			},

			onReceiveMessage({
				data: messageList
			}) {
				// this.handleAt(messageList);
				this.$store.commit('pushCurrentMessageList', messageList);
			}
			//根据消息列表请求聊天对象的用户信息 并完成数据拼接
		},
		// onLaunch: function() {
		// 	// #ifdef APP-PLUS
		// 	console.log('App Launch');
		// 	var info = plus.push.getClientInfo(); // 获取推送客户端信息，传给后台
		// 	console.log(info);
		// 	const _self = this;
		// 	let contentdata = '';

		// 	console.log('sad');
		// 	// const _handlePush = function(message) {
		// 	// 	 _self.updatePushMessage(message);
		// 	// };
		// 	plus.push.addEventListener('click', function(message) {
		// 		// _handlePush(message);
		// 		//点击消息的回调
		// 		console.log(message);
		// 		let contentse;

		// 		if (plus.os.name != 'iOS') {
		// 			//安卓
		// 			contentse = JSON.parse(contentdata);
		// 		} else {
		// 			//ios
		// 			if (message.payload) {
		// 				//如透传消息不符合格式，则“payload”属性为string类型
		// 				//这里的示例以json字符串去解析，实际上也可以做字符串匹配
		// 				if (typeof message.payload == 'string') {
		// 					try {
		// 						contentse = JSON.parse(message.payload);
		// 					} catch (error) {
		// 						console.log(error);
		// 					}
		// 				} else if (typeof message.payload == 'object') {
		// 					//iOS应用正处于前台运行时收到推送，也触发receive事件，此时payload为json对象
		// 					contentse = message.payload;
		// 				}
		// 			}
		// 		}

		// 		// uni.switchTab({
		// 		//     url: '/pages/client/home/home'
		// 		// });
		// 		console.log(contentse);
		// 		setTimeout(() => {
		// 			if (contentse.type == 1) {
		// 				//系统消息
		// 				uni.navigateTo({
		// 					url: `/pages/client/home/information/information`
		// 				});
		// 			}
		// 			if (contentse.type == 2) {
		// 				//课程消息
		// 				uni.navigateTo({
		// 					url: `/pages/client/home/consultant/consultant?id=${contentse.id}`
		// 				});
		// 			}
		// 			if (contentse.type == 3) {
		// 				//赛事消息
		// 				uni.navigateTo({
		// 					url: `/pages/client/match/briefgame/briefgame?vsid=${contentse.id}`
		// 				});
		// 			}
		// 		}, 1000)

		// 	});
		// 	plus.push.addEventListener('receive', function(message) {
		// 		// 透传消息，透传消息不显示通知栏
		// 		// plus.nativeUI.toast('push receive');
		// 		uni.$emit(_self.constant.EventKey.UPDATE_SYSTEM_MESSAGE, {
		// 			msg: '发送消息'
		// 		});
		// 		console.log(message);
		// 		// contentdata = message.content;
		// 		// let contentse = JSON.parse(contentdata);
		// 		// if (message.type == 'receive') {
		// 		// 	plus.push.createMessage(message.title);
		// 		// }

		// 		if (plus.os.name != 'iOS') {
		// 			//安卓
		// 			console.log(222);
		// 			contentdata = message.content;
		// 			let contentse = JSON.parse(contentdata);
		// 			plus.push.createMessage(message.title, message.payload);
		// 			return;
		// 		}
		// 		//根据payload传递过来的数据，打开一个详情
		// 		var payload;
		// 		if (message.payload) {
		// 			//如透传消息不符合格式，则“payload”属性为string类型
		// 			//这里的示例以json字符串去解析，实际上也可以做字符串匹配
		// 			if (typeof message.payload == 'string') {
		// 				try {
		// 					payload = JSON.parse(message.payload);
		// 				} catch (error) {
		// 					console.log(error);
		// 				}
		// 			} else if (typeof message.payload == 'object') {
		// 				//iOS应用正处于前台运行时收到推送，也触发receive事件，此时payload为json对象
		// 				plus.push.createMessage(message.title, message.content);
		// 			}
		// 		}
		// 	});
		// 	// #endif
		// },
		onShow: function() {

		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/app.css";
	@import url('font/iconfont.css');

	::-webkit-scrollbar { 
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-webkit-box-orient:vertical;
	}
	.ellipsis_2 {
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		/* white-space: nowrap; */
		-webkit-box-orient:vertical; 
		-webkit-line-clamp:2;
	}
</style>
