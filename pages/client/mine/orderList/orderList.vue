<template>
	<view class="container">
		<view class="header">
			<text v-for="(item,index) in order" :key="index" :class="item.type==orderstate?'active':''" @click="Switchtheorder(index,item)">{{item.text}}</text>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="orderLists" v-for="item in orderdata" @click="orderDetalBtn(item)">
				<view class="order_item" v-for="each in item.orderGoodsVOList">
					<image :src="each.thumbnails" mode="" class="item_img"></image>
					<view class="item_msg" style="flex: 1;">
						<text class="msg_name">{{each.goodsName}}</text>
						<text class="msg_specification">{{each.speName}}</text>
						<view class="msg_price">
							<text class="price">￥{{each.price}}</text>
							<text class="count">×{{each.quantity}}</text>
						</view>
					</view>
				</view>
				<view class="total_price">
					<text class="discounts">总价¥{{item.orderPrice}}，</text>
					<text class="discounts">优惠¥{{item.discountPrice}}，</text>
					<text class="total" >金额¥{{item.payPrice}}</text>
				</view>
				<view class="order_state">
					<text class="state" v-if="item.orderStatus==1">等待买家付款</text>
					<text class="state" v-if="item.orderStatus==2" >等待商家发货</text>
					<text class="state" v-if="item.orderStatus==3 || item.orderStatus==23" >卖家已发货</text>
					<text class="state"  v-if="item.orderStatus==4" >等待评价</text>
					<text class="state"  v-if="item.orderStatus==5" >交易成功</text>
					<text class="state"  v-if="item.orderStatus==6" >订单已取消</text>
					<text class="state"  v-if="item.orderStatus==21" >发起退货中</text>
					<text class="state"  v-if="item.orderStatus==9" >正在拼团中</text>
					<text class="state"  v-if="item.orderStatus==25" >商家已退款</text>
					<text class="state"  v-if="item.orderStatus==22" >去填写订单号</text>
					<view class="operation">
						<text class="btn1" v-if="item.orderStatus==1">取消订单</text>
						<text class="btn2" v-if="item.orderStatus==1" >付款</text>
						<text class="btn2" v-if="item.orderStatus==4" >去评价</text>
						<text class="btn2" v-if="item.orderStatus==5" >已完成</text>
						<text class="btn2" v-if="item.orderStatus==2" >申请退款</text>
						<text class="btn2" v-if="item.orderStatus==3 || item.orderStatus==23" >待收货</text>
						<text class="btn1" v-if="item.orderStatus==6" >已取消</text>
						<text class="btn1" v-if="item.orderStatus==9" >拼团中</text>
						<text class="btn1" v-if="item.orderStatus==25" >退款成功</text>
						<text class="btn1" v-if="item.orderStatus==21" >申请退货中</text>
						<text class="btn1" v-if="item.orderStatus==22" >填写订单号</text>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		data(){
			return{
				orderstate:1,
				order:[
					{
						text:'全部',
						type:1
					},
					{
						text:'待付款',
						type:2
					},
					{
						text:'待发货',
						type:3
					},
					{
						text:'待收货',
						type:4
					},
					{
						text:'待评价',
						type:5
					},
					{
						text:'退款/售后',
						type:6
					}
				],
				orderdata:[],
				downOption: {
					auto: true //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
						// btnText: '刷新',
						// 列表第一页无任何数据时,显示的空布局
						// use : 是否启用
						// icon : 空布局的图标路径 (支持网络路径)
						// tip : 提示文本
						// btnText : 按钮文本
						// fixed : 是否使用定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,所以最终还是会降级为absolute)
						// top : fixed定位的top值 (完整的单位值,如"100rpx", "10%";)
						// zIndex : fixed定位z-index值
					},
					textNoMore: "我也是有底线的" //没有更多数据的提示文本
				},
			}
		},
		onLoad(option) {
			this.orderstate=option.type==null?'1':option.type
			uni.$on('orderupdata',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.downCallback()
			})
		},
		methods:{
			Switchtheorder(index,item){//上面的tab点击事件
				this.orderstate=item.type
				this.downCallback()
			},
			orderDetalBtn(v){//进订单详情
				uni.navigateTo({
					url:'/pages/client/mine/orderList/orderdetails/orderdetails?orderdetalis=' + v.orderId
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					current: page.num,
					size: page.size,
					type:this.orderstate//1 全部 2 待付款 3 待发货 4 待收货 5 待评价 6 退款/售后
				}
				this.api.orderpageList(params)
					.then((res) => {
						console.log(res)
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.records;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.pages;
						//设置列表数据
						setTimeout(() => { // 模拟效果
							if (page.num == 1) this.orderdata = []; //如果是第一页需手动置空列表
							this.orderdata = this.orderdata.concat(curPageData); //追加新数据
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 500)
					})
					.catch((err) => {
						this.mescroll.endErr()
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
		width: 750rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
	}
	.header text{
		font-size: 28rpx;
		font-weight: 500;
		color: #666666;
		box-sizing: border-box;
		height: 88rpx;
		line-height: 88rpx;
	}
	.header .active{
		color: #212121;
		border-bottom: 6rpx solid #FFC300;
	}
	.container .orderLists{
		width: 710rpx;
		padding: 20rpx 0;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		box-shadow: 0rpx 0rpx 20rpx rgba(0,0,0,.06);
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.orderLists .order_item {
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
	.orderLists .total_price{
		display: flex;
		justify-content: flex-end;
		margin-top: 23rpx;
	}
	.total_price .discounts{
		font-size: 30rpx;
		color: #999999;
		line-height: 42rpx;
	}
	.total_price .total{
		font-size: 30rpx;
		color:#333333 ;
		line-height: 42rpx;
		margin-right: 28rpx;
	}
	.orderLists .order_state{
		display: flex;
		align-items: center;
		margin-top: 24rpx;
		box-sizing: border-box;
		padding: 0 20rpx 0 22rpx;
		justify-content: space-between;
		margin-bottom: 44rpx;
	}
	.order_state .state{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		font-weight: 400;
	}
	.operation text{
		padding: 9rpx 26rpx;
		border-radius: 100rpx;
		font-size: 24rpx;
		font-weight: 400;
	}
	.operation .btn1{
		border: 1rpx solid #999999;
		color: #999999;
	}
	.operation .btn2{
		border: 1rpx solid #FFC300;
		color: #FFC300;
		margin-left: 20rpx;
	}
	
</style>
