<template>
	<view class="container">
		<view class="header">
			<view class="order_item" v-for="item in orderdetaldata.goodsList">
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
		</view>
		<view class="cause">
			<view class="refundreason" @click="open">
				<view class="left">
					<text class="required">*</text>
					<text class="title">退款原因</text>
				</view>
				<view class="right">
					<text class="reason">{{reasonads}}</text>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/58EEAF8DBE1246F18E6E606D94AF2704124.png" mode=""></image>
				</view>
			</view>
			<view class="explain" style="display: flex;">
				<text class="title" style="margin-right: 20rpx;">退款说明</text>
				<textarea v-model="explain" style="height: 100rpx;font-size: 30rpx;flex: 1;" maxlength='50' placeholder="请输入退款原因最多五十字符" />
			</view>
		</view>
		<view class="money">
			<text class="title">退款金额</text>
			<text class="total">¥{{orderdetaldata.payPrice}}</text>
		</view>
		<view class=""  style="background: #FFFFFF;margin:20rpx;border-radius: 12rpx;padding: 20rpx;">
			<view class="" style="padding-bottom: 20rpx;">
				退款凭证(限3张）
			</view>
			<view class="imgseflex">
				<view style="position: relative ;"  v-for="(item,index) in imgList" @tap.stop="previewImage(index,imgList)">
					<image @tap.stop="deleteimg(item,index)" src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/EAD355B8E24340AA8059913676B2EC3D89.png" mode="" style="width: 32rpx;height: 32rpx;position: absolute;top: 10rpx;right:20rpx;z-index: 999;"></image>
					<image class="imgbox" :src="item" mode="aspectFill"></image>
				</view>
				<view class="imgbox" v-if="imgList.length < 3" @click="uploadImage">
					<view class="imgboxjia">+</view>
					<view class="">添加图片</view>
					<view class="">（最多三张）</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="present">
			提交
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="causeList">
				<text class="title">退款原因</text>
				<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/A75DD2247B4E4A1989868592004B3556101.png" class="cancel" mode=""></image>
				<scroll-view scroll-y="true" class="list">
					<view class="item" v-for="(item,index) in cause" :key="index" @tap="reasontochoose(item,index)">
						<text>{{item.name}}</text>
						<image :src="num==index?'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/6E4E4EABBF4B40B99CF973206B01439D102.png':'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/937CA4F38E6140A1BB466AF8C42B201C103.png'" mode=""></image>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import urlConfig from '../../../../../../common/api/config.js'
	export default{
		data(){
			return{
				num:-1,
				reasonads:'',
				explain:'',//说明
				orderdetaldata:"",
				orderdetalis:"",//订单id
				reason:"USER_CANCEL_REASON",
				condition:'',//退款原因
				cause:[],
				imgList:[],
			}
		},
		onLoad(option) {
			this.orderdetalis=option.orderdetalis
			this.orderdetail()
			this.fineListtDict()
		},
		methods:{
			open(){
				this.$refs.popup.open()
			},
			fineListtDict(){ //退款原因
				this.api.fineListtDict(
					JSON.stringify(this.reason)
				).then(res=>{
					this.cause=res.data
				})
			},
			deleteimg(v,index){
				console.log(v)
				this.imgList.splice(index,1)
				console.log(this.imgList)
			},
			orderdetail(){ //详情
				this.api.orderdetail(
					this.orderdetalis.toString()
				).then(res=>{
					console.log(res)
					this.orderdetaldata=res.data
				})
			},
			previewImage: function(index,imageList) {//预览图片
				if (!imageList.length) return;
				uni.previewImage({
					current: imageList[index],
					loop: true,
					urls: imageList
				})
				console.log(this.list)
			},
			present(){
				if(this.reasonads==''){
					this.tui.toast('请选择退款原因')
				}else{
					this.api.applyReturn({
						"orderId":this.orderdetalis,
						"reason":this.reasonads,
						"explain":this.explain,
						"url":this.imgList.join(',')
					}).then(res=>{
						this.tui.toast('提交成功')
						uni.redirectTo({
							url:'/pages/client/mine/orderList/orderdetails/aftersale/detailsoftherefund/detailsoftherefund?orderdetalis=' + this.orderdetalis
						})
						uni.$emit('orderupdata',{msg:'更新订单'})
					})
				}
			},
			reasontochoose(item,index){
				this.reasonads =item.name
				this.num=index
				this.$refs.popup.close()
			},
			uploadImage(){//上传图片
				if(this.imgList.length>=3){
					this.tui.toast('最多上传3张图片')
					return
				}
			    var that = this
			    const accessToken = that.cacheHelper.getToken();
			    uni.chooseImage({
					count:3 - this.imgList.length,//我这里是最多三张照片
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success (res) {
						console.log(res)
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
										that.imgList.push(newImg.data.msg)
										console.log(that.imgList)
									}
									console.log(res)
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
	.container {
		width: 750rpx;
		min-height: 100%;
		padding-bottom: 200rpx;
	}

	.header {
		margin-top: 20rpx;
		width: 710rpx;
		margin-left: 20rpx;
	}

	.header .order_item {
		box-sizing: border-box;
		padding: 0 23rpx;
		display: flex;
		margin-bottom: 31rpx;
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

	.item_msg .msg_specification {
		font-size: 22rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		margin-top: 8rpx;
	}

	.item_msg .msg_price {
		display: flex;
		align-items: center;
	}

	.msg_price .price {
		font-size: 28rpx;
		color: #FF4600;
		line-height: 30rpx;
		font-weight: 500;
		margin-right: 360rpx;
	}

	.msg_price .count {
		font-size: 22rpx;
		color: #212121;
	}

	.container .cause {
		width: 710rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		margin-left: 20rpx;
	}

	.cause .refundreason {
		height: 102rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 28rpx 0 8rpx;
	}

	.refundreason .left {
		display: flex;
		align-items: center;
	}

	.left .required {
		font-size: 28rpx;
		color: #e95044;
		font-weight: 400;
	}

	.left .title {
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
	}

	.refundreason .right {
		display: flex;
		align-items: center;
	}

	.right .reason {
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		margin-right: 10rpx;
	}

	.right image {
		width: 8rpx;
		height: 16rpx;
	}

	.cause .explain {
		/* height: 102rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box; */
		padding: 0 28rpx 0 22rpx;
	}

	.explain .title {
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
	}
	.explain input{
		width: 80%;
		box-sizing: border-box;
		padding-left: 50rpx;
	}
	.container .money{
		width: 710rpx;
		height: 100rpx;
		margin-left: 20rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.money .title{
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
		margin-right: 50rpx;
		margin-left: 22rpx;
	}
	.money .total{
		font-size: 28rpx;
		color: #FF4600;
		font-weight: 500;
	}
	.container .voucher{
		width: 710rpx;
		height: 263rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding-left: 32rpx;
	}
	.voucher .title{
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
		margin: 30rpx 0 20rpx 0;
	}
	.voucher .img{
		display: flex;
		flex-direction: row;
	}
	.voucher .img image{
		width: 143rpx;
		height: 143rpx;
	}
	.btn{
		width: 750rpx;
		height: 89rpx;
		background: linear-gradient(180deg,#ffb300 0%,#fbc824 100%);
		text-align: center;
		line-height: 89rpx;
		font-size: 36rpx;
		font-weight: 400;
		color: #333333;
		position: fixed;
		bottom: 0;
	}
	.causeList{
		width: 750rpx;
		max-height: 720rpx;
		border-radius: 24rpx 24rpx 0 0;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		position: relative;
	}
	.causeList .title{
		font-size: 36rpx;
		color: #333333;
		font-weight: 400;
		line-height: 50rpx;
		margin: 0 0 62rpx 273rpx;
	}
	.causeList .cancel{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 18rpx;
		right: 30rpx;
	}
	.causeList .list{
		width: 100%;
		max-height: 578rpx;
		min-height: 400rpx;
	}
	.list .item{
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #F5F5F5;
		height: 110rpx;
		align-items: center;
	}
	.item text{
		font-size: 36rpx;
		color: #333333;
		font-weight: 400;
	}
	.item image{
		width: 38rpx;
		height: 38rpx;
	}
	
	.commodity .order_item {
		box-sizing: border-box;
		padding: 0 23rpx;
		display: flex;
		margin: 31rpx 0;
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
	.order_item .item_msg {
		display: flex;
		flex-direction: column;
	}
	
	.item_msg .msg_name {
		width: 484rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		min-height: 80rpx;
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
	.imgseflex{
		display: flex;
		flex-wrap: wrap;
		background: #FFFFFF;
		
	}
	.imgbox{
		width:160rpx;
		height:169rpx;
		background:rgba(249,249,248,1);
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
