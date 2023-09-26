import LookuiEmpty from './lookui-empty'
import LookuiTest from './lookui-test'
import LookDulplicateChecking from './look-dulplicate-checking'
import '../style/index.scss';

const components = [LookuiEmpty, LookuiTest, LookDulplicateChecking];

export default {
  install(Vue) {
    for (let i = 0; i < components.length; i++) {
      Vue.component(components[i].name, components[i]);
    }
  },
};
