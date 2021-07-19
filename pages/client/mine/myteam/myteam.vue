<template>
	<view class="container">
		<view class="header" v-for="item in myfriend" @click="teambtn(item)" v-if="myfriend !=''">
			<view class="team_item">
				<view class="left">
					<image :src="item.avatar" mode=""></image>
					<view class="item_msg">
						<text class="name">{{item.nickname}}</text>
						<text class="time">{{item.createTime}}</text>
					</view>
				</view>
				<image class="right" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1E72D1CA56C74D4FB086DC2A4DE5C928124.png" mode=""></image>
			</view>
		</view>
		<view v-if="myfriend==''" style="margin: 100rpx auto  0 auto;">
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
				myfriend:[]
			}
		},
		onLoad() {
			this.teamfindPage()
		},
		methods:{
			teamfindPage(){
				this.api.teamfindPage({
					 "current": 1,
					  "size": 100
				}).then(res=>{
					this.myfriend=res.data.records
					this.myfriend.forEach(item=>{
						item.createTime=item.createTime.substring(0,10)
					})
				})
			},
			teambtn(v){
				uni.navigateTo({
					url:"/pages/client/mine/myteam/consumptiondetail/consumptiondetail?userId=" + v.id
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
		margin-top: 15rpx;
	}
	.team_item{
		display: flex;
		justify-content: space-between;
		height: 145rpx;
		border-bottom: 2rpx solid #F5F5F5;
		box-sizing: border-box;
		padding: 0 33rpx 0 44rpx;
		align-items: center;
		background-color: #FFFFFF;
	}
	.team_item .left{
		display: flex;
		align-items: flex-start;
	}
	.left image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	.left .item_msg{
		display: flex;
		flex-direction: column;
	}
	.item_msg .name{
		font-size: 32rpx;
		color: #212121;
		font-weight: 500;
		line-height: 40rpx;
		margin-bottom: 4rpx;
		margin-left: 10rpx;
	}
	.item_msg .time{
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
		line-height: 30rpx;
		margin-top: 10rpx;
	}
	.team_item .right{
		width: 14rpx;
		height: 29rpx;
	}
</style>
