<template>
	<view class="container">
		<view class="header" v-html="xiyidata">
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				xiyidata:'',
			}
		},
		onLoad(options) {
			switch((parseInt(options.type))){
				case 2:
				uni.setNavigationBarTitle({
					title:'隐私协议'
				})
				this.agreement('PRIVACY_POLICY')
				break;
				case 3:
				uni.setNavigationBarTitle({
					title:'平台协议'
				})
				this.agreement('PT_PRO')
				break;
				case 4:
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
				this.agreement('ABOUT_US')
			}
		},
		methods:{
			agreement(v){
				this.api.agreement(
					JSON.stringify(v)
				).then(res=>{
					this.xiyidata=res.data
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
		margin: 15rpx;
		width: 750rpx;
		height: 100%;
	}
</style>
