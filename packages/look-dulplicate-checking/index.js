import LookDulplicateChecking from './src/main';

/* istanbul ignore next */
LookDulplicateChecking.install = function (Vue) {
  Vue.component(LookDulplicateChecking.name, LookDulplicateChecking);
};

export default LookDulplicateChecking;
