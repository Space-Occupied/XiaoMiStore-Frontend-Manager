<template>
    <div class="main">
        <el-upload action="/api/picture/test" :show-file-list="false" ref="uploadRef" :on-success="handleSuccess">
            <img alt="" v-if="imgSrc != null" :src="imgSrc" style="width: 170px;height: 170px;">
            <el-icon class="avatar-upload" v-if="imgSrc == null">
                <Plus />
            </el-icon>
        </el-upload>

        <el-button type="primary" @click="handleUpload">测试</el-button>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn, Switch } from '@element-plus/icons-vue'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const uploadRef = ref(null);
const imgSrc = ref(null);
const hasSpace = ref(true);

const handleRemove = (file) => {
    console.log(file)
    // console.log(uploadRef);
    uploadRef.value.handleRemove(file);
    hasSpace.value = true;
}

const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

const handleDownload = (file) => {
    console.log(file.url)
    const src = file.url
    let aDom = document.createElement('a')
    aDom.href = src
    aDom.setAttribute('download', file.name)
    aDom.click()
    aDom = null
}

const checkSizeExceed = (file) => {
    if (file.size / 1024 / 1024 > 2) {
        ElMessage.error('图像大小不能超过2MB!')
        return true
    }
    return false
}

const handleExceed = (files) => {
    uploadRef.value.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    uploadRef.value.handleStart(file)
}

const handleSuccess = (response) => {
    console.log(response);
    imgSrc.value = response.url + "?t=" + Date.now();
    ElMessage.success('上传成功')
}

const handleUpload = () => {
    uploadRef.value.submit();
}

const handleChange = (file, files) => {
    if (checkSizeExceed(file)) {
        handleRemove(files[files.length - 1]);
    } else {
        if (files.length >= 1) {
            hasSpace.value = false;
            console.log(files);
        }
    }
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