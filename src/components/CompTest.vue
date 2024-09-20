<template>
    <div>
        <MultiPictureTest ref="multiRef"/>
        <el-button @click="testFunc"></el-button>
    </div>
</template>

<script setup>
import MultiPictureTest from './MultiPictureTest.vue';
import { onMounted } from 'vue';
let multiRef = null;
onMounted(()=>{

});

function testFunc() {
    console.log(multiRef);
    multiRef.handleUpload();
}
</script>