import LookPerformanceCms from './src/main';

/* istanbul ignore next */
LookPerformanceCms.install = function (Vue) {
  Vue.component(LookPerformanceCms.name, LookPerformanceCms);
};

export default LookPerformanceCms;
