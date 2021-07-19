<template>
	<view class="container">
		<text class="title">您好，欢迎您给我们反馈产品的使用感受和建议</text>
		<textarea value="" v-model="content" placeholder="请填写意见反馈内容" class="opinion"/>
		<input type="text" v-model="concat" value="" placeholder="留下您的联系方式 手机/QQ" class="relation"/>
		<text class="hint">您的联系方式有助于我们沟通解决问题，仅工作人员可见</text>
		<view class="btn" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				concat:'',//联系方式
				content:''//内容
			}
		},
		methods:{
			submit(){
				if(this.concat=='' || this.content==''){
					this.tui.toast('请输入联系方式或反馈内容')
					return
				}
				this.api.feekbackinsert({
					contact:this.concat,//联系方式
					content:this.content//内容
				}).then(res=>{
					this.tui.toast('反馈成功')
					setTimeout(()=>{
						uni.navigateBack({
						    delta: 1
						});
					},500)
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.container .title{
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		font-weight: 400;
		margin: 37rpx 0 23rpx 0;
	}
	.opinion{
		width: 690rpx;
		height: 343rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 30rpx 0 0 15rpx;
		margin-bottom: 38rpx;
		border-radius: 10rpx;
	}
	.relation{
		width: 690rpx;
		height: 84rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding-left: 15rpx;
		border-radius: 10rpx;
	}
	.hint{
		font-size: 28rpx;
		color: #CCCCCC;
		font-weight: 400;
		line-height: 40rpx;
		margin-top: 34rpx;
	}
	.btn{
		width: 690rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		background: linear-gradient(180deg,#ffb300 0%,#fbc824 100%);
		border-radius: 10rpx;
		font-size: 32rpx;
		color: #333333;
		font-weight: bold;
		margin-top: 169rpx;
	}
</style>
