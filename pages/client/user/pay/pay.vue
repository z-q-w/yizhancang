<template>
	<view class="container">
		<text class="price">￥{{totalpric}}</text>
		<view class="paymentMethodLists">
			<radio-group name="" @change="changeSelect">
				<label class="paymentMethodLists_item" v-for="(item,index) in colorList" :key="item.value" :label="item.value">
					<view class="" style="display: flex; align-items: center;">
						<image :src="item.icon" mode="" style="width: 50rpx; height: 50rpx; margin-right: 18rpx;"></image>
						<text>{{item.label}}</text>
					</view>
					<radio :value="item.value" :checked="color==item.value" color="#ffb300"  />
				</label>
			</radio-group>
		</view>
		<view class="btn" @click="awaypay">
			立即支付
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: '0',
				totalpric:'',//价钱
				orderId:'',//订单id
				colorList: [{
						label: '微信支付',
						value: '0',
						icon: 'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/E5EC114D61DB480B8556CD72563A3B2F77.png'
					},
					{
						label: '支付宝支付',
						value: '1',
						icon: 'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/4244DBD989D64A64AB0FE7AB33A4E12D78.png'
					},
					{
						label: '余额支付',
						value: '2',
						icon: 'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/CCC9BCF57B70434E90800C3728B5DB5Byue55.png'
					}
				],
			}
		},
		onLoad(option) {
			this.totalpric=option.totalpric
			this.orderId=option.orderId
		},
		methods:{
			changeSelect: function(e){
				this.color = e.detail.value 
			},
			awaypay(){
				if(this.color==0){
					var that=this
					this.api.orderPay({
					   "orderId": this.orderId, //订单id
					   "payType": 2, //支付方式 1 支付宝 2 微信 3 余额
					}).then(res=>{
					    uni.requestPayment({ 
					    	provider: 'wxpay',
					    	orderInfo:JSON.stringify(res.data), //微信、支付宝订单数据
					    	success(res) {
					    		that.tui.toast('支付成功')
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/client/mine/orderList/orderList'
									});
								},500)
					    	},fail(err) {
					    		console.log(err)
					    	}
					    });
					})
				}else if(this.color==1){
					var that=this
					this.api.orderPay({
					   "orderId": this.orderId, //订单id
					   "payType": 1, //支付方式 1 支付宝 2 微信 3 余额
					}).then(res=>{
					    uni.requestPayment({ 
					    	provider: 'alipay',
					    	orderInfo: res.data.body, //微信、支付宝订单数据
					    	success(res) {
					    		that.tui.toast('支付成功')
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/client/mine/orderList/orderList'
									});
								},500)
					    	},fail(err) {
					    		console.log(err)
					    	}
					    });
					})
				}else if(this.color==2){
					uni.showModal({
					    title: '提示',
					    content: '您确认支付该订单',
					    success:(res)=> {
					        if (res.confirm) {
					           this.api.orderPay({
								   "orderId": this.orderId, //订单id
								   "payType": 3, //支付方式 1 支付宝 2 微信 3 余额
							   }).then(res=>{
								   this.tui.toast('支付成功')
									setTimeout(()=>{
										uni.redirectTo({
										    url: '/pages/client/mine/orderList/orderList'
										});
									},500)
							   })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				uni.$emit('shoppingun',{msg:'购物车更新'})
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 750rpx;
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.container .price {
		font-size: 90rpx;
		color: #FF4600;
		line-height: 126rpx;
		font-weight: bold;
		margin-top: 170rpx;
		margin-left: 237rpx;
	}
	.paymentMethodLists{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 58rpx 0 64rpx;
		margin-top: 170rpx;
	}
	.paymentMethodLists_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 83rpx;
	}
	.btn{
		width: 580rpx;
		height: 88rpx;
		background: linear-gradient(180deg,#ffb300 0%, #fbc824 100%);
		border-radius: 8rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #333333;
		margin-left: 85rpx;
		margin-top: 245rpx;
	}
</style>
