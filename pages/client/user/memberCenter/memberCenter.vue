<template>
	<view class="container">
		<view class="tatlas" :style="'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<navigator url="" open-type="navigateBack" style="width: 50rpx;">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/C527CCEAD33F426E94FEAEE3E5DF65DFfanhui.png" mode="" style="width: 50rpx;height: 50rpx;" ></image>
			</navigator>
			<text class="title">会员中心</text>
			<view class=" " style="width: 50rpx;height:50rpx"></view>
		</view>
		<view class="header">
			<view class="memberinformation">
				<view class="user_msg">
					<image :src="userdata.avatar" mode=""></image>
					<view class="msg" style="flex: 1;">
						<text class="name">{{userdata.nickname}}</text>
						<text class="signature">{{userdata.signature}}</text>
					</view>
				</view>
				<progress :percent="membership.consumption/membership.nextNeedConsumption*100" activeColor="#fff" backgroundColor="#7E8192" border-radius="50" active stroke-width="6" />
				<view class="user_state">
						<ai-progress percentage="75" bgColor="#ffffff" inBgColor="rgba(255,255,255,.35)"  isAnimate="true"></ai-progress>
						<view class="grade">
							<text class="left">会员级别:{{membership.levelName}}</text>
							<text class="right">消费金额:{{membership.consumption}}/{{membership.nextNeedConsumption}}</text>
						</view>
				</view>
			</view>
		</view>
		<view class="backdetail" @click="Turnbackthedetail">
			<view class="left">
				<text class="detail">折返明细</text>
				<text class="upgrade">升级会员，更多折返等着你</text>
			</view>
			<view class="examine">
				查看详情
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/14DFC4B8AE0F4DBCA7E1FFF129F852F043.png" mode=""></image>
			</view>
		</view>
		<view class="rule">
			<text>会员折返规则</text>
			<view class="rich_text" v-html="vipdes">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				demo: {},
				userdata:'',
				membership:{
					consumption:'',
					nextNeedConsumption:'',
					levelName:''
				},
				vipdes:'',
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
				const demo = uni.getMenuButtonBoundingClientRect() || ''
				console.log(demo)
				if (demo == '') {
					return
				}
				console.log(demo)
				this.demo = demo
			// #endif
			this.userinfo()
			this.customerInfo()
			this.agreement()
		},
		methods:{
			Turnbackthedetail(){
				uni.navigateTo({
					url:'../../mine/mywallet/mywallet'
				})
			},
			agreement(){
				this.api.agreement(
					JSON.stringify('VIP_DES')
				).then(res=>{
					this.vipdes=res.data
				})
			},
			customerInfo(){//会员卡
				this.api.customerInfo().then(res=>{
					console.log(res)
					this.membership=res.data
				})
			},
			userinfo(){
				this.api.userinfo().then(res=>{
					console.log(res,'个人信息')
					this.userdata=res.data
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height: 100%;
		background-color: #FFFFFF;
	}
	.viptaitl{
		height: 50rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 50rpx;
		color: #FFFFFF;
		opacity: 1;
	}
	.tatels{
		background: linear-gradient(89deg, #121729 0%, #282F49 100%);
		display: flex;
		justify-content: space-between;
	}
	.header{
		width: 750rpx;
		height: 283rpx;
		position: relative;
		background: linear-gradient(89deg, #121729 0%, #282F49 100%);
		border-bottom-left-radius: 50rpx;
	}
	.header .memberinformation{
		width: 710rpx;
		height: 308rpx;
		border-radius: 20rpx;
		overflow: hidden;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/78561B3F6C9E4C0FAF50E7FBF764A82590.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 20rpx;
		top: 31rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 28rpx 20rpx  0 40rpx;
	}
	.memberinformation .user_msg{
		display: flex;
		align-items: center;
		margin-bottom: 61rpx;
	}
	.user_msg image{
		width: 108rpx;
		height: 108rpx;
		border-radius: 100%;
		margin-right: 24rpx;
	}
	.user_msg .msg{
		display: flex;
		flex-direction: column;
	}
	.msg .name{
		font-size: 36rpx;
		color: #FFFFFF;
		font-weight: 400;
		line-height: 50rpx;
		margin-top: 12rpx;
	}
	.msg .signature{
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
		line-height: 33rpx;
		margin-top: 2rpx;
	}
	 .grade .left{
		 margin: 0 47rpx 0 7rpx;
	 }
	 .grade text{
		 font-size: 20rpx;
		 color: #F9D798;
		 font-weight: 400;
		 line-height: 28rpx;
	 }
	.backdetail{
		width: 710rpx;
		height: 170rpx;
		margin-left: 20rpx;
		margin-top: 76rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/8B275A18665548DAA9D8A83606D0B02693.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
	}
	.backdetail .left{
		margin-left: 200rpx;
		display: flex;
		flex-direction: column;
	}
	.backdetail .left .detail{
		font-size: 38rpx;
		color: #FFFFFF;
		font-weight: 400;
		line-height: 53rpx;
	}
	.backdetail .left .upgrade{
		font-size: 28rpx;
		color: #999999;
		font-weight: 400;
		line-height: 40rpx;
		margin-top: 2rpx;
	}
	.backdetail .examine{
		width: 169rpx;
		height: 53rpx;
		background-color: #FEE6A8;
		border-radius: 29rpx;
		text-align: center;
		line-height: 53rpx;
	}
	.examine image{
		width: 14rpx;
		height: 22rpx;
		margin-left: 11rpx;
	}
	.rule{
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-top: 36rpx;
	}
	.rule text{
		font-size:30rpx ;
		color: #312f34;
		font-weight: bold;
		line-height: 42rpx;
		margin-bottom: 15rpx;
	}
	
	.tatlas{
		display: flex;
		align-items: center;
		padding-top: 60rpx;
		justify-content: space-between;
		background: linear-gradient(89deg, #121729 0%, #282F49 100%);
	}
	.tatlas image{
		width: 16rpx;
		height: 28rpx;
		margin: 0 267rpx 0 20rpx;
	}
	.tatlas .title{
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 50rpx;
	}
</style>
