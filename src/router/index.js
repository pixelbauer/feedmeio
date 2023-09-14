import * as VueRouter from "vue-router";
import { createWebHistory } from "vue-router";


const routes = [
    {
        path: "/",
        name: "startPage",
        component: () =>
            import("../views/StartPage.vue")
    },
    {
        path: "/feeder",
        name: "finderPage",
        component: () =>
            import("../views/FinderPage.vue")
    },
    {
        path: "/signup",
        name: "login",
        component: () =>
            import("../views/Login.vue")
    },
];
const router = VueRouter.createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes,
});

export default router;
