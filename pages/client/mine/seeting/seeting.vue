<template>
	<view class="container">
		<view class="header">
			<list-cell :arrow="true" v-for="(item,index) in seets" :key="index" @click="setting(item)">
				<slot>{{item.text}}</slot>
			</list-cell>
			<!-- <view class="versions">
				<text>当前版本</text>
				<text style="color: #999999;">1.0</text>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				seets:[
					{
						text:'修改账户密码',
						type:1
					},
					{
						text:'隐私',
						type:2
					},
					{
						text:'平台协议',
						type:3
					},
					{
						text:'关于我们',
						type:4
					}
				]
			}
		},
		methods:{
			setting(item){
				if(item.type==1){
					uni.navigateTo({
						url:'./changepassword/changepassword'
					})
				}else{
					uni.navigateTo({
						url:`./privacyagreement/privacyagreement?type=${item.type}`
					})
				}
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
		background-color: #FFFFFF;
	}
	.header .versions{
		height: 100rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx 0 30rpx;
		justify-content: space-between;
	}
</style>
