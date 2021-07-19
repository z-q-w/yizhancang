<template>
	<view class="container">
		<view class="header">
			<view class="state">
				<view class="state_msg" style="display: flex; flex-direction: column;">
					<text class="top-type" v-if="orderdetaldata.orderStatus==1">等待买家付款</text>
					<text style="font-size: 28rpx;" v-if="orderdetaldata.orderStatus==1">30分钟后自动关闭</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==2">等待卖家发货</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==3">等待买家收货</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==4">等待买家评价</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==9">正在拼团中</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==6">订单已取消</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==5">交易成功</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==25">退款成功</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==21">申请退货中,等待商家处理</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==22">已同意退货,去填写快递单号</text>
					<text class="top-type" v-if="orderdetaldata.orderStatus==23">商家拒绝退货</text>
					<text style="font-size: 28rpx;" v-if="orderdetaldata.orderStatus==23">{{orderdetaldata.refuseReason}}</text>
				</view>
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/FAE07001D85042AAA8C4D6B9930978F895.png" mode=""></image>
			</view>
			<view class="msg">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/0EFA5EC8055E422E94345AE01F38FBCD98.png" mode=""></image>
				<view class="msg_address">
					<view class="msg_name">
						<text class="name">{{orderdetaldata.consigneeUsername}}</text>
						<text class="phone">{{orderdetaldata.consigneeMobile}}</text>
					</view>
					<view class="address">
						<text>{{orderdetaldata.province}}{{orderdetaldata.city}}{{orderdetaldata.area}}{{orderdetaldata.address}}</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="" style="height: 90rpx;width: 20rpx;"></view>
		<view v-if="orderdetaldata.orderStatus==3" style="display: flex;margin:0rpx 20rpx 20rpx 20rpx;background: #FFFFFF;padding: 30rpx;border-radius: 12rpx;">
			<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/D74FCBAD645941639414024D26463B7B687d181a543ae936b49e3e03d812edb.png" mode="" style="width: 60rpx;height: 46rpx;margin: auto 20rpx auto 0;"></image>
			<view class="">
				<view class="" style="font-size: 30rpx;">{{orderdetaldata.comLogistics}}</view>
				<view class="" style="font-size: 26rpx;color: #666666;margin-top: 5rpx;">
					快递单号:{{orderdetaldata.comCourierId}}
					<text @click="copybtn" class="copystyle" style="">复制</text>
				</view>
			</view>
		</view>
		<view class="commodity">
			<view class="order_item" v-for="item in orderdetaldata.goodsList">
				<image :src="item.thumbnails" mode="" class="item_img"></image>
				<view class="item_msg">
					<text class="msg_name">{{item.goodsName}}</text>
					<text class="msg_specification">{{item.speName}}</text>
					<view class="msg_price">
						<text class="price">￥{{item.price}}</text>
						<text class="count">×{{item.quantity}}</text>
					</view>
				</view>
			</view>

			<view class="total list">
				<text class="left">商品总价</text>
				<text class="right">¥{{orderdetaldata.orderPrice}}</text>
			</view>
			<view class="freight list">
				<text class="left">运费</text>
				<text class="right">¥0</text>
			</view>
			<view class="discountsCount list">
				<text class="left">优惠金额</text>
				<text class="right">¥{{orderdetaldata.discountPrice}}</text>
			</view>
			<view class="pay list">
				<text class="left">金额</text>
				<text class="active right">¥{{orderdetaldata.payPrice}}</text>
			</view>
		</view>
		<view class="orderDetails">
			<text class="title">订单信息</text>
			<view class="order_msg">
				<text class="left">订单编号</text>
				<text class="right">{{orderdetaldata.orderNo}}</text>
			</view>
			<view class="order_msg">
				<text class="left">下单时间</text>
				<text class="right">{{orderdetaldata.createTime}}</text>
			</view>
			<view class="order_msg" v-if="orderdetaldata.payType!=''">
				<text class="left">支付方式</text>
				<text v-if="orderdetaldata.payType==1" class="right">支付宝</text>
				<text v-if="orderdetaldata.payType==2" class="right">微信</text>
				<text v-if="orderdetaldata.payType==3" class="right">余额</text>
			</view>
		</view>
		<view class="btn" v-if="orderdetaldata.orderStatus!=6">
			<view class="" style="flex: 1;"></view>
			<text @click="orderbtn(1)" v-if="orderdetaldata.orderStatus==1" class="cancel">取消订单</text>
			<text @click="orderbtn(2)" v-if="orderdetaldata.orderStatus==1" class="affirm">确认支付</text>
			<text @click="orderbtn(5)" v-if="orderdetaldata.orderStatus==2" class="affirm">申请退款</text>
			<text  v-if="orderdetaldata.orderStatus==5" class="affirm">已完成</text>
			<text @click="orderbtn(6)" v-if="orderdetaldata.orderStatus==3 || orderdetaldata.orderStatus==23" class="affirm">申请售后</text>
			<text @click="orderbtn(3)" v-if="orderdetaldata.orderStatus==3 || orderdetaldata.orderStatus==23" class="affirm">确认收货</text>
			<text @click="orderbtn(4)" v-if="orderdetaldata.orderStatus==4" class="affirm">立即评价</text>
			<text v-if="orderdetaldata.orderStatus==25" class="affirm">退款成功</text>
			<text @click="orderbtn(7)" v-if="orderdetaldata.orderStatus==21 || orderdetaldata.orderStatus==22" class="affirm">退款详情</text>
		</view>
		<uni-popup ref="popupdata" type="bottom">
			<view class="causeList">
				<text class="title">退款原因</text>
				<image @click="cancelbtn" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/50265EE0F6754792A6A9758367B741B8101.png" class="cancel" mode=""></image>
				<scroll-view scroll-y="true" class="list">
					<view class="item" v-for="(item,index) in cause" :key="index" @tap="reasontochoose(item,index)">
						<text>{{item.name}}</text>
						<image :src="num==index?'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/9E312CD1EAA24DE39934F3A015D67299102.png':'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/88BA414275CC422B8B11BDC87C6C84B4103.png'" mode=""></image>
					</view>
				</scroll-view>
			</view>
			<view class="tuikuan" @tap="refund">
				确定退款
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:-1,
				orderdetaldata:'',//订单详情
				orderdetalis:"",//订单id
				cause:'',
				reason:"USER_CANCEL_REASON",
				condition:'',//退款原因
			}
		},
		onLoad(option) {
			this.orderdetalis=option.orderdetalis
			this.orderdetail()
			this.fineListtDict()
			uni.$on('orderupdata',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.orderdetail()
			})
		},
		methods:{
			orderdetail(){ //详情
				this.api.orderdetail(
					this.orderdetalis.toString()
				).then(res=>{
					console.log(res)
					this.orderdetaldata=res.data
				})
			},
			reasontochoose(item,index){ //每个退款原因的点击事件
				this.num=index
				this.condition=item.name
			},
			copybtn(){
				uni.setClipboardData({
					data:this.orderdetaldata.comCourierId
				});
			},
			refund(){//确认退款
				this.api.applyRefund({
					"orderId":this.orderdetalis,
					"reason":this.condition
				}).then(res=>{
					this.tui.toast('退款成功')
					this.$refs.popupdata.close()
					uni.$emit('orderupdata',{msg:'更新订单'})
				})
			},
			fineListtDict(){ //退款原因
				this.api.fineListtDict(
					JSON.stringify(this.reason)
				).then(res=>{
					this.cause=res.data
				})
			},
			cancelbtn(){
				this.$refs.popupdata.close()
			},
			orderbtn(v){
				if(v==1){//取消订单
					uni.showModal({
					    title: '提示',
					    content: '您确定取消订单',
					    success:(res)=> {
					        if (res.confirm) {
					            this.api.cancelOrder(  //取消订单接口
									this.orderdetalis.toString()
								).then(res=>{
									this.tui.toast('取消订单成功')
									uni.$emit('orderupdata',{msg:'更新订单'})
								})
					        }
					    }
					});
				}else if(v==2){//确认支付
					uni.navigateTo({
						url:'/pages/client/user/pay/pay?totalpric=' + this.orderdetaldata.payPrice + '&orderId=' + this.orderdetalis
					})
				}else if(v==3){//确认收货
					uni.showModal({
					    title: '提示',
					    content: '您确定收货',
					    success:(res)=> {
					        if (res.confirm) {
					            this.api.customerReceive( // //确认收货接口
									this.orderdetalis.toString()
								).then(res=>{
									this.tui.toast('收货成功')
									uni.$emit('orderupdata',{msg:'更新订单'})
								})
					        }
					    }
					});
				}else if(v==4){//立即评价
					uni.navigateTo({
						url:"/pages/client/mine/orderList/orderdetails/evaluate/evaluate?orderdetalis=" + this.orderdetalis
					})
				}else if(v==5){//申请退款
					this.$refs.popupdata.open()
				}else if(v==6){//售后
					uni.navigateTo({
						url:"/pages/client/mine/orderList/orderdetails/aftersale/aftersale?orderdetalis=" + this.orderdetalis
					})
				}else if(v==7){
					uni.navigateTo({
						url:'/pages/client/mine/orderList/orderdetails/aftersale/detailsoftherefund/detailsoftherefund?orderdetalis=' + this.orderdetalis
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
		padding-bottom: 130rpx;
	}
	.header{
		width: 750rpx;
		height: 260rpx;
		border-radius: 24rpx 24rpx 0 0;
		background: linear-gradient(310deg,#ffb300 0%,#fbc824 100%);
	}
	.header .state{
		display: flex;
		align-items: center;
		margin-top: 50rpx;
		box-sizing: border-box;
		padding: 0 83rpx 0 78rpx;
		justify-content: space-between;
	}
	.state text{
		font-size: 36rpx;
		color: #333333;
		line-height: 50rpx;
		font-weight: 500;
	}
	.state image{
		width: 100rpx;
		height: 100rpx;
	}
	.header .msg{
		width: 710rpx;
		height: 168rpx;
		margin-left: 20rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		box-shadow: 0 0 20rpx rgba(0,0,0,.06);
		display: flex;
		align-items: center;
		margin-top: 16rpx;
	}
	.msg image{
		width: 44rpx;
		height: 52rpx;
		margin-left: 22rpx;
		margin-right: 26rpx;
	}
	.msg_address{
		display: flex;
		flex-direction: column;
	}
	.msg_address .msg_name{
		display: flex;
		margin-bottom: 6rpx;
	}
	.msg_name text{
		font-size: 28rpx;
		color: #212121;
		font-weight: 500;
		line-height: 40rpx;
	}
	.msg_name .name{
		margin-right: 39rpx;
	}
	.msg_address .address{
		display: flex;
		align-items: center;
	}
	.address text{
		/* width: 552rpx; */
		font-size: 26rpx;
		color: #666666;
		line-height: 40rpx;
		font-weight: 400;
		margin-right: 30rpx;
	}
	.address .arrows{
		width: 8rpx;
		height: 16rpx;
	}
	.container .commodity{
		width: 710rpx;
		/* height: 606rpx; */
		background-color: #FFFFFF;
		border-radius: 12rpx;
		box-shadow: 0 0 20rpx rgba(0,0,0,.06);
		margin-top: 2rpx;
		margin-left: 20rpx;
	}
	.commodity .order_item {
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
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		min-height: 80rpx;
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
	.commodity .list{
		display: flex;
		width: 710rpx;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 28rpx 0 22rpx;
		align-items: center;
		justify-content: space-between;
		border-top: 2rpx solid #F5F5F5;
	}
	.list .left{
		font-size:28rpx ;
		color: #666666;
		font-weight: 400;
	}
	.list .right{
		font-size: 28rpx;
		color: #212121;
		font-weight: 400;
	}
	.pay .active{
		color: #FF4600;
	}
	.commodity .refund{
		width: 710rpx;
		height: 100rpx;
		display: flex;
		box-sizing: border-box;
		padding-right: 28rpx;
		justify-content: flex-end;
		align-items: center;
	}
	.refund text{
		width: 92rpx;
		height: 50rpx;
		border: 1rpx solid #999999;
		border-radius: 100rpx;
		text-align: center;
		line-height: 50rpx;
		font-size:24rpx ;
		font-weight: 400;
		color: #999999;
	}
	.container .orderDetails{
		width: 710rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		background-color: #FFFFFF;
		margin-top: 50rpx;
		border-radius: 12rpx;
		box-shadow: 0 0 20rpx rgba(0,0,0,.06);
	}
	.orderDetails .title{
		width: 710rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #212121;
		line-height: 42rpx;
		font-weight: 500;
		box-sizing: border-box;
		padding-left: 22rpx;
	}
	.orderDetails .order_msg{
		width: 710rpx;
		height: 100rpx;
		box-sizing: border-box;
		padding-left: 22rpx;
		display: flex;
		align-items: center;
		border-top: 2rpx solid #F5F5F5;
	}
	.order_msg text{
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: 400;
	}
	.order_msg .left{
		color: #666666;
		margin-right: 48rpx;
	}
	.order_msg .right{
		color: #212121;
	}
	.order_msg .time{
		margin-left: 35rpx;
	}
	.container .btn{
		width: 750rpx;
		height: 112rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding:0 28rpx 0 42rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	.btn .summation{
		font-size: 24rpx;
		color: #666666;
		font-weight: 400;
	}
	.btn .count{
		font-size: 34rpx;
		color: #FF4600;
		font-weight: 400;
		margin-left: 24rpx;
	}
	.btn .cancel{
		padding: 10rpx 24rpx;
		border-radius: 100rpx;
		border: 2rpx solid #FFC300;
		font-size: 28rpx;
		font-weight: 400;
		color: #FFC300;
		background-color: #FFFFFF;
	}
	.btn .affirm{
		padding: 10rpx 24rpx;
		border-radius: 100rpx;
		font-size: 28rpx;
		font-weight: 400;
		margin-left: 20rpx;
		color: #333333;
		border: 2rpx solid #FFC300;
		background: linear-gradient(91deg,#ffb300 0%,#fbc824 100%);
	}
	.top-type{
		font-size: 36px;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 50rpx;
		color: #333333;
	}
	.causeList{
		width: 750rpx;
		max-height: 720rpx;
		min-height: 300rpx;
		border-radius: 24rpx 24rpx 0 0;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		position: relative;
	}
	.copystyle{
		background: #FFFFFF;
		font-size: 24rpx;
		margin-left: 30rpx;
		box-shadow:0rpx 0rpx 2rpx #999;
		border-radius: 6rpx;
		padding: 0rpx 6rpx;
	}
	.causeList .title{
		font-size: 36rpx;
		color: #333333;
		font-weight: 400;
		line-height: 50rpx;
		margin: 0 0 62rpx 273rpx;
	}
	.causeList .cancel{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 28rpx;
		right: 30rpx;
	}
	.causeList .list{
		width: 100%;
		max-height: 578rpx;
	}
	.tuikuan{
		width: 750rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background:#FFC300;
	}
	.causeList .list{
		width: 100%;
	}
	.list .item{
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #F5F5F5;
		height: 110rpx;
		align-items: center;
	}
	.item text{
		font-size: 36rpx;
		color: #333333;
		font-weight: 400;
	}
	.item image{
		width: 38rpx;
		height: 38rpx;
	}
</style>
