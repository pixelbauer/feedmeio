
import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import BootstrapVueNext from 'bootstrap-vue-next';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/css/app.css'


const app = createApp(App, {
    data() {
        return {};
    },
});


app.use(router);

app.use(BootstrapVueNext)
app.mount("#app");