<template>
<div>
   
   <el-dialog :title="info.title" :visible.sync="info.isShow">
  <el-form :model="form">
    <el-form-item label="所属角色" label-width="100px">
   
      <el-select v-model="form.roleid" placeholder="请选择">
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.rolename"
      :value="item.id">
    </el-option>
  </el-select>
     
    </el-form-item>

    <el-form-item label="用户名" label-width="100px">
   <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
    </el-form-item>

   <el-form-item label="密码" label-width="100px">  
   <el-input v-model="form.password" placeholder="请输入密码"  ></el-input>
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
    <el-button type="primary" v-else @click="edit">修 改</el-button>

  </div>
</el-dialog>

</div>
</template>
<script>
  
  // 引入所属角色
  import {mapGetters,mapActions} from "vuex"
  import {reqUserAdd,reqUserListOne,reqUserEdit,reqUserList} from "../../../util/request"
  import {alertSuccess,alertWarning} from "../../../util/alert"

export default {
  props:["info"],
components:{
 },
 computed: {
    ...mapGetters({
      roleList:"role/roleList"
   }),
 },
data () {
 return {
   
   form:{
     roleid:"",
     username:"",
     password:"",
     status:1
   }
 }
},
methods:{
   ...mapActions({
    requestRoleList:"role/requestRoleList"
  }),
  // 点击取消按钮
  cancel(){
   this.$emit("cancel")
  },
  empty(){
    this.form={
     roleid:"",
     username:"",
     password:"",
     status:1
    }
  },

  add(){
   this.checked().then(()=>{
         reqUserAdd(this.form).then(res=>{
     if(res.data.code===200){
          alertSuccess("添加成功");
          // 关闭弹窗
          this.cancel();
          // 清空from数据
          this.empty();
          //  刷新请求的列表数据
          this.$emit("cancel");
     }else{
       alertWarning(res.data.msg)
     }
   })
   })
  
},
look(uid){
  reqUserListOne(uid).then(res=>{
    if(res.data.code===200){
    this.form=res.data.list;
    this.form.password="";
    
    }
})
},
//  判断清空表中数据
  letEmpty(){
   this.empty();
  },
  // 点击修改
  edit(){
    this.checked().then(()=>{
        reqUserEdit(this.form).then(res=>{
      if(res.data.code==200){
        alertSuccess("修改成功");
      this.info.isShow=false;
       this.$emit("cancel")
      }else{
        alertWarning(res.data.msg)
      }
    })
    })
   
  },
    checked(){
     return new Promise((resolve,reject)=>{
         if(this.form.roleid==""){
          alertWarning("所属角色不能为空")
          return;
        }
        if(this.form.username==""){
          alertWarning("用户名不能为空")
          return;
        }
           if(this.form.password==""){
          alertWarning("密码不能为空")
          return;
        }
        
        resolve()
     })
   }

},
mounted(){
 this.requestRoleList();

}
}
</script>
<style scoped>
</style>