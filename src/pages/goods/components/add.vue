<template>
<div>
   
   <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
  <el-form :model="form">

   
     <el-form-item label="一级分类" label-width="100px">
   
      <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst">

    <el-option
      v-for="item in classifyList"
      :key="item.id"
      :label="item.catename"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>


 <el-form-item label="二级分类" label-width="100px">
   
      <el-select v-model="form.second_cateid" placeholder="请选择">

    

    <el-option
      v-for="item in secondCateList"
      :key="item.id"
      :label="item.catename"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>

    <el-form-item label="商品名称" label-width="100px">
   <el-input v-model="form.goodsname"  ></el-input>
    </el-form-item>

  <el-form-item label="价格" label-width="100px">
   <el-input v-model="form.price"  ></el-input>
    </el-form-item>
   
     <el-form-item label="市场价格" label-width="100px">
   <el-input v-model="form.market_price"  ></el-input>
    </el-form-item>

 <el-form-item label="图片" label-width="100px" >  
       
    <div class="box">
        <h3>+</h3>
        <input  v-if="info.isShow" class="ipt" type="file"   @change="changeFile">    
                  <img v-if="imgUrl" :src="imgUrl" alt="">

    </div>

    </el-form-item>


 <el-form-item label="商品规格" label-width="100px">
   
      <el-select v-model="form.specsid" placeholder="请选择"  @change="changeSpecs">

    <el-option
      v-for="item in spcesList "
      :key="item.id"
      :label="item.specsname"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>


 <el-form-item label="商品属性" label-width="100px">
   
      <el-select v-model="form.specsattr" placeholder="请选择" multiple>

    <el-option
      v-for="item in attrList"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
    </el-form-item>


    <el-form-item label="是否新品" label-width="120px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>

         <el-form-item label="是否热卖" label-width="120px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
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

  	<el-form-item label="商品描述" label-width="120px">
          <!-- 富文本编辑器 -->
          <div v-if="info.isShow" id="editor"></div>
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
   import E from 'wangeditor'
  // 引入所属角色
  import {mapGetters,mapActions} from "vuex"
  import {reqGoodsAdd,reqGoodsListOne ,reqGoodsUpdate,reqUserList,reqClassifyList} from "../../../util/request"
  import {alertSuccess,alertWarning} from "../../../util/alert"

