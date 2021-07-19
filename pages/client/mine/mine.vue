<template>
	<view class="container">
		<view class="header">
			<text>个人中心</text>
			<!-- #ifdef H5|| APP-PLUS -->
			<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/3BA27FAF23DF4AF0B3D8DCC7211D816E42.png" mode="" class="seet" @click="setting"></image>
			<!-- #endif -->
		</view>
		<view class="mine" @click="usermessage">
			<image class="mine_img" :src="isLogin ? userdata.avatar : 'https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png'" mode="aspectFill"></image>
			<view class="login">
				<text class="h1">{{isLogin ? nickname : '登录注册'}}</text>
				<text class="h2">{{isLogin ? signature : '登录享受更多权益~'}}</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/3BA27FAF23DF4AF0B3D8DCC7211D816E42.png" mode="" style="width: 40rpx;height: 40rpx;" @click.stop="setting"></image>
			<!-- #endif -->
		</view>
		<view class="member" @click="memberCenter">
			<view class="member_left">
				<view class="" style="display: flex;justify-content: space-between;">
					<text class="title">会员级别:{{isLogin ? membership.levelName : '登录享受更多权益~'}}</text>
					<view class="member_right" >
						<text>查看详情</text>
						<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/B5E77C2BFAFE4415B870F00A210F94F143.png" mode=""></image>
					</view>
				</view>
				<text class="miaoshu">{{membership.figure}}</text>
			</view>
			
		</view>
		<view class="order">
			<view class="title" @click="allorder">
				<view class="left">我的订单</view>
				<view class="right">
					<text>全部订单</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/A47876495E98482BB85DA3D55D8AB63F124.png" mode="" style="width: 12rpx;height: 20rpx;margin-left: 10rpx;margin-top:6rpx;"></image>
				</view>
			</view>
			<view class="state">
				<view class="state_item" v-for="(item,index) in state" :key="index" @click="orderstatus(item)">
					<image :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
					<view v-if="item.paytype!=''|| item.paytype!=0" style="position: absolute;right: 0;top: 10rpx;width: 28rpx;height: 28rpx;text-align: center;line-height: 28rpx;background: red;color: #FFFFFF;font-size: 20rpx;border-radius: 50%;">{{item.paytype}}</view>
				</view>
			</view>
		</view>
		<view class="invitefriends" @click="invite">
			<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/8290E33412FD4D1C83D23038EF14871649.png" mode=""></image>
		</view>
		<view class="mytool">
			<view class="title">
				我的工具
			</view>
			<view class="mytoolList">
				<!-- #ifdef MP-WEIXIN -->
				<button type="default" open-type="contact" class="buttontact">sdfsdfsf</button>
				<!-- #endif -->
				<view class="list_item" v-for="(item,index) in mytool" :key="index" @click="toolbox(item)">
					<image :src="item.img" mode="aspectFit"></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				notPay:"",
				state:[ //我的订单
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1B834265190C42948E04B4520E651D4744.png',
						text:'待付款',
						type:2,
						paytype:''
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/37900087CB33418380831432BD6DD30445.png',
						text:'待发货',
						type:3,
						paytype:''
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/C62FA089D17647CBA598910CEF28650546.png',
						text:'待收货',
						type:4,
						paytype:''
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/B1864B302E4148CBBFE85D3CECB3E11A47.png',
						text:'待评价',
						type:5,
						paytype:''
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AB00715D74C440DF8AAAB861B2853DA648.png',
						text:'退款/售后',
						type:6,
						paytype:''
					}
				],
				signature:'',
				nickname:'',
				mytool:[ //我的工具
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/F6AD8DB2F8084D78A7950C8B3E9EE01550.png',
						text:'我的优惠券',
						url:'/pages/client/mine/discountcoupon/discountcoupon'
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/F893A68A80CD4664A2F5C69535246F8B51.png',
						text:'我的钱包',
						url:'/pages/client/mine/mywallet/mywallet'
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1F15D2BD3E664168872CC3951C6AB05C52.png',
						text:'收货地址',
						url:'/pages/client/mine/shippingaddress/shippingaddress'
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/BA67FBF95B6D4F609073B83E0EFE875253.png',
						text:'我的团队',
						url:'/pages/client/mine/myteam/myteam'
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/43B3E1AFD6FB4161ADCC21122E65292554.png',
						text:'我的收藏',
						url:'/pages/client/mine/myfavorite/myfavorite'
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/FC262CC68E1647A7AAF41B0EC2371EFF55.png',
						text:'意见反馈',
						url:'/pages/client/mine/feedback/feedback'
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/492FC1D2CD29499F87B4C247B9DFBF5B56.png',
						text:'咨询客服',
						url:'/pages/client/consult/consult'
					},
					{
						img:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/4FA15C32E8AF45A98343EF377F0731D757.png',
						text:'联系我们',
						url:'/pages/client/mine/servicekf'
					}
				],
				userdata:'',
				membership:{
					levelName:''
				},
				isLogin:this.cacheHelper.isLogin() //登录true  未登录fales
			}
		},
		onLoad() {
			if(this.cacheHelper.isLogin()){
				this.userinfo()
				this.customerInfo()
			}
			uni.$on('quitlogin',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.state.forEach(item=>{
					item.paytype=''
				})
				this.isLogin=false
			})
			uni.$on('getuser',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.userinfo()
			})
		},
		onShow() {
			if(this.cacheHelper.isLogin()){
				this.statusCount()
			}
		},
		//发送给朋友
		onShareAppMessage(res) {
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			let distSource = uni.getStorageSync('distSource');
			if (distSource) {
				return {
					title: '壹站仓app分享',
					type: 0,
					path: '/pages/client/home/home?inviteeCode=' + distSource,
					summary: "",
					imageUrl: ""
				}
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			let distSource = uni.getStorageSync('distSource');
			if (distSource) {
				return {
					title: '壹站仓app分享',
					type: 0,
					query: '/pages/client/home/home?inviteeCode=' + distSource,
					summary: "",
					imageUrl: ""
				}
			}
		},
		methods:{
			statusCount(){
				this.api.statusCount().then(res=>{
					this.state[0].paytype=res.data.notPay
					this.state[1].paytype=res.data.notSend 
					this.state[2].paytype=res.data.notReceive 
					this.state[3].paytype=res.data.notEvaluate
					this.state[4].paytype=res.data.refund
				})
			},
			customerInfo(){//会员卡
				this.api.customerInfo().then(res=>{
					console.log(res)
					this.membership=res.data
					
				})
			},
			setting(){
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({ //前往设置
						url:'./seeting/seeting'
					})
				}
			},
			memberCenter(){ //会员中心
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'../user/memberCenter/memberCenter'
					})
				}
			},
			allorder(){//去全部订单
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'/pages/client/mine/orderList/orderList'
					})
				}
			},
			orderstatus(v){//去订单的状态
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'/pages/client/mine/orderList/orderList?type=' + v.type
					})
				}
			},
			toolbox(v){
				if(this.cacheHelper.isLoginOnclick()){
					if(v.text=='咨询客服'){
						plus.runtime.openURL('https://cschat-ccs.aliyun.com/index.htm?tntInstId=_2CsuHFw&scene=SCE00009467');
					}else{
						uni.navigateTo({
							url:v.url
						})
					}
					
				}
			},
			invite(){
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'/pages/client/mine/invitefriends/invitefriends'
					})
				}
			},
			usermessage(){
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'/pages/client/mine/mymessage/mymessage'
					})
				}
			},
			userinfo(){
				this.api.userinfo().then(res=>{
					console.log(res,'个人信息')
					this.userdata=res.data
					this.signature=res.data.signature.replace(/\\n/g, '')
					this.nickname=res.data.nickname.replace(/\\n/g, '')
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height:100% ;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AD75A3BED3FB48098C221005E74A4DAB40.png) no-repeat;
		background-size: 750rpx 413rpx;
		box-sizing: border-box;
		padding: 0 22rpx;
	}
	image{
		width: 100%;
		height: 100%;
		display: block;
	}
	.container .header{
		margin-top: 76rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.header text{
		font-size: 36rpx;
		color: #333333;
		font-weight: bold;
	}
	.header .seet{
		width: 36rpx;
		height: 36rpx;
	}
	.container .mine{
		display: flex;
		margin-top: 33rpx;
		padding-left: 20rpx;
		
	}
	.mine .mine_img{
		width: 108rpx;
		height: 108rpx;
		border-radius: 50%;
	}
	.mine .login{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		flex: 1;
		margin-top: 10rpx;
	}
	.login .h1{
		height: 50rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 50rpx;
		color: #020202;
	}
	.login .h2{
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
	}
	.container .member{
		height: 151rpx;
		border-radius: 12rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/325854FCC38C4BCAA54C1FC383AD524B41.png) no-repeat;
		background-size: 99% 100%;
		box-sizing: border-box;
		padding: 0 34rpx 0 47rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 720rpx;
	}
	.member .member_left{
		display: flex;
		flex-direction: column;
	}
	.member_left text{
		font-size: 24rpx;
		color: #7e8191;
		font-weight: 400;
		
	}
	.member_left .title{
		font-size: 30rpx;
		color: #f9d798;
		font-weight: bold;
		margin:16rpx 0 20rpx 0;
	}
	.member .member_right{
		width: 169rpx;
		height: 53rpx;
		background-color: #fee6a8;
		border-radius: 29rpx;
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.member_right text{
		font-size: 27rpx;
		color: #232a43;
		font-weight: 400;
		margin-right: 11rpx;
		margin-left: 24rpx;
	}
	.member_right image{
		width: 14rpx;
		height: 22rpx;
	}
	.container .order{
		width: 710rpx;
		height: 220rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 0 30rpx 0 40rpx;
		background-color: #FFFFFF;
		margin-top: 33rpx;
	}
	.order .title{
		margin-top: 24rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.order .title .left{
		font-size: 30rpx;
		color: #333333;
		font-weight: bold;
		line-height: 42rpx;
	}
	.order .title .right{
		font-size: 22rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		display: flex;
	}
	.order .state{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.state .state_item{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		width: 170rpx;
	}
	.state_item image{
		width: 50rpx;
		height: 50rpx;
		padding-top: 30rpx;
	}
	.state_item text{
		font-size: 24rpx;
		font-weight: 400;
		line-height: 33rpx;
		color: #666666;
		margin-top: 18rpx;
	}
	.container .invitefriends{
		width: 710rpx;
		height: 130rpx;
		border-radius: 16rpx;
		margin: 30rpx 0;
	}
	.container .mytool{
		width: 710rpx;
		min-height: 442rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}
	.mytool .title{
		height: 88rpx;
		border-bottom: 1rpx solid #EEEEEE;
		font-size: 30rpx;
		color: #333333;
		font-weight: bold;
		line-height: 88rpx;
		padding-left: 30rpx;
	}
	.mytool .mytoolList{
		position: relative;
		min-height:353rpx ;
		margin-top: 42rpx;
		padding-left: 5rpx;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	/* #ifdef MP-WEIXIN */
	.buttontact{
		position: absolute;
		width:150rpx;
		height: 120rpx;
		bottom: 80rpx;
		right: 180rpx;
		opacity: 0;
	}
	/* #endif */
	
	.mytoolList .list_item{
		/* margin: 0 23rpx; */
		width: 170rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 77rpx;
		text-align: center;
	}
	.list_item image{
		height: 60rpx;
		margin-bottom: 13rpx;
	}
	.list_item text{
		font-size: 30rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: #333333;
	}
	.miaoshu{
		display: inline-block;
		white-space: nowrap;
		width: 650rpx;
		overflow: hidden;
		text-overflow:ellipsis;
	}
</style>
