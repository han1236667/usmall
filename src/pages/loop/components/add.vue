<template>
<div>
     
     <el-dialog :title="info.title" :visible.sync="info.isShow">
  <el-form :model="form">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth">
        <div class="big">
  <div class="wrap"  >
        <h2>+</h2>
        <input type="file" class="ipt" @change="changeFile">
        <img :src="imgUrl" alt="" class="img">
    </div>
        </div>
   

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
    <el-button type="primary" @click="add" v-if="info.title=='添加'">添加</el-button>
    <el-button type="primary" @click="edit" v-else>修改</el-button>
    
  </div>
</el-dialog>

</div>
</template>
<script>
import { alertWarning,alertSuccess } from '../../../util/alert';
import {reqBannerAdd,reqBannerList,reqBannerListOne,reqBannerEdit} from "../../../util/request" 
export default {
    props:["info"],
components:{
 },
data () {
 return {
     formLabelWidth:"100px",
     form:{
         title:"",
         img:"",
         status:1
     },
     imgUrl:"",
    //  imgLen:[1]
 }
},
methods:{
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

 add(){
   
   this.checked().then(()=>{
    let form = new FormData();
      for(let i in this.form){
          form.append(i,this.form[i])
      }
      reqBannerAdd(form).then(res=>{
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
     reqBannerListOne(id).then(res=>{
         this.form=res.data.list
        //  console.log("look==="+this.form)
        this.imgUrl=this.$imgPre+this.form.img
         this.form.id=id
     })
  },
  edit(){

     this.checked().then(()=>{
        let form = new FormData()
      for(let i in this.form){
         form.append(i,this.form[i])
      }
    reqBannerEdit(form).then(res=>{
      if(res.data.code==200){
        alertSuccess("修改成功")
        this.info.isShow=false;
        this.empty();
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
         img:"",
         status:1
     };
     this.imgUrl=null;
  },
    checked(){
      return new Promise((resolve,reject)=>{
          if(this.form.title===""){
            alertWarning('标题不能为空')
                return;
            }
           if(this.form.img===""){
            alertWarning('图片不能为空')
                return;
            }
         
            resolve()
      })
    }
  


},
mounted(){
      //   if(this.info.title=="添加"){
      //  this.empty()
      //  console.log(1111111);
      // }
}
}
</script>
<style scoped>
  .big{
      display: flex;
      flex-direction: row;
  }
  .wrap{
      width: 100px;
      height: 100px;
      border: 1px dashed red;
      position: relative;
      margin-left: 10px;
  }
  h2{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
     z-index: 1;
  }
   .ipt{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    opacity: 0;
   }
   .img{
       width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
   }

</style>