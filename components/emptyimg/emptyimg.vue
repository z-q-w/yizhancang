<template>
	<view>
		<view class="" style="text-align: center;padding: 100rpx 0 50rpx 0;">
			<!-- style="width: 420rpx;height: 230rpx;" -->
			<image src="http://www.mescroll.com/img/mescroll-empty.png?v=1" mode="" :style="{ width: width + 'rpx', height: height + 'rpx' }" ></image>
			<view class="" style="color: #666;margin-top: 30rpx;">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['height','width'],
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
