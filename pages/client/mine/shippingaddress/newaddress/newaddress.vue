<template>
	<view class="container" style="min-height: 100%;background: #FFFFFF;">
		<input type="text" value="" class="msg" v-model="consigneeUsername"  placeholder="姓名" />
		<input type="number" v-model="consigneeMobile" class="msg" placeholder="手机号码"  />
		<view class="msg address" @click="tolocation">
			<text :class="area?'area':''">{{area?area:'所在地区'}}</text>
			<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/14C1890E40E64425BED4E18CBD2C9FD9124.png" mode=""></image>
		</view>
		<textarea value="" v-model="address" placeholder="详细地址:如门牌号·小区·楼栋"  class="address_detailed" />
		<view class="tui-swipe-cell">
			<view style="margin-top: 10rpx;color: #999999;">设为默认地址</view>
			<switch style="height: 60rpx;" :checked="defaults" color="#ffc300" class="tui-switch-small" @change='moaddess'/>
		</view>
		<view class="addsite" @click="addsitebtn">
			<view class="newadd">保存</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
								 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/utils/mpvue-citypicker/mpvueCityPicker.vue'
	export default{
		components: {
			mpvueCityPicker
		},
		data(){
			return{
				area:'',
				themeColor: '#888',
				cityPickerValueDefault: [1,1,1],
				cityName:'',
				provinceName:'',
				areasName:'',
				defaults:true,
				isDefault:'',
				consigneeUsername:'',//姓名
				consigneeMobile:'',//手机号
				address:'',
				editId:''
			}
		},
		onLoad(option) {
			this.editId=option.editId
			if(this.editId){ //只有有值得情况才会调用地址详情接口
				this.addressdetail()
			}
		},
		methods:{
			//获取位置
			tolocation(){
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(){
				this.$refs.mpvueCityPicker.hide()
			},
			onConfirm(e) {
				console.log(e,'ssssssss')
				var city = e.label;
				var data = city.split('-');
				console.log(data[0]+'-------'+data[1]+'------'+data[2])
				this.cityName = data[1];
				this.provinceName = data[0]
				this.areasName = data[2]
				this.area = this.provinceName+this.cityName+this.areasName
			},
			addressdetail(){ //地址详情
				this.api.addressdetail(
					this.editId
				).then(res=>{
					this.consigneeUsername=res.data.consigneeUsername
					this.consigneeMobile=res.data.consigneeMobile
					this.provinceName=res.data.provinceName
					this.cityName=res.data.cityName
					this.areasName=res.data.areasName
					this.address=res.data.address
					this.defaults=res.data.isDefault==1? true : false
					this.area=this.provinceName + this.cityName + this.areasName
				})
				
			},
			addsitebtn(){
				if(!this.utils.isMobile(this.consigneeMobile)){
					this.tui.toast('手机号不正确')
				}else if(this.consigneeUsername==''){
					this.tui.toast('请输入收件人姓名')
				}else if(this.provinceName==''){
					this.tui.toast('请选择市区')
				}else if(this.address==''){
					this.tui.toast('请输入详细地址')
				}else{
					if(this.editId){ //有值代表是编辑地址
						this.api.addressupdate({
							consigneeUsername:this.consigneeUsername,//姓名
							consigneeMobile:this.consigneeMobile,//手机号
							provinceName:this.provinceName,
							cityName:this.cityName,
							areasName:this.areasName,
							address:this.address,
							isDefault:this.defaults,
							id:this.editId
						}).then(res=>{
							uni.navigateBack({
							    delta: 1
							});
							uni.$emit('uparrress',{msg:'添加收货地址是更新'})
							this.tui.toast('修改成功')
						})
					}else{ //没值新增地址
						this.api.addinsert({
							consigneeUsername:this.consigneeUsername,//姓名
							consigneeMobile:this.consigneeMobile,//手机号
							provinceName:this.provinceName,
							cityName:this.cityName,
							areasName:this.areasName,
							address:this.address,
							isDefault:this.defaults
						}).then(res=>{
							uni.navigateBack({
							    delta: 1
							});
							uni.$emit('uparrress',{msg:'添加收货地址是更新'})
							this.tui.toast('保存成功')
						})
					}
				}
			},
			addressinsert(){
				this.api.addressinsert({
					
				}).then(res=>{
					
				})
			},
			moaddess(e){
				this.defaults=e.detail.value
				this.isDefault=e.detail.value?'1':'0'
				console.log(this.isDefault,this.defaults)
			}
		},
		onNavigationBarButtonTap(){
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
			margin-bottom: 15rpx;
		}
		.header image{
			width: 16rpx;
			height: 28rpx;
			margin-left: 50rpx;
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
			color: #ffc300;
		}
	/* #endif */
	.msg{
		width: 750rpx;
		height: 114rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 39rpx 20rpx 33rpx 40rpx;
		border-bottom: 1rpx solid #f4f4f4;
	}
	.address text{
		font-size: 30rpx;
		color: #999999;
		font-weight: 400;
	}
	.address{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.address image{
		width: 8rpx;
		height: 16rpx;
	}
	.address_detailed{
		width: 750rpx;
		height: 90rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 39rpx 20rpx 0 40rpx;
	}
	.msg .area{
		color: #333333;
	}
	.addsite{
		padding: 100rpx 30rpx;
		box-sizing: border-box;
	}
	.newadd{
		height: 80rpx;
		background:#FFC300;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 8rpx;
	}
	.tui-swipe-cell {
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 24rpx 30rpx;
		border-radius: 6rpx;
		font-size: 30rpx;
		margin-top: 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
</style>
