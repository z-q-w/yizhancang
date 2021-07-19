<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<view class="search" :style="'padding-right:'+(demo.width+10)+'px;'+'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<navigator url="" open-type="navigateBack">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/640B9F625156406B8D71012DD926FE4D131.png" mode="" class="back"></image>
			</navigator>
			<view class="int">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1057C130C0A4419DB0715802E3C2D30731@3x.png" mode=""></image>
				<input type="text" v-model="text" @confirm="confirmsou" value="" placeholder="搜索商品" />
			</view>
			<text @click="WeChatseek">搜索</text>
		</view>
		<!-- #endif -->
		<view class="" v-if="corserbottemlist.length==0">
			<view class="" style="padding: 30rpx 25rpx 35rpx 20rpx;display: flex;justify-content: space-between;">
				<text class="record">历史记录</text>
				<image @tap="emptyls" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/0F8098B561D3442CB1DE5F795C67C0F058.png" mode="" style="width:36rpx;height:36rpx;"></image>
			</view>
			<view class="" style="display: flex;flex-wrap: wrap;">
				<text class="holder" v-for="(item,index) in historical" :key="index" @click="historybtn(item)">
					{{item}}
				</text>
			</view>
			<tui-modal :show="displayer" @cancel="cancelsd" :custom="true">
				<view class="tui-modal-custom">
					<view class="tui-modal-custom-text" style="margin: 50rpx 0;">确认删除全部历史记录?</view>
					<view class="btn" style="display: flex;">
						<button class="white cancelBtn" style="width: 50%;" @tap="displayer=false">取消</button>
						<button class="white affirmBtn" style="width: 50%;" @tap="confirm">确认</button>
					</view>
				</view>
			</tui-modal>
			<view class="" style="padding: 30rpx 25rpx 35rpx 20rpx;display: flex;justify-content: space-between;">
				<text class="record">热门搜索</text>
			</view>
			<view class="" style="display: flex;flex-wrap: wrap;">
				<text class="holder" v-for="(item,index) in hotlist" :key="index" @click="historybtn(item)">
					{{item}}
				</text>
			</view> 
		</view>
		<view class="" style="display: flex;margin: 25rpx 0;" v-if="corserbottemlist.length!=0">
			<view class="" @click="synthesize" style="width: 150rpx;">
				<text :class="sortOrderVOS[0].column=='sort' ? 'unsearchname':'searchname'">综合</text>
				<image v-if="sortOrderVOS[0].column=='sort'" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/FEBF0C3B716C4308A3E8C25B0FE1F47Dserch1.png" mode="" style="width:22rpx;height: 16rpx;vertical-align: middle;"></image>
				<image v-else src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/A6E5AD782B094802A6282C99874ACBE9serch2.png" mode="" style="width:22rpx;height: 16rpx;vertical-align: middle;"></image>
			</view>
			<view class="" @click="sales" style="width: 150rpx;">
				<text :class="sortOrderVOS[0].column=='buyNum' ? 'unsearchname':'searchname'">销量</text>
				<image v-if="sortOrderVOS[0].sorts=='desc' && sortOrderVOS[0].column=='buyNum'" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/3AB26E177FA44703841C9FFE0BBBFB55serch3.png" mode="" style="width:20rpx;height: 30rpx;vertical-align: middle;"></image>
				<image v-if="sortOrderVOS[0].sorts=='asc' && sortOrderVOS[0].column=='buyNum'" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/DA735A5B29494545BC9C3EA7506CE0DEserch4.png" mode="" style="width:20rpx;height: 30rpx;vertical-align: middle;"></image>
				<image v-if="sortOrderVOS[0].column!='buyNum'" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/F3824E5520AA4C16ACAF010339BE9BB0serch5.png" mode="" style="width:19rpx;height: 29rpx;vertical-align: middle;"></image>
			</view>
			<view class="" @click="scprice" style="width: 150rpx;">
				<text :class="sortOrderVOS[0].column=='price' ? 'unsearchname':'searchname'">价格</text>
				<image v-if="sortOrderVOS[0].sorts=='desc' && sortOrderVOS[0].column=='price'" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/3AB26E177FA44703841C9FFE0BBBFB55serch3.png" mode="" style="width:20rpx;height: 30rpx;vertical-align: middle;"></image>
				<image v-if="sortOrderVOS[0].sorts=='asc' && sortOrderVOS[0].column=='price'" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/DA735A5B29494545BC9C3EA7506CE0DEserch4.png" mode="" style="width:20rpx;height: 30rpx;vertical-align: middle;"></image>
				<image v-if="sortOrderVOS[0].column!='price'" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/F3824E5520AA4C16ACAF010339BE9BB0serch5.png" mode="" style="width:19rpx;height: 29rpx;vertical-align: middle;"></image>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" class="discuss" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view class=""  style="display: flex;justify-content: space-between;flex-wrap: wrap;">
				<view class="specialzone_item" v-for="(item,index) in corserbottemlist" :key='index' @click="referrerBtn(item)">
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
</template>

