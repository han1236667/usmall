import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

import actions from './actions'
import {state,mutations,getters} from './mutations'

import menu  from './modules/menu'
import role from "./modules/role"
import classify from './modules/classify'
import spces from './modules/spces'
import goods from './modules/goods'

export default  new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
       menu,
       role,
       classify,
       spces,
       goods
    }
})