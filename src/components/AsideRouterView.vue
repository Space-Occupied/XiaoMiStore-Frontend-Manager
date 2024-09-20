<template>
    <el-menu active-text-color="#9900ff" background-color="#c0f0f0" class="el-menu-vertical-demo" :default-active="router.currentRoute.value.fullPath"
        text-color="#606266" @select="handleSelect">
        <el-menu-item index="/main/dashboard">
            <el-icon>
                <DataAnalysis />
            </el-icon>
            <span>数据统计</span>
        </el-menu-item>
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Clock />
                </el-icon>
                <span>预约管理</span>
            </template>
            <el-menu-item index="/main/room-reservation">
                <el-icon>
                    <Tickets />
                </el-icon>
                <span>包厢预约管理</span>
            </el-menu-item>
            <el-menu-item index="/main/set-meal-reservation">
                <el-icon>
                    <DishDot />
                </el-icon>
                <span>套餐预约管理</span>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/main/user">
            <el-icon>
                <User />
            </el-icon>
            <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/main/room">
            <el-icon>
                <House />
            </el-icon>
            <span>包厢管理</span>
        </el-menu-item>
        <el-menu-item index="/main/set-meal">
            <el-icon>
                <GobletSquareFull />
            </el-icon>
            <span>套餐管理</span>
        </el-menu-item>
        <el-menu-item index="/main/comment">
            <el-icon>
                <ChatLineSquare />
            </el-icon>
            <span>评价管理</span>
        </el-menu-item>
        <el-menu-item index="/main/admin">
            <el-icon>
                <Setting />
            </el-icon>
            <span>管理员管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { User, ChatLineSquare, Clock, DishDot, GobletSquareFull, Tickets, Setting, House, DataAnalysis } from '@element-plus/icons-vue';
import router from '../router';
function handleSelect(event) {
    router.push(event);
    console.log(router.currentRoute.value.fullPath);
}
</script>