<script>
	import tuiModal from '@/components/modal/modal';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		components: {
			tuiModal
		},
		data(){
			return{
				demo:{},
				historical:[],//历史记录
				text:'',
				displayer:false,
				hotlist:[],//热门搜索
				corserbottemlist:[],
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				sortOrderVOS:[
					{
						"column":"sort", //综合
						"sorts": "asc"
					}
				],
				upOption: {
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
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
		
		onNavigationBarSearchInputChanged(e) {  			//监听原生标题栏搜索输入框输入内容变化事件
			this.text = e.text;
			console.log(e)
		},
		onNavigationBarButtonTap(e) { 						//监听原生标题栏按钮点击事件
			// #ifdef APP-PLUS
			//清除原生导航栏的值
			// const currentWebview = this.$scope.$getAppWebview();
			// currentWebview.setTitleNViewSearchInputText('');
			// #endif
			uni.hideKeyboard()  //收起键盘
			console.log(this.text)
			this.historyrecord() ////历史记录数据
			this.downCallback()
		},
		
		onNavigationBarSearchInputConfirmed(){    			//用户点击软键盘上的“搜索”按钮时触发
			console.log('ddfffff')
			uni.hideKeyboard()
			this.historyrecord()  //历史记录数据
			this.downCallback()
		},
		
		onLoad() {
			// #ifdef MP-WEIXIN
			const demo = uni.getMenuButtonBoundingClientRect() || ''
			console.log(demo)
			if (demo == '') {
				return
			}
			console.log(demo)
			this.demo=demo
			// #endif
			this.historical=uni.getStorageSync('qwhistorical')
			console.log(this.historical)
			this.popularSearch()
		},
		methods: {
			confirmsou(){
				uni.hideKeyboard()
				this.historyrecord()  //历史记录数据
				this.downCallback()
			},
			historybtn(v){//点击历史记录
				console.log(v)
				this.text=v
				// #ifdef APP-PLUS
				const currentWebview = this.$scope.$getAppWebview();
				currentWebview.setTitleNViewSearchInputText(v);
				// #endif
				this.downCallback()
			},
			// #ifdef MP-WEIXIN
			WeChatseek(){//微信小程序搜索事件
				uni.hideKeyboard()  //收起键盘
				this.historyrecord()
				this.downCallback()
			},
			// #endif
			cancelsd(){//取消弹窗
				this.displayer=false
			},
			popularSearch(){//热门搜索
				this.api.popularSearch().then(res=>{
					this.hotlist=res.data
					console.log('热门搜索',res.data)
				})
			},
			referrerBtn(v){ //下面的每一个列表事件
				uni.navigateTo({
					url:'/pages/client/home/shopDetail/shopDetail?shopid=' + v.id
				})
			},
			historyrecord(){ //历史记录数据
				if(this.historical.length>0){
					if(this.historical.indexOf(this.text) !== -1) { // 有相同的，先删除 再添加
						this.historical.splice(this.historical.indexOf(this.text), 1)
						if(this.text != ''){
							this.historical.unshift(this.text)
						}
					} else { // 没有相同的 添加
						if(this.text != ''){
							this.historical.unshift(this.text)
						}
					}
					console.log(this.historical)
				}else{ // 没有数据 添加
					this.historical=[]
					console.log(this.historical instanceof Array)
					if(this.text != ''){
						this.historical.unshift(this.text)
					}
				}
				if(this.historical.length > 6) { // 保留六个值
					this.historical.pop()
				}
				uni.setStorageSync('qwhistorical',this.historical)
			},
			synthesize(){//综合
				this.sortOrderVOS[0].column='sort'
				this.sortOrderVOS[0].sorts='asc'
				this.downCallback()
			},
			sales(){//销量
				this.sortOrderVOS[0].column='buyNum'
				if(this.sortOrderVOS[0].sorts=='desc'){
					this.sortOrderVOS[0].sorts='asc'
				}else{
					this.sortOrderVOS[0].sorts='desc'
				}
				this.downCallback()
			},
			scprice(){
				this.sortOrderVOS[0].column='price'
				if(this.sortOrderVOS[0].sorts=='desc'){
					this.sortOrderVOS[0].sorts='asc'
				}else{
					this.sortOrderVOS[0].sorts='desc'
				}
				this.downCallback()
			},
			emptyls(){//删除按钮弹窗
				this.displayer=true
			},
			confirm(){//删除历史记录确定按钮
				this.displayer=false
				this.historical = []
				uni.removeStorageSync('qwhistorical');
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let params = {
					"current": page.num,
					"size": page.size,
					"keyword":this.text,//搜索词
					"sortOrderVOS":this.sortOrderVOS
				}
				this.api.searchList(params)
					.then((res) => {
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
							console.log(this.corserbottemlist)
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 500)
					}).catch((err) => {
						console.log("ssss")
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
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 0 31rpx;
	}
	/* #ifdef MP-WEIXIN */
	.container .search{
		/* height: 88rpx; */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.search .back{
		width:16rpx ;
		height: 28rpx;
	}
	.search .int{
		position: relative;
		width: 380rpx;
		height: 52rpx;
		display: flex;
		align-items: center;
		border-radius: 48rpx;
		overflow: hidden;
	}
	.int image{
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		top: 10rpx;
		left: 32rpx;
	}
	.int input{
		width: 380rpx;
		height: 52rpx;
		background-color: #f5f5f5;
		box-sizing: border-box;
		padding-left: 85rpx;
	}
	.search text{
		font-size: 25rpx;
		font-weight: 400;
		color: #212121;
	}
	/* #endif */

	.container .header{
		margin-top: 40rpx;
	}
	.header .title{
		margin-left: 20rpx;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 42rpx;
		color: #333333;
	}
	.header .lists{
		margin-top: 26rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.lists .item{
		width: 212rpx;
		height: 70rpx;
		margin-bottom: 26rpx;
		text-align: center;
		border-radius: 12rpx;
		background-color: #F5F5F5;
		line-height: 70rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #212121;
	}
	.header .history{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.history image{
		width: 36rpx;
		height: 39rpx;
	}
	.record{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.holder{
		height:59rpx;
		background:rgba(242,244,248,1);
		border-radius:12rpx;
		text-align: center;
		line-height: 59rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		color:rgba(102,102,102,1);
		margin: 20rpx 25rpx;
		padding: 0 40rpx;
	}
	.fankas{
		margin: 30rpx;
		padding: 30rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 2px rgba(0,0,0,0.16);
		opacity:1;
		border-radius:12px;
	}
	.fankas-type{
		width:83rpx;
		height:39rpx;
		background:linear-gradient(270deg,rgba(62,223,178,1) 0%,rgba(84,226,198,1) 100%);
		opacity:1;
		border-radius:18rpx 0rpx 18rpx 0px;
		text-align: center;
		line-height: 39rpx;
		color: #FFFFFF;
		margin-right: 30rpx;
	}
	.fankas-name{
		width:330rpx;
		height:40rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		overflow: hidden;
	}
	.allowed{
		width:101rpx;
		height:36rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(249,153,69,1);
		opacity:1;
	}
	.timedata{
		margin-top: 25rpx;
		height:36rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
	.typelistbox{
		margin-top: 25rpx;
		display: flex;
	}
	.typelist{
		display: inline-block;
		height:41rpx;
		background:#FDE5D5;
		border-radius:4rpx;
		padding: 5rpx 10rpx;
		margin-right: 15rpx;
		font-size: 25rpx;
		line-height: 41rpx;
	}
	.unmbuy{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		opacity: 1;
		text-align: right;
	}
	.home-techer{
		height:36rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:36rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		flex: 1;
		margin-top: 10rpx;
	}
	.home-baobtn{
		width:135rpx;
		height:46rpx;
		background:rgba(242,127,49,1);
		border-radius:23rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		line-height:36rpx;
		color:rgba(255,255,255,1);
		opacity:1;
		text-align: center;
		line-height: 46rpx;
		margin-top: 10rpx;
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
	.searchname{
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #333333;
		opacity: 1;
		margin-right: 10rpx;
	}
	.unsearchname{
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #FFC300;
		opacity: 1;
		margin-right: 10rpx;
	}
</style>
