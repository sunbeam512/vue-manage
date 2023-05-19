
    <template>
  <el-breadcrumb separator="/" >
    <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>


<script>
export default {
    name: 'BreadCrumb',
  //   props:{
  //     breadList: this.$route.matched,
  //   }
  //  ,
  data(){
return {
  breadList: this.$route.matched,
}
  },
    mounted(){
      console.log('route=>',this.$route);

    }
   
}
</script>
