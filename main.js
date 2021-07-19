import Vue from 'vue'
import App from './App'
import store from './store'
import tui from './common/tui.js' // 普通的快速工具类
import cacheHelper from './common/cacheHelper.js' // 缓存工具类
import api from './common/api/api.js' //api 接口
import constant from './constant/constant.js' // 常量
import utils from './utils/util.js'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue" //下拉刷新
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue" //下拉刷新



// import tim from './tim_commen/tim/tim.js'
import commen from './tim_commen/commen.js'
// import TIM from 'tim-js-sdk'


Vue.config.productionTip = false

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.prototype.tui = tui
Vue.prototype.api = api
Vue.prototype.cacheHelper = cacheHelper
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$store = store
Vue.prototype.constant = constant
Vue.prototype.utils = utils

// Vue.prototype.baseUrl = 'https://wuxif.utools.club/'
Vue.prototype.baseUrl = 'http://192.168.1.166:8089/'

Vue.prototype.gaodeKey = 'a9dfc2b7c4b4b6118ead41b0aef98ad4'


// Vue.prototype.tim = tim.tim //tim sdk 引入后生成的tim服务
// Vue.prototype.$TIM = TIM //tim 的状态/事件 常量

Vue.prototype.$commen = commen

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
