import LookPerformanceLeader from './src/main';

/* istanbul ignore next */
LookPerformanceLeader.install = function (Vue) {
  Vue.component(LookPerformanceLeader.name, LookPerformanceLeader);
};

export default LookPerformanceLeader;
