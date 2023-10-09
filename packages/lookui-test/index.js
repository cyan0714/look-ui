import LookuiTest from './src/main';

/* istanbul ignore next */
LookuiTest.install = function (Vue) {
  Vue.component(LookuiTest.name, LookuiTest);
};

export default LookuiTest;
