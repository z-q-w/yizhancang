<template>
	<view class="container">
		<view class="address_item" v-for="item in addressdata"  @click="aesstypedata(item)">
			<view class="item_name">
				<text class="name">{{item.consigneeUsername}}</text>
				<text>{{item.consigneeMobile}}</text>
			</view>
			<text class="item_address">{{item.provinceName}}{{item.cityName}}{{item.areasName}}{{item.address}}</text>
			<view class="item_compile">
				<view class="left" @click.stop="todefault">
					<image :src="item.isDefault !=1?'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/E3B760E9EF474FE4AC6DE17BC388987439.png':'https://yizhancang.oss-cn-hangzhou.aliyuncs.com/6E9F6F3EDB2A442A96E7176537A1EE6932.png'" mode=""></image>
					<text>默认地址</text>
				</view>
				<view class="right" @click.stop="compile(item)">
					编辑
				</view>
				<view class="right" style="margin-left: 20rpx;" @click.stop="deleteaddress(item)">
					删除
				</view>
			</view>
		</view>
		<view class="" v-if="addressdata==''">
			<tui-emptyimg :width='300' :height='300'></tui-emptyimg>
		</view>
		<view class="" style="height: 140rpx;">
			<view class="addsite" @click="addsitebtn">
				<view class="newadd">+新增收货地址</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isdefault:false,//是否是默认
				addressdata:[]
			}
		},
		onLoad(option) {
			this.addressfindPage()
			uni.$on('uparrress',(data)=>{
				console.log('添加收货地址是更新');
				this.addressfindPage()
			})
			this.aesstype=option.aesstype //这个aesstype==1 代表进来选择地址
		},
		methods:{
			//地址默认
			todefault(){
				this.isdefault=!this.isdefault
			},
			aesstypedata(v){
				if(this.aesstype==1){ //这个aesstype==1 代表进来选择地址
					uni.$emit('selectress',{msg:v})
					uni.navigateBack({
					    delta: 1
					});
				}
			},
			addsitebtn() { //跳转到新增地址
				uni.navigateTo({
					url:"./newaddress/newaddress"
				})
			},
			deleteaddress(v){//删除地址
				uni.showModal({
				    title: '提示',
				    content: '您确定要删除这个地址?',
				    success: (res)=> {
				        if (res.confirm) {
				            this.api.addressdelete({
								id:v.id
							}).then(res=>{
								this.tui.toast('删除成功')
								setTimeout(()=>{
									this.addressfindPage()
								},400)
								
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			compile(v){
				uni.navigateTo({
					url:'/pages/client/mine/shippingaddress/newaddress/newaddress?editId=' +v.id
				})
			},
			addressfindPage(){//地址列表
				this.api.addressfindPage({
					current:1,
					size:30
				}).then(res=>{
					console.log(res.data.records)
					this.addressdata=res.data.records
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
	/* #ifdef MP-WEIXIN */
		.header{
			width: 750rpx;
			height: 88rpx;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			padding-top: 128rpx;
		}
		.header image{
			width: 16rpx;
			height: 28rpx;
			margin-left: 30rpx;
		}
		.header .title{
			font-size: 36rpx;
			font-weight: bold;
			line-height: 50rpx;
			color: #212121;
			-webkit-text-stroke: 1 rgba(0, 0, 0, 0);
			text-stroke: 1 rgba(0, 0, 0, 0);
			margin: 0 229rpx 0 219rpx;
		}
		.header .add{
			font-size: 28rpx;
			font-weight: 400;
			line-height: 40rpx;
			color: #666666;
		}
	/* #endif */
	.address_item{
		width: 710rpx;
		height: 190rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		margin-top: 17rpx;
	}
	.address_item .item_name{
		display: flex;
		align-items: center;
		margin-top: 22rpx;
		margin-bottom: 13rpx;
	}
	.item_name text{
		font-size: 30rpx;
		font-weight: 400;
		color: #140005;
		line-height: 42rpx;
	}
	.item_name .name{
		margin: 0 54rpx 0 30rpx;
	}
	.item_address{
		width: 629rpx;
		margin-left: 30rpx;
		font-size: 24rpx;
		color: #666666;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 20rpx;
	}
	.item_compile{
		display: flex;
		box-sizing: border-box;
		padding: 0 56rpx 0 30rpx;
		align-items: center;
		height: 60rpx;
	}
	.item_compile .left{
		display: flex;
		align-items: center;
		flex: 1;
	}
	.left image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 8rpx;
	}
	.left text{
		font-size: 24rpx;
		color: #666666;
		font-weight: 300;
	}
	.right{
		width: 60rpx;
		height: 34rpx;
		background: linear-gradient(180deg,#ffb300 0%,#fbc824 100%);
		text-align: center;
		line-height: 34rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #333333;
		border-radius: 4rpx;
	}
	.addsite{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.newadd{
		height: 80rpx;
		background:#FFC300;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 8rpx;
	}
</style>
