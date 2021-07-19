<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<view class="header" :style="'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<navigator url="" open-type="navigateBack" class="back">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/E82095C9B7944D7589F0281EA090313F123.png" mode=""></image>
			</navigator>
		</view>
		<!-- #endif -->
		<view class="show">
			<swiper :autoplay="false" :interval="3000" :duration="500" class="show_img" @change="switchover">
				<swiper-item v-for="item in showFigure">
					<image :src="item" mode="" class="swiper-item"></image>
				</swiper-item>
			</swiper>
			<text class="count">{{index+1}}/{{showFigure.length}}</text>
		</view>
		<view class="merchandisenews">
			<view class="news_msg">
				<text class="msg-price">￥{{shopdetail.price}}</text>
				<text class="msg-oldprice">价格￥{{shopdetail.priceMarket}}</text>
				<text class="msg-count">{{shopdetail.numberBuy}}销量</text>
			</view>
			<text class="news_name">{{shopdetail.name}}</text>
		</view>
		<view class="specification" >
			<text class="select">选中的规格</text>
			<text class="type">{{specificationname=='' ? '暂未选择规格':specificationname}}</text>
		</view>
		<view class="evaluate">
			<view class="" v-if="estimatelist.length !=0">
				<view class="title">
					<text class="left">用户评价({{totalping}})</text>
					<text class="right" @click="allevaluate">全部评价</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1013D2A37E444699A5A411C7343A4CD9124.png" mode=""></image>
				</view>
				<view class="userevaluation" v-for="item in estimatelist">
					<view class="user_msg">
						<image :src="item.avatar" mode="" class="user_icon"></image>
						<view class="user_name">
							<text>{{item.nickname}}</text>
							<uni-rate :max="5" :value="item.star" :size="12"></uni-rate>
						</view>
						<text class="time">{{item.createTime}}</text>
					</view>
					<view class="details">
						<text>{{item.content==''?'此用户没有填写评价':item.content}}</text>
						<view class="details_img" >
							<image v-for="imgitem in item.urlList" :src="imgitem" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="" style="padding: 20rpx 0;font-size: 30rpx;">
				暂无用户评价
			</view>
		</view>
		
		<view class="commoditydetails">
			<view class="title">
				商品详情
			</view>
			<view class="imgText" v-html="strings"> 
				
			</view>
		</view>
		<view class="" style="height: 140rpx"></view>
		<view class="purchase">
			<view class="" style="display: flex;position:relative;">
				<!-- #ifdef MP-WEIXIN -->
				<button type="default" open-type="contact" class="buttontact"></button>
				<!-- #endif -->
				<view class="aboutthegoods" @click="service">
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/9173CA69B4694B118EDE154FB9E51D9970.png" mode=""></image>
					<text>客服</text>
				</view>
				<view class="aboutthegoods" @click="buyseparately(1)">
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/5A2779D1DF28470CA1410F105065D383gouwu2.png" mode=""></image>
					<text>购物车</text>
				</view>
				<view class="aboutthegoods" @click="collect">
					<image v-if="shopdetail.isFavorites" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/9541161739F74010BF3C84F10DA06C4471.png" mode=""></image>
					<image v-else src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/F1C72F4E079B4D4FA118D5DD61B83D4Fshoucang2.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="separategmai" @click="buyseparately(2)">
				<view style="padding-top: 15rpx;text-align: center;">立即购买</view>
			</view>
		</view>
		<uni-popup ref="popups" type="bottom">
			<view class="Choosespecifications">
				<view class="img">
					<image :src="specificationimg" mode="" style="width: 172rpx;height: 172rpx;"></image>
					<view style="margin:90rpx 0 0 30rpx;">
						<view class="">单价:￥{{danprice==''? shopdetail.price : danprice}}</view>
						<view class="" style="color: #999;">库存:{{stock=='' ? '0':stock}}</view>
					</view>
				</view>
				<text class="top">规格</text>
				<scroll-view  scroll-y="true" style="max-height:400rpx;" >
					<view class="parameter">
						<view :class="item.stock=='' || item.stock==0 ? 'without':specificationindex==index ? 'active':'unactive'" v-for="(item,index) in shopdetail.specificationsRespVoList" @click="specificationbtn(item,index)">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
				<view class="count">
					<text class="title">
						购买数量:
					</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/BD76381ED348404FB18A21F021DAE01635.png" mode="" class="icon" @click="reduce"></image>
					<text class="quantity">{{buynum}}</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/931847C358A64117986F46C6BAE9070238.png" mode="" class="icon" @click="addnum" ></image>
				</view>
				<button class="btn" @click="createorder">完成</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../../../../components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				index: 0,
				demo:{
					top:0,
					height:0
				},
				isbuycar:'',
				shopdetail:{
					price:"",
					priceMarket:'',
					numberBuy:''
				},
				showFigure:'',//轮播图
				shopid:'',//商品id
				buynum:'1',//购买数量
				showshoppcart:false, //是否加入购物车
				showcollect:false,//是否收藏
				specificationimg:'',//规格图片
				specificationindex:'p',//规格的index
				specificationsId:'',//规格id
				specificationname:'',
				bannerimg:[],
				specification:[],
				estimatelist:'',
				totalping:"",
				strings:'',
				stock:'',
				danprice:"",
				
			}
		},
		onLoad(option) {
			// #ifdef MP-WEIXIN
			const demo = uni.getMenuButtonBoundingClientRect()||''
			if(demo==''){
				return
			}
			console.log(demo)
			this.demo.top = demo.top
			this.demo.height = demo.height
			// #endif
			this.shopid=option.shopid //商品id
			this.goodsgetById()//商品详情
			this.evaluatefindPage() //评价
		},
		methods: {
			service(){ //客服
				plus.runtime.openURL('https://cschat-ccs.aliyun.com/index.htm?tntInstId=_2CsuHFw&scene=SCE00009467');
			},
			shoppcart(){ //购物车
				this.showshoppcart=!this.showshoppcart
			},
			collect(){ //收藏
				if(this.cacheHelper.isLoginOnclick()){ //只要登录的时候才会执行  没有登录就会去登录页面
					if(this.shopdetail.isFavorites){ //true的时候收藏  false的时候取消收藏
						let sd=this.shopdetail.id.toString().split(",")
						this.api.favoritescancel({
							goodsId:sd
						}).then(res=>{
							this.goodsgetById()
							this.tui.toast('取消成功')
							
						})
					}else{
						this.api.favoritesinsert(
							this.shopdetail.id.toString()
						).then(res=>{
							this.goodsgetById()
							this.tui.toast('收藏成功')
						})
					}
				}
			},
			allevaluate(){//查看更多评价
				uni.navigateTo({
					url:'/pages/client/classify/allevaluat/allevaluat?shopid=' + this.shopid
				})
			},
			switchover(e) {//轮播图滚动事件
				this.index = e.detail.current
			},
			goodsgetById(){//商品详情
				this.api.goodsgetById({
					id:this.shopid
				}).then(res=>{
					this.shopdetail=res.data
					this.showFigure=res.data.showFigure.split(',')
					this.specificationimg=this.showFigure[0] //规格默认图片是轮播图第一个
					this.strings = res.data.details //课程详情介绍
					this.strings = this.strings.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
				})
			},
			evaluatefindPage(){ //评价
				this.api.evaluatefindPage({
					size:1,
					current:1,
					goodsId:this.shopid
				}).then(res=>{
					console.log(res)
					this.totalping=res.data.total
					this.estimatelist=res.data.records
					this.estimatelist.forEach(item=>{
						item.createTime=item.createTime.slice(0,10)
					})
					
				})
			},
			reduce(){ //减 购买数量
				if(this.buynum !=1){
					this.buynum--
				}
			},
			addnum(){ //加 购买数量
				if(this.buynum ==this.stock){ //当规格数量等于规格数量就不让他加加了
					this.tui.toast('数量超出范围~')
				}else{
					this.buynum++
				}
			},
			specificationbtn(v,index){//规格点击事件
				if(v.stock!=''|| v.stock!=0){
					this.buynum=1 //点击别的规格数量赋为1
					this.stock=v.stock //单独购买库存
					this.specificationindex=index
					this.specificationimg=v.thumbnails//规格图片
					this.danprice=v.price //价钱
					this.specificationname=v.name  //规格名称
					this.specificationsId=v.id  ////规格id
				}
			},
			//单独购买
			buyseparately(v) { //v==1是购物车按钮  2 是购买按钮
				this.buynum=1
				if(this.cacheHelper.isLoginOnclick()){ //只要登录的时候才会执行  没有登录就会去登录页面
					if(this.shopdetail.delFlag==1){ //delFlag  不等于1的时候代表被删除或者被禁用
						this.$refs.popups.open()
						this.isbuycar=v
					}
				}
			},
			//生成订单
			createorder() {
				if(this.specificationsId==''){
					this.tui.toast('请选择规格')
					return
				}
				if(this.isbuycar==1){ //isbuycar==1是购物车按钮  2 是购买按钮
					this.api.addshoppingCar({
						specificationsId:this.specificationsId,//规格id
						quantity:this.buynum,//数量
					}).then(res=>{
						this.tui.toast('添加成功,在购物车亲~')
						this.$refs.popups.close()
						  uni.$emit('shoppingun',{msg:'购物车更新'})
					})
				}else{
					uni.navigateTo({ //specificationsId规格id  quantity商品数量  "isGroup": 1, //是否是拼团订单 1 否 2 是  	"groupId": 1, //团id  "couponId": 1 //优惠券id  isshopcard==1是购物车
						url: "../../shopcard/confirmanorder/confirmanorder?specificationsId=" + this.specificationsId + '&quantity=' + this.buynum + '&groupId=' + '' + '&isGroup=' + '1' 
					})
					this.$refs.popups.close()
				}
			}
		},
	}
