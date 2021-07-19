# 软云前端框架部分目录结构
 uniapp-frame-ruanyun                      主工程目录内核代码
     ├── common                            基础公共方法包
     │   ├── api                            api 接口二次封装包
     │   │     ├── api.js                   api 接口定义。在里面定义，在外部调用, 建议自定义代码块，方便写，文件底部有代码块
     │   │     ├── config.js                api 基础 url 定义
     │   │     └── request.js              网络请求的二次封装
	 │   ├── app.css                       全局公共样式
	 │   ├── cacheHelper.js                缓存工具类
	 │   └── tui.js                        ui 工具类
	 ├── components                        组件
     │   ├── tui组件                       示例参照官方模板，写的时候无需在引入文件，已配置全局，直接 tui开头就可使用
     │   ├── 下拉刷新组件                   [教程](http://www.mescroll.com/uni.html?v=20200210#custom)
     │   ├── 短视频组件                     教程看  page/css3目录下
	 │   └── mixins                       混入对象包，如果可以公用的业务逻辑，可写入其中，目前有一个 im 消息列表例子
     ├── constant                         常量
     │   └── constant.js                  常量定义，包含本地缓存的名字，全局事件通知key
     ├── lib                              第三方sdk，内置高德地图和腾讯地图类，二维码类库
	 │   ├── amap-wx.js                   高德地图
	 │   ├── qqmap-wx-jssdk.min.js        腾讯地图
	 │   └── weapp-qrcode.js              二维码生成
	 ├── tim_commen                       im 即时通讯模块，目前集成了腾讯云 im。简单文字聊天，后期补充
	 ├── node_modules                     npm 自动生成的第三方 modules
     ├── pages                            主界面包，里面写了基础登录，和列表下拉刷新api接口的示例，建议一个界面中太多控件的时候，建议拆分来写。
     ├── static                           静态资源目录
	 ├── store                            vuex 全局缓存，建议使用，看业务需求（目前 im 逻辑，大量运用）
	 ├── utils                            工具包，后期积累
	 ├── App.vue                          根页面，目前推送的回调写在此文件内
     └── main.js                          主函数入口，一些全局的挂载事件已经写好。

# api 代码块
{
	"api": {
		"body": [
			"this.api.$1($2)",
			".then((res) => {",
			"\t$3",
			"})",
			".catch((err) => {",
			"\t$4",
			"})"
		],
		"prefix": "api",
		"scope": "source.js"
	}
}