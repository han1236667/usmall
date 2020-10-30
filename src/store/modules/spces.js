import {reqSpecList} from '../../util/request' 


const state={
   list:[]
}

const mutations={
   reqList(state,arr){
      state.list=arr;
   }
}

const actions={
    requestSpecList(context){
        reqSpecList().then(res=>{
            let arr = res.data.list?res.data.list:[];
          arr.forEach(item=>{
              item.attrs=JSON.parse(item.attrs)
          })
            context.commit("reqList",arr)
        })
    }
}

const getters={
   list(state){
       return state.list;
   }
}

export default{
  state,
  mutations,
  actions,
  getters,
  namespaced:true

}