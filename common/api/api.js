import fetch from './request.js'

const api = {}

// 注册获取验证码
// 参数 地址 实体 请求方式   true 'application/x-www-form-urlencoded' : 'application/json',  是否隐藏加载框
	// 
	// api.getDictVoList = params => fetch.request("app/dict/getDictVoList", params, "GET", true,true)
	// 用户注册
	api.register= params => fetch.request("api/register",params,"POST",false,true)
	
	// 用户登录
	api.login= params => fetch.request("api/login",params,"POST",false,true)
	
	// 用户信息
	api.userinfo= params => fetch.request("api/info",params,"POST",false,true)
	
	// 首页轮播图
	api.getBannerCategoryList= params => fetch.request("api/banner/getBannerCategoryList",params,"POST",false,true)
	
	// 一级分类
	api.findParentList= params => fetch.request("api/category/findParentList",params,"POST",false,true)
	
	// 根据一级查询二级分类
	api.findListByParentId= params => fetch.request("api/category/findListByParentId",params,"POST",true,true)
	
	//热门搜索
	api.popularSearch= params => fetch.request("api/popularSearch/findList",params,"POST",false,true)
	
	//根据分类查商品列表
	api.findListByCategoryId= params => fetch.request("api/goods/findListByCategoryId",params,"POST",false,false)
	
	//商品详情
	api.goodsgetById= params => fetch.request("api/goods/getById",params,"POST",true,true)
	
	//加入购物车
	api.addshoppingCar= params => fetch.request("api/shoppingCar/insert",params,"POST",false,true)
	
	//购物车列表
	api.shopfindPage= params => fetch.request("api/shoppingCar/findPage",params,"POST",false,true)
	
	//意见反馈
	api.feekbackinsert= params => fetch.request("api/feedback/insert",params,"POST",false,true)
	
	//添加地址
	api.addressinsert= params => fetch.request("api/address/insert",params,"POST",true,true)
	
	//删除购物车数据
	api.removeMore= params => fetch.request("api/shoppingCar/removeMore",params,"POST",false,true)
	
	//添加地址
	api.addinsert= params => fetch.request("api/address/insert",params,"POST",false,true)
	
	//添加地址
	api.addressfindPage= params => fetch.request("api/address/findPage",params,"POST",false,true)
	
	//删除地址
	api.addressdelete= params => fetch.request("api/address/delete",params,"POST",true,true)
	
	//修改地址
	api.addressupdate= params => fetch.request("api/address/update",params,"POST",false,true)
	
	//地址详情
	api.addressdetail= params => fetch.request("api/address/detail",params,"POST",false,true)
	
	//地址详情
	api.addressdefault= params => fetch.request("api/address/default",params,"POST",false,true)
	
	//收藏商品
	api.favoritesinsert= params => fetch.request("api/favorites/insert",params,"POST",false,false)
	
	//取消收藏
	api.favoritescancel= params => fetch.request("api/favorites/cancel",params,"POST",false,true)
	
	//收藏列表
	api.favoritesfindPage= params => fetch.request("api/favorites/findPage",params,"POST",false,true)
	
	//用户优惠券列表
	api.couponfindPage= params => fetch.request("api/coupon/findPage",params,"POST",false,true)
	
	//领取优惠券
	api.couponreceive= params => fetch.request("api/coupon/receive",params,"POST",true,false)
	
	//未领取优惠劵列表
	api.couponptCouponList= params => fetch.request("api/coupon/ptCouponList",params,"POST",false,true)
	
	//修改用户信息
	api.editInfo= params => fetch.request("api/editInfo",params,"POST",false,true)
	
	//发送短信验证码  1 用户注册 2 用户登录 3 修改密码  4 忘记密码
	api.messagesend= params => fetch.request("api/message/send/msg",params,"POST",false,true)
	
	//验证码登录
	api.loginCode= params => fetch.request("api/loginCode",params,"POST",false,true)
	
	//忘记密码
	api.forgetPwd= params => fetch.request("api/forgetPwd",params,"POST",false,true)
	
	//修改密码
	api.editPwd= params => fetch.request("api/editPwd",params,"POST",false,true)
	
	//拼团列表
	api.groupArea= params => fetch.request("api/groupArea/findPage",params,"POST",false,true)
	
	//单个订单详情
	api.settlement= params => fetch.request("api/order/settlement",params,"POST",false,true)
	
	//订单查询可用的优惠券
	api.availableCoupon= params => fetch.request("api/coupon/availableCoupon",params,"POST",false,true)
	
	//购物车结算
	api.shoppingCarsettlement= params => fetch.request("api/shoppingCar/settlement",params,"POST",false,true)
	
	//会员卡
	api.customerInfo= params => fetch.request("api/membership/customerInfo",params,"POST",true,true)
	
	//单个商品下单
	api.createOrder= params => fetch.request("api/order/createOrder",params,"POST",false,true)
	
	//多个商品下单 购物车
	api.createShopCartOrder= params => fetch.request("api/order/createShopCartOrder",params,"POST",false,true)
	
	// 首页  1特价专区 2 拼团专区
	api.homeGoodsList= params => fetch.request("api/goods/homeGoodsList",params,"POST",false,true)
	
	// 首页的搜索
	api.searchList= params => fetch.request("api/goods/searchList",params,"POST",false,true)
	
	// 平台提现方式列表
	api.userWithdrawalWay= params => fetch.request("api/userWithdrawalWay/pfList",params,"POST",false,true)
	
	// 新增提现方式
	api.userWithdrawalWayadd= params => fetch.request("api/userWithdrawalWay/add",params,"POST",false,true)
	
	// 用户平台提现方式列表
	api.userWithdrawalWaylist= params => fetch.request("api/userWithdrawalWay/list",params,"POST",false,true)
	
	//删除提现方式
	api.userWithdrawalWaydelete= params => fetch.request("api/userWithdrawalWay/delete",params,"POST",false,true)

	//提现方式详情
	api.userWithdrawalWaydetail= params => fetch.request("api/userWithdrawalWay/detail",params,"POST",false,true)
	
	//提现方式编辑
	api.userWithdrawalWayedit= params => fetch.request("api/userWithdrawalWay/edit",params,"POST",false,true)
	
	//申请提现
	api.withdrawalapply= params => fetch.request("api/withdrawal/apply",params,"POST",false,true)
	
	//提现记录
	api.withdrawallist= params => fetch.request("api/withdrawal/list",params,"POST",false,true)
	
	//提现详情
	api.withdrawaldetail= params => fetch.request("api/withdrawal/detail",params,"POST",false,true)
	
	//用户查询订单列表
	api.orderpageList= params => fetch.request("api/order/pageList",params,"POST",false,true)
	
	//用户查询订单详情
	api.orderdetail= params => fetch.request("api/order/detail",params,"POST",false,true)
	
	//支付
	api.orderPay= params => fetch.request("api/pay/orderPay",params,"POST",false,true)
	
	//确认收货
	api.customerReceive= params => fetch.request("api/order/customerReceive",params,"POST",false,true)
	
	//取消订单
	api.cancelOrder= params => fetch.request("api/order/cancelOrder",params,"POST",false,true)
	
	//申请退款
	api.applyRefund= params => fetch.request("api/order/applyRefund",params,"POST",false,true)
	
	//申请退款
	api.applyReturn= params => fetch.request("api/order/applyReturn",params,"POST",false,true)
	
	//申请退款
	api.cancelReturn= params => fetch.request("api/order/cancelReturn",params,"POST",false,true)
	
	//字典表  USER_CANCEL_REASON  退款原因    //快递公司
	api.fineListtDict= params => fetch.request("api/tDict/fineList",params,"POST",false,true)
	
	//协议 PRIVACY 隐私;  PT_PRO 平台协议; ABOUT_US 关于我们; PRIVACY_POLICY 隐私政策   SHARE_RULE分享规则
	api.agreement= params => fetch.request("api/agreement/detail",params,"POST",false,true)
	
	//填写快递单号
	api.fillBill= params => fetch.request("api/order/fillBill",params,"POST",false,true)
	
	//评价
	api.evaluateinsert= params => fetch.request("api/evaluate/insert",params,"POST",false,true)
	
	//折返明细
	api.retracefindPage= params => fetch.request("api/retrace/findPage",params,"POST",false,true)
	
	//团队分佣
	api.teamincome= params => fetch.request("api/teamincome/findPage",params,"POST",false,true)
	
	//商品评价列表
	api.evaluatefindPage= params => fetch.request("api/evaluate/findPage",params,"POST",false,true)
	
	//字典表详情
	api.tDictfineOne= params => fetch.request("api/tDict/fineOne",params,"POST",false,true)
	
	//拼团人列表
	api.grouppage= params => fetch.request("api/group/page",params,"POST",false,true)
	
	//好友列表 我的团队
	api.teamfindPage= params => fetch.request("api/team/findPage",params,"POST",false,true)
	
	//轮播图详情
	api.bannerdetail= params => fetch.request("api/banner/detail",params,"POST",false,true)
	
	//订单数量
	api.statusCount= params => fetch.request("api/order/statusCount",params,"POST",false,true)
	
	//订单支付(小程序)
	api.orderPayApplet= params => fetch.request("api/pay/orderPayApplet",params,"POST",false,true)
	
	//微信小程序获取openId
	api.getOpenid= params => fetch.request("api/getOpenid",params,"POST",false,true)
	
	//获取分享码
	api.getCode= params => fetch.request("api/referee/getCode",params,"POST",false,true)
	
	//好友列表下的佣金明细
	api.consumptionPage= params => fetch.request("api/team/consumptionPage",params,"POST",false,true)
	
	
	
export default api
