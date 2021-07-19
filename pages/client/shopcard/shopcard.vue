<template>
	<view class="container">
		<view class="appshi">
			<!-- #ifdef MP-WEIXIN -->
			<view class="" :style="'padding-right:'+(demo.width+10)+'px;'+'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
				<view class="header" style="height: 70rpx;">
					<view class="btn" @click="cartement">{{carttaital}}</view>
					<view class="title">购物车</view>
					<view class="btn"></view>
				</view>
			</view> 
			<!-- #endif --> 
			<!-- #ifdef H5|| APP-PLUS -->
			<view class="status_bar"></view>
			<view class="header">
				<view class="btn"></view>
				<view class="title">购物车</view>
				<view class="btn" @click="cartement">{{carttaital}}</view>
			</view>
			<!-- #endif -->
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :height="1200" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view :class="item.goodsStatus !=1 || item.speStatus !=1?'unshop_item':'shop_item'" v-for="item in cartdata" @click="carddtails(item)">
				<view v-if="item.goodsStatus !=1 || item.speStatus !=1" class="" style="display: flex;justify-content: space-between;font-size: 22rpx;padding: 20rpx;">
					<text>已失效</text>
					<text @click.stop="clearaway(item)">清除</text>
				</view>
				<view class="" style="display: flex;">
					<view class="checked" @click.stop="carditem(item)">
						<image v-if="arr.includes(item.id)" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/6E968411EC424DD4A02FD5A5DFEF92C132.png" mode=""></image>
						<image v-else src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/8CBDA47630224109AC0BFF7AFB9578DA39.png" mode=""></image>
					</view>
					<image class="item_img" :src="item.speImg" mode=""></image>
					<view class="item_msg" style="flex: 1;margin-right:20rpx;">
						<text class="msg_name">{{item.name}}</text>
						<view class="msg_type">
							<view class="type_yard">
								<text class="type_size">{{item.specificationsName}}</text>
								<text class="type_price">￥{{item.price}}</text>
							</view>
							<view class="operation">
								<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/8D8686BEE79841B19285235235381AA335.png" mode="" class="redux" @click.stop="shopminus(item)"></image>
								<text class="count">{{item.quantity}}</text>
								<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/087708C884CD4B4FBA56B6A6357BFA7336.png" mode="" class="add"  @click.stop="shopadd(item)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
		<view class="total" v-if="cartdata.length !=0">
			<view class="" @click="checkall">
				<image v-if="arr.length==cartdata.length" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/38CB04C8D15F448F996EDA3A1404441532.png" class="check"></image>
				<image v-else src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/06D70AB64CF44B1AAFDAB305378771EC39.png" mode="" class="check"></image>
			</view>
			<text class="allCheck">全选</text>
			<text class="summation" v-if="!carttype && arr.length !=0">合计</text>
			<text class="price" v-if="!carttype && arr.length !=0">￥{{allPrice.toFixed(2)}}</text>
			<text @click="cartclose" class="pay">{{carttype?'删除':'结算'}}</text>
		</view>
	</view>
