<template>
<div>
     
     
      <el-table
    :data="form"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    
    >
    <el-table-column
      prop="roleid"
      label="用户编号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      sortable
      width="180">
    </el-table-column>
 
     <el-table-column
      prop="rolename"
      label="所属角色"
      sortable
      width="180">
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
      <el-button type="primary" @click="edit(scope.row.uid)" >编 辑</el-button>
      <el-button type="danger" @click="del(scope.row.uid)">删 除</el-button>      
       
   </template>
   
      
    </el-table-column>

  </el-table>


</div>
</template>
<script>
   
  import {reqUserDel} from "../../../util/request"
  import {alertSuccess,alertWarning} from "../../../util/alert"
   

export default {
components:{
 },
 props:["form"],
data () {
 return {
 }
},
methods:{
    edit(uid){
      this.$emit("edit",uid)
      
    },
    del(uid){
       
   
     this.$confirm('此操作将永久删除是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
        
        reqUserDel(uid).then(res=>{
          if(res.data.code==200){
          alertSuccess("删除成功");
          this.$emit("updata")
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
 
}
}
</script>
<style scoped>
</style>