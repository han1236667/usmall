<template>
<div>
    <div class="tit">
     <el-button type="primary" class="btn" @click="add">添 加</el-button>
    </div>
    
    <div class="con">
        <v-add :info="info" @close="close" ref="add"></v-add>
        <v-list @edit="edit" ></v-list>
    </div>

</div>
</template>
      
<script>
  import vList from "./components/list"
  import vAdd from "./components/add"
 
export default {
components:{
    vList,
    vAdd
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
       
    },
    close(){
        this.info={
            isShow:false,
            title:"添加"
        }   
    },
    edit(id){
      this.$refs.add.look(id);
      this.info={
          isShow:true,
          title:"修改"
      }
    }
},
mounted(){
}
}
</script>
<style scoped>
 .tit{
     width: 100vw;
     height: 50px;
     
    position: relative;
 }
 .btn{
     position: absolute;
     left: 10px;
     top: 10px;
 }
 .con{
     margin-top:10px ;
 }

</style>