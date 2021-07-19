<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="header">
			<navigator url="" open-type="navigateBack">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/892BA3C4B2644DA5846381F401E126F2131.png" mode=""></image>
			</navigator>
			<text class="title">金额提现</text>
			<text class="record" @click="txrecord">提现记录</text>
		</view>
		<!-- #endif -->
		<view class="white_blo">
			<view class="with_title" style="font-weight: 600;margin-top: 40rpx;font-size: 32rpx;">输入提现金额</view>
			<input @input='trigger' style="border-bottom: 1rpx solid #f4f4f4;" type="number"  placeholder="0" v-model="money"/>
			<view class="" style="color: #999;font-size: 30rpx;">
				当前余额{{moneyds}}, 
				<text style="margin-left: 15rpx;color: #6b6e8f;" @click="alltixian">全部提现</text>
				<text style="float: right;">费率 {{dictValue}}%</text>
			</view>
		</view>
		<view style="height: 18rpx;"></view>
		<view class="white_blo">
			<view class="with_title" style="font-weight: 600;font-size: 32rpx;">提现账户</view>
			<view style="display: flex;justify-content: space-between;" @click="chooseMore">
				<view style="display: flex;" v-if="Withdrawalways">
					<image :src="Withdrawalways.logo" class="account_image"></image>
					<view class="account_name">{{Withdrawalways.name}}</view>
				</view>
				<view class="" v-if="!Withdrawalways">
					暂无账户，点击添加
				</view>
				<view class="iconfont you">&#xe621;</view>
			</view>
		</view>
		<view class="action_btn" style="margin-top: 250rpx;background-color: #FFC300;" @click="Toconfirmwithdrawal">确认提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				Withdrawalways:null,
				source:null,
				moneyds:'',
				dictValue:'',//费率
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if(e.index == 0){
				uni.navigateTo({
					url: '/pages/client/withdrawal/withrecords/withrecords'
				})
			}
		},
		onLoad(options) {
			this.source=options.type
			this.moneyds=options.money
			if(options.type==1||options.type==2){
				this.type=1
			}
			this.Withdrawalway()
			uni.$on("Listupdate",res=>{
				this.Withdrawalways=null
				this.Withdrawalway()
			})
			uni.$on('Selectaccount',res=>{
				this.Withdrawalways=res.msg
			})
			this.tDictfineOne()
		},
		
		methods: {
			chooseMore: function(){
				uni.navigateTo({
					url: `/pages/client/withdrawal/withaccount/withaccount?type=${this.type}`
				})
			},
			tDictfineOne(){
				this.api.tDictfineOne(
					JSON.stringify('WITHDRAWAL_COMM')
				).then(res=>{
					this.dictValue=res.data.dictValue
				})
			},
			alltixian(){
				this.money=this.moneyds
			},
			trigger(e){
				console.log(e.detail.value,this.moneyds)
				if(e.detail.value>this.moneyds){
					this.tui.toast('余额不足,当前余额为' + this.moneyds)
				}
			},
			txrecord(){
				uni.navigateTo({
					url: '/pages/client/withdrawal/withrecords/withrecords'
				})
			},
			//查询用户提现方式
			Withdrawalway(){
				this.api.userWithdrawalWaylist().then(res=>{
					if(res.code===200){
						if(res.data.length&&res.data.every(ress=>ress.isDefault==1)){
							this.Withdrawalways=res.data[0]
						}else{
							res.data.forEach(ress=>{
								if(ress.isDefault==2){
									this.Withdrawalways=ress
								}
							})
						}
					}
				})
			},
			Toconfirmwithdrawal(){ //提现
				if(this.money=='0'){
					this.tui.toast('请输入提现金额')
				}else if(parseFloat(this.money)%1==0?false:true){
					this.tui.toast('提现金额必须为整数')
				}else if(!this.Withdrawalways){
					this.tui.toast('请选择提现方式')
				}else{
					let params ={
						amount:parseFloat(this.money),/*金额 必填*/
						userWWayId:this.Withdrawalways.id,/*提现方式 必填*/
						remark:"",/*备注 非必填*/
					}
					this.api.withdrawalapply(params).then(res=>{
						if(res.code==200){
							this.tui.toast('提现成功待审核')
							setTimeout(()=>{
								uni.redirectTo({
									url:'/pages/client/withdrawal/withrecords/withrecords'
								})
							},500)
							uni.$emit("balance",{
								msg:'余额更新'
							})
						}
					})
				}
			}
		},
		
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background-color: #F2F4F8;
	}
	/* #ifdef MP-WEIXIN */
	.header{
		width: 750rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding-top: 128rpx;
	}
	.header image{
		width: 17rpx;
		height: 31rpx;
		margin-left: 30rpx;
	}
	.header .title{
		font-size: 36rpx;
		font-weight: bold;
		line-height: 50rpx;
		color: #333333;
		opacity: 0.89;
		margin: 0 144rpx 0 256rpx;
	}
	.header .record{
		font-size: 32rpx;
		font-weight: 400;
		line-height: 45rpx;
		color: #333333;
		opacity: 0.89;
	}
	/* #endif */
	
	.white_blo{
		border-top: 0.5rpx solid #f0f0f0;
		padding: 30rpx;
		background-color: #fff;
	}
	.with_title{
		font-size: 29rpx;
		color: #333;
		margin-bottom: 25rpx;
	}
	input{
		height: 93rpx;
		font-size: 73rpx;
		color: #333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.account_image{
		width: 50rpx;
		height: 50rpx;
		border-radius: 5rpx;
		margin-right: 20rpx;
	}
	.you{
		font-size: 38rpx;
	}
	.action_btn{
		width: 690rpx;
		height: 91rpx;
		background: linear-gradient(180deg, #FFB300 0%, #FBC824 100%);
		opacity: 1;
		border-radius: 10rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 91rpx;
		color: #FFFFFF;
	}
</style>
