import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import LookUI from '../packages/index.js';
import '../style/index.scss';
import './normalize.css'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(LookUI);
new Vue({
  render: h => h(App),
}).$mount('#app');
