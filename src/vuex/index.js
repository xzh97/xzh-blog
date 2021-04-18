import {createStore} from 'vuex';

import state from './state';
import getters from './getter';
import mutations from './mutation';
import actions from './action';
import modules from './modules/index';

const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules,
})

export default store;