import LookAssociatedDocument from './src/main';

/* istanbul ignore next */
LookAssociatedDocument.install = function (Vue) {
  Vue.component(LookAssociatedDocument.name, LookAssociatedDocument);
};

export default LookAssociatedDocument;
