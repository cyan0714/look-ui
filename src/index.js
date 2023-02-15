import lookEmpty from './components/look-empty.vue'
import tabScroll from './components/tab-scroll.vue'
export default {
  install(Vue) {
    Vue.component('look-empty', lookEmpty)
    Vue.component('look-tab-scroll', tabScroll)
  }
}


