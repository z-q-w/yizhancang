<template>
	<view style="background: #FFFFFF;min-height: 100%;padding: 30rpx;">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="userevaluation" v-for="item in pingdata">
				<view class="user_msg">
					<image :src="item.avatar" mode="" class="user_icon"></image>
					<view class="user_name">
						<text style="margin-bottom: 12 rpx;">{{item.nickname}}</text>
						<uni-rate :max="5" :value="item.star" :size="12"></uni-rate>
					</view>
					<text class="time">{{item.createTime}}</text>
				</view>
				<view class="details" style="margin: 20rpx 0;">
					<text style="font-size: 32rpx;">{{item.content==''?'此用户没有填写评价':item.content}}</text>
					<view class="details_img" >
						<image v-for="(imgitem,index) in item.urlList" :src="imgitem" mode="" @tap.stop="previewImage(index,item.urlList)"></image>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>
<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				shopid:'',
				pingdata:[],
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
			this.shopid=option.shopid
		},
		methods: {
			previewImage: function(index,imageList) {//预览图片
				uni.previewImage({
					current: imageList[index],
					loop: true,
					urls: imageList
				})
				console.log(this.list)
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
					goodsId:this.shopid
				}
				this.api.evaluatefindPage(params)
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
							if (page.num == 1) this.pingdata = []; //如果是第一页需手动置空列表
							this.pingdata = this.pingdata.concat(curPageData); //追加新数据
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.pingdata.forEach(item=>{
								let se=item.createTime.substring(0,10)
								item.createTime=se
							})
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
	.details text {
		width: 676rpx;
		font-size: 32rpx;
		margin-top: 25rpx;
		font-weight: 400;
		line-height: 37rpx;
		color: #140005;
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
</style>
