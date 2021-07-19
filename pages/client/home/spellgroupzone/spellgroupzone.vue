<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<navigator url="" open-type="navigateBack" class="back" :style="'height:'+demo.height+'px;'+'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/5D824D8E2F39487F9C854B3C9E75FB4D131.png" mode=""></image>
		</navigator>
		<!-- #endif -->
		<view class="header">
			<view class="left">
				<text class="top">拼团购物狂欢</text>
				<text class="bottom">多人拼团享受超低价</text>
			</view>
			<view class="right">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/C8FF340006234C40A3AD5C6EAB90524A80.png" style="margin-top: 100rpx;width: 294rpx;height: 255rpx;" mode=""></image>
			</view>
		</view>
		<view class="discountsLists">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" :height='1200' @down="downCallback" @up="upCallback">
				<view class="spellgroupitem" v-for="item in spellgroup" @click="Inthegroup(item)">
					<image :src="item.thumbnails" mode="" class="item_img"></image>
					<view class="item_msg">
						<text class="msg_name">{{item.name}}</text>
						<text class="msg_type">{{item.tagsName}}</text>
						<view class="msg_price">
							<view class="price">
								<text class="new_Price">￥{{item.price}}</text>
								<text class="old_Price">单买￥{{item.originPrice}}</text>
							</view>
							<text class="btn">去拼团</text>
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
				demo:{
					top:0,
					height:0,
				},
				spellgroup:[],
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
		onLoad() {
			// #ifdef MP-WEIXIN
			const demo = uni.getMenuButtonBoundingClientRect() || ''
			console.log(demo)
			if (demo == '') {
				return
			}
			console.log(demo)
			this.demo.top = demo.top
			this.demo.height = demo.height
			// #endif
		},
		methods:{
			//去拼团
			Inthegroup(v) {
				uni.navigateTo({
					url: '../../classify/commoditydetails/commoditydetails?shopid=' + v.id
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
					type:'2'
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
							if (page.num == 1) this.spellgroup = []; //如果是第一页需手动置空列表
							this.spellgroup = this.spellgroup.concat(curPageData); //追加新数据
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
	.container {
		width: 750rpx;
		min-height: 100%;
	}

	.container .back {
		position: fixed;
		/* #ifdef APP-PLUS */
		top: 71rpx;
		/* #endif */
		left: 49rpx;
		width: 16rpx;
		height: 87rpx;
		display: flex;
		align-items: center;
		z-index: 999;
	}

	.back image {
		width: 16rpx;
		height: 28rpx;
	}

	.container .header {
		width: 750rpx;
		height: 451rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/690F3462A19E49EF80A7115EC75AB65F79.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
	}

	.header .left {
		display: flex;
		flex-direction: column;
		margin: 180rpx 9rpx 0 42rpx;
	}

	.header .left .top {
		font-size: 60rpx;
		color: #FFFFFF;
		font-weight: 800;
		line-height: 84rpx;
	}

	.header .left .bottom {
		font-size: 30rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: #FFFFFF;
		margin-top: 12rpx;
	}
	.discountsLists{
		background: #FFFFFF;
		margin: -60rpx 30rpx 0 30rpx;
		border-radius: 18rpx;
	}
	.spellgroupitem {
		width: 100%;
		height: 290rpx;
		display: flex;
		box-sizing: border-box;
		border-bottom: 2rpx solid #F8F8F8;
		padding: 30rpx 20rpx 0 20rpx;
	}

	.item_img {
		width: 214rpx;
		height: 214rpx;
		margin-left: 11rpx;
		margin-right: 21rpx;
	}

	.item_msg {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.item_msg .msg_name {
		text-overflow: ellipsis;
		font-size: 28rpx;
		font-weight: 400;
		color: #140005;
		line-height: 40rpx;
		margin-bottom: 12rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		min-height: 80rpx;
	}

	.item_msg .msg_type {
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		font-weight: 400;
		margin-bottom: 24rpx;
	}

	.item_msg .msg_price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding-right: 20rpx;
	}

	.msg_price .price {
		display: flex;
		flex-direction: column;

	}

	.price .new_Price {
		font-size: 30rpx;
		font-weight: 400;
		line-height: 33rpx;
		color: #FF4600;
	}

	.price .old_Price {
		font-size: 22rpx;
		color: #999999;
		line-height: 30rpx;
		font-weight: 400;
		text-decoration: line-through;
	}

	.msg_price .btn {
		width: 140rpx;
		height: 56rpx;
		background: linear-gradient(267deg, #ffb300 0%, #fbc824 100%);
		border-radius: 100rpx;
		text-align: center;
		line-height: 56rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
	}
</style>
