<template>
	<view class="container"> 
		<view class="header">
			<input type="number" v-model="account" value="" placeholder="请输入手机号"/>
			<view style="display: flex;box-sizing: border-box;width: 700rpx;">
				<input type="text"  style="flex: 1;" v-model="validateCode" placeholder="请输入验证码"/>
				<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'"  size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
			</view>
			<view class="psd">
				<input type="text" v-model="password" placeholder="请输入新密码" password=true/>
			</view>
		</view>
		<view class="btn" @click="conserve">保存</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				iseyes:true,

				btnText:'获取验证码',
				type: "primary",
				disabled: false,
				account:'',
				validateCode:'',
				password:''
			}
		},
		methods:{
			btnSend(){//发送验证码
				if (!this.utils.isMobile(this.account)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.messagesend({
						mobile:this.account,
						type:'3' //1 1 用户注册 2 用户登录 3 修改密码  4 忘记密码
					}).then(res=>{
						this.tui.toast(res.data)
						this.disabled = true;
						this.btnText = "请稍候...";
						this.type = "gray"
						setTimeout(() => {
							this.doLoop(60)
						}, 500)
					})
				}
			},
			doLoop: function(seconds) {
				seconds = seconds ? seconds : 60;
				this.btnText = seconds + "s后获取";
				let countdown = setInterval(() => {
					if (seconds > 0) {
						this.btnText = seconds + "s后获取"
							--seconds;
					} else {
						this.btnText = "获取验证码";
						this.disabled = false;
						this.type = "primary";
						clearInterval(countdown);
					}
				}, 1000);
			},
			conserve(){
				this.api.editPwd({
					"mobile":this.account,
					"pwd":this.password,
					"code":this.validateCode
				}).then(res=>{
					this.tui.toast('修改成功')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
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
	}
	.header{
		margin-top: 15rpx;
		background-color: #FFFFFF;
	}
	.header input{
		height: 97rpx;
		width: 750rpx;
		box-sizing: border-box;
		padding: 0 20rpx 0 30rpx;
		border-bottom: 1rpx solid #f2f4f8;
	}
	.header .code{
		position: relative;
	}
	.code .getcode{
		position: absolute;
		width: 188rpx;
		height: 67rpx;
		background-color: #FFFFFF;
		box-shadow: 0rpx 3rpx 6rpx rgba(0,0,0,.16);
		border-radius: 20rpx;
		right: 20rpx;
		top: 18rpx;
		font-size: 30rpx;
		line-height: 67rpx;
		text-align: center;
		font-weight: 400;
		color: #666666;
	}
	.header .psd{
		position: relative;
	}
	.psd image{
		width: 31rpx;
		height: 15rpx;
		position: absolute;
		top: 39rpx;
		right: 26rpx;
	}
	.btn{
		width: 676rpx;
		height: 90rpx;
		background: linear-gradient(90deg, #FFB300 0%, #FBC824 100%);
		border-radius: 21px;
		margin-left: 40rpx;
		margin-top: 459rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}
	.getyaz{
		font-size:22rpx;
		line-height:50rpx;
		border-radius: 40rpx;
		border: 1px solid #CCCCCC !important;
		color: #CCCCCC !important;
		height: 50rpx;
		margin-top: 26rpx;
	}
	.buggetyaz{
		font-size:22rpx;
		line-height:50rpx;
		border-radius: 40rpx;
		border: 1px solid #F27F31 !important;
		color: #F27F31 !important;
		height: 50rpx;
		margin-top: 26rpx;
	}
</style>
