<template>
	<view class="container">
		<view class="header" v-if="success">
			<text class="top">您已经成功发起退款申请，请耐心等待商家处理!</text>
			<text class="center">商家同意后，请您按照给出的退货地址并记录退货运单号</text>
			<text class="bottom">如果商家拒绝，您可以重新修改申请后再次发起，商家会重新处理</text>
			<view class="btn">
<!-- 				<text class="again">修改申请</text> -->
				<text class="cancel" v-if="orderdetaldata.orderStatus==21" @click="cancel">撤销申请</text>
				<text class="cancel" v-if="orderdetaldata.orderStatus==22 && orderdetaldata.logistics==''" @click="expressage">填写快运单号</text>
				<text class="cancel" style="color: #999;border-color: #999;" v-if="orderdetaldata.logistics !=''">等待商家收货</text>
			</view>
		</view>
		<view class="refundsuccess" v-if="!success">
			<view class="top">
				<view class="refundinformation">
						<text class="title">退款成功</text>
						<text class="time">处理结束时间:2020-06-06</text>
					</view>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/B9965E72B9DB42EEB2C17E1CC87E6723107.png" mode=""></image>
				</view>
			</view>
			
		<view :class="success?'msg':' msg m-success'">
			<text class="title">退款信息</text>
			<view class="order_item" v-for="item in orderdetaldata.goodsList">
				<image :src="item.thumbnails" mode="" class="item_img"></image>
				<view class="item_msg" >
					<text class="msg_name">{{item.goodsName}}</text>
					<text class="msg_specification">{{item.speName}}</text>
					<view class="msg_price">
						<text class="price">￥{{item.price}}</text>
						<text class="count">×{{item.quantity}}</text>
					</view>
				</view>
			</view>
			<view class="list">
				<text class="left">退款原因</text>
				<text class="right">{{orderdetaldata.refundReason}}</text>
			</view>
			<view class="list" v-if="orderdetaldata.refundExplain !=''">
				<text class="left">退款说明</text>
				<text class="right">{{orderdetaldata.refundExplain}}</text>
			</view>
			<view class="list">
				<text class="left">申请时间</text>
				<text class="right">{{orderdetaldata.createTime}}</text>
			</view>
			<view class="list">
				<text class="left">退款金额</text>
				<text  class="right" style="color: #FF4600;">¥{{orderdetaldata.payPrice}}</text>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="revocation">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/D0A8E01BDDE74FAF9920D3E6031CB9BF104.png" mode=""></image>
				<text class="title">确认撤销申请?</text>
				<view class="btn">
					<text style="color: #999999;" @click="affirm(1)">取消</text>
					<text style="color: #333333;" @click="affirm(2)">确认</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				success:true,
				orderdetalis:'',
				orderdetaldata:'',
			}
		},
		onLoad(option) {
			this.orderdetalis=option.orderdetalis
			this.orderdetail()
		},
		methods:{
			cancel(){ //弹出撤销
				this.$refs.popup.open()
			},
			orderdetail(){ //详情
				this.api.orderdetail(
					this.orderdetalis.toString()
				).then(res=>{
					console.log(res)
					this.orderdetaldata=res.data
				})
			},
			expressage(){
				uni.redirectTo({
					url:'/pages/client/mine/orderList/orderdetails/aftersale/waybillnumber/waybillnumber?orderdetalis=' + this.orderdetalis
				})
			},
			affirm(res){
				if(res==1){//取消撤销
					this.$refs.popup.close()
				}else{ //确认撤销
					this.$refs.popup.close()
					this.api.cancelReturn(
						this.orderdetalis.toString()
					).then(res=>{
						uni.showToast({
							title:'撤销申请成功',
							success(){}
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
						uni.$emit('orderupdata',{msg:'更新订单'})
					})
				}
			}
		}
	}
</script>

<style>
	.container{
		width: 750rpx;
		min-height: 100%;
	}
	.nav{
		width: 750rpx;
		height: 88rpx;
		background-color: #FFFFFF;
		padding-top: 40rpx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.nav image{
		width: 16rpx;
		height: 28rpx;
		margin: 0 237rpx 0 50rpx;
	}
	.nav text{
		font-size: 36rpx;
		color: #333333;
		font-weight: 500;
	}
	.success{
		background: rgba(255,255,255,0);
	}
	.refundsuccess{
		width: 750rpx;
		height: 380rpx;
		background: linear-gradient(137deg,#ffb300 0%,#fbc824 100%);
		box-sizing: border-box;
		padding: 155rpx 88rpx 0 50rpx;
	}
	.refundsuccess .top{
		display: flex;
		justify-content: space-between;
	}
	.refundsuccess .refundinformation{
		display: flex;
		flex-direction: column;
	}
	.refundinformation .title{
		font-size: 36rpx;
		font-weight: 500;
		color: #333333;
	}
	.refundinformation .time{
		font-size: 26rpx;
		color: #333333;
		font-weight: 500;
		margin-top: 8rpx;
	}
	.refundsuccess image{
		width: 161rpx;
		height: 98rpx;
	}
	.header{
		width: 710rpx;
		height: 316rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		margin: 20rpx 0 0 20rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding-left: 22rpx;
	}
	.header .top{
		font-size: 28rpx;
		color: #333333;
		font-weight: 500;
		line-height: 30rpx;
		margin-top: 32rpx;
		margin-bottom: 20rpx;
	}
	.header .center{
		font-size:24rpx ;
		color: #666666;
		font-weight: 400;
		margin-bottom: 14rpx;
		line-height: 30rpx;
	}
	.header .bottom{
		font-size:24rpx ;
		color: #666666;
		font-weight: 400;
		margin-bottom: 50rpx;
		line-height: 30rpx;
	}
	.header .btn{
		display: flex;
		box-sizing: border-box;
		padding-right: 28rpx;
		justify-content: flex-end;
	}
	.header .btn text{
		padding: 9rpx 26rpx;
		font-size: 24rpx;
		font-weight: 400;
		border-radius: 100rpx;
	}
	.btn .again{
		color: #999999;
		border: 1rpx solid #999999;
		margin-right: 28rpx;
	}
	.btn .cancel{
		color: #ffc300;
		border:1rpx solid #ffc300 ;
	}
	.msg{
		width: 710rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
		padding-top: 30rpx;
		margin-left: 20rpx;
	}
	.msg .title{
		font-size: 30rpx;
		color: #212121;
		margin-left: 22rpx;
		margin-bottom: 30rpx;
		font-weight: 500;
		line-height: 42rpx;
	}
	.msg .order_item {
		box-sizing: border-box;
		padding: 0 23rpx;
		display: flex;
		margin-bottom: 31rpx;
		height: 220rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		align-items: center;
	}
	
	.order_item .item_img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}
	
	.order_item .item_msg {
		display: flex;
		flex-direction: column;
	}
	
	.item_msg .msg_name {
		width: 484rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.item_msg .msg_specification {
		font-size: 22rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		margin-top: 8rpx;
	}
	
	.item_msg .msg_price {
		display: flex;
		align-items: center;
	}
	
	.msg_price .price {
		font-size: 28rpx;
		color: #FF4600;
		line-height: 30rpx;
		font-weight: 500;
		margin-right: 360rpx;
	}
	
	.msg_price .count {
		font-size: 22rpx;
		color: #212121;
	}
	.msg .list{
		width: 100%;
		border-top: 2rpx solid #F5F5F5;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx 28rpx 20rpx 22rpx;
		justify-content: space-between;
	}
	.list .left{
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
	}
	.list .right{
		font-size: 28rpx;
		color: #212121;
		font-weight: 400;
		flex: 1;
		margin-left: 20rpx;
	}
	.list .active{
		color: #FF4600;
	}
	.revocation{
		width: 400rpx;
		height: 280rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}
	.revocation image{
		width: 80rpx;
		height: 80rpx;
		margin-top: 28rpx;
	}
	.revocation .title{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
		font-weight: 500;
		margin-top: 28rpx;
		margin-bottom: 31rpx;
	}
	.revocation .btn{
		display: flex;
	}
	.revocation .btn text{
		width: 200rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border: 1rpx solid #f5f7fa;
		box-sizing: border-box;
	}
	.m-success{
		position: relative;
		top: -100rpx;
	}
</style>
