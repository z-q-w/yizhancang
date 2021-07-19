<template>
	<view style="background: #FFFFFF;min-height: 100%;padding-top: 230rpx;box-sizing: border-box;">
		<view class="service">
			<view style="padding-top: 42rpx;">客服24小时</view>
			<view>为您竭诚服务</view>
		</view>
		<view class="hotline">
			服务热线:{{description}}
		</view>
		<view class="linkman" @click="callup">
			联系客服
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				callphone:'CUSTOMER_MOBILE',
				description:'',
			}
		},
		onLoad() {
			this.findByCode()
		},
		methods: {
			findByCode(){
				this.api.tDictfineOne(
					JSON.stringify("CUSTOMER_MOBILE")
				).then(res=>{
					console.log(res)
					this.description=res.data.dictValue
				})
			},
			callup(){//拨打客服
				uni.makePhoneCall({
				    phoneNumber:this.description //仅为示例
				});
			},
		}
	}
</script>

<style>
	.service{
		background-image: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/CD149D5A456248E08AAC89500A9872E89dad47e9170314bc5d84e79d8eaaf44.png);
		background-size: 420rpx 320rpx;
		width: 420rpx;
		height:320rpx ;
		margin:0 auto;
		text-align: center;
		font-size:48rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:68rpx;
		color:rgba(242,148,34,1);
	}
	.hotline{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:40rpx;
		color:rgba(242,148,34,1);
		opacity:1;
		text-align: center;
		margin:80rpx 0 120rpx 0;
	}
	.linkman{
		width:565rpx;
		height:91rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		border-radius:12rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		text-align: center;
		line-height: 91rpx;
		margin: 60rpx auto 0 auto;
		
	}
</style>
