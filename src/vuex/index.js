import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

import state from './state';
import getters from './getter';
import mutations from './mutation';
import actions from './action';
import modules from './modules/index';

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules,
})

export default store;