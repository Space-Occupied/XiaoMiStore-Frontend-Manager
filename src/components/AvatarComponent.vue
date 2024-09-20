<template>
    <div class="main">
        <el-upload action="/api/picture/avatar" :show-file-list="false" ref="uploadRef" :on-success="handleSuccess" :headers="headers">
            <img alt="" v-if="model != null" :src="model" style="width: 170px;height: 170px;">
            <el-icon class="avatar-upload" v-if="model == null">
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getToken } from '@/utils/TokenUtils';

const model = defineModel();

const uploadRef = ref(null);
const headers = ref({
    'Authorization': getToken()
});

const handleSuccess = (response) => {
    console.log(response);
    model.value = response.url;
    // props.url = response.url;
    // console.log(props.url);
    //props.url = response.url + "?t=" + Date.now();
    ElMessage.success('上传成功')
}
</script>

<style scoped>
.avatar-upload {
    width: 170px;
    height: 170px;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-upload:hover {
    border-color: var(--el-color-primary);
}
</style>