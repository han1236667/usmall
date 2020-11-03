<template>
<div>
   
   <el-dialog :title="info.title" :visible.sync="info.isShow">
  <el-form :model="form">

   

    <el-form-item label="规格名称" label-width="100px">
   <el-input v-model="form.specsname"  ></el-input>
    </el-form-item>

    <el-form-item label="规格属性" label-width="100px" v-for="(item,index) in attrArr" :key="index">

        <div class="wrap">
  <div class="con"><el-input v-model="item.val"></el-input></div> 
   <el-button type="primary" v-if="index==0" @click="addArr">新增规格属性</el-button>
   <el-button type="danger" v-else @click="delArr(index)">删除</el-button>
   
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
  import {reqSpecAdd,reqSpecListOne,reqSpecEdit,reqUserList} from "../../../util/request"
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
   attrArr:[{val:""}],
   form:{
     specsname:"",
     attrs:"[]",
     status:1
    }
 
 }
},
methods:{
   ...mapActions({
    reqList:"spces/requestSpecList"
  }),
  addArr(){
   this.attrArr.push({val:""})
  },
   delArr(index){
      this.attrArr.splice(index,1);
   },
  // 点击取消按钮
  cancel(){
   this.$emit("cancel")
  },
  empty(){
    this.form={
      
     specsname:"",
     attrs:"[]",
     status:1
    };
    this.attrArr=[{val:""}];
  },

  add(){
   this.checked().then(()=>{
        this.form.attrs=JSON.stringify(this.attrArr.map(item=>{
      return item.val
    })) 

    // console.log(this.form)

   reqSpecAdd(this.form).then(res=>{
     if(res.data.code===200){
          alertSuccess("添加成功");
          // 关闭弹窗
          this.cancel();
          // 清空from数据
          this.empty();
          //  刷新请求的列表数据
          // this.$emit("cancel");
           this.reqList();
     }else{
       alertWarning(res.data.msg)
     }
    // console.log(res)
   })
   })

   
},
look(id){
  reqSpecListOne(id).then(res=>{
    if(res.data.code===200){
    this.form=res.data.list[0];
    // this.imgSrc=$imgPre+this.form.img;
     this.form.id=id;
      this.attrArr=JSON.parse(this.form.attrs).map(item=>{
        return {val:item}
      })

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
      this.form.attrs=JSON.stringify(this.attrArr.map(item=>{
      return item.val
    }))
   console.log(this.form)
    reqSpecEdit(this.form).then(res=>{
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
         if(this.form.specsname===""){
          alertWarning("商品规格不能为空")
          return;
        }
        if((this.attrArr.filter(item=>{return item.val==""})).length>0 ){
          alertWarning("规格属性不能为空")
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
    .wrap{
        display: flex;
    }
    .con{
        flex:1;
    }
</style>