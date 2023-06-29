import LookuiEmpty from './lookui-empty'
import LookuiTest from './lookui-test'
import '../style/index.scss';

const components = [
  LookuiEmpty,
  LookuiTest
]

export default {
  install(Vue) {
    for (let i = 0; i < components.length; i++) {
      Vue.component(components[i].name, components[i]);
    }
  },
};
