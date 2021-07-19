<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<!-- <view class="nav">
			<navigator url="" open-type="navigateBack" class="back">
				<image src="../../../../../static/icons/131.png" mode=""></image>
			</navigator>
			<text class="title">修改昵称</text>
			<text class="save">保存</text>
		</view> -->
		<!-- #endif -->
		<view class="header">
			<textarea v-model="signature" style="width: 650rpx;height: 200rpx;" placeholder="个性签名" maxlength = "45" />
			<view class="" style="text-align: right;">{{signature.length<45?signature.length:45}}/45</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view @click="updateUserInfo" class="hold" style="">
			保存
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				signature:''
			}
		},
		onLoad() {
			this.userinfo()
		},
		methods:{
			userinfo(){
				this.api.userinfo().then(res=>{
					console.log(res,'个人信息')
					this.signature=res.data.signature
				})
			},
			updateUserInfo: function(){
				var that = this
				if(that.utils.isNullOrEmpty(that.signature)){
					that.tui.toast('请输入个性签名')
					return
				}
				let sd=that.signature.indexOf('\\')  //输入\n 会自动换行 所以做这部操作
				if(sd=='-1'){
					this.api.editInfo({
						"nickname":'',
						"sex": '',
						"signature": this.signature,
						"avatar":''
					}).then(res=>{
						if(res.code===200){
							uni.$emit('getuser',{msg:'更新用户信息'})
							this.tui.toast('修改成功')
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							},500)
						}
					})
				}else{
					this.tui.toast('不允许输入非法字符')
				}
			}
		},
		onNavigationBarButtonTap() {
			if(this.signature.trim() == '' || this.signature == null){
				this.tui.toast('请输入个性签名')
				return
			}
			this.updateUserInfo()
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef MP-WEIXIN */
	.container .nav{
		width: 750rpx;
		height: 98rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 33rpx 0 30rpx;
		background-color: #FFFFFF;
	}
	.nav image{
		width: 16rpx;
		height: 28rpx;
	}
	.nav .back{
		margin-right: 263rpx;
	}
	.nav .title{
		font-size: 32rpx;
		font-weight: bold;
		line-height: 45rpx;
		color: #333333;
		margin-right: 219rpx;
	}
	.nav .save{
		font-size: 30rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: #FFC300;
	}
	/* #endif */
	.container{
		width: 750rpx;

		.header{
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #FFFFFF;
			margin-top: 26rpx;
			position: relative;
			margin: 26rpx 20rpx 20rpx 20rpx;
			border-radius: 10rpx;
			.icon{
				position: absolute;
				top: 36rpx;
				left: 683rpx;
				width: 38rpx;
				height: 38rpx;
				z-index: 999;
				image{
					width: 100%;
					height: 100%;
				}
			}

		}
	}
	.hold{
		width: 710rpx;
		height: 80rpx;
		background:#FFC300;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 8rpx;
		margin: 300rpx auto 0 auto;
	}
</style>

