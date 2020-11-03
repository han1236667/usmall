<template>
<div>

   <el-dialog :title="info.title" :visible.sync="info.isShow">
  <el-form :model="form">
    <el-form-item label="手机号" label-width="100px">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
  
 
    <el-form-item label="昵称" label-width="100px">
      <el-input v-model="form.nickname" autocomplete="off"></el-input>
    </el-form-item>
  
 
    <el-form-item label="密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
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
    <!-- <el-button type="primary" @click="add" v-if="info.title=='添加'">添 加</el-button> -->
    <el-button type="primary" @click="edit" >修 改</el-button>

  </div>
</el-dialog>


</div>
</template>
<script>
  
  import {mapGetters,mapActions} from "vuex"
 import {reqMemberAdd,reqMemberListOne,reqMemberEdit}  from "../../../util/request" 
 import {alertSuccess,alertWarning}  from "../../../util/alert"

export default {
    props:["info"],
    computed: {
        ...mapGetters({
          list:"member/list",
          userInfo:"userInfo"
     }),
    },
components:{
 },
data () {
 return {
     
     form:{
         nickname:"",
         phone:"",
         password:"",
         status:1
     },
  
 }
},
methods:{
    ...mapActions({
        requestMenuList:"menu/requestMenuList",
         requestRoleList:"member/getList"

    }),

   cancel(){
       this.$emit('close')
       this.empty();
   },
   empty(){
       this.form={
         nickname:"",
         phone:"",
         password:"",
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
 
//    查看一条数据
   look(uid){
     reqMemberListOne({uid:uid}).then(res=>{     
          this.form=res.data.list
        //  this.form.uid=uid;
        //  console.log(this.form)
     })
   },
//  点击修改按钮
   edit(){
       
       this.checked().then(()=>{
         reqMemberEdit(this.form).then(res=>{
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
       })
        
      
   },
      checked(){
      return new Promise((resolve,reject)=>{
          if(this.form.phone===""){
            alertWarning('手机号不能为空')
                return;
            }
           if(this.form.nickname===""){
            alertWarning('昵称不能为空')
                return;
            }
            if(this.form.password===""){
            alertWarning('密码不能为空')
                return;
            }
            resolve()
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