<template>
	<view class="container">
		<view class="" style="display: flex;flex-wrap: wrap;">
			<view :class="item.delFlag==1?'favorite_item':'unfavorite_item'" v-for="item in favorite" @click="myshouitem(item)">
				<image v-if="item.delFlag!=1" src="../../../../static/icons/xiajia.png" mode="" style="width: 150rpx;height: 150rpx;position: absolute;z-index: 9;margin: 55rpx 0 0 60rpx;"></image>
				<view v-if="item.tags !=''" style="position: absolute;z-index: 9;top: 20rpx;background: #FFC300;font-size: 22rpx;padding: 5rpx 10rpx;opacity:0.8;border-radius: 6rpx;">{{item.tags}}</view>
				<image :src="item.thumbnails" mode="" class="favorite_itemimage"></image>
				<image v-if="pitchup" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/28216D0F0DC14AE1B570C9D13109140739@2x.png" mode="" class="favorite_itemcheck"></image>
				<image v-if= "arr.includes(item.goodsId)" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/E2E0EDAB28544C8C95DFF42C323F465532@2x.png" mode="" class="favorite_itemcheck"></image>
				<text class="favorite_itemlabel">{{item.tagsList}}</text>
				<text class="favorite_itemprice">¥{{item.price}}</text>
			</view>
		</view>
		<view class="" style="height: 130rpx;"></view>
		<view class="faboritebottom">
			<view class="" style="text-align: center;" v-if="!pitchup" @click="removed">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/1D3CCED795A84BB8BF090791786478A1guali.png" mode="" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
				<view class="" style="font-size: 28rpx;color: #999999;text-align: center;">管理</view>
			</view>
			<view class="" style="text-align: center;" v-if="pitchup && arr.length!=0" @click="removesc">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/5EEC4DC6F9CB48298828147E56DC5AF0shanchu.png" mode="" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
				<view class="" style="font-size: 28rpx;color: #999999;text-align: center;">删除</view>
			</view>
			<view class="" style="text-align: center;" v-if="pitchup" @click="removed">
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/EC593F9A82FC4887B95C1C626C57EC31quxiao1.png" mode="" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
				<view class="" style="font-size: 28rpx;color: #999999;text-align: center;">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				favorite:[],
				pitchup:false,
				arr:[],
			}
		},
		onLoad() {
			this.favoritesfindPage()
		},
		methods:{
			removed(){
				this.pitchup= !this.pitchup
			},
			myshouitem(v){
				if(this.pitchup){
					if(this.arr.includes(v.goodsId)){  //如果找到这条数据就清除这个数据
						this.arr=this.arr.filter(function (ele){//清空样式
							return ele != v.goodsId;
						});
						console.log(this.arr)
					}else{
						console.log(this.arr)
						this.arr.push(v.goodsId)
					}
				}else{
					if(v.delFlag==1){ //只有等于1 delFlag  才是没有被删除或者是被禁用
						uni.navigateTo({
							url:'/pages/client/home/shopDetail/shopDetail?shopid=' + v.goodsId
						})
					}else{
						this.tui.toast('该商品已下架')
					}
				}
			},
			removesc(){
				this.api.favoritescancel({
					goodsId:this.arr
				}).then(res=>{
					this.tui.toast('取消成功')
					this.favoritesfindPage()
					this.arr=[]
					this.pitchup=false
				})
			},
			favoritesfindPage(){
				let params = {
					current: 1,
					size: 100,
				}
				this.api.favoritesfindPage(params).then(res=>{
					this.favorite=res.data.records
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		min-height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	.favorite_item{
		width: 244rpx;
		height: 324rpx;
		background-color: #FFFFFF;
		position: relative;
		margin: 31rpx 3rpx 0 3rpx;
		
	}
	.favorite_itemimage{
		width: 244rpx;
		height: 244rpx;
	}
	.favorite_itemprice{
		margin-top: 18rpx;
		margin-left: 21rpx;
		font-size: 28rpx;
		color: #FF4600;
		font-weight: 500;
		line-height: 34rpx;
	}
	.favorite_itemlabel{
		position: absolute;
		left: 0;
		top: 23rpx;
		height: 30rpx;
		background-color: #FFC300;
		border-radius: 0rpx 4rpx 4rpx 0;
		text-align: center;
		line-height: 30rpx;
		font-size: 20rpx;
		color: #333333;
		font-weight: 400;
	}
	.favorite_itemcheck{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		opacity: 0.9;
	}
	.remove{
		width: 750rpx;
		height: 148rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	.remove image{
		width: 70rpx;
		height: 70rpx;
		box-shadow: 0rpx 0rpx 6rpx rgba(0,0,0,.06);
		/* border-radius: 50%; */
		margin-top: 24rpx;
	}
	.remove .title{
		font-size: 22rpx;
		color: #999999;
		margin-top: 8rpx;
		font-weight: 400;
		line-height: 30rpx;
	}
	.faboritebottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 110rpx;
		background: #FFFFFF;
	}
	.unfavorite_item{
		width: 244rpx;
		height: 324rpx;
		background-color: #e1e1e1;
		position: relative;
		margin: 31rpx 3rpx 0 3rpx;
		opacity: 0.8;
	}
</style>
