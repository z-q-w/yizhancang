<template>
	<view class="container">
		<view class="ttop">
			<!-- #ifdef MP-WEIXIN -->
			<view class="" :style="'padding-right:'+(demo.width+10)+'px;'+'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
				<view class="search" style="width: 520rpx;" @click="tosearch">
					<image style="margin: 0 9rpx 0 200rpx;" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/4C206A32380C487AAD5870905FDFE5EB31@3x.png" mode=""></image>
					<text>搜一搜</text>
				</view>
			</view> 
			<!-- #endif --> 
			<!-- #ifdef H5|| APP-PLUS -->
			<view class="status_bar"></view>
			<view class="search" style="margin-top: 20rpx;" @click="tosearch">
				<image style="margin: 0 9rpx 0 284rpx;" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/4C206A32380C487AAD5870905FDFE5EB31@3x.png" mode=""></image>
				<text>搜一搜</text>
			</view>
			<!-- #endif -->
			<!-- 上面的tab -->
			<view class="subject">
				<view style="display: flex;flex-direction: row;position: relative;display: flex;flex-direction: column;">
					<scroll-view class="one_items" scroll-with-animation :scroll-x="true" :show-scrollbar="false"  :scroll-into-view="scrollInto">
						<view v-for="(tab, index) in tabBars" :key="tab.code" class="tui-tab-item" :id="tab.code" :data-current="index" @click="tabClick(index,tab)">
							<text :class="tabIndex == index ?'one_item  one_active':'one_item'">{{ tab.name }}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="" style="height: 270rpx;"></view>
		<view class="SecondaryClassification">
			<!-- 左边的tab选项 -->
			<scroll-view scroll-y="true" class="two_items">
				<view :class="two_count==index?'two_item two_active':'two_item'" v-for="(item,index) in two_items" :key="index"
				 @click="chooseSecond(item, index)">
					<text>{{item.name}}</text>
				</view>
			</scroll-view>
			<view class="ThreeLevelClassification">
				<scroll-view scroll-y="true" class="three_items">
					<mescroll-body ref="mescrollRef" :height="800" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
						<view class="three_item" @click="goparticulars(item)" v-for="(item,index) in three_items" :key="index">
							<view class="" style="position: relative;">
								<view class="tagsshi" style="">{{item.tags}}</view>
								<image :src="item.thumbnails" class="img" style="border-radius: 8rpx;"></image>
							</view>
							<view class="item_msg">
								<text class="name">{{item.name}}</text>
								<view class="item-price_cart">
									<view class="price">
										¥<text>{{item.priceMarket}}</text>
										<text class="shanchu" style="text-decoration:line-through">¥{{item.price}}</text>
									</view>
									<view class="icon" @click.stop="goshop(item)">
										<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/8C225BB84E614CF6AE89F724F39B9EB7122.png" mode=""></image>
									</view>
								</view>
							</view>
						</view>
						<view class="" v-if="three_items.length==0">
							<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/14B6F745F03A45C8B9C6B914D1C140B9mescroll-empty.png" mode="" style="width: 280rpx;height: 280rpx;margin: 200rpx auto 40rpx auto;;"></image>
							<view class="" style="font-size: 24rpx;color: #898989;text-align: center;">
								~空空如也~
							</view>
						</view>
					</mescroll-body>
				</scroll-view>
			</view>
		</view>
		<uni-popup ref="popups" type="bottom">
			<view class="Choosespecifications">
				<view class="img">
					<image :src="specificationimg" mode="" style="width: 172rpx;height: 172rpx;"></image>
					<view style="margin:90rpx 0 0 30rpx;" v-if="specificationsId!=''">
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
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				demo: {},
				parentId:'',//一级分类
				categoryId:'',//二级分类
				two_items:[],//二级分类数据
				two_count:'0',
				tabIndex: '0',
				tabBars: [], //一级分类数据
				scrollInto: '',
				three_items:[],//列表数据
				specificationimg:"",//规格图片
				specificationindex:'p',//规格的index
				specificationsId:"",
				shopdetail:"",//规格数据 也是详情
				buynum:'1',//加入购物车数量
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
						// btnText: '刷新',
						// 列表第一页无任何数据时,显示的空布局
						use : false,   //http://www.mescroll.com/img/mescroll-empty.png?v=1
						// icon : 空布局的图标路径 (支持网络路径)
						// tip : 提示文本
						// btnText : 按钮文本
						// fixed : 是否使用定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,所以最终还是会降级为absolute)
						// top : fixed定位的top值 (完整的单位值,如"100rpx", "10%";)
						// zIndex : fixed定位z-index值
					},
					textNoMore: "我也是有底线的" //没有更多数据的提示文本
				},
				totalping:"",
				strings:'',
				stock:'',
				danprice:"",
			}
		},
		onLoad(option) {
			// #ifdef MP-WEIXIN
				const demo = uni.getMenuButtonBoundingClientRect() || ''
				console.log(demo)
				if (demo == '') {
					return
				}
				console.log(demo)
				this.demo = demo
			// #endif
			this.findParentList()
			uni.$on('classindex',(data)=>{
			    console.log('监听到事件来自 update ，携带参数 msg 为：' + data);
				this.tabIndex=data.msg
				this.tabClick(data.msg,data.id)
			})
		},
		methods: {
			chooseSecond(v,index){//二级分类的点击事件
				console.log(v)
				this.two_count=index
				this.categoryId=v.id //二级分类的id
				this.downCallback()
			},
			tosearch(){
				uni.navigateTo({
					url:'/pages/client/home/search/search'
				})
			},
			goshop(v){
				this.specificationindex='p'  //这个是点击购物车图标清空样式
				this.specificationsId=''    //这个是点击购物车图标让规格id清空
				this.goodsgetById(v.id)
				this.$refs.popups.open()
				
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
			goodsgetById(v){//商品详情  规格
				this.api.goodsgetById({
					id:v
				}).then(res=>{
					this.shopdetail=res.data
					let showFigure=res.data.showFigure.split(',')
					this.specificationimg=showFigure[0] //规格默认图片是轮播图第一个
				})
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
			createorder() {
				if(this.specificationsId==''){
					this.tui.toast('请选择规格')
					return
				}
				this.api.addshoppingCar({
					specificationsId:this.specificationsId,//规格id
					quantity:this.buynum,//数量
				}).then(res=>{
					this.$refs.popups.close()
					uni.$emit('shoppingun',{msg:'购物车更新'})
					this.tui.toast('添加成功,在购物车亲~')
				})

			},
			tabClick(index,v) { //一级分类的点击事件
				this.switchTab(index);
				this.parentId=v.id  //一级分类的id
				this.findListByParentId()
				
			},
			switchTab(index) {
				if (this.tabIndex === index) return;
				this.tabIndex = index;
				let scrollIndex = index - 1 < 0 ? 0 : index - 1;
				console.log(scrollIndex)
				this.scrollInto = this.tabBars[scrollIndex].code;
				console.log(this.scrollInto)
			},
			findParentList(){//一级分类
				this.api.findParentList().then(res=>{
					console.log(res.data)
					this.tabBars=res.data
					this.parentId=this.tabBars[0].id
					console.log(this.parentId,'一级的id')
					this.findListByParentId()
				})
			},
			findListByParentId(){ //二级分类
				this.api.findListByParentId({
					parentId:this.parentId //一级的id
				}).then(res=>{
					this.two_items=res.data
					this.categoryId=this.two_items[0].id
					console.log(this.categoryId,'二级分类id')
					this.chooseSecond(this.two_items[0],0)
					this.downCallback()
				})
			},
			goparticulars(v){//每个商品的点击事件
				uni.navigateTo({
					url:'/pages/client/home/shopDetail/shopDetail?shopid=' + v.id
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
					categoryId:this.categoryId, //二级分类
				}
				this.api.findListByCategoryId(params)
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
							if (page.num == 1) this.three_items = []; //如果是第一页需手动置空列表
							this.three_items = this.three_items.concat(curPageData); //追加新数据
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

<style lang="scss">
	@font-face {
		font-family: test1-icon;
		src: url('~@/static/font/iconfont.ttf');
	}

	.container {
		background-color: #FFFFFF;
		width: 750rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.container .search{
		width: 690rpx;
		height: 64rpx;
		background: #F0F0F0;
		border-radius: 53rpx;
		display: flex;
		align-items: center;
		margin: 0rpx auto 20rpx auto;
	}
	.container image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.search image{
		width: 29rpx;
		height: 29rpx;
	}
	.search text{
		font-size: 26rpx;
		font-weight: 400;
		line-height: 37px;
		color: #C5C5C5;
	}


	.subject {
		width: 750rpx;
		// position: fixed;
		// top: 63rpx;
		border-top: 1rpx solid #F3F3F3;
		z-index: 9999;
		background-color: #FFFFFF;
		.one_items {
			white-space: nowrap;
			height:80rpx;
			.one_item {
				display: inline-block;
				font-size: 30rpx;
				color: #999999;
				line-height: 80rpx;
				font-weight: bold;
				margin: 0 15rpx;
			}
			.one_active {
				color: #333333;
			}
		}
	}

	.SecondaryClassification {
		width: 100%;
		display: flex;
		background: #FFFFFF;
		flex-direction: row;
		height: calc(100% - 100rpx);
		.two_items {
			width: 192rpx;
			background-color: #f2f4f8;
			position: fixed;
			z-index: 99;
			height: 100%;
			.two_item {
				padding: 25rpx 15rpx 25rpx 10rpx;
				color: #666666;
				font-size: 28rpx;
				background: #000000;
				font-weight: 400;
				background-color: #f2f4f8;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				text {
					padding-left: 24rpx;
				}
			}
			.two_active {
				color: #333333;
				background-color: #FFFFFF;
				text {
					border-left: 7rpx solid #FBC824;
					font-weight: bold;
				}
			}
		}

		.ThreeLevelClassification {
			flex: 1;
			background-color: #FFFFFF;
			height: calc(100% - 600rpx);
			margin-left: 192rpx;
			// padding: 0 31rpx 0 16rpx;
			.three_items {
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				.three_item {
					background-color: #FFFFFF;
					border-bottom: 1rpx solid #f3f3f3;
					height: 224rpx;
					padding: 0 31rpx 0 16rpx;
					display: flex;
					flex-direction: row;
					align-items: center;

					.img {
						width: 161rpx;
						height: 161rpx;
						background-color: #CCCCCC;
					}

					.item_msg {
						display: flex;
						flex-direction: column;
						margin-left: 22rpx;
						height: 161rpx;
						justify-content: space-between;

						.name {
							font-size: 28rpx;
							color: #333333;
							line-height: 39rpx;
							font-weight: 400;
							width: 290rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.item-price_cart {
							display: flex;
							justify-content: space-between;
							.price {
								font-size: 36rpx;
								font-family: DIN;
								font-weight: 500;
								line-height: 30rpx;
								color: #FF4600;
								opacity: 1;
							}
							.icon {
								width: 50rpx;
								height: 50rpx;
							}
						}
					}
				}
			}
		}
	}
	.no_data_img{
		width: 398rpx!important;
	}
	.ttop{
		background: #FFFFFF;
		position: fixed;
		z-index: 99;
	}

	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	.tui-scroll-h {
		width: 750rpx;
		height: 80rpx;
		background-color: #ffffff;
		flex-direction: row;
		white-space: nowrap;
		position: fixed;
		top: 44px;
		left: 0;
		z-index:999;
	}
	
	.tagsshi{
		position: absolute;
		z-index: 9;
		width: 161rpx;
		background: #FF4600;
		color: #FFFFFF;
		text-align: center;
		font-size: 22rpx;
		bottom: 0;
		border-radius: 0px 0px 6px 6px;
	}
	.tui-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		padding: 0 14rpx;
	}
	
	.tui-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	
	.tui-tab-item-title-active {
		color: #5677fc;
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
	}
	.shanchu{
		font-size: 24rpx;
		font-family: DIN;
		font-weight: 500;
		line-height: 30rpx;
		color: #999999;
		opacity: 1;
		text-decoration:line-through;
		margin-left: 20rpx;
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
	.Choosespecifications .count {
		display: flex;
		align-items: center;
		height: 100rpx;
		padding-bottom: 100rpx;
	}
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
	.count .icon {
		width: 46rpx;
		height: 40rpx;
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
</style>

