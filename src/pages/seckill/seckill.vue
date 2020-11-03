<template>
<div>
      <el-button type="primary" @click="add" >添加</el-button>
     <v-list  ref="list" @edit="edit"></v-list>
     <v-add :info="info" @updata="updata" ref="add"></v-add>
</div>
</template>
<script>
   import vAdd from "./components/add"
   import vList from "./components/list"
   import {reqBannerAdd,reqBannerList,reqUserListOne,reqBannerEdit} from "../../util/request" 

export default {
components:{
    vAdd,
    vList
 },
data () {
 return {
  info:{
      isShow:false,
      title:"添加"
  }
}
},
methods:{
    add(){
        this.info={
            isShow:true,
            title:"添加"
        };
        this.$refs.add.empty()
    },
    // 刷新页面数据
    updata(){
       this.$refs.list.getList()
    },
    edit(id){
  this.$refs.add.look(id)
        this.info={
            isShow:true,
            title:"修改"
        }
        console.log(this.info);
    }
},
mounted(){
    // reqBannerList()
}
}
</script>
<style scoped>
</style>