<template>
<div>
     
     
      <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
         <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
 
  
 

     <el-table-column
      prop="status"
      label="状态">
    <template slot-scope="scope">
   
    <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
   <el-button type="danger" v-else>禁 用</el-button>
    </template>
  
    </el-table-column>

    <el-table-column
      prop="address"
      label="操作">
   <template slot-scope="scope">
      <el-button type="primary" @click="edit(scope.row.id)" >编 辑</el-button>
      <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>      
       
   </template>
   
      
    </el-table-column>

  </el-table>


</div>
</template>
<script>
   
  import {reqSpecDel} from "../../../util/request"
  import {alertSuccess,alertWarning} from "../../../util/alert"
  import {mapGetters,mapActions} from 'vuex'
   

export default {
components:{
 },
 props:["form"],
 computed: {
     ...mapGetters({
          list:"spces/list"
     })
 },
data () {
 return {
   
 }
},
methods:{
     ...mapActions({
       reqList:"spces/requestSpecList"
   }),

    edit(id){
      this.$emit("edit",id)
      
    },
    del(id){
       
   
     this.$confirm('此操作将永久删除是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
        
        reqSpecDel(id).then(res=>{
          if(res.data.code==200){
          alertSuccess("删除成功");
          // this.$emit("updata")
          this.reqList();
          }else{
              alertWarning(res.data.msg)
          }      
        }) 

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


    }
},
mounted(){
   this.reqList();
   
}
}
</script>
<style scoped>
img{
    width: 50px;
    height: 50px;
}
</style>