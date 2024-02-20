import LookPerformanceUnit from './src/main';

/* istanbul ignore next */
LookPerformanceUnit.install = function (Vue) {
  Vue.component(LookPerformanceUnit.name, LookPerformanceUnit);
};

export default LookPerformanceUnit;
