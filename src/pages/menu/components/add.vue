<template>
<div>
    <el-dialog  :title="info.title" :visible.sync="info.isShow">
  <el-form :model="form">
    <el-form-item label="菜单名称" label-width="120px">
      <el-input v-model="form.title" autocomplete="off" ></el-input>
    </el-form-item>

    <el-form-item label="上级菜单" label-width="120px">
      <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="changePid">
         <el-option  label="顶级菜单" :value="0"></el-option>
     <el-option v-for="item in list" :key='item.id' :label="item.title" :value="item.id"></el-option>

      </el-select>
    </el-form-item>
   
 <el-form-item label="菜单类型" label-width="120px">
   
    <el-radio v-model="form.type" :label="1"  disabled>目录</el-radio>
      <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
   
       
    </el-form-item>
 
 <el-form-item label="目录图标" label-width="120px" v-if="form.type==1">
      <el-select v-model="form.icon" placeholder="请选择目录图标">
         <el-option value="el-icon-camera-solid">
            <i class="el-icon-camera-solid"></i>
        </el-option>
         <el-option value="el-icon-video-camera-solid">
            <i class="el-icon-video-camera-solid"></i>
        </el-option>
         <el-option value="el-icon-s-flag">
            <i class="el-icon-s-flag"></i>
        </el-option>
         <el-option value="el-icon-share">
            <i class="el-icon-share"></i>
        </el-option>
      </el-select>
    </el-form-item>

  <el-form-item label="菜单地址" label-width="120px" v-else>
      <el-select v-model="form.url" placeholder="请选择地址">
         <el-option v-for="item in indexRouters" :key="item.path" :value="item.name" :label="item.name">
           
        </el-option>
         
      </el-select>
    </el-form-item>


 <el-form-item label="状态" label-width="120px">
      <el-switch v-model="form.status" :active-value="1"  :inactive-value="2"></el-switch>
    </el-form-item>
 
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="add" v-if="info.title=='添加'">添加</el-button>
    <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
</el-dialog>

</div>
</template>
<script>
   import {reqMenuAdd,reqMenuListOne,reqMenuEdit} from '../../../util/request'
   import {alertSuccess,alertWarning} from '@/util/alert'
    import {indexRouters} from "../../../router/index"
    import {mapGetters,mapActions} from 'vuex'

export default {
    props:["info"],
    computed:{
  ...mapGetters({
    list:'menu/list'
  })
 },
components:{
 },
data () {
 return {
     form:{
          pid:0,
         title:'',
         icon:'',
         type:1,
         url:'',
         status:1
     },
     indexRouters:indexRouters
 }
},
methods:{
    ...mapActions({
       requestMenuList:"menu/requestMenuList"
    }),
changePid(){
    if(this.form.pid===0){
       this.form.type=1
    }else{
 this.form.type=2
    }
},

  // 关闭弹窗
    cancel(){
        this.$emit('cancel');
        this.empty();
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
     }
    },
    add(){
      
      this.checked().then(()=>{
        reqMenuAdd(this.form).then((res)=>{
         if(res.data.code==200){
             alertSuccess(res.data.msg)
             this.cancel();
            //  重新请求数据
            this.requestMenuList();
            
         }else{
             alertWarning(res.data.msg)
         }
        })
      })
     
       
          
    },
    look(id){
     reqMenuListOne({id:id}).then(res=>{
         this.form=res.data.list
        // console.log(res.data.list)
        this.form.id=id;
     })
    },

     //  点击修改按钮
    updata(){
      this.checked().then(()=>{
      reqMenuEdit(this.form).then(res=>{
           if(res.data.code==200){
             alertSuccess(res.data.msg)
            this.requestMenuList();
             this.cancel();
              // 清空数据
                 this.empty();
         }else{
             alertWarning(res.data.msg)
         }
       })
      })
       
    } ,
    // 验证
    checked(){
      return new Promise((resolve,reject)=>{
          if(this.form.title===""){
            alertWarning('标题不能为空')
                return;
            }
            if(this.form.icon===""&&this.form.url===""){
            alertWarning('图标或地址不能为空')
                return;
            }
            resolve()
      })
    }
},
mounted(){
     
}
}
</script>
<style scoped>
 
  
</style>