export default {
  props:["info"],
components:{
 },
 computed: {
    ...mapGetters({
       classifyList:"classify/list",
       spcesList:"spces/list",
       goodsList:"goods/list"
   }),
 },
data () {
 return {
 
   form:{
     first_cateid:"",
     second_cateid:"",
     goodsname:"",
     price:"",
     market_price:"",
     img:null,
     description:"",
    specsid:"",
    specsattr:[],
    isnew:1,
    ishot:1,
    status:1
    },
    // 二级分类的list
    secondCateList:[],
    //规格属性的list
    attrList:[],
    // 上传图片的地址
     imgUrl:null,
 
 }
},
methods:{
   ...mapActions({
    reqSpcesList:"spces/requestSpecList",
    reqClassList:"classify/requestClassifyList",
    reqGoodsList:"goods/requestClassifyList"
  }),
// 一级分类发生改变时
 changeFirst(){
   this.form.second_cateid=""
   //获取二级分类list
      this.getSecondList()
 },
  //根据一级的id来获取二级分类展示列表数据
    getSecondList(){
      reqClassifyList({pid:this.form.first_cateid}).then(res=>{
        this.secondCateList=res.data.list
      })
    },
     //修改了商品规格
    changeSpecs(){

        //当规格变了，属性要置空
        this.form.specsattr=[];
        //根据选中的商品规格，计算一下展示属性列表
        this.getAttrsList()
        
    },
    //根据选中的商品规格，计算一下展示属性列表
    getAttrsList(){
      //取出this.specList 里面 的id是 form.specsid 的那条数据
        let obj=this.spcesList.find(item=>item.id===this.form.specsid)
        //要那条数据上的attrs
        this.attrList=obj.attrs;
    },
    //图片
    changeFile(e){
      let file=e.target.files[0]

      if(file.size>2*1024*1024){
        alertWarning("文件不能超过2M");
        return;
      }

      let arr=[".jpg",".png",".gif",".jpeg"];
      if(!arr.includes(file.name.slice(file.name.lastIndexOf(".")))){
        alertWarning("请上传正确的图片")
        return
      }

      this.imgUrl=URL.createObjectURL(file)
      this.form.img=file
    },
//   弹框打开完成时
  opened(){
      this.editor=new E("#editor")
      this.editor.create()
        this.editor.txt.html(this.form.description)
  },
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
        first_cateid:"",
        second_cateid:"",
        goodsname:"",
        price:"",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],//发起请求之前需要JSON.stringify()
        isnew:1,
        ishot:1,
        status:1
      };

      //二级分类的list
      this.secondCateList=[]

      //规格属性的list
      this.attrList=[];

      //上传图片的临时地址
      this.imgUrl=""
     
  },

  add(){
    this.checked().then(()=>{
    this.form.description=this.editor.txt.html()
     
        let obj={
        ...this.form
        }
      obj.specsattr=JSON.stringify(obj.specsattr)
      
      let data=new FormData()
      for(let i in obj){
        data.append(i,obj[i])
      }
      //ajax
      reqGoodsAdd(data).then(res=>{
          if(res.data.code==200){
            this.empty()
            this.cancel()
            alertSuccess("添加成功")
            //刷list 
            this.reqGoodsList()
            //请总数
            // this.reqTotalAction()
          }else{
            alertWarning(res.data.msg)
          }
      })
    })
    
       
},
look(id){
  reqGoodsListOne(id).then(res=>{
    if(res.data.code===200){
    this.form=res.data.list;
    // this.imgUrl=$imgPre+this.form.img;
     this.form.id=id;
     
        // 2.根据一级分类的id 获取二级分类展示的列表
        this.getSecondList()

        // 3.图片
        this.imgUrl=this.$imgPre+this.form.img 

        //4. 根据规格，获取属性值的列表
        this.getAttrsList()

        // 5.form.specsattr 需要JSON.parse()
        this.form.specsattr=JSON.parse(this.form.specsattr)

        //6.将form.description 赋值给富文本编辑器
        if(this.editor){
          this.editor.txt.html(this.form.description)
        }

    }
})
},
  //验证
    checked(){
      return new Promise((resolve,reject)=>{
        //验证数据是否均不为空
        if(this.form.first_cateid===""){
          alertWarning("一级分类不能为空")
          return;
        }
        if(this.form.second_cateid===""){
          alertWarning("二级分类不能为空")
          return;
        }
        if(this.form.goodsname===""){
          alertWarning("商品名称不能为空")
          return;
        }
        if(this.form.price===""){
          alertWarning("价格不能为空")
          return;
        }
        if(this.form.market_price===""){
          alertWarning("市场不能为空")
          return;
        }
        if(!this.form.img){
          alertWarning("请选择图片")
          return;
        }
        if(this.form.specsid===""){
          alertWarning("规格不能为空")
          return;
        }
        if(this.form.specsattr.length===0){
          alertWarning("请选择商品属性")
          return;
        }

        if(this.form.description===""){
          alertWarning("描述不能为空")
          return;
        }
        resolve()
      })},
//  判断清空表中数据
  letEmpty(){
   this.empty();
  },
  // 点击修改
  edit(){
    this.checked().then(()=>{
       //获取一下富文本编辑器的内容给form.description 
      this.form.description=this.editor.txt.html()

     
        let obj={
          ...this.form
        }
        obj.specsattr=JSON.stringify(obj.specsattr)
        
        let data=new FormData()
        for(let i in obj){
          data.append(i,obj[i])
        }
        reqGoodsUpdate(data).then(res=>{
          if(res.data.code==200){
            this.cancel()
            this.empty()
            alertSuccess("修改成功")
            this.reqGoodsList()
          }
        })
    })
    
      
    
  }

},
mounted(){
  //  if(this.info.title=="添加"){
  //    this.empty();
  //  }
  this.reqClassList()
  this.reqSpcesList()
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