<template>
<div>
      <el-button type="primary" @click="add">添加</el-button>
          <v-list :form="form" @edit="edit" @updata="updata"></v-list>
          <v-add :info="info" @cancel="cancel" ref="add"></v-add>
         
         <!-- 分页  page-size每页支持的页数  total页的总数  current-change页面发生改变时的执行函数 -->
          <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="size"
    @current-change="changePage"
    >
  </el-pagination>
</div>

</div>
</template>
<script>
  import vAdd from "./components/add"
  import vList from "./components/list"

  import {alertSuccess,alertWarning} from "../../util/alert"

  import {reqUserCount,reqUserList} from '../../util/request'

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
   },
   form:[],
   size:2,
   total:1,
   nowPage:1,
 }
},
methods:{
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
      reqUserCount().then(res=>{
     this.total=res.data.list[0].total;
   })

     reqUserList({size:this.size,page:this.nowPage}).then(res=>{
      if(res.data.code==200){
     
      
      let list =res.data.list?res.data.list:[];
     
       if(list.length===0&&this.nowPage>1){
         this.nowPage--;
         this.updata();
        //  return
       }
       
       this.form = list;

      }
  })
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
    // 获取页的总数
   reqUserCount().then(res=>{
     this.total=res.data.list[0].total;
   })
}
}
</script>
<style scoped>
</style>