</template>
<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data(){
			return{
				demo:{},
				arr:[],
				arsdata:[],
				carttype:false,//false为结算  true 为删除
				carttaital:'管理',
				cartdata:[],
				downOption: {
					auto: true ,//是否在初始化后,自动执行downCallback; 默认true
					isLock:true
				},
				subtotal:0,
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
		computed:{
			allPrice: function(){
				var totalPrice = 0
				console.log(this.arsdata)
				this.arsdata.forEach(item=>{
					totalPrice +=item.price* item.quantity
				})
				this.totalPrice = totalPrice
				return totalPrice
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
				const demo = uni.getMenuButtonBoundingClientRect() || ''
				console.log(demo)
				if (demo == '') {
					return
				}
				console.log(demo)
				this.demo = demo
			// #endif
			uni.$on('quitlogin',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.cartdata=[]
			})
			 uni.$on('shoppingun',(data)=>{
				console.log('监听到事件来自 shoppingun ，携带参数 msg 为：' + data.msg);
				this.downCallback()
				this.arr=[]
				this.arsdata=[]
			})
			if(this.cacheHelper.isLoginOnclick()){//只要登录的时候才会执行  没有登录就会去登录页面
				this.downCallback()
			} 
		},
		methods:{
			cartement(){
				if(this.carttype){
					this.carttaital='管理'
				}else{
					this.carttaital='删除'
				}
				this.carttype=!this.carttype
			},
			shopminus(v){
				console.log(v)
				if(v.quantity!=1){
					v.quantity--
					this.api.addshoppingCar({
						specificationsId:v.specificationsId, //规格id
						quantity:-1
					}).then(res=>{
						// this.downCallback()
					})
				}
			},
			shopadd(v){
				console.log(v)
				if(v.stock==v.quantity){
					this.tui.toast('该商品没有更多了哦~')
				}else{
					v.quantity++
					this.api.addshoppingCar({
						specificationsId:v.specificationsId, //规格id
						quantity:1
					}).then(res=>{
						// this.downCallback()
					})
				}
			},
			clearaway(v){////删除失效商品
				let scarr=v.id.split(',')
				uni.showModal({
				    title: '提示',
				    content: '您确定清除该商品',
				    success:(res)=> {
				        if (res.confirm) {
				            this.api.removeMore(
				            	scarr
				            ).then(res=>{
				            	this.tui.toast('清除成功')
				            	this.downCallback()
				            })
				        }
				    }
				});
				
			},
			cartclose(){
				if(this.carttype){ //删除
					if(this.arr==''){
						this.tui.toast('您还没有选择宝贝哦!')
					}else{
						this.api.removeMore(
							this.arr
						).then(res=>{
							this.tui.toast('删除成功')
							this.arr=[]
							this.arsdata=[]
							console.log(this.subtotal)
							this.downCallback()
						})
					}
				}else{ //结算
					this.arsdata=[]
					if(this.arr!=''){
						uni.navigateTo({ //idcard购物车id数组 isshopcard==1是购物车
							url:'/pages/client/shopcard/confirmanorder/confirmanorder?idcard=' + this.arr + '&isshopcard=' + 1,
						})
						this.arr=[]
					}
				}
			},
			carddtails(v){
				if(v.goodsStatus !=1 || v.speStatus !=1){
					this.tui.toast('该商品已下架')
				}else{
					uni.navigateTo({
						url:'/pages/client/home/shopDetail/shopDetail?shopid=' + v.goodsId
					})
				}
			},
			carditem(v){//点击没一个商品事件
				if(v.stock<v.quantity){
					this.tui.toast('库存不足')
				}else if(v.goodsStatus !=1 || v.speStatus !=1){
					this.tui.toast('该商品已下架')
				}else{
					if(this.arr.includes(v.id)){  //如果找到这条数据就清除这个数据
						this.arr=this.arr.filter((ele)=>{//清空样式
							return ele != v.id;
						});
					}else{ //往里面push  subtotal
						this.arr.push(v.id)
					}
					
					
					if(this.arsdata.includes(v)){  //如果找到这条数据就清除这个数据
						this.arsdata=this.arsdata.filter((ele)=>{//清空样式
							return ele != v;
						});
					}else{ //往里面push  subtotal
						this.arsdata.push(v)
						console.log(this.arsdata)
					}
				}
				
			},
			checkall(){//点击全选的事件
				if(this.cartdata.length==this.arr.length){//如果都this.cartdata.length==this.arr.length就代表全部选中了
					this.arr=[]
					this.arsdata=[]
				}else{//没有全部选中
					this.arr=[]  //先把arr的值赋空  ,然后再循环全部push进arr
					this.arsdata=[]
					this.cartdata.forEach(item=>{
						this.arr.push(item.id)
						this.arsdata.push(item)
					})
				}
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
				}
				this.api.shopfindPage(params)
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
							if (page.num == 1) this.cartdata = []; //如果是第一页需手动置空列表
							this.cartdata = this.cartdata.concat(curPageData); //追加新数据
							console.log(this.cartdata)
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
	image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.container {
		width: 750rpx;
		min-height: 100%;
		padding-bottom: 88rpx;
	}
	.container .header{
		width: 750rpx;
		height: 88rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.appshi{
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		background: #FFFFFF;
	}
	.header .title{
		font-size: 36rpx;
		font-weight: 400;
		line-height: 50rpx;
		color: #000000;
	}
	.header .btn{
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #666666;
		width: 130rpx;
		text-align: center;
	}
	.container .shop_item {
		width: 710rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		flex-direction: row;
		align-items: center;
		padding: 30rpx 0;
	}
	.unshop_item{
		width: 710rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		background-color: #FFFFFF;
		color: #666666;
		border-radius: 12rpx;
		flex-direction: row;
		align-items: center;
		padding: 0rpx 0 30rpx 0;
		opacity: 0.7;
	}
	.checked {
		width: 40rpx;
		height: 40rpx;
		/* margin: 0 14rpx 0 16rpx; */
		margin: auto 14rpx;
	}
	
	.item_img {
		width: 186rpx;
		height: 186rpx;
		background-color: #CCCCCC;
		border-radius: 12rpx;
		margin-right: 20rpx;
	}

	.shop_item .item_msg {
		display: flex;
		flex-direction: column;
		height: 186rpx;
		width: 424rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.item_msg .msg_name {
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}
	.item_msg .msg_type{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
	}
	.msg_type .type_yard{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.type_yard .type_size{
		height: 40rpx;
		min-width:60rpx;
		max-width: 220rpx;
		text-align: center;
		line-height: 40rpx;
		background-color: #F8F8F8;
		color: #999999;
		font-size: 22rpx;
		font-weight: 400;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.type_yard .type_price{
		font-size:48rpx ;
		color: #FF4600;
		font-weight: 500;
		line-height: 30rpx;
		margin-top: 12rpx;
	}
	.msg_type .operation{
		display: flex;
		flex-direction: row;
	}
	.operation image{
		width: 46rpx;
		height: 40rpx;
	}
	.operation .count{
		width: 68rpx;
		height: 40rpx;
		box-sizing: border-box;
		border: 1rpx solid #EEEEEE;
		text-align: center;
		line-height: 40rpx;
		color: #ffc300;
		font-weight: 400;
		font-size: 24rpx;
	}
	.container .total{
		width: 100%;
		height: 88rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* #ifdef H5*/
		margin-bottom: 100rpx;
		/* #endif */
	}
	.total .check{
		width: 40rpx;
		height: 40rpx;
		margin-left: 36rpx;
	}
	.total .allCheck{
		font-size: 26rpx;
		color: #333333;
		font-weight: 500;
		margin: 0 224rpx 0 14rpx;
	}
	.total .summation{ 
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
		margin-right: 15rpx;
	}
	.total .price{
		font-size: 36rpx;
		font-weight: 500;
		color: #FF4600;
	}
	.total .pay{
		position: absolute;
		right: 30rpx;
		top: 14rpx;
		width: 140rpx;
		height: 60rpx;
		background: linear-gradient(88deg, #ffb300 0%,#fbc824 100%);
		font-size: 26rpx;
		font-weight: 500;
		color: #333333;
		border-radius: 200rpx;
		text-align: center;
		line-height: 60rpx;
	}
	.notavailable{
		position: fixed;
		top: 356rpx;
		left: 176rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.notavailable image{
		width: 398rpx;
		height: 202rpx;
		margin-bottom: 112rpx;
	}
	.notavailable text{
		font-size: 36rpx;
		color: #999999;
		font-weight: 400;
		line-height: 50rpx;
	}
	.notavailable .shopnow{
		font-size: 30rpx;
		color: #FFC300;
		font-weight: 400;
		line-height: 42rpx;
		margin-top: 21rpx;
	}
</style>
