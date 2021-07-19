<template>
	<view style="padding: 20rpx;">
		<view class="" v-html="bannerdetal">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerdetal:''
			}
		},
		onLoad(option) {
			this.bannerbtn(option)
		},
		methods: {
			bannerbtn(v){
				this.api.bannerdetail(
					JSON.stringify(v.bannerid)
				).then(res=>{
					this.bannerdetal=res.data.content
				})
			}
		}
	}
</script>

<style>

</style>
