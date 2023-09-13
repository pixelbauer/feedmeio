<template>
    <div>
        <div id="loginWrapper">
            <div class="box"
                 :class="{ error: loginError }">
                <form>
                    <div class="alertLogin">
                        <div class="alertLoginBox">
                            Login Fehlgeschlagen
                        </div>
                    </div>
                    <h2>
                        <router-link to="/">
                            LOGO
                        </router-link>
                    </h2>
                    <div class="inputBox">
                        <input v-model="user.email" type="text" required="required">
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div class="inputBox">
                        <input  v-model="user.pass" type="password" required="required">
                        <span>Passwort</span>
                        <i></i>
                    </div>
                    <div class="links">
                        <a href="#">Passwort vergessen</a>
                    </div>
                    <span v-on:click="login()" class="loginButton">login</span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'Panel-Login',
      data() {
        return {
          loginError: false,
          user : {email:"",pass:""}
        }
      },
        beforeCreate() {
            localStorage.removeItem("fgrprnt");
            localStorage.removeItem("rtslclusr");
            localStorage.removeItem("usrdta");
            this.$root.logged_in = false;
            this.$root.admin_flag = false;
        },
        methods: {
             login: function(){
               this.loginError = false;
               axios
                   .get(this.$root.apiUrl + "auth", {
                     params: { login: "go", user: this.user.email, pass: this.user.pass },
                   })
                   .then((response) => {
                     if (response.data.status == 0) {
                       this.loginError = true;
                     } else {
                       this.$root.fgrprnt = response.data.data.fingerprint;
                       this.$root.usrdta = response.data.data.userData;
                       localStorage.setItem("fgrprnt", this.$root.fgrprnt);
                       localStorage.setItem(
                           "usrdta",
                           JSON.stringify(this.$root.usrdta)
                       );
                       var timestamp = Math.floor(Date.now() / 1000);
                       localStorage.setItem(
                           "rtslclusr",
                           JSON.stringify({ logintime: timestamp, lastaction: timestamp })
                       );
                       this.$root.logged_in = true;
                       this.$router.push("/");
                     }
                   });
            }
        }
    }
</script>

<style scoped>
    #loginWrapper{
        display:flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background:#232323;
    }
    .alertLogin{
        transition: all 0.2s;
        position: absolute;
        top: -50vh;
        left: 0vh;
        z-index:90;
        width: 100%;
        color:#fff;
    }
    .box.error .alertLogin{
        top: 0vh;
    }
    .alertLogin .alertLoginBox{
        border-bottom:1px solid #a70000;
        border-radius: 8px 8px 0 0;
        font-weight: 500;
        background: #a70000;
        width: 100%;
        padding:7px;
    }
    .box{
        position: relative;
        width:380px;
        height:420px;
        background: #1c1c1c;
        border-radius: 8px;
        overflow: hidden;
    }
    .box:before{
        content:"";
        transition: background 5s;
        position: absolute;
        top:-50%;
        left:-50%;
        width:380px;
        height:420px;
        background:linear-gradient(0deg,transparent,
        transparent,#00b6ed,#00b6ed,#00b6ed);
        z-index:1;
        transform-origin: bottom right;
        animation: animate 6s linear infinite;
    }
    .box:after{
        content:"";
        transition: background 5s;
        position: absolute;
        top:-50%;
        left:-50%;
        width:380px;
        height:420px;
        background:linear-gradient(0deg,transparent,
        transparent,#00b6ed,#00b6ed,#00b6ed);
        z-index:1;
        transform-origin: bottom right;
        animation: animate 6s linear infinite;
        animation-delay: -3s;
    }
    .box.error:before{
        background:linear-gradient(0deg,transparent,
        transparent,#a70000,#a70000,#a70000);
    }
    .box.error:after{
        background:linear-gradient(0deg,transparent,
        transparent,#a70000,#a70000,#a70000);
    }
    @keyframes animate {
        0%{transform: rotate(0deg);}
        100%{transform: rotate(360deg);}
    }
    .box form{
        position: absolute;
        inset:4px;
        background: #222;
        padding:50px 40px;
        border-radius:8px;
        z-index: 2;
        display: flex;
        flex-direction: column;
    }
    .box form h2{
        color: #e8f0fe;
        font-weight: 500;
        text-align: center;
        letter-spacing: 0.1em;
        margin-bottom: 15px;
    }
    .box form h2 img{
        width:200px;
    }
    .box form .inputBox{
        position: relative;
        max-width: 300px;
        width:100%;
        margin-top:35px;
    }
    .box form .inputBox input{
        position: relative;
        width: 100%;
        padding:20px 10px 10px;
        background: transparent;
        outline:none;
        border:none;
        box-shadow: none;
        color:#232323;
        font-size: 1em;
        letter-spacing: 0.05em;
        transition: 0.5s;
        z-index:10;
    }
    .box form .inputBox span{
       position: absolute;
        left:0;
        padding:20px 0px 10px;
        pointer-events: none;
        color:#9f9f9f;
        font-size: 1em;
        letter-spacing: 0.05em;
        transition: 0.5s;
    }
    .box form .inputBox input:focus ~ span,
    .box form .inputBox input:valid ~ span
    {
        color: #e8f0fe;
        font-size:0.75em;
        transform:translateY(-34px);
    }
    .box form .inputBox i{
        position: absolute;
        left:0;
        bottom:0;
        width: 100%;
        height:2px;
        background: #e8f0fe;
        border-radius: 4px;
        overflow: hidden;
        transition: 0.5s;
        pointer-events: none;
    }
    .box form .inputBox input:focus ~ i,
    .box form .inputBox input:valid ~ i
    {
        height:44px;
    }

    .box form .links{
        display: flex;
        justify-content: space-between;
    }
    .box form .links a{
        margin:10px 0;
        font-size: 0.75em;
        color:#8f8f8f;
        text-decoration: none;
    }
    .box form .links a:hover{
        color:#e8f0fe;
    }
    .box form .loginButton{
        border:none;
        outline: none;
        padding:9px 25px;
        background:#e8f0fe;
        cursor: pointer;
        border-radius: 4px;
        font-weight: 600;
        width:100px;
        margin-top:10px;
    }
    .box form .loginButton:hover,
    .box form .loginButton:active{
        opacity:0.7;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        border-radius: 4px;
        margin-top: 7px;
        height:44px;
        padding:9px !important;
    }
</style>

