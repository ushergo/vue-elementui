import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import  * as sj from './sj/index';
import {getters} from './getters'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    ...sj,
  },
  getters
});
