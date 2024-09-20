<template>
    <div class="main">
        <el-upload :action="'/api/picture/list/' + typeId + '/' + subId" list-type="picture-card" :auto-upload="false"
            ref="uploadRef" :on-success="handleSuccess" :on-change="handleChange" v-model:file-list="fileList">
            <el-icon>
                <Plus />
            </el-icon>

            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" style="object-fit:cover" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                            <el-icon>
                                <Download />
                            </el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </span>
                    </span>
                </div>
            </template>
        </el-upload>

        <el-button type="primary" @click="handleUpload">测试</el-button>
        <el-button type="primary" @click="handleQuery">查询</el-button>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import api from '@/utils/api';

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const uploadRef = ref(null);
const typeId = ref(0);
const subId = ref(0);
const fileList = ref([]);
const successCount = ref(0);
const expectSuccess = ref(0);

const handleRemove = (file) => {
    console.log(file)
    // console.log(uploadRef);
    let resp = api({
        url: "/image/deleteByUrl",
        method: "post",
        data: file
    });
    resp.then((data) => {
        console.log(data);
        uploadRef.value.handleRemove(file);
    });
}

const handleQuery = () => {
    let resp = api({
        url: "/image/findByCondition",
        method: "post",
        data: {
            typeId: typeId.value,
            subId: subId.value
        }
    });
    resp.then((data) => {
        console.log(data.data);
        //fileList.value = data.data;
        fileList.value = data.data;
        console.log(fileList.value);
    });
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

const handleSuccess = (response) => {
    if (response.success) {
        successCount.value++;
        if (successCount.value === expectSuccess.value) {
            ElMessage.success('上传成功')
        }
    } else {
        ElMessage.error('上传出错')
    }
}

const handleUpload = () => {
    //console.log(fileList.value[0].status);
    expectSuccess.value = 0;
    for (let file of fileList.value) {
        if (file.status === "ready") {
            expectSuccess.value ++;
        }
    }
    let resp = api({
        url: "/picture/listStart/" + typeId.value + "/" + subId.value,
        method: "post"
    });
    resp.then((data) => {
        if (data.success) {
            successCount.value = 0;
            uploadRef.value.submit();
        }
    });
}

const handleChange = (file, files) => {
    if (checkSizeExceed(file)) {
        handleRemove(files[files.length - 1]);
    }
    //console.log(file, files);
}

defineExpose({
    handleUpload
})
</script>