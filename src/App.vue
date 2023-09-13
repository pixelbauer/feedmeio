<template>
  <div id="app-content">
    <div id="contentContainer">
      <div id="topBar">
        <div class="container">
          <div class="row">
            <div class="col text-start">
              Food-Fusion.io
            </div>
            <div class="col text-end">
              <BButton @click="sideNav = true;"><i class="bi bi-list"></i></BButton>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <BOffcanvas v-model="sideNav" >

        <div class="offcanvas-body">
          <div class="text-left">
            <router-link to="/">
              <div class="MobileNavBoxItem">
                <strong>Startseite</strong>
              </div>
            </router-link>
            <router-link :to="{ name: 'finderPage'}">
              <div class="MobileNavBoxItem">
                <strong>Feeder</strong>
              </div>
            </router-link>
            <router-link :to="{ name: 'login'}">
              <div class="MobileNavBoxItem">
                <strong>Login</strong>
              </div>
            </router-link>
          </div>
        </div>
      </BOffcanvas>
    </div>
  </div>
</template>

<script  type="module">
export default {
  name: 'App',
  data() {
    return {
      sideNav: false,
      apiUrl: "http://api.feed-me.local/",
    };
  },
  watch: {
    $route() {
      // Routenänderung erkannt, schließe das Offcanvas-Element
      this.sideNav = false;
    }
  },
  methods: {
  },
};
</script>

<style>
 html{

 }
 body{margin: 0;padding:0;
   background: url("@/assets/img/269.jpg") repeat center center fixed;}
 #app-content{

   --bs-body-bg: #2b292a;
   --bs-body-color:#cbcbcb;
   --bs-link-color-rgb:77,221,225;
 }
 .offcanvas{
   --bs-offcanvas-bg: #202124 !important;
 }
 a{text-decoration: none !important;}
 #topBar{
   background: #202124;
   padding: 10px;
   color:#cbcbcb;
   margin-bottom:15px;
   font-size: 20px;
   font-weight: bold;
   text-align: center;
 }
</style>
