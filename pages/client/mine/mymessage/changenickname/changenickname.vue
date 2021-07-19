<template>
	<view class="container">
		<view class="header">
			<input type="text" maxlength='12' v-model="nickname" placeholder="用户昵称" />
			<view class="icon" v-show="userinfo" @click="eliminate">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/C8353BF74661414089BF3A8BAC57230C89.png" mode=""></image>
			</view>
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
				nickname:"",
			}
		},
		onLoad() {
			this.userinfo()
		},
		methods:{
			eliminate(){
				this.nickname = ''
			},
			userinfo(){
				this.api.userinfo().then(res=>{
					console.log(res,'个人信息')
					this.nickname=res.data.nickname
				})
			},
			updateUserInfo: function(){
				var that = this
				if(that.utils.isNullOrEmpty(that.nickname)){
					that.tui.toast('请输入昵称')
					return
				}
				let sd=that.nickname.indexOf('\\')  //输入\n 会自动换行 所以做这部操作
				if(sd=='-1'){
					this.api.editInfo({
						"nickname":this.nickname,
						"sex": "",
						"signature": "",
						"avatar":''
					}).then(res=>{
						if(res.code===200){
							this.tui.toast('修改成功')
							uni.$emit('getuser',{msg:'更新用户信息'})
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								})
							},1000)
						}
					})
				}else{
					this.tui.toast('不允许输入非法字符')
				}
				
			}
		},
		onNavigationBarButtonTap() {
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
			padding: 0 30rpx;
			background-color: #FFFFFF;
			margin-top: 26rpx;
			position: relative;
			input{
				height: 106rpx;
				line-height: 106rpx;
			}
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
