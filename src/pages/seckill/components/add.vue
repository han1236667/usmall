<template>
<div>
     
     <el-dialog :title="info.title" :visible.sync="info.isShow">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
  
     <el-form-item label="活动期限" :label-width="formLabelWidth">
       <template>
   <div class="block">
  
    <el-date-picker
      v-model="time"
      value-format="timestamp"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       @change="showTime"
      >
    </el-date-picker>
  </div>
       </template>
    </el-form-item>
        
           <el-form-item label="一级分类" :label-width="formLabelWidth">
      <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst">
    <el-option
      v-for="item in classifyList"
      :key="item.id"
      :label="item.catename"
      :value="item.id">
    </el-option>
  </el-select>

    </el-form-item>

       <el-form-item label="二级分类" :label-width="formLabelWidth">

         <el-select v-model="form.second_cateid" placeholder="请选择"  @change="changeSec">
    <el-option
      v-for="item in secList"
      :key="item.id"
      :label="item.catename"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>

       <el-form-item label="商品" :label-width="formLabelWidth">
       <el-select v-model="form.goodsid" placeholder="请选择">
    <el-option
      v-for="item in threeList"
      :key="item.id"
      :label="item.goodsname"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>

  <el-form-item label="状态" :label-width="formLabelWidth">
       <el-switch
  v-model="form.status"
  :active-value="1"
  :inactive-value="2"
>
</el-switch>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button >取 消</el-button>
    <el-button type="primary" @click="add" v-if="info.title=='添加'" >添加</el-button>
    <el-button type="primary" @click="edit" v-else>编辑</el-button>
    
  </div>
</el-dialog>

</div>
</template>
<script>
import { alertWarning,alertSuccess } from '../../../util/alert';
import {reqSeckillAdd,reqClassifyList,reqSeckillListOne,reqSeckillEdit,reqGoodList} from "../../../util/request" 
import {mapGetters,mapActions} from "vuex"
export default {
    props:["info"],
components:{
 },
 computed: {
   ...mapGetters({
   classifyList:"classify/list",
   })
 },
data () {
 return {
     formLabelWidth:"100px",
     form:{
         title:"",
         begintime:"",
         endtime:"",
         first_cateid:"",
         second_cateid:"",
         goodsid:"",
         status:1
     },
    
     secList:[],
     threeList:[],
     time:[]
 }
},
methods:{
   ...mapActions({
     reqClassifyList:"classify/requestClassifyList"
   }),
  //  一级菜单发生改变
  changeFirst(){
      // console.log("一级菜单发生改变") 
     this.form.second_cateid=""
      this.form.goodsid=""
      this.reqSec()
      // console.log(this.secList)
  },
  // 二级菜单请求数据
  reqSec(){
    reqClassifyList({pid:this.form.first_cateid}).then(res=>{
       this.secList=res.data.list
      // console.log(this.secList)
    })
  },
  changeSec(){
      //  this.form.goodsid=""
    this.reqThr()
  },
  //三级菜单请求数据
  reqThr(){
    reqGoodList({fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
      // console.log(res.data.list)
    this.threeList=res.data.list

    })
  },
    changeFile(e){
        // console.log(e.target.files[0]);
      let imgInfo=e.target.files[0].name;
       
        let imgArr=[".jpg",".jpeg",'.png','.gif'];
    if(!imgArr.includes(imgInfo.slice(imgInfo.lastIndexOf('.')))){
        alertWarning('请选择正确的图片格式')   
        return
    }else{
    //  this.imgLen.push("1")
     let url=URL.createObjectURL(e.target.files[0])
    //  this.imgUrl.push(url)
      this.imgUrl=url;
    //  this.form.img.push(e.target.files[0])
      this.form.img=e.target.files[0]
    }
    },
  // 时间日期
    showTime() {
      this.form.begintime = this.time[0];
      this.form.endtime = this.time[1];
      // console.log(this.time)
    },
 add(){
    this.checked().then(()=>{
       reqSeckillAdd(this.form).then(res=>{
          if(res.data.code===200){
            alertSuccess('添加成功')
            this.info.isShow=false
             this.$emit("updata")
          }else{
            alertWarning(res.data.msg)
          }
      })
    })
     

 },
  
  look(id){
     reqSeckillListOne(id).then(res=>{
         this.form=res.data.list
      this.time[0] = this.form.begintime ;
      this.time[1] = this.form.endtime ;
      this.form.id=id
      this.reqSec();
      this.changeSec()
       
     })
  },
  edit(){
  this.checked().then(()=>{
   this.form.begintime=this.time[0] 
     this.form.endtime=this.time[1] 
    reqSeckillEdit(this.form).then(res=>{
      if(res.data.code==200){
     
        alertSuccess("修改成功")
        this.info.isShow=false
        this.$emit("updata")
      }else{
        alertWarning(res.data.msg)
      }
    })
  })
     
  },
  empty(){
     this.form={
         title:"",
         begintime:"",
         endtime:"",
         first_cateid:"",
         second_cateid:"",
         goodsid:"",
         status:1
     };
       this.imgUrl="";
     this.secList=[];
     this.threeList=[];
     this.time=[]
  },
      checked(){
      return new Promise((resolve,reject)=>{
          if(this.form.title===""){
            alertWarning('活动名称不能为空')
                return;
            }
           if(this.form.begintime===""||this.form.endtime===""){
            alertWarning('活动期限不能为空')
                return;
            }
              if(this.form.first_cateid===""){
            alertWarning('一级分类不能为空')
                return;
            }
              if(this.form.second_cateid===""){
            alertWarning('二级分类不能为空')
                return;
            }
              if(this.form.goodsid===""){
            alertWarning('商品不能为空')
                return;
            }
         
            resolve()
      })
    }
  


},
mounted(){
     
      this.reqClassifyList();
      console.log(this.classifyList)
}
}
</script>
<style scoped>
 

</style>