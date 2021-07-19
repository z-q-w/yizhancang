<template>
	<view class="container">
		<view class="header">
			<view></view>
			注册账号
		</view>
		<form @submit="" class="inpt">
			<input type="text" v-model="account" value="" placeholder="请输入手机号" />
			<view style="display: flex;box-sizing: border-box;width: 700rpx;">
				<input type="text" style="flex: 1;" v-model="validateCode" placeholder="请输入验证码"/>
				<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'"  size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
			</view>
			<view class="psd">
				<input type="text" v-model="password" password=true placeholder="请输入密码" />
			</view>
			<view class="psd">
				<input type="text" v-model="surePassword" password=true placeholder="请再次输入密码" />
			</view>
			<button form-type="submit" class="inreg" @click="signin" >注册</button>
		</form>
		<view class="operating">
			<view class="left">
				已有账号?去<navigator url="../login" class="" class="reg" style="color: #ffc300;">登录</navigator>
			</view>
			<navigator url="../forget/forget" class="forget">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				disabled: false,
				type: "primary",
				account:'',//手机号
				password:'',//密码
				surePassword:'',//确认密码
				btnText:'获取验证码',
				validateCode:'',//验证码
				refereeCode:'',//邀请码
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
						type:'1' //1 1 用户注册 2 用户登录 3 修改密码  4 忘记密码
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
			signin(){//注册
				if (!this.utils.isMobile(this.account)) {
					this.tui.toast('请输入正确的手机号码');
				}else if(this.password.length<6){
					this.tui.toast('密码不能小于6位数');
				}else{
					this.api.register({
						account:this.account,//手机号
						password:this.password,//密码
						surePassword:this.surePassword,//确认密码
						validateCode:this.validateCode,//验证码
						refereeCode:uni.getStorageSync('inviteeCode')
					}).then(res=>{
						this.tui.toast('注册成功')
						setTimeout(()=>{
							uni.reLaunch({
								url:"/pages/client/login/login?account=" + this.account
							})
						},500)
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
		background-color: #FFFFFF;
	}
	.container .header{
		margin-top: 210rpx;
		font-size: 42rpx;
		color: #333333;
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	.header view{
		width: 6rpx;
		height: 50rpx;
		background-color: #FFC300;
		border-radius: 5rpx;
		margin-right: 16rpx;
	}
	.container .inpt{
		width: 100%;
		margin-top: 79rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	.inpt input{
		width: 690rpx;
		height: 106rpx;
		background: rgba(245,245,245,.3);
		border-radius: 14rpx;
		box-sizing: border-box;
		padding-left: 35rpx;
		margin-bottom: 30rpx;
	}
	.inpt .psd{
		position: relative;
	}
	.psd image{
		position: absolute;
		z-index: 999;
		top: 45rpx;
		right: 38rpx;
		width: 35rpx;
		height: 17rpx;
	}
	.inpt .inreg{
		position: absolute;
		bottom: -177rpx;
		left: 35rpx;
		background-color: #ffc300;
		width: 670rpx;
		height: 86rpx;
		border-radius: 13rpx;
		font-size: 31rpx;
		font-weight: 400;
		color: #333333;
	}
	
	
	
	
	.container .operating{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
		box-sizing: border-box;
		padding: 0 21rpx 0 23rpx;
	}
	.operating .left{
		font-size: 25rpx;
		color: #999999;
		font-weight: 400;
		line-height: 36rpx;
		display: flex;
		flex-direction: row;
	}
	.operating .forget{
		font-size: 25rpx;
		line-height: 36rpx;
		color: #FFC300;
		font-weight: 400;
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
