<template>
	<view>
		<view class="list_con">
			<view v-for="(item, index) in list" :key="index" class="one_item" @click="enterdetail(item)">
				<view class="items_left">
					<view class="account_name">{{item.name}}</view>
					<view class="account_time">{{item.createTime}}</view>
				</view>
				<view class="items_right">
					<view style="text-align: right;">
						<view class="with-drawal">¥{{item.price}}</view>
						<view class="status_text" :class="item.status == 2 ? 'success_color' : (item.status == 3 ? 'fail_color' : 'audit_color')">{{item.status == 2 ? '提现成功' : (item.status == 3 ? '提现失败' : '提现审核中')}}</view>
					</view>
					<view class="iconfont you">&#xe621;</view>
				</view>
			</view>
		</view>
		<tui-nomore  :isDot="false" :text="'我也是有底线的'" :visible="isnomore" :bgcolor="'#f5f5f5'" v-if="!(list.length<size)"></tui-nomore>
		<tui-loading :text="'正在加载'" :visible="loading" ></tui-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				size:50,
				current: 1,
				list:[],
				pages: 1,
				isnomore:false,
				loading:false
			}
		},
		onReachBottom() {
			var that = this
			if(that.pages > that.current){
				that.current = parseInt(that.current)+1
				setTimeout(function(){
					that.withdrawallist()
				},400)
			}
		},
		methods: {
			//提现记录
			withdrawallist(){
				if(this.current == 1){
					this.list.length = 0
				}
				let params={
					current:this.current,
					size:this.size
				}
				this.api.withdrawallist(params).then(res=>{
					if(res.code===200){
						console.log(res)
						var datalist = res.data.records
						this.loading=false
						this.list = [...this.list, ...datalist]
						this.pages = res.data.pages
					}
				})
			},
			enterdetail: function(item){
				uni.navigateTo({
					url: '/pages/client/withdrawal/recordsdetail/recordsdetail?id='+item.id
				})
			}
		},
		onReachBottom() {
			let that =this
			if(this.list.length<this.size){
				return
			}else if(this.current>=this.pages){
				this.isnomore=true
				return
			}
			this.current++
			this.loading=true
			setTimeout(function(){
				that.withdrawallist()
			},350)
			
		},
		onLoad() {
			this.withdrawallist()
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background-color: #F2F4F8;
	}
	.list_con{
		background-color: #fff;
		padding: 0 30rpx;
	}
	.one_item{
		display: flex;
		padding: 30rpx 0;
		justify-content: space-between;
		border-top: 0.5rpx solid #f0f0f0;
	}
	.items_right{
		display: flex;
	}
	.you{
		font-size: 48rpx;
		margin-top: 25rpx;
		margin-left: 25rpx;
		color: #999;
	}
	.account_time{
		font-size: 22rpx;
		color: #999;
		margin-top: 11rpx;
	}
	.with-drawal{
		font-size: 29rpx;
		font-weight: bold;
	}
	.status_text{
		font-size: 22rpx;
		margin-top: 13rpx;
	}
	.success_color{
		color: #4EB754;
	}
	.audit_color{
		color: #F9AC28;
	}
	.fail_color{
		color: #ff4440;
	}
	.account_name{
		font-size: 28rpx;
		font-weight: 400;
	}
</style>
