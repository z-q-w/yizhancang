<template>
	<view class="container" >
		<view class="commodity_item" v-for="(item,index) in orderdetaldata">
			<view class="order_item">
				<image :src="item.thumbnails" mode="" class="item_img"></image>
				<view class="item_msg">
					<text class="msg_name">{{item.goodsName}}</text>
					<text class="msg_specification">{{item.speName}}</text>
					<view class="msg_price">
						<text class="price">￥{{item.price}}</text>
						<text class="count">×{{item.quantity}}</text>
					</view>
				</view>
			</view>
			<view class="evaluate">
				<view class="top">
					<text>描述相符</text>
					<uni-rate v-model="item.star" @change="onChange"/>
				</view>
				<view class="evaluatebox">
					<textarea value="" v-model="item.content" placeholder="写出你的感受(最多五十个字符)"  class="textarea" maxlength="50"/>
					<view class="" style="display: flex;">
						<view style="position: relative ;"  v-for="(item,ind) in item.url" @tap.stop="previewImage(ind,item.url)">
							<image @tap.stop="deleteimg(item,ind,index)" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/B5CC465F42FD4503B08D34D5A80CE83D89.png" mode="" style="width: 32rpx;height: 32rpx;position: absolute;top: 10rpx;right:20rpx;z-index: 999;"></image>
							<image class="imgbox" :src="item" mode="aspectFill"></image>
						</view> 
						<view class="imgbox" v-if="item.url.length < 3" @click="uploadImage(index)">
							<view class="imgboxjia">+</view>
							<view class="">添加图片</view>
							<view class="">（最多三张）</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="affirmbtn">
			确认提交
		</view>
	</view>
</template>

<script>
	import urlConfig from '../../../../../../common/api/config.js'
	export default{
		data(){
			return{
				value:5,
				orderdetalis:'',//订单id
				orderdetaldata:"",
				arr:[],
				apiEvaluat: []

			}
		},
		onLoad(option) {
			this.orderdetalis=option.orderdetalis
			this.orderdetail()
		},
		methods:{
			orderdetail(){ //详情
				this.api.orderdetail(
					this.orderdetalis.toString()
				).then(res=>{
					console.log(res)
					this.orderdetaldata=res.data.goodsList
				})
			},
			previewImage: function(index,imageList) {//预览图片
				if (!imageList.length) return;
				console.log(index,imageList)
				uni.previewImage({
					current: imageList[index],
					loop: true,
					urls: imageList
				})
				console.log(this.list)
			},
			deleteimg(v,ind,index){
				this.orderdetaldata[index].url.splice(ind,1)
			},
			affirmbtn(){//确认提交
				let arr = []
				this.orderdetaldata.forEach((item,index)=>{
					let obj = {}
					obj.specificationsId=item.speId
					obj.goodsId=item.goodsId
					obj.star=item.star
					obj.content=item.content
					obj.url=item.url.length>0 ? item.url.join(",") : ''
					arr.push(obj)
				})
				if(arr != ''){
					// arr.forEach(item=>{
					// 	if(item.star==''){
					// 		this.tui.toast('请对商品进行星级评价')
					// 	}else{
					// 		
					// 	}
					// })
					let nostar=true
					for (var i = 0; i < arr.length; i++) {
						if(arr[i].star==''){//只有走到这里就说明有商品没有评价
							this.tui.toast('请对商品进行星级评价')
							nostar=false
							break
						}
					}
					if(nostar){
						this.api.evaluateinsert({
							"orderId":this.orderdetalis, //订单id
							"apiEvaluateInsertReqVoList":arr
						}).then(res=>{
							this.tui.toast('评价成功')
							uni.navigateBack({
								delta:1
							})
							uni.$emit('orderupdata',{msg:'更新订单'})
						})
					}
					
				}
				
			},
			onChange(e){
				this.value=e.value
			},
			uploadImage(index){//上传图片
				if(this.orderdetaldata[index].url.length>=3){
					this.tui.toast('最多上传3张图片')
					return
				}
			    var that = this
			    const accessToken = that.cacheHelper.getToken();
			    uni.chooseImage({
					count:3 - this.orderdetaldata[index].url.length,//我这里是最多三张照片
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success (res) {
						var tempFilePaths = res.tempFilePaths;//这里会返回数组
						for (var i = 0; i < tempFilePaths.length; i++) {  //比如有三张会循环三次依次上传
							uni.uploadFile({
								 url: urlConfig+ 'api/upload/uploads', //仅为示例，非真实的接口地址
								 filePath: tempFilePaths[i],
								name: 'file',
								header: {
									'token': accessToken
								},
								success: function success(res) {
									console.log(res,'上传图片')
									var newImg = JSON.parse(res.data);
									console.log(newImg.data.msg)
									if(res.statusCode == 200){
										console.log(typeof that.orderdetaldata[index].url)
										if(typeof that.orderdetaldata[index].url == 'string'){
											that.orderdetaldata[index].url=that.orderdetaldata[index].url.split('')
										}
										that.orderdetaldata[index].url.push(newImg.data.msg)
									}
								},
								fail: function fail(err) {
									console.log(err);
								}
							});
						}
					}
			    });
			},
		}
	}
</script>
<style scoped>
	.container{
		width: 750rpx;
		min-height: 100%;
		padding-bottom: 100rpx;
	}
	.commodity_item{
		width: 750rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-top: 33rpx;
	}
	.commodity_item .order_item {
		box-sizing: border-box;
		padding: 0 23rpx;
		display: flex;
		margin-bottom: 31rpx ;
		height: 220rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		align-items: center;
	}
	
	.order_item .item_img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}
	
	.order_item .item_msg {
		display: flex;
		flex-direction: column;
	}
	
	.item_msg .msg_name {
		width: 484rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.item_msg .msg_specification{
		font-size: 22rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		margin-top: 8rpx;
	}
	.item_msg .msg_price{
		display: flex;
		align-items: center;
	}
	.msg_price .price{
		font-size: 28rpx;
		color: #FF4600;
		line-height: 30rpx;
		font-weight: 500;
		margin-right: 360rpx;
	}
	.msg_price .count{
		font-size: 22rpx;
		color: #212121;
	}
	.commodity_item .evaluate{
		width: 710rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 31rpx;
		padding-bottom: 60rpx;
	}
	.evaluate .top{
		display: flex;
		margin-left: 25rpx;
		padding-top: 20rpx;
		align-items: center;
	}
	.top text{
		font-size:30rpx ;
		color: #333333;
		font-weight: 400;
		margin-right: 22rpx;
	}
	.evaluatebox{
		margin-left: 31rpx;
		width: 648rpx;
		background-color: #F5F5F5;
		border-radius: 20rpx;
		margin-top: 25rpx;
		box-sizing: border-box;
		padding: 26rpx 23rpx 20rpx 23rpx;
	}
	.container .btn{
		width: 710rpx;
		height: 94rpx;
		border-radius: 10rpx;
		background: linear-gradient(180deg,#ffb300 0%,#fbc824 100%);
		line-height: 94rpx;
		text-align: center;
		margin-top: 163rpx;
		margin-left: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	.imgbox{
		width:160rpx;
		height:169rpx;
		background:#E3E3E3;
		border-radius:12rpx;
		color:rgba(204,204,204,1);
		text-align: center;
		font-size:22rpx;
		margin-right: 20rpx;
	}
	.imgboxjia{
		font-size: 80rpx;
		line-height: 90rpx;
	}
</style>
