import { createRouter, createWebHistory } from "vue-router";
import { getToken } from '@/utils/TokenUtils';

const routes = [{
    name: "main",
    path: "/main",
    component: () => import("@/components/HomeView.vue"),
    children: [
        {
            name: "user",
            path: "user",
            component: () => import("@/components/User.vue")
        }, {
            name: "actionChoice",
            path: "actionChoice",
            component: () => import("@/components/ActionChoice.vue")
        }, {
            name: "admin",
            path: "admin",
            component: () => import("@/components/Admin.vue")
        }, {
            name: "cart",
            path: "cart",
            component: () => import("@/components/Cart.vue")
        }, {
            name: "choice",
            path: "choice",
            component: () => import("@/components/Choice.vue")
        }, {
            name: "comment",
            path: "comment",
            component: () => import("@/components/Comment.vue")
        }, {
            name: "favorite",
            path: "favorite",
            component: () => import("@/components/Favorite.vue")
        }, {
            name: "history",
            path: "history",
            component: () => import("@/components/History.vue")
        }, {
            name: "image",
            path: "image",
            component: () => import("@/components/Image.vue")
        }, {
            name: "option",
            path: "option",
            component: () => import("@/components/Option.vue")
        }, {
            name: "order",
            path: "order",
            component: () => import("@/components/Order.vue")
        }, {
            name: "orderDetail",
            path: "orderDetail",
            component: () => import("@/components/OrderDetail.vue")
        }, {
            name: "product",
            path: "product",
            component: () => import("@/components/Product.vue")
        }, {
            name: "productCategory",
            path: "productCategory",
            component: () => import("@/components/ProductCategory.vue")
        }, {
            name: "redirect",
            path: "",
            redirect: "/main/user"
        }
    ]
}, {
    name: "home",
    path: "",
    redirect: "/main"
}, {
    name: "userTest",
    path: "/user",
    component: () => import("@/components/User.vue")
}, {
    name: "pic",
    path: "/pic",
    component: () => import("@/components/PictureTestNew.vue")
}, {
    name: "multipic",
    path: "/multipic",
    component: () => import("@/components/CompTest.vue")
}, {
    name: "login",
    path: "/login",
    component: () => import("@/components/LoginView.vue")
}
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

// //to：目标路由 from：来源路由 next：函数，指定去哪个路由
// router.beforeEach((to, from, next) => {
//     let jwt = getToken();//先取出token

//     //next();

//     if (jwt) {//如果有token
//         if (to.name === "login") {
//             next({ name: "users" });
//         } else {
//             next();
//         }
//     } else {//没有token
//         if (to.name !== "login") {
//             next({ name: "login" });
//         } else {
//             next();
//         }
//     } 
// });

export default router;