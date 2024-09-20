<template>
    <div class="login-container">
        <div class="background-spliter">
            <el-form :model="loginForm" label-width="80px">
                <h2 class="login-title">登录</h2>
                <el-form-item label="用户名">
                    <el-input v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="loginForm.captcha" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="background-spliter hover-expand" style="margin-top: 10px;padding: 0;">
            <el-image :src="captchaPic" fit="fill" @click="getCaptchaImage"
                style="position: relative;width: 240px;height: 60px;" class="captcha-image">
                <template #error>
                    <div class="image-slot">
                        <el-icon>
                            <IconPicture />
                        </el-icon>
                    </div>
                </template>
            </el-image>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { login as apiLogin, getCaptchaImage as apiGetCaptchaImage } from '../api/LoginApi';
import { ElMessage } from 'element-plus';
import { setToken } from '@/utils/TokenUtils';
import { Picture as IconPicture } from '@element-plus/icons-vue'
import router from '../router';

const captchaPic = ref('');
const captchaPicId = ref('');
const loginForm = ref({
    username: '',
    password: ''
});

onMounted(() => {
    getCaptchaImage();
});

function getCaptchaImage() {
    let resp = apiGetCaptchaImage();
    resp.then(response => {
        console.log(response);
        const data = response;
        captchaPic.value = 'data:image/jpeg;base64,' + data.message;
        captchaPicId.value = data.result;
    }).catch(error => {
        ElMessage.error('获取验证码错误');
    });
}

const handleLogin = () => {
    console.log('登录', loginForm.value);
    // 在这里可以添加你的登录逻辑，比如发送到API  
    let resp = apiLogin({
        ...loginForm.value,
        captchaId: captchaPicId.value
    });
    resp.then((data) => {
        if (data.success === false) {
            console.log("failed");
            ElMessage.error(data.error);
        } else {
            console.log(data.jwt);
            setToken(data.jwt);
            router.push({ name: "dashboard" });
        }
    })
};

</script>

<style scoped>
.login-container {
    background-image: url('/img/background.jpg');
    /* 替换为你的背景图片URL */
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.background-spliter {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 50px;
    border-radius: 10px;
}

.login-title {
    margin-bottom: 20px;
}

.el-form-item__label {
    color: #000;
}

.el-button--primary {
    background-color: #409EFF;
    /* Element Plus 主题色，可根据需要调整 */
    border-color: #409EFF;
}

.hover-expand {
    transition: transform 0.5s ease-in-out;
}

.hover-expand:hover {
    transform: scale(4);
}
</style>