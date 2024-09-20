<template>
    <div class="main" ref="containerRef">
        <div class="title">
            <h1>用户信息管理</h1>
        </div>
        <div class="search" :style="'top:' + queryBoxPosition + 'px;opacity:' + queryBoxOpacity" v-if="queryBoxVisible">
            <div class="enable-flex">
                <div class="search-form">
                    <h1>条件查询</h1>
                    <el-form :model="searchInfo" ref="formRef">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="用户名" label-width="100">
                                    <el-input v-model="searchInfo.username" placeholder="模糊查询" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="ID" label-width="100">
                                    <el-input v-model="searchInfo.id" placeholder="精准查询" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="性别" label-width="100">
                                    <el-select v-model="searchInfo.sex" placeholder="请选择">
                                        <el-option label="不限" value="" />
                                        <el-option label="男" value="男" />
                                        <el-option label="女" value="女" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="注册日期范围" label-width="100">
                                    <el-date-picker v-model="searchInfo.daterange" type="daterange" range-separator="-"
                                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD"
                                        clearable />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="search-button">
                    <el-button type="primary" @click="handleQuery" :icon="Search">查询</el-button>
                    <el-button type="primary" @click="onReset" :icon="Refresh">重置</el-button>
                    <el-button type="primary" @click="hideQueryBox" :icon="CloseBold">关闭</el-button>
                </div>
            </div>
        </div>
        <div class="action">
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="primary" @click="showQueryBox">条件查询</el-button>
            <el-button type="danger" @click="handleDelete">删除所选</el-button>
        </div>
        <div class="data">
            <el-table :data="tableData" border style="width: 100%" :height="tableHeight" @row-click="handleRow"
                ref="tableRef">
                <el-table-column fixed="left" type="selection" width="55" align="center" header-align="center" />
                <el-table-column prop="id" label="ID" width="90" />
                <el-table-column prop="avatar" label="头像" width="100" align="center">
                    <template #default="scope">
                        <div class="avatar-preview">
                            <el-image style="width: 100%;height: 100%;" :src="scope.row.avatar" :fit="'cover'" />
                            <!-- <img :src="scope.row.avatar" alt="" style="width: 100%;height: 100%;" v-if="scope.row.avatar"/> -->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="password" label="密码" width="180" v-if="false"/>
                <el-table-column prop="nickname" label="昵称" width="180" />
                <el-table-column prop="sex" label="性别" width="180" />
                <el-table-column prop="phone" label="手机号" width="180" />
                <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column prop="address" label="地址" width="180" />
                <el-table-column prop="realName" label="真实姓名" width="180" />
                <el-table-column prop="registrationTime" label="注册时间" width="180" />
                <el-table-column prop="lastLogin" label="最后登录" width="180" />
                <el-table-column prop="disabled" label="是否禁用" width="180" />
                <el-table-column min-width="1"></el-table-column>
                <el-table-column fixed="right" label="操作" width="80" align="center">
                    <template #default>
                        <el-button type="primary" size="small" @click="beforeEdit">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="totalSize"
                @change="handleChange" />
        </div>
        <div class="form">
            <el-dialog v-model="dialogVisible" :title="dialogTitle" width="800" draggable @close="clearDialogForm">
                <el-form>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="用户名：" label-width="100">
                                <el-input v-model="userInfo.username" />
                            </el-form-item>
                            <el-form-item label="密码：" label-width="100">
                                <el-input v-model="userInfo.password" type="password" />
                            </el-form-item>
                            <el-form-item label="昵称：" label-width="100">
                                <el-input v-model="userInfo.nickname" />
                            </el-form-item>
                            <el-form-item label="性别：" label-width="100">
                                <el-select v-model="userInfo.sex">
                                    <el-option label="请选择" value="" />
                                    <el-option label="男" value="男" />
                                    <el-option label="女" value="女" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="头像：" label-width="100">
                                <div style="width: 170px;height: 170px;">
                                    <AvatarComponent v-model="userInfo.avatar"></AvatarComponent>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="邮箱：" label-width="100">
                                <el-input v-model="userInfo.email" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="微信：" label-width="100">
                                <el-input v-model="userInfo.wechat" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="手机号：" label-width="100">
                                <el-input v-model="userInfo.phone" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="onDialogSubmit">
                            确定
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import AvatarComponent from './AvatarComponent.vue';
import { onMounted, ref, nextTick } from 'vue';
import {
    findAll as apiFindAll, findByCondition as apiFindByCondition,
    addUser as apiAddUser, deleteByIds as apiDeleteByIds, updateUser as apiUpdateUser
} from '@/api/UserApi';
import { Search, Refresh, CloseBold } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus'
const tableData = ref();
const tableHeight = ref(500);
const queryBoxVisible = ref(false);
const queryBoxOpacity = ref(0);
const queryBoxPosition = ref(0);
const dialogVisible = ref(false);
const dialogTitle = ref("新增用户");
const currentPage = ref(1);
const pageSize = ref(20);
const totalSize = ref(400);
const searchInfo = ref({});
const userInfo = ref({});
let changingId = null;
let prepareEdit = false;
let containerRef = null;
let tableRef = null;

