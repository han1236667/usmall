<template>
<div>

   <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
  <el-form :model="form">
    <el-form-item label="角色名称" label-width="100px">
      <el-input v-model="form.rolename" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="角色权限" label-width="100px">
    
    <!-- 树形控件 -->
   <el-tree
  :data="list"
  show-checkbox
  node-key="id"
  ref="tree"
  :props=" { children: 'children',label: 'title'}">
</el-tree>

    </el-form-item>

     <el-form-item label="状态" label-width="100px">
      
      <el-switch
  v-model="form.status"
  active-color="#13ce66"
  inactive-color="#ff4949"
  :active-value="1"
  :inactive-value="2"
  >
</el-switch>

    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="add" v-if="info.title=='添加'">添 加</el-button>
    <el-button type="primary" @click="edit" v-else>修 改</el-button>

  </div>
</el-dialog>


</div>
</template>
<script>
  
  import {mapGetters,mapActions} from "vuex"
 import {reqRoleAdd,reqRoleListOne,reqRoleEdit}  from "../../../util/request" 
 import {alertSuccess,alertWarning}  from "../../../util/alert"

export default {
    props:["info"],
    computed: {
        ...mapGetters({
      list:"menu/list",
      
     }),
    },
components:{
 },
data () {
 return {
     
     form:{
         rolename:"",
         menus:"",
         status:1
     },
  
 }
},
methods:{
    ...mapActions({
        requestMenuList:"menu/requestMenuList",
        requestRoleList:"role/requestRoleList"
    }),

   cancel(){
       this.$emit('close')
       this.empty();
   },
   empty(){
       this.form={
         rolename:"",
         menus:"",
         status:1
       }
       
   },
   emptyTree(){
    //  清空树形结构数据
     this.$refs.tree.setCheckedKeys([]);
   },
   opened(){
     if(this.info.title==="添加"){
      this.empty();
      this.emptyTree();
     }
      
   },
    add(){
       this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleAdd(this.form).then(res=>{
               if(res.data.code==200){
               alertSuccess(res.data.msg)
               this.requestRoleList();
               this.empty();
               this.cancel();
               }else{
                alertWarning(res.data.msg);

               }
        })
   },
//    查看一条数据
   look(id){
     reqRoleListOne({id:id}).then(res=>{
         this.form=res.data.list;
         this.form.id=id;
         this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
     })
   },
//  点击修改按钮
   edit(){
       
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then(res=>{
        if(res.data.code==200){
          alertSuccess(res.data.msg);
          this.cancel();
          this.empty();
          this.requestRoleList();
        }else{
          alertWarning(res.data.msg)
          this.empty();

        }
      })
   }
},
mounted(){
    this.requestMenuList();
    
 }
}

</script>
<style scoped>
</style>