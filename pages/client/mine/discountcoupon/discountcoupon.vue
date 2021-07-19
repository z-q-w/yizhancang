<template>
	<view class="container">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="" v-for=" item in coupondata" style="display: flex;justify-content: space-between;">
				<view :class="item.status!=3 ? 'item' :'item pastdue'">
					<view :class="item.status!=3 ? 'price' :'unprice'">
						<text class="left">￥</text>
						<text class="right">{{item.favorablePrice}}</text>
					</view>
					<view class="item_msg">
						<text :class="item.status!=3 ? 'top' :'untop'" class="top">{{item.name}}</text>
						<text :class="item.status!=3 ? 'bottom' :'unbottom'">有效期至：{{item.endTime}}</text>
					</view>
					<text class="use" @click="employ(item.status)">{{item.status!=3?'立即使用':'已失效'}}  </text>
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
				coupondata:[],
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
		methods:{
			employ(v){
				if(v !=3){
					uni.switchTab({
						url:'/pages/client/classify/classify'
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
				this.api.couponfindPage(params)
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
							if (page.num == 1) this.coupondata = []; //如果是第一页需手动置空列表
							this.coupondata = this.coupondata.concat(curPageData); //追加新数据
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage);
							this.coupondata.forEach(item=>{
								item.endTime=item.endTime.substring(0,10)
								console.log(this.coupondata.endTime)
							})
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
	.item{
		width: 670rpx;
		height: 196rpx;
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1D251D41FB3C4DF5967E2F8E762F67C975.png)  no-repeat;
		background-size: 100% 100%;
		margin-left: 40rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		position: relative;
	}
	 .item .price{
		height: 133rpx;
		line-height: 133rpx;
		width: 230rpx;
		color: #ffc300;
		margin-left: 22rpx;
		text-align: center;
	}
	.item .unprice{
		height: 133rpx;
		line-height: 133rpx;
		color: #CCCCCC;
		margin-left: 22rpx;
		width: 230rpx;
		text-align: center;
	}
	.left{
		font-size: 40rpx;
		font-weight: bold;
	}
	 .right{
		font-size: 74rpx;
		font-weight: bold;
	}
	 .item .item_msg{
		display: flex;
		flex-direction: column;
		height: 70rpx;
		border-left: 1rpx solid #8e6954;
		padding-left: 30rpx;
		width: 400rpx;
	}
	.top{
		font-size: 26rpx;
		font-weight: 400;
		color: #140005;
		margin-bottom: 10rpx;
	}
	.untop{
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
		margin-bottom: 10rpx;
	},
	.bottom{
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
	}
	.unbottom{
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
	}
	 .item .use{
		font-size: 26rpx;
		color: #333333;
		font-weight: 400;
		writing-mode: vertical-rl;
		line-height: 37rpx;
		width: 100rpx;
		text-align: center;
		box-sizing: border-box;
		padding-right: 26rpx;
	}
	.pastdue{
		background: url(https://yizhancang.oss-cn-hangzhou.aliyuncs.com/67B427C2C2D7417BA419C0EBD85CAA4D108.png) no-repeat;
		background-size: 100% 100%;
	}
</style>
