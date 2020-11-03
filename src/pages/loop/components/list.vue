<template>
<div>
 
     <template>
    <el-table
      :data="form"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="轮播图标题"
        width="180">
      </el-table-column>

      <el-table-column
        prop=""
        label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img"  alt="">
        </template>
      </el-table-column>

<el-table-column
        prop="status"
        label="状态"
        width="180">
  
  <template slot-scope="scope">
       <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
       <el-button v-else type="danger">禁用</el-button>
  </template>

      </el-table-column>

<el-table-column
        prop="title"
        label="操作"
        width="200">
 <template slot-scope="scope">
     <el-button  type="primary" @click="edit(scope.row.id)">编 辑</el-button>
       <el-button  type="danger" @click="del(scope.row.id)">删 除</el-button>

 </template>

      </el-table-column>

    </el-table>
  </template>

     
</div>
</template>
<script>
import { alertWarning,alertSuccess } from '../../../util/alert';
import {reqBannerAdd,reqBannerList,reqUserListOne,reqBannerEdit,reqBannerDel} from "../../../util/request" 

export default {
components:{
 },

data () {
 return {
     form:[]
 }
},
methods:{
 
 //  刷新页面数据
  getList(){
    reqBannerList().then(res=>{
      this.form=res.data.list
      
    })
  },
   del(id){
    
     this.$confirm('此操作将永久删除是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
        
        reqBannerDel(id).then(res=>{
          if(res.data.code==200){
          alertSuccess("删除成功");
          this.getList()
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

   },

   edit(id){
this.$emit("edit",id)
  
   }
},

mounted(){
    reqBannerList().then(res=>{
        this.form=res.data.list
        // console.log(this.form[1].img);
    })
}
}
</script>
<style scoped>
 img{
     width: 50px;
     height: 50px;
 }
</style>