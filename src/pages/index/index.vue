<template>
<div>

<el-container>
  <el-aside width="200px">
 
     <el-menu
          router
          default-active="/index/home"
          unique-opened
          collapse-transition   
          class="el-menu-vertical-demo"      
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
         <el-menu-item index="/index" width='100px'>
            <i class="el-icon-star-off"></i>
            <span slot="title">首页</span>
          </el-menu-item>


        <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id" >
            <!-- 有目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="'/index'+i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            
            <!-- 没有目录 -->
            <el-menu-item :index="'/index'+item.url" v-else>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </div>
          




        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="user">
               <span>{{$store.state.userInfo.username}}</span>
            <el-button type="primary" @click="edit()">退 出</el-button>
          </div>
         
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }" v-if="$route.name">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
</el-breadcrumb>

          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
 
  // import  store from '../../store/index'

export default {

components:{
 },
data () {
 return {
      userInfo:this.$store.state.userInfo,

 }
},
methods:{
   edit(){
    //  清空session数据
   sessionStorage.removeItem("userInfo")  
   
     this.$router.push("/login")
   }
},
mounted(){
  // console.log(this.$store.state.userInfo.username)
  console.log(this.userInfo);
}
}
</script>
<style scoped>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
    height: 30vh;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 50px;
    height: 100vh;
    font-size: 30px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  
    
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .tit{
      margin-top: 20px;
  }
  .user{
    width: 200px;
    margin-left: 800px;
  }

</style>