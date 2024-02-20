import Vue from 'vue';
import LookEmpty from './look-empty';
import LookDulplicateChecking from './look-dulplicate-checking';
import LookAssociatedDocument from './look-associated-document';
import LookAssociatedAttachment from './look-associated-attachment';
import LookPerformanceUnit from './look-performance-unit';
import LookPerformanceLeader from './look-performance-leader';
import LookPerformanceCms from './look-performance-cms';

import '../style/index.scss';

const components = [
  LookEmpty,
  LookDulplicateChecking,
  LookAssociatedDocument,
  LookAssociatedAttachment,
  LookPerformanceUnit,
  LookPerformanceLeader,
  LookPerformanceCms,
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
