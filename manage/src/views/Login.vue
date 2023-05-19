<template>
   <div class="login-wrapper">
    <div class="modal">
<el-form  ref='userform' :model="user"  status-icon :rules="rules">
<div class="title">火星
      </div>
<el-form-item prop="userName"><el-input  type="text" prefix-icon="user"  v-model="user.userName"> </el-input></el-form-item>
<el-form-item  prop="userPwd"><el-input  type="password" prefix-icon="view"  v-model="user.userPwd"></el-input></el-form-item>
<el-form-item><el-button type="primary" class="btn-login" @click="login">登录</el-button></el-form-item>
</el-form>
</div>
  </div>
  
  </template>
  
  <script >
import Welcome from './Welcome.vue' 

import {User,View} from "@element-plus/icons-vue";
  export default{
name: 'login',
data(){

  return{
      user:{
        userName:'',
        userPwd:''
      },
      rules:{
        userName:[ {required:true,message:"请输入用户名",trigger:"blur"}],
        userPwd:[{
          required:true,message:"请输入密码",trigger:"blur"
        }]
      }
  }
},
components:{
    Welcome
},
methods:{
    gohome(){
     this.$router.push('/welcome');
    },
    login(){
  this.$refs.userform.validate((valid)=>{
    if(valid){
      //表明表单输入了
    this.$api.login(this.user).then((res)=>{
  //  console.log
  this.$store.commit('saveUserInfo',res);
  this.$router.push('/welcome');
    })
    }else{
      return false;
    }

  })
    }
}
,
setup(){
return {
  User,View
}
}}

  
  </script>

  <style lang="scss" >
.login-wrapper{
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  height:100vh;
  width:100vw;
  .modal{
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
  }
  .title{
    font-size: 50px;
    line-height: 1.5;
    text-align: center;
    margin-bottom:30px;
  }
  .btn-login{
      width:100%;
    }
}
  
  </style>
  