<template>
	<view class="container">
		<view class="header">
			<text class="title">我的余额</text>
			<text class="total">{{userdata.balance}}</text>
			<view class="bottom">
				<view class="">
					<text style="margin-right: 15rpx;">总收入:¥{{userdata.income}}</text>
					<text>已提现:¥{{userdata.withdrawal}}</text>
				</view>
				<text class="btn" @click="deposit">提现</text>
			</view>
		</view>
		
		<view class="monery_details">
			<view class="title">
				<text :class="count===1?'active':''" @click="toback(1)">折返明细</text>
				<text :class="count===2?'active':''" @click="toback(2)">团队提成</text>
			</view>
			<view class="monery_msg">
				<view class="msg_title" v-if="count===1">
					<text style="width: 220rpx;">消费时间</text>
					<text style="width: 120rpx;text-align: center;">消费金额</text>
					<text style="width: 130rpx;text-align: center;">支出金额</text>
					<text style="width: 120rpx;text-align: center;">折返金额</text>
				</view>
				<view class="msg_title" v-if="count===2">
					<text style="width: 220rpx;">姓名</text>
					<text style="width: 120rpx;text-align: center;">消费金额</text>
					<text style="width: 130rpx;text-align: center;">折返金额</text>
				</view>
			</view>
		</view>
		<view class="consume_list" v-for="item in retraceparticulars" v-if="count===1">
			<view class="consume_sum" style="width: 220rpx">
				<text class="price">购物消费</text>
				<text class="time">{{item.createTime}}</text>
			</view>
			<text class="back_sum" style="width: 120rpx;text-align: center;">￥{{item.price}}</text>
			<text class="back_sum" style="width: 130rpx;text-align: center;">￥{{item.totalPrice}}</text>
			<text class="ratio" style="width: 120rpx;text-align: center;">￥{{item.retracePrice}}</text>
		</view>
		<view class="consume_list" v-for="item in groupdas" v-if="count===2">
			<view class="consume_sum" style="width: 220rpx">
				<text class="price">{{item.nickname}}</text>
				<text class="time">{{item.createTime}}</text>
			</view>
			<text class="back_sum" style="width: 120rpx;text-align: center;">￥{{item.orderPrice}}</text>
			<text class="back_sum" style="width: 130rpx;text-align: center;">￥{{item.price}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				count: 1,
				userdata:{
					income:'',
					withdrawal:''
				},
				groupdas:'',
				retraceparticulars:''
			}
		},
		onLoad() {
			this.userinfo()
			uni.$on('balance',(data)=>{
				this.userinfo()
			})
			this.retracefindPage()
			this.teamincome()
		},
		methods:{
			toback(res) {
				this.count=res
			},
			retracefindPage(){//折返明细
				this.api.retracefindPage({
					"current": 1,
					"size": 100
				}).then(res=>{
					this.retraceparticulars=res.data.records
					this.retraceparticulars.forEach(item=>{
						item.createTime=item.createTime.substring(0,16)
					})
				})
			},
			teamincome(){
				this.api.teamincome({
					"current": 1,
					"size": 100
				}).then(res=>{
					console.log(res)
					this.groupdas=res.data.records
				})
			},
			userinfo(){
				this.api.userinfo().then(res=>{
					console.log(res,'个人信息')
					this.userdata=res.data
				})
			},
			deposit(){
				uni.navigateTo({
					url:"/pages/client/withdrawal/withdrawal/withdrawal?money=" + this.userdata.balance
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		width: 750rpx;
		min-height: 100%;
		background-color: #FFFFFF;
	}
	.header{
		width: 709rpx;
		height: 310rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/6BAC804401B1402587226DBA5D4D5FD3109.png) no-repeat;
		background-size: 100% 100%;
		margin-top: 30rpx;
		margin-left: 20rpx;
		box-sizing: border-box;
		padding-left: 45rpx;
		display: flex;
		flex-direction: column;
	}
	.header .title{
		font-size: 28rpx;
		color: #333333;
		font-weight: 400;
		margin-top: 64rpx;
	}
	.header .total{
		font-size: 80rpx;
		color: #333333;
		font-weight: bold;
		line-height: 103rpx;
	}
	.header .total::before{
		content: '¥';
		font-size: 30rpx;
		font-weight: bold;
		margin-right: 5rpx;
	}
	.header .bottom{
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		box-sizing: border-box;
		padding-right: 31rpx;
		
	}
	.header text{
		font-size: 24rpx;
		color: #333333;
		font-weight: 400;
	}
	.header .btn{
		width: 134rpx;
		height: 57rpx;
		line-height: 57rpx;
		text-align: center;
		border: 1rpx solid #333333;
		border-radius: 10rpx;
	}
	
	
.monery_details {
			width: 100%;
			background-color: #FFFFFF;
			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 93rpx;
				box-sizing: border-box;
				padding-left: 29rpx;
				text {
					font-size: 29rpx;
					font-weight: bold;
					line-height: 41rpx;
					margin-right: 57rpx;
					color: #999999;
				}

				.active {
					color: #333333;
				}
			}

			.monery_msg {
				display: flex;
				flex-direction: column;
				border-bottom: 1rpx solid #f5f5f5;
				.msg_title {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 35rpx 25rpx 29rpx;
					margin-top: 24rpx;

					text {
						font-size: 26rpx;
						color: #333333;
						line-height: 36rpx;
						font-weight: 400;
					}
				}
			}
		}
	
	
	
	.consume_list {
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		padding: 0 30rpx 0 30rpx;
		align-items: center;
		height: 124rpx;
		width: 100%;
		background-color: #FFFFFF;
		justify-content: space-between;
		border-bottom: 1rpx solid #EEEEEE;
	
		.consume_sum {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
	
			.price {
				font-size: 29rpx;
				color: #333333;
				line-height: 36rpx;
				font-weight: 500;
			}
	
			.time {
				font-size: 22rpx;
				font-weight: 400;
				color: #999999;
				line-height: 31rpx;
				margin-top: 4rpx;
			}
		}
	
		.back_sum {
			font-size: 26rpx;
			color: #333333;
			line-height: 31rpx;
			font-weight: 500;
		}
	
		.ratio {
			font-size: 26rpx;
			color: #333333;
			line-height: 31rpx;
			font-weight: 500;
		}
	}
</style>
