<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<view class="search">
			<navigator url="" open-type="navigateBack">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/C67F683EF95D4B18B4AFA83F5F8A29A5131.png" mode="" class="back"></image>
			</navigator>
			<view class="int">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/A4BF79B4C40D4FC69C098BA30C069B0C31@3x.png" mode=""></image>
				<input type="text" value="" placeholder="搜索商品" />
			</view>
			<text>搜索</text>
		</view>
		<!-- #endif -->
		<view class="header">
			<view class="type_item" v-for="(item,index) in type" :key="index">
				<text :class="item.active?'active':''">{{item.text}}</text>
				<view class="state">
					<image :src="item.icons" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="commodity">
			<view class="commodity_item">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AE83497CB7E341379306C79FE7B9EA1066.png" mode="widthFix"></image>
				<text class="name">家智能玩具很垃圾很垃圾很好</text>
				<view class="msg">
					<text class="price">￥123.0</text>
					<text class="count">已售:300</text>
				</view>
			</view>
			<view class="commodity_item">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AE83497CB7E341379306C79FE7B9EA1066.png" mode="widthFix"></image>
				<text class="name">家智能玩具很垃圾很垃圾很好</text>
				<view class="msg">
					<text class="price">￥123.0</text>
					<text class="count">已售:300</text>
				</view>
			</view>
			<view class="commodity_item">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AE83497CB7E341379306C79FE7B9EA1066.png" mode="widthFix"></image>
				<text class="name">家智能玩具很垃圾很垃圾很好</text>
				<view class="msg">
					<text class="price">￥123.0</text>
					<text class="count">已售:300</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:[
					{
						text:"综合",
						state:'',
						icons:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AE83497CB7E341379306C79FE7B9EA1066.png',
						active:true
					},
					{
						text:'销量',
						state:'',
						icons:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AE83497CB7E341379306C79FE7B9EA1066.png',
						active:false
					},
					{
						text:'价格',
						state:'',
						icons:'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/AE83497CB7E341379306C79FE7B9EA1066.png',
						active:false
					}
				]
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height:100%;
		box-sizing: border-box;
		padding: 0 26rpx;
		background-color: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
	.container .search{
		width: 750rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
	.search .back{
		width:16rpx ;
		height: 28rpx;
	}
	.search .int{
		position: relative;
		width: 530rpx;
		height: 52rpx;
		display: flex;
		align-items: center;
		border-radius: 48rpx;
		overflow: hidden;
		margin-left: 60rpx;
		margin-right: 30rpx;
	}
	.int image{
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		top: 10rpx;
		left: 32rpx;
	}
	.int input{
		width: 530rpx;
		height: 52rpx;
		background-color: #f5f5f5;
		box-sizing: border-box;
		padding-left: 85rpx;
	}
	.int text{
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #212121;
	}
	/* #endif */
	.container .header{
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.header .type_item{
		display: flex;
		align-items: center;
		margin-right: 66rpx;
	}
	.type_item text{
		font-size: 28rpx;
		color: #333333;
		font-weight: 400;
		margin-right: 10rpx;
	}
	.type_item .active{
		color: #FFC300;
	}
	.type_item .state{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.type_item .state image{
		width: 14rpx;
	}
	.container .commodity{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.commodity .commodity_item{
		width: 340rpx;
		height: 488rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 3px 6px rgba(0,0,0,.1);
		border-radius: 8rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	.commodity_item image{
		width: 340rpx;
		height: 340rpx;
		border-radius: 8rpx;
	}
	.commodity_item .name{
		margin-top: 18rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		width: 294rpx;
		margin-left: 16rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #212121;
		font-weight: 400;
	}
	.commodity_item .msg{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 20rpx 0 16rpx;
		margin-top: 30rpx;
	}
	.msg .price{
		font-size: 36rpx;
		font-weight: 500;
		line-height: 30rpx;
		color: #ff4600;
	}
	.msg .count{
		font-size: 22rpx;
		color: #666666;
		font-weight: 400;
		line-height: 30rpx;
	}
</style>
