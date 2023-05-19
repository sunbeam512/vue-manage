<template>
  <div class="welcome">
  <div class="content center">
    <div class="sub-title">欢迎体验</div>
    <div class="title">通用后台管理系统</div>
    <div class="desc">Vue3.0 + ElementPlus + Node - </div>
  </div>
  <div class="img center">
      <img src="../assets/images/welcome.png"> 
    </div>

</div>
  </template>
  <script >
  //import { defineComponent } from 'vue';
  export default  ({
    name:'welcome',
  })
  </script>
  
  <style lang="scss">
  .welcome{
    display: flex;
    justify-content: space-around;
    height:100%;
    background-color: #fff;
    
    .center{
      height:100%;
      display: flex;
    justify-content: center;
    align-items: center;
    }
    
   
      
    .content{
    flex-direction: column;
    .sub-title{
      text-align: left;
      font-size: 60px;
      line-height: 42px;
      color: #333;
    }
    .title{
      font-size: 50px;
      line-height: 100px;
      color: #409eff;
    }
    .desc{
      text-align: right;
      font-size: 14px;
      color: #999;
    }
    .img{
      width: 371px;
      height: 438px;
      margin-left:105px;
     //background-image: url('../assets/images/welcome.png');
      
    }
    }
    
  }
  </style>