<template>
    <div class="main" ref="containerRef">
        <el-container>
            <el-header>
                <img style="height: 100%; margin-left: 20px;" src="@/img/RestaurantManagement.png" />
                <el-dropdown style="height: inherit;align-items: center;position: absolute;right: 20px;" trigger="click">
                    <span class="el-dropdown-link">
                        {{ userName }}
                        <el-icon class="el-icon--right">
                            <ArrowDown />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside :style="'margin-left:' + asideLeft + 'px'">
                    <div class="aside-container">
                        <div style="height: 50px;display: flex;text-align: right;justify-content: flex-end;">
                            <el-icon class="expander" @click="toggleAside">
                                <Fold style="width: 30px;height: 30px;transition: 0.3s;"
                                    :style="'transform:rotate(' + expanderRotation + 'deg)'" />
                            </el-icon>
                        </div>
                        <el-scrollbar :height="routerHeight + 'px'" :style="'height:' + routerHeight + 'px'">
                            <AsideRouterView></AsideRouterView>
                        </el-scrollbar>
                    </div>
                </el-aside>
                <el-main>
                    <div class="main-container">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Fold,ArrowDown } from '@element-plus/icons-vue';
import { removeToken } from '@/utils/TokenUtils';
import AsideRouterView from './AsideRouterView.vue';
import router from '../router';
import api from '../utils/api';
const userName = ref("admin");
const asideLeft = ref(0);
const routerHeight = ref(0);
const expanderRotation = ref(0);
let containerRef = null;
const handleResize = () => {
    routerHeight.value = containerRef.clientHeight - 160;
};
const resizeObserver = new ResizeObserver(handleResize);
onMounted(() => {
    // window.onresize = () => {
    //     console.log(containerRef);
    //     console.log(containerRef.clientHeight);
    // }
    // console.log(containerRef);
    // console.log(containerRef.clientHeight);
    let resp = api({
        url: "/whoAmI",
        method: "post",
    });
    resp.then(data => {
        userName.value = data.name;
    });
    resizeObserver.observe(containerRef);
    routerHeight.value = containerRef.clientHeight - 140;
});
function toggleAside() {
    if (asideLeft.value < 0) {
        expanderRotation.value = 0;
        asideLeft.value = 0;
    } else {
        expanderRotation.value = 180;
        asideLeft.value = -185;
    }
}
function handleLogout() { 
    console.log("退出");
    removeToken("token");
    router.push("login");
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #f0ffff;
}

.full {
    width: 100%;
    height: 100%;
}

.colored {
    background-color: aqua;
}

.el-container {
    height: 100%;
}

.el-header {
    background: linear-gradient(to bottom, #55eeee, #33cccc);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 0px 10px 0px #666;
}

.el-aside {
    width: 250px;
    padding: 15px;
    transition: 0.3s;
}

.el-main {
    padding: 10px;
}

.aside-container {
    background-color: #c0f0f0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #ccc;
}

.main-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.el-menu {
    border: unset;
}

.expander {
    width: 50px;
    height: 50px;
    cursor: pointer;
}
</style>