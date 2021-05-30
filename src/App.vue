<template>
  <div id="app">
    <h1 class="text">EDU Boss</h1>
    <!-- 统一的路由出口 -->
    <router-view />
  </div>
</template>

<script>
import request from '@/utils/request'

request('/boss').then(res => console.log(res))
export default {
}
</script>

<style lang="scss" scoped>
.text{
  color: $danger-color;
}
</style>
