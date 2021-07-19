<template>
	<view class="container">
		<view class="header" :style="'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<navigator url="" open-type="navigateBack" style="width: 50rpx;">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/32D4D5AF6AD04019A4C776AB3E40982Afanhui.png" mode="" style="width: 50rpx;height: 50rpx;" ></image>
			</navigator>
			<text class="title">邀请好友</text>
			<view class=" " style="width: 50rpx;height:50rpx"></view>
		</view>
		<view class="mindeboxa">
			<view class="scansm">
				扫码有惊喜
			</view>
			<view class="QR_code">
				<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			</view>
		</view>
		<view class="operation">
			<text @click="teamds">我的团队</text>
			<!-- #ifdef H5 || APP-PLUS  --> 
			<text @click="rightaway" style="margin-left: 30rpx;">好友分享</text>
			<!-- #endif --> 
		</view>
		<view class="share" @click="shargui">
			分享好友规则
		</view>
		<uni-popup ref="sharings" type="bottom">
			<view class="" style="background: #FFFFFF; display: flex;padding: 20rpx 200rpx;justify-content: space-between;">
				<view class="" style="width: 100rpx;text-align: center;" @click="sharexin(1)">
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/7650C4A5F15D4CA2A8180AFB43D186E6weixin11.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
					<view class="" style="color: #46BB36;font-size: 30rpx;">微信</view>
				</view>
				<view class="" style="width: 100rpx;text-align: center;" @click="sharexin(2)">
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1DDD00A62B4746CC8AC7D3AFF9C6FFECpengyou22.png" mode="" style="width: 55rpx;height: 55rpx;"></image>
					<view class="" style="color: #46BB36;font-size: 30rpx;">朋友圈</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="sharrule" type="center">
			<view class="rulebox">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="" v-html="sharruledata" style="width: 580rpx;"></view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uQRCode from '../../../../libs/uqrcode.js'
	export default{
		data(){
			return{
				demo: {},
				qrcodeSize: uni.upx2px(286), //本页面二维码大小
				sharruledata:'',
				qrcodeText:''
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
			this.getCode()
			this.agreement()
		},
		//发送给朋友
		onShareAppMessage(res) {
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			let distSource = uni.getStorageSync('distSource');
			if (distSource) {
				return {
					title: '壹站仓app分享',
					type: 0,
					path: '/pages/client/login/reg/reg?inviteeCode=' + distSource,
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
					query: '/pages/client/login/reg/reg?inviteeCode=' + distSource,
					summary: "",
					imageUrl: ""
				}
			}
		},
		methods:{
			teamds(){
				uni.navigateTo({
					url:'/pages/client/mine/myteam/myteam'
				})
			},
			getCode(){
				this.api.getCode().then(res=>{
					console.log(res)
					this.qrcodeText='https://www.fzgcn.com/elm/#/sharelogin?inviteeCode=' + res.data
					uni.setStorageSync('distSource',res.data)
					this.makes()
				})
			},
			agreement(){
				this.api.agreement(
					JSON.stringify('SHARE_RULE')
				).then(res=>{
					this.sharruledata=res.data
				})
			},
			shargui(){
				this.$refs.sharrule.open()
			},
			makes() { //生成二维码-手机号，手机验证码，邀请码，密码  https://www.fzgcn.com/elm/
				console.log(this.qrcodeText)
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 10,
					success: res => {
						console.log(res) //图片路径
						this.qrcodeSrc = res
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			sharexin(v){
				this.$refs.sharings.close()
				if(v==1){
					this.share("weixin", "WXSceneSession", 0, this.qrcodeText, this.picurl)
				}else if(v==2){
					this.share("weixin", "WXSenceTimeline", 0, this.qrcodeText, this.picurl)
				}
			},
			share(shareProvider, shareScene, shareType, shareHref, imageUrl) { //分享API
				if (this.cacheHelper.isLoginOnclick()) { //登录则返回true
					uni.share({
						provider: shareProvider,
						scene: shareScene,
						type: shareType,
						href: shareHref,
						title: "壹站仓app分享",
						summary: "我正在使用朝壹站仓app,快跟我一起购物吧!",
						imageUrl: imageUrl,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			},
			rightaway(){
				this.$refs.sharings.open()
			},
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height: 100%;
		background: url(https://mingsijiaoyu.oss-cn-beijing.aliyuncs.com/02989C097EE04995B2C4B482A9B42004bc6978bbf55a98035e99e6e6ba2b7d2.png) no-repeat;
		background-size: 100% 100%;
	}
	.mindeboxa{
		background: url(https://mingsijiaoyu.oss-cn-beijing.aliyuncs.com/D618713DDEEE439A8D64EF4BB9A4530Db6f3e6c48ac748880d0d12dc4a46b09.png) no-repeat;
		background-size: 100% 100%;
		width: 590rpx;
		height:940rpx;
		margin:20rpx auto 0 auto;
	}
	.header{
		display: flex;
		align-items: center;
		padding-top: 60rpx;
		justify-content: space-between;
	}
	.header image{
		width: 16rpx;
		height: 28rpx;
		margin: 0 267rpx 0 20rpx;
	}
	.header .title{
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 50rpx;
	}
	.headline{
		width: 250rpx;
		height: 61rpx;
		margin: 173rpx 0 100rpx 251rpx;
		background-color: #FFFFFF;
	}
	.QR_code{
		width: 260rpx;
		height: 260rpx;
		background-color: #FFFFFF;
		margin: 100rpx 0 0rpx 150rpx;
		border-radius:14rpx ;
	}
	.operation{
		display: flex;
		justify-content: space-between;
		margin:40rpx 35rpx ;
	}
	.operation text{
		/* width: 327rpx; */
		flex: 1;
		height: 105rpx;
		border-radius: 53rpx;
		text-align: center;
		line-height: 105rpx;
		background: linear-gradient(180deg,#ffb300 0%,#fbc824 100%);
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.share{
		text-align: center;
		text-decoration: underline;
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: bold;
	}
	.scansm{
		width: 250rpx;
		height: 61rpx;
		font-size: 50rpx;
		font-family: FZZhengHei-B-GBK;
		font-weight: 400;
		line-height: 61rpx;
		color: #F12C1C;
		text-align: center;
		margin: 30rpx auto 0 auto;
	}
	.rulebox{
		width: 630rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}
	.scroll-Y{
		height: 400rpx;
		padding: 30rpx;
		box-sizing: border-box;
		/* width: ; */
	}
</style>
