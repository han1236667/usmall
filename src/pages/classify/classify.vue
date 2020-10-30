<template>
<div>
      <el-button type="primary" @click="add">添加</el-button>
          <v-list @edit="edit" @updata="updata"></v-list>
          <v-add :info="info" @cancel="cancel" ref="add"></v-add>
         
  

</div>
</template>
<script>
  import vAdd from "./components/add"
  import vList from "./components/list"

  import {alertSuccess,alertWarning} from "../../util/alert"

  import {reqUserCount,reqUserList} from '../../util/request'
  import {mapGetters,mapActions} from 'vuex'

export default {
components:{
  vAdd,
  vList
 },
 computed: {
     ...mapGetters({
         list:"classify/list"
     })
 },
data () {
 return {
   info:{
     isShow:false,
     title:"添加"
   },
 
 }
},
methods:{
   ...mapActions({
     reqList:"classify/requestClassifyList"
   }),

  add(){
    this.info={
      isShow:true,
      title:"添加"
    }
   
    this.$refs.add.letEmpty();
  },
   cancel(){
     this.info={
       isShow:false,
       title:"添加"
     };
     this.updata();
   },
  //  重新更新页面
  updata(){
 
    this.reqList();

  },
  edit(uid){
    this.$refs.add.look(uid);
    this.info={
      isShow:true,
      title:"修改"
    }
  },
  changePage(thepage){
      this.nowPage=thepage;
    
      this.updata();
      
  }
},
mounted(){
    this.updata();
 
}
}
</script>
<style scoped>
</style>