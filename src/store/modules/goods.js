import {reqGoodList} from "../../util/request"

const state ={
   list:[]
}

const mutations={
    changeList(state,arr){
       state.list=arr
     }
}

const actions={
   requestClassifyList(context){
         reqGoodList().then(res=>{ 
                 context.commit("changeList",res.data.list)
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