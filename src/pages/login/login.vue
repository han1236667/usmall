<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <input type="text" placeholder="请输入用户名" v-model="form.username" class="inp1"/>
      <input type="text" placeholder="请输入密码" v-model="form.password" class="inp1"/>
      <div>
           <input type="button" value="登录" class="btn" @click="login">
      </div>
    </div>
  </div>
</template>
<script>
  import {reqLogin} from "../../util/request"
  import {mapActions} from "vuex"
  import {alertWarning} from "../../util/alert"

export default {
  components: {},
  computed: {
   
  },
  data() {
    return {
      form:{
        username:"",
        password:""
      },
     
    };
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
    }),
  login(){
     reqLogin(this.form).then(res=>{
       if(res.data.code==200){
         this.changeUserInfoAction(res.data.list)
         this.$router.push("/index")
       }else{
          alertWarning(res.data.msg)
       }
     })

  }

  },
  mounted() {},
};
</script>
<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#563443,#2F3D60);
}
.con{
    width: 300px;
    height: 200px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    padding: 20px;
}
input{
    margin: 10px;
    width: 260px;
    height: 30px;
    padding-left: 4px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    color: #D2CBD2;
}

.btn{
    background: #409EFF;
    color: #fff;
}

.inp1::placeholder{
        color: #C2C6CF;
}
</style>