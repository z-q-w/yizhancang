<template>
	<view class="container">
		<view class="header" v-if="myteamdetail!=''">
			<view class="top">
				<text class="time">消费时间</text>
				<text class="sumofconsumption">消费金额</text>
				<text class="commissionamount">提成金额</text>
			</view>
			<view class="consume_item" v-for="items in myteamdetail">
				<view class="item_type">
					<text class="title">购物消费</text>
					<text class="time">{{items.createTime}}</text>
				</view>
				<text class="item_total">¥{{items.orderPrice}}</text>
				<text class="item_totals">¥{{items.price}}</text>
			</view>
		</view>
		<view v-if="myteamdetail==''" style="margin: 100rpx auto  0 auto;">
			<image src="http://www.mescroll.com/img/mescroll-empty.png?v=1" mode="" style="width: 300rpx;height: 300rpx;"></image>
			<view class="" style="color: #999999;font-size: 30rpx;text-align: center;margin-top: 20rpx;">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userId:'',
				myteamdetail:[]
			}
		},
		onLoad(option) {
			this.userId=option.userId
			this.consumptionPage()
		},
		methods:{
			consumptionPage(){
				this.api.consumptionPage({
					"current":1,
					"size": 100,
					"userId": this.userId
				}).then(res=>{
					console.log(res)
					this.myteamdetail=res.data.records
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height: 100%;
	}
	.header{
		width: 750rpx;
		margin-top: 15rpx;
	}
	.header .top{
		display: flex;
		align-items: center;
		height: 86rpx;
		background-color: #FFFFFF;
	}
	.top text{
		font-size: 28rpx;
		color: #140005;
		font-weight: 400;
	}
	.top .time{
		margin: 0 243rpx 0 20rpx;
	}
	.top .sumofconsumption{
		margin-right: 119rpx;
	}
	.consume_item{
		height: 122rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid #F5F5F5;
		display: flex;
		align-items: center;
	}
	.consume_item .item_type{
		display: flex;
		flex-direction: column;
		margin: 0 193rpx 0 20rpx;
	}
	.item_type .title{
		font-size: 30rpx;
		font-weight: 400;
		color: #140005;
		line-height: 42rpx;
	}
	.item_type .time{
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
		margin-top: 1rpx;
		line-height: 33rpx;
	}
	.consume_item .item_total{
		font-size: 30rpx;
		font-weight: 500;
		color: #140005;
		margin-right: 153rpx;
	}
	.consume_item .item_totals{
		font-size: 30rpx;
		font-weight: 500;
		color: #140005;
	}
</style>
