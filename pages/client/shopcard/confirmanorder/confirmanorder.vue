<template>
	<view class="container">
		<view class="" @click="addaddress">
			<view class="header" v-if="defaultress.cityName==''">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/35CA801F590642DCBE010485CA64BA9074.png" mode="" class="add"></image>
				<text>添加收货地址</text>
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/E98C0FADC8254C59A60A1BCD5956BCB1124.png" mode="" class="arrows"></image>
			</view>
			<view v-else class="" style="background: #FFFFFF;display: flex;color: #666666;font-size: 28rpx; width: 710rpx;margin: 20rpx auto;padding: 30rpx;border-radius: 12rpx;box-sizing: border-box;">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/EA97149F49CE416C8AA35C072F1373F7dizhi2.png" style="width:50rpx;height: 50rpx;margin: auto 20rpx auto 0rpx;" mode=""></image>
				<view class="" style="flex: 1;">
					<text style="margin-right: 20rpx;font-size: 32rpx;color: #000000;">{{defaultress.consigneeUsername}}</text>
					<text style="font-size: 32rpx;color: #000000;">{{defaultress.consigneeMobile}}</text>
					<view class="">
						{{defaultress.provinceName}}{{defaultress.cityName}}{{defaultress.areasName}}{{defaultress.address}}
					</view>
				</view>
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/E98C0FADC8254C59A60A1BCD5956BCB1124.png" mode="" class="arrows" style="margin: auto 0;"></image>
			</view>
			
			<!-- defaultress -->
		</view>
		<view class="orderDetails">
			<view class="order_item" v-for="item in orderdata" v-if="isshopcard==1">
				<image :src="item.speImg" mode="" class="item_img"></image>
				<view class="item_msg">
					<text class="msg_name">{{item.goodsName}}</text>
					<text class="msg_specification">{{item.speName}}</text>
					<view class="msg_price">
						<text class="price">￥{{item.goodsPrice}}</text>
						<text class="count">×{{item.num}}</text>
					</view>
				</view>
			</view>
			<view class="order_item" v-if="isshopcard!=1">
				<image :src="orderdatasd.speImg" mode="" class="item_img"></image>
				<view class="item_msg">
					<text class="msg_name">{{orderdatasd.goodsName}}</text>
					<text class="msg_specification">{{orderdatasd.speName}}</text>
					<view class="msg_price">
						<text class="price">￥{{orderdatasd.goodsPrice}}</text>
						<text class="count">×{{orderdatasd.num}}</text>
					</view>
				</view>
			</view>
			<view class="freight">
				<text class="freight_title">运费</text>
				<text class="freight_msg">包邮</text>
			</view>
			<view class="subtotal">
				<text class="subtotal_title">小计</text>
				<text class="subtotal_total">￥{{subtotal}}</text>
			</view>
		</view>
		<view class="discountcoupon" @click="open" v-if="isbooking !=1">
			<text class="title">优惠券</text>
			<view class="item">
				<text class="price" v-if="couponpirc=='' && coupondata.length!=0">使用优惠劵</text>
				<text class="price" v-if="couponpirc!=''">-￥{{couponpirc}}</text>
				<text class="price" v-if="coupondata.length==0">您暂无优惠劵</text>
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/9BC3ED5EAF93487EA2996B47516B3E8C124.png" mode=""></image>
			</view>
		</view>
		<view class="sumbit">
			<text class="total">合计:￥{{subtotal - couponpirc}}</text>
			<button @click="submitorder" class="btn">提交订单</button>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="discount">
				<text class="title">选择优惠券</text>
				<scroll-view scroll-y="true" class="discountList" style="height: 739rpx;" >
					<view class="item" v-for="item in coupondata" @click="couponitem(item)">
						<view class="price">
							<text class="left">￥</text>
							<text class="right">{{item.favorablePrice}}</text>
						</view>
						<view class="item_msg">
							<text class="top">{{item.name}}</text>
							<text class="bottom">有效期至：{{item.endTime}}</text>
						</view>
						<text class="use">立即使用</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				orderdata:[],
				defaultress:{
					provinceName:"",
					cityName:'',
					areasName:'',
					address:''
				},//默认地址
				coupondata:'',
				couponpirc:'',
				isshopcard:'',//判断是从哪个页面进来的 //等于1已代表是购物车进来的
				idcard:[],//购物车id
				orderdatasd:{
					goodsPrice:'',
					num:''
				},
				subtotal:'',//小计
				specificationsId:'',//规格id
				quantity:'',//商品数量
				isGroup:'',//是否拼团
				groupId:'',//拼团id
				couponpircid:'',//优惠劵id
				isbooking:'',////isbooking是否为拼团如果是拼团就不显示优惠券 1 是拼团
			}
		},
		onLoad(option) {
			this.specificationsId=option.specificationsId
			this.quantity=option.quantity
			this.isGroup=option.isGroup
			this.isshopcard=option.isshopcard   //等于1已代表是购物车进来的
			this.idcard=option.idcard
			this.groupId=option.groupId
			this.isbooking=option.isbooking  //isbooking是否为拼团如果是拼团就不显示优惠券 1 是拼团
			this.settlement()
			this.addressdefault()
			uni.$on('selectress',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.defaultress=data.msg
			})
			
		},
		methods:{
			open(){
				this.$refs.popup.open()
			},
			addressdefault(){//获取用户默认地址
				this.api.addressdefault().then(res=>{
					console.log(res)
					this.defaultress=res.data
				})
			},
			couponitem(v){
				console.log(v)
				this.$refs.popup.close()
				this.couponpirc=v.favorablePrice
				this.couponpircid=v.id
			},
			availableCoupon(){ //查询可用的优惠券
				console.log('dddff')
				this.api.availableCoupon(
					this.subtotal.toString()
				).then(res=>{
					this.coupondata=res.data
					this.coupondata.forEach(item =>{
						item.endTime=item.endTime.slice(0,10)
					})
				})
			},
			//添加收货地址
			addaddress(){
				uni.navigateTo({
					url:"../../mine/shippingaddress/shippingaddress?aesstype=" + 1
				})
			},
			submitorder(){//提交订单按钮
				let totalpric=this.subtotal - this.couponpirc
				if(this.isshopcard==1){//多个下单  购物车
					this.api.createShopCartOrder({
						"ids":this.idcard.split(','),//购物车id
						"addressId": this.defaultress.id, //地址id
						"couponId": this.couponpircid //优惠券id
					}).then(res=>{
						uni.redirectTo({
							url:'/pages/client/user/pay/pay?totalpric=' + totalpric + '&orderId=' + res.data
						})
						uni.$emit('shoppingun',{msg:'购物车更新'})
					})
				}else{////单个下单  单个商品
					this.api.createOrder({
						"specificationsId":this.specificationsId, //规格id
						"quantity": this.quantity, //商品数量
						"isGroup": this.isGroup, //是否是拼团订单 1 否 2 是
						"groupId": this.groupId, //团id
						"addressId": this.defaultress.id, //地址id
						"couponId": this.couponpircid //优惠券id
					}).then(res=>{
						console.log(res.data)
						uni.redirectTo({
							url:'/pages/client/user/pay/pay?totalpric=' + totalpric + '&orderId=' + res.data
						})
					})
				}
			},
			settlement(){
				if(this.isshopcard==1){//多个商品详情  购物车
					this.api.shoppingCarsettlement({
						"ids":this.idcard.split(','),//购物车id
						"couponId": '' ,//优惠券id
					}).then(res=>{
						console.log(res)
						this.orderdata=res.data.goodsInfoVOS
						this.subtotal=res.data.price
						this.orderdata.forEach(value =>{
							value.goodsPrice=value.price
						})
						this.availableCoupon()
					}).catch((err) => {
						//如果报错500多数可能是因为库存  返回上一层并且更新购物车,这个就没法选中商品
						if(err.code==500){
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						} 
						uni.$emit('shoppingun',{msg:'购物车更新'})
					})
				}else{ //单个商品详情  单个商品
					this.api.settlement({
						"specificationsId": this.specificationsId, //规格id
						"quantity": this.quantity, //商品数量
						"isGroup": this.isGroup, //是否是拼团订单 1 否 2 是
						"groupId": '', //团id
						"couponId": '' //优惠券id
					}).then(res=>{
						this.orderdatasd=res.data
						this.subtotal=res.data.price
						this.availableCoupon()
					})
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 750rpx;
		min-height: 100%;
		box-sizing: border-box;
		padding: 0 20rpx;
	}

	.container .header {
		width: 710rpx;
		height: 168rpx;
		background-color: #FFFFFF;
		margin: 20rpx 0 18rpx 0;
		display: flex;
		align-items: center;
		border-radius: 12rpx;
	}

	.header .add {
		width: 44rpx;
		height: 44rpx;
		margin-left: 22rpx;
	}

	.header text {
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #666666;
		margin: 0 410rpx 0 30rpx;
	}

	.arrows {
		width: 8rpx;
		height: 16rpx;
	}

	.container .orderDetails {
		width: 710rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}

	.orderDetails .order_item {
		box-sizing: border-box;
		padding: 0 23rpx;
		display: flex;
		margin: 31rpx 0;
	}

	.order_item .item_img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.order_item .item_msg {
		display: flex;
		flex-direction: column;
	}

	.item_msg .msg_name {
		width: 484rpx;
		min-height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.item_msg .msg_specification{
		font-size: 22rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		margin-top: 8rpx;
	}
	.item_msg .msg_price{
		display: flex;
		align-items: center;
	}
	.msg_price .price{
		font-size: 28rpx;
		color: #FF4600;
		line-height: 30rpx;
		font-weight: 500;
		margin-right: 360rpx;
	}
	.msg_price .count{
		font-size: 22rpx;
		color: #212121;
	}
	.orderDetails .purchasequantity{
		border-top: 2rpx solid #F8F8F8;
		border-bottom: 2rpx solid #F8F8F8;
		height: 100rpx;
		display: flex;
		align-items: center;
		
	}
	.purchasequantity .title{
		font-size: 28rpx;
		color: #666666;
		font-weight: 400;
		margin: 0 384rpx 0 22rpx;
	}
	.purchasequantity .quantity{
		width: 68rpx;
		height: 40rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		text-align: center;
		line-height: 40rpx;
		/* color: #FFC300; */
		margin-right: 20rpx;
	}
	.purchasequantity .icon{
		width: 46rpx;
		height: 40rpx;
	}
	.orderDetails .freight{
		height: 100rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-between;
		padding: 0 32rpx 0 22rpx;
		border-bottom: 2rpx solid #F8F8F8;
	}
	.freight .freight_title{
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #666666;
	}
	.freight .freight_msg{
		font-size: 28rpx;
		font-weight: 400;
		color: #212121;
	}
	.orderDetails .subtotal{
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 32rpx 0 22rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F8F8F8;
		justify-content: space-between;
	}
	.subtotal .subtotal_title{
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #666666;
	}
	.subtotal .subtotal_total{
		font-size: 28rpx;
		font-weight: 400;
		color: #ff4600;
	}
	.container .discountcoupon{
		height: 100rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		margin-top: 32rpx;
		box-sizing: border-box;
		padding: 0 32rpx 0 22rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.discountcoupon .title{
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #666666;
	}
	.discountcoupon .item{
		display: flex;
		align-items: center;
	}
	.discountcoupon .item .price{
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #FF4600;
		margin-right: 20rpx;
	}
	.discountcoupon .item image{
		width: 8rpx;
		height: 16rpx;
	}
	.container .sumbit{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: #FFFFFF;
	}
	.sumbit .total{
		font-size: 30rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: #333333;
		margin-right: 60rpx;
	}
	.sumbit .btn{
		width: 236rpx;
		height: 100rpx;
		background-color: #FFC300;
		text-align: center;
		line-height: 100rpx;
		font-size: 36rpx;
		font-weight: 400;
		color: #333333;
		border-radius: 0;
		margin: 0;
	}
	.discount{
		width: 750rpx;
		height: 835rpx;
		background-color: #FFFFFF;

	}
	.discount .title{
		display: block;
		width: 750rpx;
		font-size: 36rpx;
		color: #333333;
		font-weight: bold;
		height: 94rpx;
		border-bottom: 2rpx solid #F8F8F8;
		text-align: center;
		line-height: 94rpx;
	}
	.discount .item{
		width: 670rpx;
		height: 196rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/A5A96FFCAEB740B2B4187733FCA3D2B275.png)  no-repeat;
		background-size: 100% 100%;
		margin-left: 40rpx;
		margin-top: 42rpx;
		display: flex;
		align-items: center;
		position: relative;
	}
	.discount .item .price{
		height: 133rpx;
		width: 220rpx;
		display: flex;
		text-align: center;
		justify-content: center;
	}
	.discount .item .price .left{
		font-size: 40rpx;
		color: #ffc300;
		font-weight: bold;
	}
	.discount .item .price .right{
		font-size: 80rpx;
		color: #FFC300;
		font-weight: bold;
	}
	.discount .item .item_msg{
		display: flex;
		flex-direction: column;
		height: 70rpx;
		border-left: 1rpx solid #8e6954;
		padding-left: 30rpx;
	}
	.discount .item .item_msg .top{
		font-size: 26rpx;
		font-weight: 400;
		color: #140005;
		margin-bottom: 10rpx;
	}
	.discount .item .item_msg .bottom{
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
	}
	.discount .item .use{
		font-size: 26rpx;
		color: #333333;
		font-weight: 400;
		writing-mode: vertical-rl;
		line-height: 37rpx;
		right: 35rpx;
		position: absolute;
		top: 34rpx;
	}
</style>
