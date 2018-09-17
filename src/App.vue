<template>
  <div id="app">
    <!-- <div id="app_bg"></div> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view id="app_rouv"/>
    <Nav v-show="is_show_nav"></Nav>
    <div class="no_info" v-show="is_show_noinfo">
      <div>
        <img src="./assets/images/icon30.png">
        <p>{{agrs_txt}}</p>
     </div>
    </div>

    <div class="tips" v-show="tips_flag">
      <p>{{tips_txt}}</p>
    </div>
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
      url: this.$route.path,
      is_show_nav: true,
      is_show_noinfo: false,
      agrs_txt: "",
      save_data: null,
      tips_txt: "",
      tips_flag: false,
      counts: 0
    }
  },
  created() {
    this.$bus.on('show_nav', this.on_show_nav);
    this.$bus.on('show_noinfo', this.on_show_noinfo);
    this.$bus.on('save_data', this.on_save_data);
    this.$bus.on('tips', this.on_tips);
    this.on_tick();
    window.addEventListener("popstate", e => {
      this.is_out_app();
    }, false)
  },
  methods: {
    on_show_nav: function(flag){
      this.is_show_nav = flag;
    },
    on_show_noinfo: function(agrs) {
      this.is_show_noinfo = agrs[0];
      this.agrs_txt = agrs[1];
    },
    is_out_app: function() {
      if (this.url == "/" || this.url == "/goods_type" || this.url == "/shop_car" || this.url == "/main") {
        WeixinJSBridge.call('closeWindow');
      }
    },
    on_push_url: function(url) {
      this.url = url;
      this.$router.push(url);
    },
    on_save_data: function(data) {
      console.error("保存数据", data);
      this.save_data = data;
    },
    on_tips: function(data) {
      this.tips_flag = data[0];
      this.tips_txt = data[1];
    },
    on_tick: function() {
      setInterval(() => {
        if (this.tips_flag) {
          this.counts++;
          if (this.counts >= 2) {
            this.counts = 0;
            this.tips_flag = false;
            this.tips_txt = "";
          }
        }
      }, 1000);
    }
  },
  watch: {
    "$route": function(to, from) {
      this.url = from.path;
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
  .no_info{
    width: 100%;
    height: 5rem;
    position: absolute;
    top: 50%;
    left: 0px;
    margin-top: -2.5rem;
    display: flex;
    justify-content: center;
  }
  .no_info div {
    text-align: center;
  }
  .no_info img {
    width: 2rem;
    height: 2rem;
  }
  .no_info p {
    font-size: 0.3rem;
    text-align: center;
    color: #bfbfbf;
  }
  .tips {
    position: absolute;
    top: 50%;
    left: 0px;
    z-index: 999999;
    margin-top: -0.4rem;
    width: 100%;
    height: 0.75rem;
    /* background: rgba(0, 0, 0, 0.7); */
    display: flex;
    justify-content: center;
  }
  .tips p {
    padding: 0.25rem 0.3rem;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.1rem;
    font-size: 0.25rem;
    color: #ffffff;
  }
</style>
