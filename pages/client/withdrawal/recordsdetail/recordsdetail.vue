<template>
	<view>
		<view class="top_bg"></view>
		<view class="bot_con">
			<view class="status_blo">
				<image v-if="datas.status == 2" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/91BED10BA2F845D2AC2C976BDF51C445113.png" mode=""></image>
				<image v-if="datas.status == 3" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/2F9BCFE7B7B94579AB4FA58C4EDDB963114.png" mode=""></image>
				<image v-if="datas.status == 1" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/A849120FDE0A4A26947C4BD2FFC2D7C4115.png" mode=""></image>
				<view>{{datas.status == 2 ? '提现成功' : (datas.status == 3 ? '提现失败' : '提现审核中')}}</view>
			</view>
			<view class="green_bg"></view>
			<view class="white_blo">
				<view class="data_price">￥{{datas.price}}</view>
				<view style="font-size: 28rpx;color: #999;text-align: center;margin:8rpx 0 61rpx 20rpx;">提现金额</view>
				<view class="one_items">
					<view class="item_title">提现账户：</view>
					<view class="item_con">{{datas.name}}</view>
				</view>
				<view class="one_items">
					<view class="item_title">提现时间：</view>
					<view class="item_con">{{datas.createTime}}</view>
				</view>
				<view v-if="datas.status == 3" class="one_items">
					<view class="item_title">拒绝原因：</view>
					<view class="item_con">{{datas.refuseReason}}</view>
				</view>
				<view class="items_con">
					<image :src="datas.transferVoucher" class="image_size" mode="aspectFill" @click="previewImage(0,datas.transferVoucher.split(','))"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas:{}
			}
		},
		methods: {
			particulars(id){
				this.api.withdrawaldetail(JSON.stringify(id)).then(res=>{
					if(res.code===200){
						this.datas=res.data
					}
				})
			},
			
			previewImage(index,imageList) {//预览图片
				this.tui.previewImage(index,imageList)
			},
		},
		onLoad(options) {
			console.log(options)
			this.particulars(options.id)
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background-color: #F2F4F8;
		box-sizing: border-box;
	}
	.top_bg{
		height: 455rpx;
		width: 100%;
		background: url(http://yimiyunshang.oss-cn-beijing.aliyuncs.com/acc61e4dd21d42b4b379566504747b18.png) no-repeat;
		background-size: 100% 100%;
	}
	.bot_con{
		width: 667rpx;
		margin: -264rpx 42rpx 0 42rpx;
	}
	.status_blo{
		display: flex;
		margin-left: 202rpx;
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 81rpx;
	}
	.status_blo image{
		width: 81rpx;
		height: 81rpx;
		margin-right: 32rpx;
	}
	.green_bg{
		width: 667rpx;
		height: 33rpx;
		background: #339439;
		opacity: 1;
		border-radius: 17rpx;
		margin-top: 52rpx;
	}
	.white_blo{
		width: 627rpx;
		margin-left: 20rpx;
		margin-top: -17rpx;
		background-color: #fff;
		height: 667rpx;
		border-radius: 0 0 7rpx 7rpx;
	}
	.data_price{
		text-align: center;
		font-size: 45rpx;
		font-weight: bold;
		padding-top: 35rpx;
	}
	.one_items{
		display: flex;
		margin: 0 30rpx 23rpx 30rpx;
		font-size: 29rpx;
		color: #333;
		font-family: 'PingFang SC';
	}
	.item_con{
		width: 400rpx;
	}
	.item_title{
		width: 167rpx;
		color: #999;
	}
	.image_size{
		width: 257rpx;
		height: 257rpx;
		border-radius: 18rpx;
		margin-right: 20rpx;
		margin-bottom: 25rpx;
	}
	.items_con{
		margin: 30rpx;
	}
</style>
