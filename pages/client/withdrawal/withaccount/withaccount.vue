<template>
	<view>
		<view class="white_blo">
			<view v-for="(item, index) in accountlist" :key="index" class="account_list" @click="Selectaccount(item)">
				<view>
					<view style="display: flex;margin-top: 25rpx;">
						<view class="account_name">{{item.name}}</view>
						<view v-if="item.isDefault == 2" class="default_btn">默认</view>
					</view>
					<view class="account_account">账号：{{item.cashAccount}}</view>
				</view>
				<view class="operation">
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/C7CCCF5AFE6E40229C9D05F3CC74A5D9bianji1.png" mode="" @click.stop="compile(item)"></image>
					<image src="https://yizhancang.oss-cn-hangzhou.aliyuncs.com/C79B30AA960D425580A7752A50D5F836shanchu5.png" mode="" style="width: 60rpx;height: 60rpx;margin-top: 40rpx;" @click.stop="removePay(item)"></image>
				</view>

			</view>
		</view>
		<view class="add_btn" @click="addAccount">+ 添加账号</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: null,
				accountlist: []
			}
		},
		onLoad(options) {
			this.type = options.type
			this.Withdrawalway()
			uni.$on("Listupdate", res => {
				this.Withdrawalway()
			})
		},
		methods: {
			Withdrawalway() {
				this.api.userWithdrawalWaylist().then(res => {
					if (res.code === 200) {
						console.log(res)
						this.accountlist = res.data
					}
				})
			},
			addAccount: function() {
				uni.navigateTo({
					url: `/pages/client/withdrawal/addaccount/addaccount?type=${this.type}`
				})
			},
			removePay: function(item) {
				uni.showModal({
				    title: '提示',
				    content: '您确定要删除该提现方式',
				    success:(res)=> {
				        if (res.confirm) {
				            this.api.userWithdrawalWaydelete(JSON.stringify(item.id)).then(res => {
				            	if (res.code === 200) {
				            		this.Withdrawalway()
				            		uni.$emit("Listupdate",{
				            			msg:"列表更新"
				            		})
				            	}
				            })
				        }
				    }
				});
				
			},
			compile(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/client/withdrawal/addaccount/addaccount?depositid=' + item.id + '&compile=' + '1'
				})
			},
			
			//选择账户
			Selectaccount(item){
				uni.$emit("Selectaccount",{
					msg:item
				})
				uni.navigateBack({
					delta:1
				})
			}
		},
		
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background-color: #F2F4F8;
	}

	.white_blo {
		padding: 10rpx 30rpx;
		background-color: #fff;
	}

	.account_list {
		display: flex;
		justify-content: space-between;
		border-top: 0.5rpx solid #f0f0f0;
	}

	.account_list .operation image {
		width: 55rpx;
		height: 55rpx;
		margin: 45rpx 10rpx 0;
	}

	.default_btn {
		border: 1rpx solid #4EA135;
		color: #4EB754;
		font-size: 20rpx;
		padding: 0 10rpx;
		height: 35rpx;
		line-height: 35rpx;
		border-radius: 5rpx;
		margin-left: 15rpx;
	}

	.account_account {
		font-size: 26rpx;
		color: #999;
		margin-top: 8rpx;
		margin-bottom: 25rpx;
	}

	.account_name {
		font-size: 30rpx;
		font-weight: bold;
	}

	.add_btn {
		font-size: 33rpx;
		font-weight: bold;
		text-align: center;
		color: #fff;
		width: 750rpx;
		height: 90rpx;
		background: linear-gradient(180deg, #FFB300 0%, #FBC824 100%);
		line-height: 90rpx;
		position: fixed;
		bottom: 0;
	}
</style>