</script>

<style scoped>
	.container {
		width: 750rpx;
		min-height: 100%;
	}

	image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.container .header {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		display: flex;
		align-items: center;
	}
	/* #ifdef APP-PLUS */
	.container .header{
		height: 88rpx;
	}
	/* #endif */
	/* #ifdef APP-PLUS */
	.header .back {
		width: 58rpx;
		height: 58rpx;
		margin: 0 574rpx 0 30rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.header .back {
		width: 58rpx;
		height: 58rpx;
		margin: 0 400rpx 0 30rpx;
	}

	/* #endif */
	.header .shop {
		width: 58rpx;
		height: 58rpx;
	}
	.container .show {
		width: 750rpx;
		height: 768rpx;
		position: relative;
	}

	.show .show_img {
		width: 750rpx;
		height: 768rpx;
	}

	.show_img .swiper-item {
		height: 768rpx;
		width: 750rpx;
	}

	.show .count {
		width: 76rpx;
		height: 35rpx;
		background: rgba(0, 0, 0, .4);
		border-radius: 9rpx;
		line-height: 35rpx;
		font-size: 23rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 19rpx;
		right: 29rpx;
		/* z-index: 999; */
	}

	.container .merchandisenews {
		width: 750rpx;
		box-sizing: border-box;
		padding: 0 23rpx 30rpx 23rpx;
		background-color: #FFFFFF;

	}

	.merchandisenews .news_msg {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		margin-top: 46rpx;
		margin-bottom: 26rpx;
	}

	.news_msg .msg-price {
		font-size: 42rpx;
		color: #FF4600;
		font-weight: 500;
	}

	.news_msg .msg-oldprice {
		font-size: 22rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		margin-left :18rpx;
		flex: 1;
		text-decoration: line-through;
	}

	.news_msg .msg-count {
		font-size: 26rpx;
		color: #999999;
		line-height: 37rpx;
		font-weight: 400;
	}

	.merchandisenews .news_name {
		width: 100%;
		font-size: 30rpx;
		color: #140005;
		font-weight: 500;
		max-height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.container .specification {
		width: 100%;
		height: 96rpx;
		background-color: #FFFFFF;
		margin: 16rpx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.specification .select {
		font-size: 26rpx;
		line-height: 37rpx;
		color: #666666;
		font-weight: 400;
		margin-left: 32rpx;
	}

	.specification .type {
		font-weight: 400;
		font-size: 26rpx;
		color: #140005;
		line-height: 37rpx;
		margin-left: 49rpx;
		flex: 1;
	}

	.specification .more {
		width: 12rpx;
		height: 24rpx;
		margin-right: 20rpx;
	}
	.team_item image {
		width: 79rpx;
		height: 79rpx;
		border-radius: 50%;
		margin-right: 28rpx;
	}

	.team_item .name {
		font-size: 28rpx;
		color: #140005;
		font-weight: 400;
		line-height: 40rpx;
		width: 115rpx;
		/* margin-right: 205rpx; */
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.team_item .count {
		font-size: 22rpx;
		color: #140005;
		font-weight: 400;
		line-height: 30rpx;
		margin-right: 36rpx;
	}

	.team_item .count text {
		color: #FFC300;
	}

	.team_item .goTo {
		width: 113rpx;
		height: 59rpx;
		text-align: center;
		line-height: 59rpx;
		background: linear-gradient(272deg, #ffb300 0%, #fbc824 100%);
		border-radius: 100rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #333333;
	}




	.container .evaluate {
		width: 100%;
		/* height: 516rpx; */
		box-sizing: border-box;
		padding: 0 20rpx 0 32rpx;
		background-color: #FFFFFF;

	}

	.evaluate .title {
		height: 95rpx;
		border-bottom: 1rpx solid #F5F5F5;
		display: flex;
		align-items: center;
		margin-top: 25rpx;
	}

	.title .left {
		font-size: 30rpx;
		line-height: 42rpx;
		color: #140005;
		font-weight: 500;
		/* margin-right: 410rpx; */
		flex: 1;
	}

	.title .right {
		font-size: 22rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #333333;
		margin-right: 12rpx;
	}

	.title image {
		width: 8rpx;
		height: 16rpx;
	}

	.evaluate .userevaluation {
		margin-top: 32rpx;

	}

	.userevaluation .user_msg {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.user_msg .user_icon {
		width: 71rpx;
		height: 71rpx;
		border-radius: 50%;
		margin-right: 16rpx;
	}

	.user_msg .user_name {
		display: flex;
		flex-direction: column;
		/* margin-right: 333rpx; */
		flex: 1;
	}

	.user_msg .time {
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
		line-height: 30rpx;
	}

	.user_name text {
		width: 330rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 26rpx;
		color: #140005;
		line-height: 37rpx;
		font-weight: 400;
		margin-bottom: 10rpx;
	}

	.userevaluation .details {
		margin-top: 23rpx;
		margin-bottom: 32rpx;
	}

	.details text {
		width: 676rpx;
		font-size: 26rpx;
		font-weight: 400;
		line-height: 37rpx;
		color: #140005;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.details .details_img {
		margin-top: 26rpx;
		display: flex;
	}

	.details_img image {
		width: 171rpx;
		height: 162rpx;
		border-radius: 16rpx;
		margin-right: 24rpx;
	}

	.container .commoditydetails {
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 16rpx;
	}

	.commoditydetails .title {
		font-size: 30rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: #333333;
		margin-top: 23rpx;
		margin-left: 21rpx;
	}

	.commoditydetails .guarantee {
		width: 710rpx;
		margin-left: 20rpx;
		height: 82rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F5F5F5;
	}

	.guarantee image {
		width: 30rpx;
		height: 30rpx;
		margin: 0 14rpx 0 10rpx;
	}

	.guarantee text {
		font-size: 26rpx;
		font-weight: 400;
		line-height: 37rpx;
		color: #140005;
	}

	.commoditydetails .imgText {
		margin: 16rpx 20rpx 0 20rpx;
		box-sizing: border-box;
	}

	.container .Choosespecifications {
		width: 750rpx;
		/* height: 591rpx; */
		background-color: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		position: relative;
		box-sizing: border-box;
		padding-top: 175rpx;
	}

	.Choosespecifications .img {
		position: absolute;
		width: 660rpx;
		height: 172rpx;
		top: -77rpx;
		left: 29rpx;
		display: flex;
	}

	.Choosespecifications .top {
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #212121;
		margin-left: 29rpx;
	}

	.Choosespecifications .parameter {
		margin-top: 18rpx;
		display: flex;
		flex-wrap: wrap;
		margin-left: 29rpx;
	}
	.active {
		background-color: #FFC300;
		padding: 0 20rpx;
		font-size: 28rpx;
		font-weight: 400;
		margin: 0rpx 30rpx 30rpx 0rpx;
		border-radius: 8rpx;
		height: 58rpx;
		line-height: 58rpx;
		color: #333333;
	}
	.unactive{
		background: #F8F8F8;
		padding: 0 20rpx;
		font-size: 28rpx;
		font-weight: 400;
		margin: 0rpx 30rpx 30rpx 0rpx;
		border-radius: 8rpx;
		height: 58rpx;
		line-height: 58rpx;
		color: #999999;;
	}
	.Choosespecifications .count {
		display: flex;
		align-items: center;
		height: 100rpx;
		padding-bottom: 100rpx;
	}

	.count .title {
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #212121;
		margin-left: 29rpx;
		margin-right: 373rpx;
	}

	.count .quantity {
		width: 68rpx;
		height: 40rpx;
		box-sizing: border-box;
		border: 1rpx solid #EEEEEE;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		color: #FFC300;
	}

	.count .icon {
		width: 46rpx;
		height: 40rpx;
	}
	/* #ifdef MP-WEIXIN */
	.buttontact{
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		opacity: 0;
	}
	/* #endif */
	.Choosespecifications .btn {
		width: 100%;
		height: 90rpx;
		position: absolute;
		bottom: 0;
		background-color: #FFC300;
		line-height: 90rpx;
		text-align: center;
		font-size: 36rpx;
		color: #333333;
		font-weight: 400;
		border-radius: 0;
	}
	.peopleCount image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 100%;
		margin-right: 22rpx;
	}

	.peopleCount .master {
		position: relative;
	}

	.peopleCount .master text {
		position: absolute;
		width: 58rpx;
		height: 34rpx;
		text-align: center;
		line-height: 34rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #9f7200;
		background-color: #ffb310;
		border: 1rpx solid #FFFFFF;
		border-radius: 17rpx;
		top: -6rpx;
		left: -4rpx;
	}

	.teams .differencevalue {
		font-size: 36rpx;
		color: #140005;
		font-weight: 400;
		line-height: 50rpx;
		margin-bottom: 36rpx;
	}

	.differencevalue text {
		color: #FFC300;
	}

	.teams .join {
		width: 580rpx;
		height: 88rpx;
		border-radius: 8rpx;
		background: linear-gradient(180deg, #ffb300 0%, #fbc824 100%);
		text-align: center;
		line-height: 88rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #333333;
	}

	.purchase {
		width: 750rpx;
		height: 112rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
	}
	.aboutthegoods{
		width: 90rpx;
		text-align: center;
	}
	.aboutthegoods image {
		width: 45rpx;
		height: 45rpx;
		margin: 0 auto;
	}

	.aboutthegoods text {
		font-size: 22rpx;
		color: #999999;
		font-weight: 400;
		line-height: 30rpx;
		margin-top: 6rpx;
	}

	.purchase .btn {
		width: 260rpx;
		height: 112rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.purchase .btn .price {
		font-size: 31rpx;
		color: #333333;
		font-weight: 400;
		line-height: 44rpx;
		margin-bottom: 2rpx;
	}

	.purchase .btn text {
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}
	.separategmai{
		width: 440rpx;
		height: 80rpx;
		background: linear-gradient(270deg, #FFB300 0%, #FBC824 100%);
		opacity: 1;
		border-radius: 100rpx;
		margin: 0 auto;
	}
	.initiatepintu{
		width: 260rpx;
		height: 112rpx;
		background: #EB2955;
		opacity: 1;
		text-align: center;
		color: #FFFFFF;
	}
	.without{
		background: #f8f8f8;
		padding: 0 20rpx;
		font-size: 28rpx;
		font-weight: 400;
		margin: 0rpx 30rpx 30rpx 0rpx;
		border-radius: 8rpx;
		height: 58rpx;
		line-height: 58rpx;
		color: #c7c7c7;
		text-decoration:line-through
	}
</style>
