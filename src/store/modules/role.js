 import {reqRoleList} from "../../util/request"

const state={
     list:[],
 }

 const mutations={
       changeList(state,list){
           state.list=list
       }
 }

 const actions={
     requestRoleList(context){
        reqRoleList().then(res=>{
            context.commit("changeList",res.data.list)
        })
     }
 }

 const getters={
     roleList(state){
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
 