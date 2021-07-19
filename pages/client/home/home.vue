<template>
	
	<view class="container">
		<!-- 微信小程序的头部 -->
		<!-- #ifdef MP-WEIXIN -->  
		<view class="ttop" :style="'padding-right:'+(demo.width+10)+'px;'+'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="header" style="display: flex;">
				<view class="address" @click="locationDone">
					<view style="width: 50rpx;">
						<image class="app-iconplace" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/DD94D96F6EBA4DADB24AAD4BB415CFDD3.png" mode=""></image>
					</view>
					<view class="civic" style="flex: 1;text-align: center;margin-right: 8rpx;">{{citydata==""?'请选择':citydata}}</view>
				</view>
				<view @click="searchweixin" class="search">
					<view class="icon">
						<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/F1B885237E84470B85F8B2E0F08D727B5@2x.png" mode="" style="margin-top:14rpx;width: 32rpx;height: 32rpx;"></image>
					</view>
					<text style="display: inline-block;width: 100%;">搜索商品名称</text>
				</view>
			</view>
		</view> 
		<!-- #endif --> 
		<!-- app H5 的头部 -->
		<!-- #ifdef H5|| APP-PLUS --> 
		<view class="ttop">
			<view class="status_bar"></view>
			<view class="app-header">
				<view class="app-address" @click="locationDone">
					<view  style="width: 50rpx;">
						<image class="app-iconplace" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/DD94D96F6EBA4DADB24AAD4BB415CFDD3.png" mode=""></image>
					</view>
					<view class="civic" style="flex: 1;text-align: center;margin-right: 8rpx;">{{citydata}}</view>
				</view>
				<navigator open-type="navigate" url="./search/search" class="app-search">
					<view class="app-iconseek">
						<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/F1B885237E84470B85F8B2E0F08D727B5@2x.png" mode="" style=""></image>
					</view>
					<text>搜索商品名称</text>
				</navigator>
			</view>
		</view>
		<!-- #endif -->
			<!-- 轮播图 -->
		<view class="" style="padding:0 20rpx;margin-top: 0rpx;">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="banner" circular>
				<swiper-item v-for="item in banner" @click="bannerdetail(item)">
					<view class="swiper-item" style="height: 100%;">
						<image :src="item.picture" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="" style="padding: 120rpx 20rpx 0 20rpx;background: #FFFFFF;margin-top: -130rpx;">
			<!-- 分类 -->
			 <scroll-view class="scroll-view_H" scroll-x="true" show-scrollbar="false">
				<view class="classify-box" v-for="(item,index) in classifyList" @click="classifyitem(item,index)">
					<image :src="item.picture" mode="" style="width: 88rpx;height:88rpx;border-radius: 30rpx;margin: 0 auto;"></image>
					<view class="classify-taitl">{{item.name}}</view>
				</view>
			 </scroll-view>
			<!-- 活动 -->
			<view class="activity" @click="activityyh">
				<image :src="activityimage" mode="" style="border-radius: 12rpx;"></image>
			</view>
			<!-- 拼团 -->
			<view class="groupbooking">
				<view class="title"  @click="lookmore">
					<view class="title_left">
						<text class="h1">拼团专区</text>
						<text class="h2">超划算,一起拼</text>
					</view>
					<view class="more">
						查看更多
					</view>
				</view>
				<view class="spellgrouparea">
					<view class="spellgrouparea_item"  v-for="item in groupdata" @click="groupbtn(item)">
						<image class="item_img" :src="item.thumbnails" mode=""></image>
						<view class="item_msg">
							<text class="msg_name">{{item.name}}</text>
							<text class="msg_price">￥{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 特价专区 -->
		<view class="specialoffer">
			<view class="title">
				<view class="" style="width: 8rpx; height: 34rpx; background:linear-gradient(180deg, #ffb300 0%, #fbc824 100%); border-radius: 4rpx; margin-right: 12rpx;">
				</view>
				<text>特价专区</text>
			</view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="" style="display: flex;justify-content: space-between;flex-wrap: wrap;">
					<view class="specialzone_item" v-for="(item, index) in corserbottemlist" :key='index' @click.stop="referrerBtn(item)">
						<image :src="item.thumbnails" mode="" class="special-img"></image>
						<view class="special-name">{{item.name}}</view>
						<view class="special-price-box">
							<text class="special-price">￥{{item.price}}</text>
							<text class="special-workout">已售:{{item.buyNum}}</text>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				demo: {},
				citydata:'',
				banner:'',//轮播图数据
				classifyList:[],
				activityimage:'',//活动图优惠劵图
				groupdata:[],
				corserbottemlist:[],
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
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					textNoMore: "我也是有底线的" //没有更多数据的提示文本
				},
			}
		},
		onLoad(option) {
			this.activityimg()
			if(this.cacheHelper.isLogin()){
				this.rightaway()
			}
			uni.setStorageSync('inviteeCode',option.inviteeCode)  //获取别人分享的邀请码保存本地  注册页调用
			// #ifdef MP-WEIXIN
				const demo = uni.getMenuButtonBoundingClientRect() || ''
				console.log(demo)
				if (demo == '') {
					return
				}
				console.log(demo)
				this.demo = demo
			// #endif
			uni.$on('upaddress',(data)=>{
				this.citydata=data.mag
				this.position()
			})
			this.orientation() //获取当前位置
			this.getBannerCategoryList()
			this.findParentList()
			this.groupArea()
		},
		//发送给朋友
		onShareAppMessage(res) {
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			let distSource = uni.getStorageSync('distSource');
			if (distSource) {
				return {
					title: '壹站仓app分享',
					type: 0,
					path: '/pages/client/home/home?inviteeCode=' + distSource,
					summary: "",
					imageUrl: ""
				}
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			let distSource = uni.getStorageSync('distSource');
			if (distSource) {
				return {
					title: '壹站仓app分享',
					type: 0,
					query: '/pages/client/home/home?inviteeCode=' + distSource,
					summary: "",
					imageUrl: ""
				}
			}
		},
		methods: {
			activityimg(){
				this.api.tDictfineOne(
					JSON.stringify('HOME_AD')
				).then(res=>{
					console.log(res.data.images)
					this.activityimage=res.data.images
				})
			},
			//拼团专区查看更多
			lookmore() {
				console.log('ssdf')
				uni.navigateTo({
					url: '/pages/client/home/spellgroupzone/spellgroupzone'
				})
			},
			bannerdetail(v){//轮播图详情
				console.log(v)
				if(v.type==1){
					uni.navigateTo({
						url:'/pages/client/home/bannerdetal?bannerid=' + v.id
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/home/shopDetail/shopDetail?shopid=' + v.objectId
					})
				}
			},
			searchweixin(){
				uni.navigateTo({
					url:'/pages/client/home/search/search'
				})
			},
			groupbtn(v){//拼团数据
				uni.navigateTo({
					url: '../classify/commoditydetails/commoditydetails?shopid=' + v.id
				})
			},
			orientation(){ //获取当前位置
				// #ifdef H5|| APP-PLUS 
				uni.getLocation({
					geocode:true,
				    success:(res)=> {
						this.citydata=res.address.city
						console.log(this.citydata,'当前的市')
						this.position()
						this.downCallback()
				    }
				});
				// #endif 
				// #ifdef MP-WEIXIN 
				uni.getLocation({
				    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				    success:(res)=>{
						let that=this
				        const latitude = res.latitude;
				        const longitude = res.longitude;
						console.log(res)
				        uni.request({
							header:{
								"Content-Type": "application/text"
							},
							//注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
							url:'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location='+res.longitude+','+res.latitude+'&key=280802ed0116fef931dbcf5e7e9278d7&radius=1000&extensions=all',
							success(re) {
								console.log(re)
								if(re.statusCode===200){
									that.citydata=re.data.regeocode.addressComponent.city
									console.log("获取中文街道地理位置成功",that.citydata)
									
								}else{
									console.log("获取信息失败，请重试！")
								}
							 }
						});
				    }
				});
				// #endif 
			},
			findParentList(){//分类
				this.api.findParentList().then(res=>{
					console.log(res.data)
					this.classifyList=res.data
				})
			},
			classifyitem(v,index){
				uni.$emit('classindex',{msg:index,id:v})
				uni.switchTab({
				    url:'/pages/client/classify/classify'
				});
			},
			groupArea(){//拼团列表
				this.api.homeGoodsList({
					current:'1',
					size:'3',
					type:'2'
				}).then(res=>{
					console.log(res)
					this.groupdata=res.data.records
				})
			},
			getBannerCategoryList(){//获取轮播图
				this.api.getBannerCategoryList().then(res=>{
					this.banner=res.data.bannerList
				})
			},
			locationDone(){//去选择城市
				uni.navigateTo({
					url:'/pages/client/home/locationz'
				})
			},
			activityyh(){//去优惠劵页面
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'/pages/client/discountcoupon/discountcoupon'
					})
				}
			},
			referrerBtn(v){ //下面的每一个列表事件
				console.log(v)
				uni.navigateTo({
					url:'/pages/client/home/shopDetail/shopDetail?shopid=' + v.id
				})
			},
			rightaway(){ //邀请码
				this.api.getCode().then(res=>{
					uni.setStorageSync('distSource',res.data)
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
					size: 10,
					type:'1',
				}
				this.api.homeGoodsList(params)
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
							if (page.num == 1) this.corserbottemlist = []; //如果是第一页需手动置空列表
							this.corserbottemlist = this.corserbottemlist.concat(curPageData); //追加新数据
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 500)
					})
					.catch((err) => {
						this.mescroll.endErr()
					})

			}
		},
		
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
		/* min-height: 100%; */
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/7B717D3C2D6246AFA96F9729D7B48DE940.png) no-repeat;
		background-size: 750rpx 300rpx;
		box-sizing: border-box;
	}
	.app-iconplace{
		width: 35rpx;
		height: 44rpx;
		margin-right: 13rpx;
		margin: auto;
	}
	/* #ifdef MP-WEIXIN */
	.container .header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	.container .header .address {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* margin-right: 30rpx; */
	}
	.header .address .icon {
		width: 44rpx;
		height: 44rpx;
		margin: auto 0;
		line-height: 60rpx;
	}

	.header .address text {
		font-size: 20rpx;
		font-weight: bold;
		color: #333333;
	}
	.container .header .search {
		height: 60rpx;
		line-height: 60rpx;
		flex: 1;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
	}
	.header .search .icon {
		width: 24rpx;
		height: 24rpx;
		margin: 0 15rpx 0 15rpx;
	}
	.header .search text {
		font-size: 26rpx;
		color: #333333;
		font-weight: 400;
	}
	.ttop{
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		background: linear-gradient(270deg, #FFB300 0%, #FBC824 100%);
		height: 124rpx;
	}
	/* #endif */
	/* #ifdef H5|| APP-PLUS */
		.app-header{
			display: flex;
			padding: 10rpx 20rpx;
		}
		.ttop{
			position: -webkit-sticky;
			position: sticky;
			top: var(--window-top);
			z-index: 99;
			background: linear-gradient(270deg, #FFB300 0%, #FBC824 100%);
		}
		.app-search{
			display: flex;
			width: 565rpx;
			height: 60rpx;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.app-address{
			display: flex;
			margin: auto 0;
			flex: 1;
		}
		.app-iconseek{
			width: 36rpx;
			height: 36rpx;
			margin-right: 13rpx;
			margin-left: 13rpx;
		}
	/* #endif */
	
	
	
	
	
	
	
	.scroll-view_H {
		white-space: nowrap;
	}
	.classify-taitl{
		height: 33rpx;
		font-size: 24rpx;
		font-weight: 400;
		line-height: 33rpx;
		color: #212121;
		text-align: center;
		margin-top: 12rpx;
	}
	.classify-box{
		width:144rpx;
		display: inline-block;
	}
	.container .banner {
		width: 710rpx;
		height: 280rpx;
		border-radius: 16rpx;
		overflow: hidden;
		margin: 22rpx 0 40rpx 0;
	}
	.civic{
		width: 100rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}

	.container .activity {
		width: 100%;
		height: 214rpx;
		margin: 17rpx 0 27rpx 0;
	}

	.container .groupbooking {
		width: 100%;
		min-height: 424rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1601058930E64BB7ABE000B519F75EC712.png) no-repeat;
		background-size: 710rpx 376rpx;
		box-sizing: border-box;
		padding: 0 12rpx 0 19rpx;
	}

	.groupbooking .title {
		margin: 26rpx 0 32rpx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.groupbooking .title .title_left {
		display: flex;
		flex-direction: column;
	}

	.groupbooking .title .title_left .h1 {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		line-height: 42rpx;
		margin-bottom: 2rpx;
		margin-top: 10rpx;
	}

	.groupbooking .title .title_left .h2 {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		line-height: 33rpx;
	}

	.groupbooking .title .more {
		margin-right: 7rpx;
		width: 124rpx;
		height: 43rpx;
		border-radius: 30rpx;
		border: 1rpx solid #333333;
		color: #000000;
		text-align: center;
		line-height: 43rpx;
		font-weight: 400;
		font-size: 23rpx;
	}

	.groupbooking .spellgrouparea {
		display: flex;
	}

	.spellgrouparea .spellgrouparea_item {
		width: 213rpx;
		height: 290rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: 14rpx;
	}

	.spellgrouparea .spellgrouparea_item .item_img {
		width: 171rpx;
		height: 193rpx;
		margin-top: 3rpx;
	}

	.spellgrouparea .spellgrouparea_item .item_msg {
		width: 100%;
		box-sizing: border-box;
		padding: 0 6rpx 0 9rpx;
		display: flex;
		flex-direction: column;
	}

	.spellgrouparea .spellgrouparea_item .item_msg .msg_name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #333333;
		margin-top: 11rpx;
	}

	.spellgrouparea .spellgrouparea_item .item_msg .msg_price {
		font-size: 38rpx;
		color: #FF4600;
		line-height: 44rpx;
		font-weight: 500;
		margin-top: 10rpx;
	}

	.container .specialoffer {
		margin-top: 37rpx;
		padding: 0 20rpx;
	}

	.specialoffer .title {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 26rpx;
	}

	.specialoffer .title text {
		font-weight: bold;
		font-size: 30rpx;
		color: #333333;
	}

	.specialoffer .specialzone {
		display: flex;
		flex-direction: row;
		white-space: pre-wrap;
		justify-content: space-between;

	}

	.specialzone_item {
		width: 340rpx;
		height: 468rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
	}

	.special-img {
		width: 100%;
		height: 340rpx;
		border-radius: 8rpx;
		background-color: #CCCCCC;
	}
	.special-name {
		font-size: 28rpx;
		color: #212121;
		font-weight: 400;
		line-height: 40rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 17rpx;
		padding: 0 20rpx;
		margin-top: 15rpx;
	}

	.special-price-box {
		padding: 0 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.special-price {
		font-size: 36rpx;
		line-height: 48rpx;
		color: #ff4600;
		font-weight: 500;
	}

	.special-workout {
		font-weight: 400;
		line-height: 30rpx;
		font-size: 24rpx;
		color: #666666;
	}
</style>
