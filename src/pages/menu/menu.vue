<template>
<div>
   
   <div class="box">
       <el-button type="primary" class="btn" @click="add">添加</el-button>
       </div>
   
   <div class="list">
    <v-list :info="info" @edit="edit" ></v-list>
    <v-add :info="info" @cancel="cancel" ref="add"></v-add>
   </div>
    
</div>
</template>
<script>
  import vAdd from "./components/add"
  import vList from "./components/list"
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
        }
     this.$refs.add.empty();
    },
      // 清空form数据
     empty(){
       this.form={
         pid:0,
         title:'',
         icon:'',
         type:0,
         url:'',
         status:1
     }},
    // 关闭弹窗
    cancel(){
        this.info.isShow=false;
    },
    // 点击修改弹窗
    edit(id){
     this.info={
         isShow:true,
         title:"编辑"
     }
     this.$refs.add.look(id)
          
    }
},
mounted(){
}
}
</script>
<style scoped>
.box{
    margin-top: 20px;
    width: 100vw;
    height: 100px;
    /* background-color: hotpink; */
    position: relative;
}
.btn{
    
    position: absolute;
    top: 0;
    left: 0;
}
.list{
    margin-top: 10px;
}
</style>