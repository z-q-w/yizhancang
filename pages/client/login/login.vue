<template>
	<view class="container">
		<view class="header">
			<view :class="phoneorCode?'title active':'title'" style="margin-right: 76rpx;" @click="loginType(1)">
				<text>密码登录</text>
				<view></view>
			</view>
			<view :class="phoneorCode?'title':'title active'" @click="loginType(2)">
				<text>验证码登录</text>
				<view></view>
			</view>
		</view>
		<form @submit="" class="inpt">
			<input type="number" value="" v-model="form.phone" placeholder="请输入手机号"/>
			<view class="passd" style="display: flex;">
				<input type="text" style="width: 500rpx;" v-model="form.psd" password=true :placeholder="phoneorCode?'请输入密码':'请输入验证码'"/>
				<button v-if="!phoneorCode" :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'"  size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
			</view>
			<button form-type="submit" class="login" @click="loginbtn">登录</button>
		</form>
		<view class="operating">
			<view class="left">
				还没有账号?去<navigator url="./reg/reg" class="" class="reg" style="color: #ffc300;">注册</navigator>
			</view>
			<navigator url="./forget/forget" class="forget">忘记密码?</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phoneorCode:true,//true密码登录   false验证码登录
				form:{
					phone:'',//手机号
					psd:'',//密码
				},
				type: "primary",
				btnText:'获取验证码',
				disabled: false,
			}
		},
		onLoad(option){
			this.form.phone=option.account
		},
		methods:{
			btnSend(){//发送验证码
				if (!this.utils.isMobile(this.form.phone)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.messagesend({
						mobile:this.form.phone,
						type:'2' //1 用户注册 2 用户登录 3 修改密码  4 忘记密码
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
			loginType(res){ //选择密码。验证码登录
				if(res==1){
					this.phoneorCode=true
					this.form.psd=''
				}else{
					this.phoneorCode=false
					this.form.psd=''
				}
			},
			loginbtn(){
				if (!this.utils.isMobile(this.form.phone)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					if(this.phoneorCode){//true密码登录   false验证码登录
						this.api.login({
							account:this.form.phone, //手机号
							password:this.form.psd, //密码	
							clientId:''//各推
						}).then(res=>{
							this.tui.toast('登录成功')
							setTimeout(()=>{
								uni.reLaunch({
									url:"/pages/client/home/home"
								})
							},500)
							this.cacheHelper.setToken(res.data)
						})
					}else{
						this.api.loginCode({
							mobile:this.form.phone, //手机号
							code:this.form.psd, //验证码
							cid:''//各推
						}).then(res=>{
							this.tui.toast('登录成功')
							setTimeout(()=>{
								uni.reLaunch({
									url:"/pages/client/home/home"
								})
							},500)
							this.cacheHelper.setToken(res.data)
						})
					}
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
		margin-top: 206rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 46rpx;
	}
	.header .title{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.header .title text{
		font-size: 36rpx;
		font-weight: 400;
		color: #999999;
		line-height: 51rpx;
		margin-bottom: 14rpx;
	}
	.header .title view{
		width: 99rpx;
		height: 12rpx;
		border-radius: 6rpx;
	}
	.header .active text{
		font-size: 42rpx;
		font-weight: bold;
		line-height: 59rpx;
		color: #ffc300;
	}
	.header .active view{
		background-color: #ffc300;
	}
	.container .inpt{
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 59rpx;
		position: relative;
	}
	.inpt input{
		width: 690rpx;
		height: 106rpx;
		border-radius: 14rpx;
		background: rgba(245,245,245,.3);
		margin-bottom: 39rpx;
		box-sizing: border-box;
		padding-left: 35rpx;
	}
	.inpt .passd{
		position: relative;
	}
	.inpt .passd image{
		position: absolute;
		z-index: 999;
		top: 45rpx;
		right: 38rpx;
		width: 35rpx;
		height: 17rpx;
	}
	.inpt .passd .getcode{
		position: absolute;
		z-index: 999;
		top: 45rpx;
		right: 38rpx;
		color: #999999;
		font-size: 29rpx;
	}
	.inpt .login{
		position: absolute;
		bottom: -355rpx;
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
