<template>
	<view class="shade" @touchmove.stop.prevent>
		<view class="bottom">
			<view class="title">
				<text class="head">选择预计送达时间</text>
				<text>取消</text>
			</view>
			<view class="contect">
				<view class="left_month">
					<text class="month_item month_item-active">12月1号</text>
					<text class="month_item">12月2号</text>
					<text class="month_item">12月3号</text>
				</view>
				<view class="right_hour">
					<scroll-view scroll-y="true" class="hour" >
						<view class="hour_item">
							<view class="time">
								<text class="start">03:00</text>
								~
								<text class="end">03:30</text>
							</view>
							<view class="icon">
								<image src="../../static/drawable-xxhdpi/92.png" mode=""></image>
							</view>
						</view>
						<view class="hour_item">
							<view class="time">
								<text class="start">03:00</text>
								~
								<text class="end">03:30</text>
							</view>
							<view class="icon">
								<image src="../../static/drawable-xxhdpi/92.png" mode=""></image>
							</view>
						</view>
						<view class="hour_item">
							<view class="time">
								<text class="start">03:00</text>
								~
								<text class="end">03:30</text>
							</view>
							<view class="icon">
								<image src="../../static/drawable-xxhdpi/92.png" mode=""></image>
							</view>
						</view>
						<view class="hour_item">
							<view class="time">
								<text class="start">03:00</text>
								~
								<text class="end">03:30</text>
							</view>
							<view class="icon">
								<image src="../../static/drawable-xxhdpi/92.png" mode=""></image>
							</view>
						</view>
						<view class="hour_item">
							<view class="time">
								<text class="start">03:00</text>
								~
								<text class="end">03:30</text>
							</view>
							<view class="icon">
								<image src="../../static/drawable-xxhdpi/92.png" mode=""></image>
							</view>
						</view>
						<view class="hour_item">
							<view class="time">
								<text class="start">03:00</text>
								~
								<text class="end">03:30</text>
							</view>
							<view class="icon">
								<image src="../../static/drawable-xxhdpi/92.png" mode=""></image>
							</view>
						</view>
						
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:[
			{
				height:0,
				default:true
			},
			{
				starttime:String,
				default:true
			},
			{
				endtime:String,
				default:true
			}
		],
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.shade{
		width: 750rpx;
		height: 100%;
		background-color: rgba(0,0,0,.4);
		position: fixed;
		top: 0;
		left: 0;
		image{
			width: 100%;
			height: 100%;
			display: block;
		}
		.bottom{
			width: 750rpx;
			height: 576rpx;
			position: absolute;
			bottom: 0;
			background-color: #FFFFFF;
			border-radius: 10rpx 10rpx 0 0;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding-right: 41rpx;
			.title{
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
				margin-top: 30rpx;
				text{
					font-size: 24rpx;
					color: #333333;
					line-height: 33rpx;
					font-weight: 400;
				}
				.head{
					margin-right: 176rpx;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 39rpx;
					color: #333333;
				}
			}
			.contect{
				display: flex;
				flex-direction: row;
				height: 100%;
				margin-top: 30rpx;
				.left_month{
					display: flex;
					width: 208rpx;
					flex-direction: column;
					background-color: #f2f4f8;
					.month_item{
						width: 208rpx;
						height: 135rpx;
						line-height: 135rpx;
						text-align: center;
						font-size: 28rpx;
						color: #666666;
						font-weight: 400;
					}
					.month_item-active{
						background-color: #FFFFFF;
						color: #333333;
					}
				}
				.right_hour{
					display: flex;
					flex-direction: column;
					width: 542rpx;
					height: 480rpx;
					background-color: #FFFFFF;
					.hour{
						margin: 120rpx 0 0 38rpx;
						height: 100%;
						.hour_item{
							margin-bottom: 57rpx;
							display: flex;
							flex-direction: row;
							align-items: center;
							.time{
								font-size: 28rpx;
								color: #666666;
								font-weight: 400;
								line-height: 39rpx;
							}
							.icon{
								width: 32rpx;
								height: 22rpx;
								margin-left: 252rpx;
							}
						}
					}
				}
			}
		}
	
	
	}
</style>