const handleResize = entries => {
    // for (let entry of entries) {
    // const cr = entry.contentRect;
    // console.log(`Element size changed: ${cr.width}x${cr.height}`);
    // 在这里处理你的逻辑
    tableHeight.value = containerRef.clientHeight - 160;
    // }
};

const resizeObserver = new ResizeObserver(handleResize);

onMounted(() => {
    // console.log(666);
    // search();
    onQuery();
    //45 + 32 + 42
    // console.log(containerRef);
    // console.log(containerRef.clientHeight);

    resizeObserver.observe(containerRef);
    tableHeight.value = containerRef.clientHeight - 160;
});

function showQueryBox() {
    queryBoxVisible.value = true;
    setTimeout(() => {
        queryBoxOpacity.value = 1;
        queryBoxPosition.value = 150;
    }, 1);
}

function hideQueryBox() {
    queryBoxOpacity.value = 0;
    queryBoxPosition.value = 0;
    setTimeout(() => {
        queryBoxVisible.value = false;
    }, 300);
}

function handleChange() {
    onQuery();
}

function onReset() {
    searchInfo.value = {};
}

function handleQuery() {
    currentPage.value = 1;
    onQuery();
}

function onQuery() {
    if (searchInfo.value.daterange == null) {
        searchInfo.value.daterange = [];
    }
    let params = {
        pageNo: currentPage.value,
        pageSize: pageSize.value,
        ...searchInfo.value,
        registrationDateStart: searchInfo.value.daterange[0],
        registrationDateEnd: searchInfo.value.daterange[1],
    };
    params.daterange = ""
    let obj = apiFindByCondition(params);
    obj.then(data => {
        console.log(data);
        tableData.value = data.data;
        totalSize.value = data.pi.total;
    });
}

function beforeEdit() {
    prepareEdit = true;
}

function handleRow(row, column, event) {
    tableRef.toggleRowSelection(row);
    if (prepareEdit === true) {
        prepareEdit = false;
        changingId = row.id;
        userInfo.value = Object.assign({}, row);
        dialogTitle.value = "修改用户";
        // console.log(row.id);
        dialogVisible.value = true;
    }
}

function clearDialogForm() {
    userInfo.value = {};
}

async function search() {
    let data = await apiFindAll();
    // console.log(data);
    tableData.value = data.data;
}

async function onDialogSubmit() {
    let resp = null;
    if (changingId == null) {
        userInfo.value.id = null;
        resp = await apiAddUser(userInfo.value);
        if (resp.success) {
            ElMessage({
                type: 'success',
                message: '添加成功',
            })
            dialogVisible.value = false;
            onQuery();
        }
    } else {
        userInfo.value.id = changingId;
        resp = await apiUpdateUser(userInfo.value);
        if (resp.success) {
            ElMessage({
                type: 'success',
                message: '修改成功',
            })
            dialogVisible.value = false;
            onQuery();
        }
    }
}

function handleAdd() {
    dialogVisible.value = true;
    dialogTitle.value = "新增用户";
    changingId = null;
}

function handleDelete() {
    let resp = null;
    ElMessageBox.confirm(
        '确认删除所选用户？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // console.log(tableRef.getSelectionRows());
        let selected = tableRef.getSelectionRows();
        let ids = [];
        for (let pxy of selected) {
            ids.push(pxy.id);
        }
        resp = apiDeleteByIds(ids);
        resp.then(data => {
            if (data.success) {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
                onQuery();
            }
        });
    }).catch(() => { })
}
</script>

<style scoped>
.data {
    margin-top: 10px;
}

.pagination {
    position: absolute;
    bottom: 10px;
}

.main {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
}

h1 {
    margin: 10px;
    padding: 10px;
    color: #606266;
    text-align: center;
}

.title {
    margin: 0 10px;
    border-radius: 10px;
    background-color: #ccffcc;
    box-shadow: 0px 0px 10px 0px #eee;
}

.search {
    width: 600px;
    left: calc(50% - 300px);
    margin: 0 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f0ffff;
    box-shadow: 0px 0px 10px 0px #ccc;
    position: absolute;
    transition: 0.3s;
    z-index: 100;
    /* opacity: 1;
    top: 150px; */
}

.search-form {
    flex-grow: 1;
}

.search-button {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
}

.search-button .el-button {
    margin: 5px;
}

.enable-flex {
    display: flex;
    flex-direction: column;
}

.avatar-preview {
    width: 75px;
    height: 75px;
    display: inline-block;
}
</style>