<template>
<div>
     
     
     <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
         <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="市场价格">
        <template slot-scope="scope">
        <span>{{scope.row.market_price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="图片">
        <template slot-scope="scope">
        <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
       <el-table-column label="是否新品">
        <template slot-scope="scope">
         <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
       <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
             <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>    
        </template>
      </el-table-column>
    </el-table>



</div>
</template>
<script>
   
  import {reqGoodsDel} from "../../../util/request"
  import {alertSuccess,alertWarning} from "../../../util/alert"
  import {mapGetters,mapActions} from 'vuex'
   

export default {
components:{
 },
 props:["form"],
 computed: {
     ...mapGetters({
         list:"goods/list"
     })
 },
data () {
 return {
    //  imgUrl:null,
 }
},
methods:{
     ...mapActions({
     reqList:"goods/requestClassifyList"
   }),

    edit(id){
      this.$emit("edit",id)
      
    },
    del(id){
       
   
     this.$confirm('此操作将永久删除是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
        
        reqGoodsDel(id).then(res=>{
          if(res.data.code==200){
          alertSuccess("删除成功");
          this.$emit("updata")
          }else{
              alertWarning(res.data.msg)
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
   this.reqList();
   
}
}
</script>
<style scoped>
img{
    width: 50px;
    height: 50px;
}
</style>