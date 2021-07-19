<template>
	<view class="contain">
		<view class="scroll-view">
			<view class="form_one" @click="enterType">
				<view class="form_one_title">转账方式</view>
				<input type="text" placeholder="选择转账方式" disabled v-model="categoryName" />
				<view class="iconfont you">&#xe621;</view>
			</view>
			<view class="form_one">
				<view class="form_one_title">账户信息</view>
				<input type="text" placeholder="请输入账户信息" v-model="cashAccount" />
			</view>
			<view class="form_one">
				<view class="form_one_title">收款人姓名</view>
				<input type="text" placeholder="请输入收款人姓名" v-model="linkman" />
			</view>
			<view class="form_one">
				<view class="form_one_title">联系方式</view>
				<input type="number" placeholder="填写联系方式" v-model="contactWay" />
			</view>
			<view style="height: 18rpx;background-color: #f2f4f8;width: 750rpx;margin-top: -1rpx;"></view>
			<view class="form_one" style="justify-content: space-between;">
				<view class="form_one_title">默认账号</view>
				<switch :checked="checked" @change="switch1Change"  style="transform: scale(.7);" color="#4EB754"/>
			</view>
		</view>
		<button class="add_btn" @click='preserve' >保存</button>
		<uni-popup ref="isShowDelDialog" type="bottom">
				<view class="popup_alert">
					<view class="nav">
						<view class="nav_title" style="text-align: center;">选择转账方式</view>
					</view>
					<scroll-view scroll-y="true" class="sub_type_con">
						<view v-for="(item, index) in typeList" :key="index" class="sub_type" @tap="chooseType(item)">
							<view class="" style="width:88rpx ;height: 88rpx;border-radius: 50%;">
								<image :src="item.logo" mode=""></image>
							</view>
							<view class="type_name">{{item.name}}</view>
							<image :src="item.id ==pfWayId ? '../../../../static/drawable-xxhdpi/226.png' : '../../../../static/drawable-xxhdpi/225.png'"></image>
						</view>
					</scroll-view>
				</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				compile:null,
				isShowType: false,
				isChoose: false,
				cashAccount:'',
				linkman:'',
				pfWayId:'',
				contactWay:'',
				checked: false,
				typeList:[],
				categoryName: '',
				depositid:"",
			}
		},
		onLoad(options) {
			this.Withdrawalway()
			this.compile=options.compile
			this.depositid=options.depositid
			if(options.depositid.length!=0){//有值是修改
				this.userWithdrawalWaydetail()
			}
		},
		methods: {
			enterType: function(){
				this.$refs.isShowDelDialog.open()
			},
			switch1Change: function(r){
				this.checked = r.detail.value
			},
			userWithdrawalWaydetail(){// 提现方式详情
				this.api.userWithdrawalWaydetail(
					this.depositid.toString()
				).then(res=>{
					this.categoryName=res.data.name
					this.cashAccount=res.data.cashAccount
					this.linkman=res.data.linkman
					this.contactWay=res.data.contactWay
					this.pfWayId=res.data.pfWayId
					this.checked=res.data.isDefault==1 ? false : true
				})
			},
			chooseType(item){
				this.pfWayId = item.id
				this.categoryName = item.name
				this.$refs.isShowDelDialog.close()
			},
			//提现方式
			Withdrawalway(){
				this.api.userWithdrawalWay().then(res=>{
					if(res.code===200){
						console.log(res)
						this.typeList=res.data
						this.typeList.forEach(ress=>{
							if(ress.id==this.pfWayId){
								this.categoryName=ress.name
							}
						})
					}
				})
			},
			//保存
			preserve(){
				if(this.categoryName==''){
					this.tui.toast('请选择转账方式')
				}else if(this.linkman==''){
					this.tui.toast('请输入联系人')
				}else if(!this.utils.isMobile(this.contactWay)){
					this.tui.toast('手机格式不正确')
				}else if(this.cashAccount==''){
					this.tui.toast('请输入提现账户')
				}else{
					if(this.compile=='1'){
						console.log('编辑')
						this.api.userWithdrawalWayedit({
							"id":this.depositid,// "id不可为空",
							"pfWayId":this.pfWayId,// "平台提现方式不可为空",
							"linkman":this.linkman,// "联系人不可为空",
							"contactWay":this.contactWay,// "联系方式不可为空",
							"cashAccount":this.cashAccount,// "提现账户不可为空",
							"isDefault":this.checked ? '2':'1',// "请确认是否为默认选中" //是否默认2:默认，1:非默认
						}).then(res=>{
							if(res.code===200){
								this.tui.toast('编辑成功')
								uni.navigateBack({
									delta:1
								})
								uni.$emit("Listupdate",{
									msg:'列表更新'
								})
							}
						})
					}else{
						console.log('ddd')
						this.api.userWithdrawalWayadd({
							"pfWayId":this.pfWayId,// "平台提现方式不可为空",
							"linkman":this.linkman,// "联系人不可为空",
							"contactWay":this.contactWay,// "联系方式不可为空",
							"cashAccount":this.cashAccount,// "提现账户不可为空",
							"isDefault":this.checked ? '2':'1',// "请确认是否为默认选中" //是否默认2:默认，1:非默认
						}).then(res=>{
							if(res.code===200){
								this.tui.toast('添加成功')
								uni.navigateBack({
									delta:1
								})
								uni.$emit("Listupdate",{
									msg:'列表更新'
								})
							}
						})
					}
				}
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		
		font-size: 29rpx;
	}

	.backIcon {
		color: #fff;
		font-size: 68rpx;
		position: fixed;
		top: 68rpx;
		left: 35rpx;
	}

	.text_image {
		position: fixed;
		top: 68rpx;
		width: 600rpx;
		right: 25rpx;
	}

	.tips_blo {
		position: fixed;
		top: 285rpx;
		display: flex;
		right: 25rpx;
		background: rgba(144, 192, 144, 0.81);
		height: 65rpx;
		line-height: 65rpx;
		font-size: 29rpx;
		color: #fff;
		padding-right: 15rpx;
		border-radius: 12rpx;
	}

	.small_icon {
		width: 30rpx;
		height: 30rpx;
		padding: 10rpx;
		background-color: rgb(192, 228, 193);
		border-radius: 50%;
		margin: 12rpx;
	}

	.tips_blo text {
		color: #fff;
		width: 180rpx;
		letter-spacing: 1rpx;
		text-align: center;
		font-style: italic;
		font-weight: bold;
	}
	.scroll-view {
		width: 100%;
		margin: 0 0 25rpx 0;
		background-color: #fff;
	}

	.form_one {
		height: 102rpx;
		line-height: 102rpx;
		display: flex;
		font-size: 29rpx;
		letter-spacing: 1rpx;
		border-top: 1rpx solid #f0f0f0;
		width: 690rpx;
		margin-left: 30rpx;
	}

	.form_one_title {
		width: 185rpx;
	}

	.form_one input {
		width: 440rpx;
		height: 102rpx;
		line-height: 102rpx;
		font-size: 29rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.you {
		font-size: 46rpx;
		width: 65rpx;
		text-align: right;
	}

	.image_title {
		height: 98rpx;
		margin-left: 25rpx;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 98rpx;
	}

	.image_con {
		display: flex;
		width: 600rpx;
		margin: 25rpx;
		justify-content: space-between;
	}

	.image_con image {
		width: 285rpx;
		height: 170rpx;
		border-radius: 12rpx;
	}

	.certificate_blo image {
		width: 170rpx;
		height: 170rpx;
		border-radius: 12rpx;
		margin-left: 25rpx;
		margin-bottom: 25rpx;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.popup_alert{
		width: 100%;
		background-color: #FFFFFF;
	}
	.nav{
		padding: 0 30rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-bottom: 1rpx solid #F6F6F6;
	}
	.nav_title{
		text-align: center;
	}
	.type_con{
		height: 320rpx;
	}
	.item{
		line-height: 96rpx;
		text-align: center;
		font-size: 31rpx;
		letter-spacing: 6rpx;
	}
	.sub_type_con{
		height: 400rpx;
		padding: 25rpx 30rpx;
		width: 690rpx;
	}
	.sub_type{
		display: flex;
		height: 88rpx;
		line-height: 88rpx;
		border-bottom: 1rpx solid #F6F6F6;
	}
	.sub_type image{
		width: 48rpx;
		height: 48rpx;
		margin: 20rpx 52rpx 20rpx 0;
	}
	.type_name{
		width: 590rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.add_btn {
		font-size: 33rpx;
		font-weight: bold;
		text-align: center;
		color: #fff;
		width: 710rpx;
		height: 90rpx;
		background: linear-gradient(180deg, #FFB300 0%, #FBC824 100%);
		line-height: 90rpx;
		margin: 200rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
	}
</style>
