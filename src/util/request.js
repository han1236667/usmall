import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from '../store/index'
// 响应拦截
axios.interceptors.response.use((res)=>{
    console.log('=========拦截开始======')
    console.log("请求地址是"+res.config.url)
    console.log(res)
         //判断是否登录过期  msg="登录已过期或访问权限受限"
    if(res.data.msg==="登录已过期或访问权限受限"){
        router.push('/login')
        //用户信息置空
        store.dispatch("changeUserInfoAction",{})
    }
    return res
})

// 请求拦截
axios.interceptors.request.use(req=>{
    // 如果去的请求地址不是登录，就配置请求头
    if(req.url!==baseUrl+"/api/userlogin"){
        req.headers.authorization=store.state.userInfo.token;
    }
    return req;
})

const baseUrl = '/api'
Vue.prototype.$imgPre="http://localhost:3000"

// 生产环境 打包
//  const baseUrl=""
// Vue.prototype.$imgPre=""

// ---------------------------------菜单管理页面---------------------------------
// 添加菜单请求
export const reqMenuAdd =(form)=>{
    return axios({
       url:baseUrl+"/api/menuadd",
       method:"post",
       data:qs.stringify(form)
    })
}

// 菜单列表
export const reqMenuList =(params)=>{
    return axios({
       url:baseUrl+"/api/menulist",
       method:"get",
       params:params
    })
}

// 菜单获取一条
export const reqMenuListOne=(params)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:params
    })
}

//菜单修改
export const reqMenuEdit=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form) 
    })
}

// 菜单删除
 export const reqMenuDel=(data)=>{
     return axios({
         url:baseUrl+"/api/menudelete",
         method:"post",
         data:qs.stringify(data) 
     })
 }

// -------------------------------角色管理------------------------------------

// 角色添加
export const reqRoleAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(data)
    })
}
// 获取角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
       
    })
}
// 角色获取一条
export const reqRoleListOne=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:id
    })
}
// 角色修改
export const reqRoleEdit=(data)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(data)
    })
}
// 角色删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:'post',
       data:qs.stringify(id)
    })
}

// -------------------------------管理员管理------------------------------------

// 规格添加
export const reqUserAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(data)
    })
}
//获取规格总数
export const reqUserCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}

// 获取规格列表
export const reqUserList=(params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
       params:params
    })
}
// 规格获取一条
export const reqUserListOne=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{uid:uid}
    })
}
// 规格修改
export const reqUserEdit=(form)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(form)
    })
}
// 管理员删除
export const reqUserDel=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:'post',
       data:qs.stringify({uid:uid})
    })
}

// -----------------------------商品分类管理-------------------------

// 商品分类添加
export const reqClassifyAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:data
    })
}


// 获取商品分类列表
export const reqClassifyList=(params)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
       params:params
    })
}
// 商品分类获取一条
export const reqClassifyListOne=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{id:id}
    })
}
// 商品分类修改
export const reqClassifyEdit=(form)=>{
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:form
    })
}
// 商品分类删除
export const reqClassifyDel=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:'post',
       data:qs.stringify({id:id})
    })
}

// -------------------------商品规格------------------------------

// 角色添加
export const reqSpecAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(data)
    })
}
//获取管理员总数
export const reqSpecCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get"
    })
}

// 获取管理员列表
export const reqSpecList=()=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
       params:{size:10,page:1}
    })
}
// 管理员获取一条
export const reqSpecListOne=(id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{id:id}
    })
}
// 管理员修改
export const reqSpecEdit=(form)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(form)
    })
}
// 管理员删除
export const reqSpecDel=(id)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:'post',
       data:qs.stringify({id:id})
    })
}

// ------------------------商品添加-----------------------

export const reqGoodsAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:data
    })
}

// 商品总数
 export const reqGoodscount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}

//商品列表
export const reqGoodList=(params)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:params
    })
}
//商品管理详情 1条
export const reqGoodsListOne = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//商品管理修改
export const reqGoodsUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: form
    })
}

//商品管理删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// -----------------------登录-----------------------
export const reqLogin=(form)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(form)
    })
}

//==================================== 会员管理==================
export const reqMemberAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/memberadd",
        method:"post",
        data:qs.string(form)
    })
}
// 会员列表
export const reqMemberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get",
    })
}
// 会员获取一条
export const reqMemberListOne=(uid)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:uid
       
    })
}
// 会员修改
export const reqMemberEdit=(form)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:form
    })
}
// =======================轮播图管理====================
export const reqBannerAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:form 
    })
}

export const reqBannerList=()=>{
    return axios({
     url:baseUrl+"/api/bannerlist",
     method:"get"
    })
}

export const  reqBannerListOne=(id)=>{
    return axios({
        url:baseUrl+ "/api/bannerinfo",
        method:"get",
        params:{id:id}
    })
}

export const reqBannerEdit=(form)=>{
      return axios({
          url:baseUrl+"/api/banneredit",
          method:"post",
          data:form
      })
}

export const reqBannerDel=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}
// =-===================秒杀活动
export const reqSeckillAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(form) 
    })
}


export const reqSeckillList=()=>{
    return axios({
     url:baseUrl+"/api/secklist",
     method:"get"
    })
}


export const  reqSeckillListOne=(id)=>{
    return axios({
        url:baseUrl+ "/api/seckinfo",
        method:"get",
        params:{id:id}
    })
}

export const reqSeckillEdit=(form)=>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(form)
    })
}


export const reqSeckillDel=(id)=>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}