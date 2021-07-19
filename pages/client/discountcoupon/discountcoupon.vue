<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<view class="" :style="'padding-right:'+(demo.width+10)+'px;'+'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<navigator url="" open-type="navigateBack" class="back">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/9FDC73AA3C38488EAAACAB234AD0E0C9131.png" mode="" style="width: 20rpx;height: 38rpx;"></image>
			</navigator>
		</view>
		<!-- #endif -->
		<view class="header"></view>
		<view class="discountcouponBox">
			<view class="top">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/99E88958AD384A968B55BA1A45932129128.png" mode=""></image>
				<text>我获得的优惠券</text>
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/496D6B141FEB4A529F5AF8BCDB495A09129.png" mode=""></image>
			</view>
			<scroll-view class="scroll-view_H" scroll-y="true" scroll-left="120">
				<view class="swiper-item">
					<view class="item" v-for="item in reducedlist">
						<view :class="item.type==1? 'price':'unprice'">
							￥<text style="font-size: 50rpx;">{{item.favorablePrice}}</text>
						</view>
						<text :class="item.type==1? 'sdtltals':'unsdtltals'" style="">{{item.name}}</text>
						<view :class="item.type==1? 'statelq':'unstatelq'" @click="drawdown(item)">
							{{item.type==1?'已领取':'点击领取' }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				demo: {},
				reducedlist:[]
			}
		},
		onLoad() {
			this.couponptCouponList()
			// #ifdef MP-WEIXIN
				const demo = uni.getMenuButtonBoundingClientRect() || ''
				console.log(demo)
				if (demo == '') {
					return
				}
				console.log(demo)
				this.demo = demo
			// #endif
			
		},
		methods: {
			couponptCouponList(){
				this.api.couponptCouponList().then(res=>{
					this.reducedlist=res.data
				})
			},
			drawdown(v){//领取优惠劵
				this.api.couponreceive({
					id:v.id
				}).then(res=>{
					this.couponptCouponList()
					uni.showToast({
						title: '领取成功',
					})
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		background: url(https://mingsijiaoyu.oss-cn-beijing.aliyuncs.com/42603E3D5EA24D96B1498CDB29BBFEE0125.png) no-repeat;
		background-size: 100% 100%;
		width: 750rpx;
		min-height: 100%;
		display: flex; 
		flex-direction: column;
		align-items: center;
	}
	.container .back{
		width: 18rpx;
		height: 50rpx;
		margin-top: 16rpx;
		position: fixed;
		left: 49rpx;
	}
	.container .back image{
		width: 16rpx;
		height: 28rpx;
	}
	.header{
		width: 720rpx;
		height: 580rpx;
		background: url(https://mingsijiaoyu.oss-cn-beijing.aliyuncs.com/24F166E80CC2426A8E23C077C29ED731126.png) no-repeat;
		background-size: 100% 100%;
	}
	.discountcouponBox{
		width: 690rpx;
		height: 730rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/802CF7F4FCC24590BE988492337A020A130.png) no-repeat;
		background-size: 100% 100%;
	}
	.discountcouponBox .top{
		display: flex;
		align-items: center;
		margin-top: 60rpx;
		margin-bottom: 20rpx;
	}
	.discountcouponBox .top image{
		width: 67rpx;
		height: 15rpx;
	}
	.discountcouponBox .top text{
		font-size: font-size29rpx;
		font-weight: bold;
		color: #000000;
		margin: 0 10rpx;
	}
	.swiper-item{
		box-sizing: border-box;
		padding: 40rpx 0rpx 0 45rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.swiper-item .item{
		width:180rpx ;
		height: 206rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/B1823673F64C44FAAB33AD1B752C8A12127.png) no-repeat;
		background-size: 100% 100%;
		margin-right: 30rpx;
		margin-bottom: 56rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.item .price{
		font-size: 30rpx;
		color: rgb(160,158,157);
		text-align: center;
		margin-top: 20rpx;
	}
	.item .unprice{
		font-size: 30rpx;
		color: rgb(206,34,28);
		text-align: center;
		margin-top: 20rpx;
	}
	.statelq{
		width: 150rpx;
		height: 40rpx;
		text-align: center;
		background:rgb(211,208,205) ;
		border-radius: 40rpx;
		line-height: 40rpx;
		font-size: 25rpx;
		margin: 34rpx auto 0 auto;
		color: rgb(160,158,157);
	}
	.unstatelq{
		width: 150rpx;
		height: 40rpx;
		text-align: center;
		background:#FFD777 ;
		border-radius: 40rpx;
		line-height: 40rpx;
		font-size: 25rpx;
		margin: 34rpx auto 0 auto;
		color: #DA0412;
	}
	.sdtltals{
		font-size: 24rpx;
		color:rgb(160,158,157);
	}
	.unsdtltals{
		font-size: 24rpx;
		color:#EE2928;
	}
	.scroll-view_H{
		height: 560rpx;
	}
</style>
