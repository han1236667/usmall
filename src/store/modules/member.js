import {reqMemberList} from "../../util/request"

const state={
     list:[]
}

const mutations={
    mutList(state,arr){
        state.list=arr
    }
}

const actions={
   getList(context){
    reqMemberList().then(res=>{
        context.commit("mutList",res.data.list)
    })
   }
}

const getters={
     list(state){
         return state.list;
     }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
    
}