import LookAssociatedAttachment from './src/main';

/* istanbul ignore next */
LookAssociatedAttachment.install = function (Vue) {
  Vue.component(LookAssociatedAttachment.name, LookAssociatedAttachment);
};

export default LookAssociatedAttachment;
