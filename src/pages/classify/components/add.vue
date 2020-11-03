<template>
<div>
   
   <el-dialog :title="info.title" :visible.sync="info.isShow">
  <el-form :model="form">

    <el-form-item label="上级分类" label-width="100px">
   
      <el-select v-model="form.pid" placeholder="请选择">
  <el-option label="--请选择--" value disabled></el-option>
     <el-option
      label="顶级分类"
      :value="0">
    </el-option>

    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.catename"
      :value="item.id">
    </el-option>

  </el-select>
     
    </el-form-item>

    <el-form-item label="分类名称" label-width="100px">
   <el-input v-model="form.catename" placeholder="请输入分类名" ></el-input>
    </el-form-item>

   <el-form-item label="图片" label-width="100px" v-if="!form.pid==0">  
       
    <div class="box">
        <h3>+</h3>
        <input class="ipt" type="file" @change="changeFile" :v-if="imgSrc">    
        <img :src="imgSrc" alt="">
    </div>

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
  import {reqClassifyAdd,reqClassifyListOne,reqClassifyEdit,reqUserList} from "../../../util/request"
  import {alertSuccess,alertWarning} from "../../../util/alert"

export default {
  props:["info"],
components:{
 },
 computed: {
    ...mapGetters({
       list:"classify/list"
   }),
 },
data () {
 return {
   
   form:{
     pid:"",
     catename:"",
     img:null,
     status:1
   },
   imgSrc:null,

 }
},
methods:{
   ...mapActions({
    reqList:"classify/requestClassifyList"
  }),
  //  input按钮发生变化
  changeFile(e){
   console.log(e.target.files[0]);
  if(e.target.files[0].size>2*1024*1024){
      alertWarning("不能超过2M")
       return;
  }
   let file=e.target.files[0].name;
   let imgArr=[".jpg",".jpeg",'.png','.gif'];
   if(!imgArr.includes(file.slice(file.lastIndexOf('.')))){
       this.imgSrc=null;
       alertWarning("请选择正确的文件格式")
       return
   }
   
 this.imgSrc=URL.createObjectURL((e.target.files[0]));
    this.form.img=e.target.files[0];
  },
  // 点击取消按钮
  cancel(){
   this.$emit("cancel")
  },
  empty(){
    this.form={
      pid:"",
     catename:"",
     img:null,
     status:1
    }
     this.imgSrc=null;
  },

  add(){
    
    this.checked().then(()=>{
         let data= new FormData();
     for(let i in this.form){
          data.append(i,this.form[i])
     }  
    //  data.append()

   reqClassifyAdd(data).then(res=>{
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
    // console.log(res)
   })
    })
    
   
},
look(id){
  reqClassifyListOne(id).then(res=>{
    if(res.data.code===200){
    this.form=res.data.list;
    // this.imgSrc=$imgPre+this.form.img;
   this.form.id=id;
    this.imgSrc=this.$imgPre+this.form.img
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
    let list = new FormData();
    for(let i in this.form){
       list.append(i,this.form[i])
    }
   
    reqClassifyEdit(list).then(res=>{
      if(res.data.code==200){
        alertSuccess("修改成功");
      this.info.isShow=false;
       this.reqList();
      }else{
        alertWarning(res.data.msg)
      }
    })
   })

   
  },
  checked(){
     return new Promise((resolve,reject)=>{
         if(this.form.pid===""){
          alertWarning("上级分类不能为空")
          return;
        }
        if(this.form.catename==""){
          alertWarning("分类名称不能为空")
          return;
        }
           if(this.form.pid!=="0"||this.form.img==null){
          alertWarning("图片不能为空")
          return;
        }
        
        resolve()
     })
   }

},
mounted(){
   if(this.info.title=="添加"){
     this.empty();
   }

}
}
</script>
<style scoped>
    .box{
      width: 100px;
      height: 100px;
      border:  1px dashed red;
      position: relative;
    }
    h3{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      
    }
    .ipt{
      width: 100px;
      height: 100px;
      position:absolute;
      left: 0;
      top: 0;
      opacity: 0;
      z-index: 2;
    }
    img{
      width: 100px;
      height: 100px;
      position: absolute;
      z-index: 1;
    }
</style>