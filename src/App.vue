<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './assets/global.css';

::-webkit-scrollbar {
  width: 0px;
  background-color: #d8d8d8;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #bfc1c4;
}
</style>
