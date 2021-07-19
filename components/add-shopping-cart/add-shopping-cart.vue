<template>
	<!-- 加入购物车 -->
	<view class="discount" :class="showt?'':'discount_dh'">
		<!-- 提示语 -->
		<tui-tips class="jointips" position="bottom" ref="toast"></tui-tips>
		<view class="box">
			<view class="goodsmsg xian">
				<image class="goodsmsg_t" :src="coverImg" mode=""></image>
				<view class="goodsmsg_npx">
					<view class="goodsmsg_npx_t">
						<text class="goodsmsg_npx_tt">￥</text>
						<text class="goodsmsg_npx_tm">{{price}}</text>
						<!-- <text class="goodsmsg_npx_tb">下单分享好友返佣金</text> -->
					</view>
					<view class="goodsmsg_npx_m">{{guigeCenter}}</view>
				</view>
			</view>
			<view class="colorclass xian">
				<view class="colorclass_top">
					{{classify}}
				</view>
				<view class="colorclass_bottom">
					<view class="colorclass_bottom_t" v-for="(Ditem,Dindex) in classifyCenter" :key="Dindex" @click="colorjust(Ditem,Dindex)">
						<view class="colorclass_bottom_tr" :style="colortype==Dindex?'background:rgba(254,72,69,0.14)':''">
							{{Ditem.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="made_msg_buy">
				<text class="made_msg_buy_t">购买数量</text>
				<view class="made_msg_buy_v">
					<button type="primary"  class="made_msg_buy_vt" >-</button>
					<input type="number" :disabled="disabled" v-model="popupnum" value="1" class="made_msg_buy_vm"></input>
					<button type="primary" class="made_msg_buy_vb">+</button>
				</view>
			</view>
			<view class="button">
				<view class="button_one" v-if="quxiao" @click="joincart">
					加入购物车
				</view>
				<view class="button_two" v-if="quxiao" @click="atoncebuy">
					立即购买
				</view>
				<view class="button_three" v-if="!quxiao" @click="joinbuy">
					确定
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		name:'AddShoppingCart',
		props:{
			// 是否加入购物车
			showt:{
				type:Boolean,
				default:true
			},
			// 图片
			coverImg:{
				type:String,
				default:""
			},
			// 价格
			price:{
				type:Number,
				default:1
			},
			// 规格标语
			guigeCenter:{
				type:String,
				default:'选择规格'
			},
			// 分类提示
			classify:{
				type:String,
				default:'规格'
			},
			// 分类内容
			classifyCenter:{
				type:Array,
				default:function(){
					return ['X','XL','XXL']
				}
			},
			// 颜色提示内容
			colortype:{
				type:Number,
				default:0
			},
			// 购物车
			popupnum:{
				type:Number,
				default:1
			},
			// input框 是否输入
			disabled:{
				type:Boolean,
				default:true
			},
			// 显示购买 还是购买和加入购物车
			quxiao:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			add(e){
				this.show=e.show
				console.log(this.show);
			}
		}
	}
</script>
<style lang="less">
	/* 弹出层动画 */
	.discount{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
		background-color: #FFFFFF;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out;
		visibility: hidden;
	}
	.discount_dh{
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}
	/* 弹出框内容样式 */
	.box{
		// height: 200rpx;
		// background-color: #0081FF;
		padding: 30rpx 30rpx 0;
	}
	.goodsmsg{
		display: flex;
		padding-bottom:30rpx;
	}
	.goodsmsg_t{
		width: 180rpx;
		height: 180rpx;
	}
	.goodsmsg_npx{
		margin-left:30rpx ;
		padding-top: 30rpx;
	}
	.goodsmsg_npx_t{
		font-family:PingFang SC;
		margin-bottom: 18rpx;
		.goodsmsg_npx_tt{
			font-size:25rpx;
			font-weight:500;
			color:rgba(249,61,47,1);
		}
		.goodsmsg_npx_tm{
			font-size:36rpx;
			font-weight:bold;
			color:rgba(249,61,47,1);
		}
		/* .goodsmsg_npx_tb{
			margin-left: 30rpx;
			font-size:22rpx;
			font-weight:500;
			color: #FF2F3E;
		} */
	}
	.goodsmsg_npx_m{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(121,121,121,1);
		line-height:36rpx;	
	}
	.colorclass{
		padding: 15rpx 0 42rpx ;
	}
	.colorclass_top{
		padding: 18rpx 0;
	}
	.colorclass_bottom{
		// display: flex;
		// flex-wrap: wrap;
	}
	.colorclass_bottom_t{
		height: 53rpx;
		display: flex;
		margin-top: 18rpx;
		margin-right: 43rpx;
	}
	.colorclass_bottom_tl{
		width: 53rpx;
		height: 53rpx;
		border-radius:5rpx;
	}
	.colorclass_bottom_tr{
		line-height: 53rpx;
		padding: 0 27rpx;
		border-radius:5rpx;
		font-size:25rpx;
		background-color: #F0F0F0;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	// 购买数量
	.made_msg_buy{
		display: flex;
		padding: 0 20rpx;
		justify-content: space-between;
		align-items: center;
		height: 127rpx;
		.made_msg_buy_t{
			font-size:29rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.made_msg_buy_v{
			display: flex;
			text-align: center;
			.made_msg_buy_vt{
				padding: 0;
				text-align: center;
				line-height: 51rpx;
				background-color: white;
				color: #A9A9A9;
				width:55rpx;
				height:55rpx;
				border:1px solid rgba(169,169,169,1);
				border-radius:4rpx 0 0 4rpx;
			}
			.made_msg_buy_vm{
				box-sizing: border-box;
				width:55rpx;
				height:55rpx;
				line-height: 51rpx;
				border-top:1px solid rgba(169,169,169,1);
				border-bottom:1px solid rgba(169,169,169,1);
			}
			.made_msg_buy_vb{
				padding: 0;
				text-align: center;
				line-height: 51rpx;
				background-color: white;
				color: #A9A9A9;
				width:55rpx;
				height:55rpx;
				border:1px solid rgba(169,169,169,1);
				border-radius:0 4rpx 4rpx 0;
			}
		}
	}
	// 加入购物车
	.button{
		background:rgba(255,255,255,1);
		box-shadow:0px -1rpx 6rpx 0px rgba(238,238,238,1);
		display: flex;
		justify-content: space-between;
		color: #FFFFFF;
		padding: 15rpx 0;
	}
	.button_one{
		width: 332rpx;
		height: 66rpx;
		background:linear-gradient(-90deg,rgba(255,116,9,1),rgba(255,166,98,1));
		border-radius:33px;
		text-align: center;
		line-height: 66rpx;
	}
	.button_two{
		width: 332rpx;
		height: 66rpx;
		background:linear-gradient(94deg,rgba(255,105,102,1),rgba(255,68,64,1));
		border-radius:33px;
		text-align: center;
		line-height: 66rpx;
	}
	.button_three{
		width: 100%;;
		height: 66rpx;
		background:linear-gradient(94deg,rgba(255,105,102,1),rgba(255,68,64,1));
		border-radius:33px;
		text-align: center;
		line-height: 66rpx;
	}
</style>