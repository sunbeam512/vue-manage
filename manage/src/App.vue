
<template>

  <router-view></router-view>

</template>

<script >
export default({
  name: 'app',
  mounted(){
    this.$storage.setItem('age',60);
  }
})

</script>
<style lang="scss">
@import './assets/style/index.scss';
@import './assets/style/reset.css';
</style>
