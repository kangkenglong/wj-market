<template>
  <div id="app">
    <!-- <div id="app_bg"></div> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view id="app_rouv"/>
    <Nav v-show="is_show_nav"></Nav>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import Nav from './components/nav.vue'
export default {
  name: 'app',
  components: {
    // HelloWorld
    Nav
  },
  data(){
    return {
      is_show_nav: true
    }
  },
  created() {
    this.$bus.on('show_nav', this.on_show_nav);
  },
  methods: {
    on_show_nav: function(flag){
      console.error(flag);
      this.is_show_nav = flag;
    }
  }
}
</script>

<style>
#app {
  position: fixed;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background:  #f3f3f3;
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
#app_bg{
  position: fixed;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background:  #f3f3f3;
}
#app_rouv{
/*   position: absolute;
  z-index: 2;
  top: 0px;
  bottom: 0px;
  left: 0px; */
  width: 100%;
  height: 100%;
}
  .head{
    width: 100%;
    height: 1rem;
    background: #fff;
    padding: 0.25rem;
    position: relative;
    border-bottom: 0.02rem solid #ccc;
  }
  .h_back{
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background: url('./assets/images/back.png') no-repeat -0.1rem center;
    background-size: 100% 100%;
  }
  .head p{
    width: 100%;
    font-size: 0.35rem;
    line-height: 0.5rem;
    text-align: center;
  }
</style>
