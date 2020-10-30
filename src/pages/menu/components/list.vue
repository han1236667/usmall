<template>
<div>
    
 
 <el-table
    :data="list"
    style="width: 80%,height:20%"
    row-key="id"
    border
    lazy
    
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
    max-height=40
      prop="id"
      label="菜单编号"
      width="180">
    </el-table-column>
    <el-table-column
    max-height=40
      prop="title"
      label="菜单名称"
      width="180">
    </el-table-column>

    <el-table-column
     max-height=40
      prop="icon"
      label="菜单图标">
    </el-table-column>

        <el-table-column
    max-height=40
      prop="url"
      label="菜单地址"
      width="180">
    </el-table-column>

        <el-table-column
    max-height=40
      prop="status"
      label="状态"
      width="180">

 <template slot-scope='scope' >
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
           <el-button type="info" v-else>禁用</el-button>
        </template>

    </el-table-column>
        <el-table-column
    max-height=40
      prop=""
      label="操作"
      width="200">

        <template slot-scope="scope">
     <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
  <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
 
  </template>

    </el-table-column>
  </el-table>

</div>
</template>

<script>
  import {mapGetters,mapActions}  from "vuex"
  import {reqMenuDel} from "../../../util/request"

export default {

  computed: {
    ...mapGetters({
      list:"menu/list"
    })
  },
components:{
 },
data () {
 return {
       form: [{
          pid: 1,
          title: '',
          icon: '',
          type:1,
          url:'',
          status:1
        }]
      
 }
},
methods:{
  ...mapActions({
    requestMenuList:"menu/requestMenuList"
  }),
  // 修改按钮
  edit(id){
    // 触发打开弹窗
    this.$emit('edit',id)
  },
  // 删除按钮
  del(id){
  
     this.$confirm('是否继续删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            reqMenuDel({id:id}).then(res=>{
              if(res.data.code==200){
                   this.$message({
            type: 'success',
            message: '删除成功!'
                    });
             this.requestMenuList();
              }else{
                 this.$message({
            type: 'info',
            message: res.data.msg,
          });          
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
  this.requestMenuList()
  console.log(this.list);
 
}
}
</script>
<style scoped>

</style>