import Vue from 'vue';
import LookEmpty from './look-empty';
import LookDulplicateChecking from './look-dulplicate-checking';
import LookAssociatedDocument from './look-associated-document';
import LookAssociatedAttachment from './look-associated-attachment';

import '../style/index.scss';

const components = [
  LookEmpty,
  LookDulplicateChecking,
  LookAssociatedDocument,
  LookAssociatedAttachment,
];

for (let i = 0; i < components.length; i++) {
  Vue.component(components[i].name, components[i]);
}

export default {
  install(Vue) {
    for (let i = 0; i < components.length; i++) {
      Vue.component(components[i].name, components[i]);
    }
  },
};
