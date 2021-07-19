<template>
	<view class="container">
		<view class="header">
			<view class="top box" style="display: flex;">
				<text>快递公司</text>
				<view style="display: flex;flex: 1;">
					<input v-if="restsshow"  type="text" v-model="couriername" style="flex: 1;margin-left: 30rpx" placeholder="填写快递公司" />
					<text v-else @click="open" style="margin-left: 30rpx;flex: 1;">{{couriername==''?'选择快递公司':couriername}}</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/8B7D01EDCAA446FCBC261E7F53930EDC124.png" mode=""></image>
				</view>
			</view>
			<view class="bottom box">
				<text>快递单号</text>
				<input type="text" v-model="numbered" placeholder="填写快递单号" />
			</view>
		</view>
		<view class="present" @click="submitbtn">
			提交
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="company">
				<text class="title">快递公司</text>
				<scroll-view scroll-y="true" class="listbox">
					<view class="listboxitem" v-for="(item,index) in expressage" @tap="switchover(item,index)">
						<text>{{item.name}}</text>
					</view>
					<view class="listboxitem" @click="rests">
						其他快递公司
					</view>
				</scroll-view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couriername: '',
				num: 1,
				types:'COURIER_COMPANY',
				expressage: [],
				restsshow:false,
				orderdetalis:'',
				numbered:''
			}
		},
		onLoad(option) {
			this.orderdetalis=option.orderdetalis
			this.fineListtDict()
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			submitbtn(){
				if(this.couriername==''){
					this.tui.toast('请选快递公司')
				}else if(this.numbered==''){
					this.tui.toast('请输入快递单号')
				}else{
					this.api.fillBill({
						"orderId":this.orderdetalis,
						"logistics":this.couriername,
						"courierId":this.numbered
					}).then(res=>{
						this.tui.toast('提交成功')
						setTimeout(()=>{
							uni.redirectTo({
							    url: '/pages/client/mine/orderList/orderdetails/aftersale/reimburseresult'
							});
						},500)
						uni.$emit('orderupdata',{msg:'更新订单'})
					})
				}
				
			},
			fineListtDict(){
				this.api.fineListtDict(
					JSON.stringify(this.types)
				).then(res=>{
					this.expressage=res.data
				})
			},
			rests(){
				this.restsshow=true
				this.couriername=''
				this.$refs.popup.close()
			},
			switchover(item,index) {
				console.log(index)
				this.couriername =item.name
				this.num=index
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 750rpx;
		min-height: 100%;
	}
	.present{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 89rpx;
		background: linear-gradient(180deg, #FFB300 0%, #FBC824 100%);
		opacity: 1;
		line-height: 89rpx;
		text-align: center;
	}
	.header {
		width: 710rpx;
		height: 204rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		margin: 30rpx 0 0 20rpx;
	}

	.header view {
		height: 100rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 28rpx 0 22rpx;
	}

	.header .box text {
		font-size: 32rpx;
		color: #333333;
		font-weight: 400;
	}

	.top {
		justify-content: space-between;
		border-bottom: 2rpx solid #F5F5F5;
	}

	.top image {
		width: 8rpx;
		height: 16rpx;
	}

	.bottom input {
		width: 80%;
		box-sizing: border-box;
		padding-left: 50rpx;
	}

	.company {
		background-color: #FFFFFF;
		border-radius: 24rpx 24rpx 0 0;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.company .title {
		font-size: 36rpx;
		font-weight: 400;
		line-height: 50rpx;
		color: #333333;
		margin: 30rpx 0 42rpx 303rpx;
	}

	.company .list {
		width: 100%;
		height: 578rpx;
	}
	.listbox{
		width: 100%;
		height: 508rpx;
	}
	.listboxitem{
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #F5F5F5;
		height: 110rpx;
		width: 100%; 
		align-items: center;
		box-sizing: border-box;
		padding-left: 40rpx;
	}
	.listboxitem text{
		font-size: 36rpx;
		color: #333333;
		font-weight: 400;
	}
</style>
