<template>
	<view class="container">
		<view class="header">
			<view class="photo list" @tap="headimgBtn">
				<text class="title">头像</text>
				<view class="" style="display: flex; align-items: center;">
					<image :src="userinfox.avatar" mode="" class="icon"></image>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1E72D1CA56C74D4FB086DC2A4DE5C928124.png" mode="" class="right"></image>
				</view>
			</view>
			<navigator open-type="navigate" url="changenickname/changenickname" class="list name">
				<text class="title">昵称</text>
				<view class="msg">
					<text>{{nickname}}</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1E72D1CA56C74D4FB086DC2A4DE5C928124.png" mode=""></image>
				</view>
			</navigator>
			<navigator open-type="navigate" url="personalsignature/personalsignature" class="list signature">
				<text class="title">个性签名</text>
				<view class="msg">
					<text >{{signature}}</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1E72D1CA56C74D4FB086DC2A4DE5C928124.png" mode=""></image>
				</view>
			</navigator>
		</view>
		<view class="quit" @click="quitlogin"> 
			退出登录   
		</view> 
	</view>
</template>

<script>
	import urlConfig from '../../../../common/api/config.js'
	export default{
		data(){
			return{
				userinfox:'',
				signature:'',
				nickname:'',
			}
		},
		onShow() {
			this.userinfo()
		},
		methods:{
			userinfo(){
				this.api.userinfo().then(res=>{
					console.log(res,'个人信息')
					this.userinfox=res.data
					this.signature=res.data.signature.replace(/\\n/g, '')
					this.nickname=res.data.nickname.replace(/\\n/g, '')
					console.log(this.signature)
				})
			},
			quitlogin(){
				uni.showModal({
				    title: '提示',
				    content: '您确定退出吗',
				    success:(res)=> {
				        if (res.confirm) {
							this.cacheHelper.setToken('');
				            uni.redirectTo({
				            	url:'/pages/client/login/login'
				            })
							uni.$emit('quitlogin',{msg:'退出登录'})
				        }
				    }
				});
			},
			headimgBtn: function(){//上传图片
			    var that = this
			    const accessToken = that.cacheHelper.getToken();
			    uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success (res) {
						console.log(res)
						var tempFilePaths = res.tempFilePaths;
						console.log(res.tempFilePaths)
						uni.uploadFile({
							url: urlConfig+ 'api/upload/uploads', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'token': accessToken
							},
							success: function success(res) {
								console.log(res)
								var newImg = JSON.parse(res.data);
								console.log(newImg.data.msg)
								if(res.statusCode == 200){
									that.imgList=newImg.data.msg
									console.log(that.imgList)
									that.api.editInfo({
										"nickname": "",
										"sex": "",
										"signature": "",
										"avatar":that.imgList
									}).then(res=>{
										that.tui.toast('更换成功')
										that.userinfo()
										uni.$emit('getuser',{msg:'更新用户信息'})
									})
								}
							},
						   fail: function fail(err) {
								console.log(err);
						   }
						});
						console.log(res)
					 }
			    });
			},
		},
		
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height: 100%;
	}
	.header{
		width: 100%;
		background-color: #FFFFFF;
	}
	.header .list{
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		border-top: 1rpx solid #F8F8F8;
	}
	.list .title{
		font-size: 30rpx;
		color: #999999;
		font-weight: 400rpx;
	}
	.header .photo{
		height: 132rpx;
	}
	.photo view{
		display: flex;
		align-items: center;
	}
	.photo view .icon{
		width: 72rpx;
		height: 72rpx;
		margin-right: 17rpx;
		border-radius: 100%;
	}
	.photo view .right{
		width: 15rpx;
		height: 28rpx;
	}
	.name{
		height: 92rpx;
	}
	.signature{
		height: 107rpx;
	}
	.msg{
		display: flex;
		align-items: center;
	}
	.msg text{
		font-size: 30rpx;
		color: #333333;
		font-weight: 400;
		margin-right: 17rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 400rpx;
		text-align: right;
	}
	.msg image{
		width: 15rpx;
		height: 28rpx;
	}
	.quit{
		width: 750rpx;
		height: 88rpx;
		background-color: #FFFFFF;
		line-height: 88rpx;
		margin-top: 106rpx;
		text-align: center;
		font-size: 30rpx;
		color: #333333;
		font-weight: 400;
	}
</style>
