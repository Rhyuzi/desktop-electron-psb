<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>test typo</h1>
    <h2>test typo</h2>
    <h3>test typo</h3>
    <h4 class="h4-normal">test typo</h4>
    <h5 class="h5-normal">test typo</h5>
    <p>test typo</p>
    <p class="p2">test typo</p>
    <p class="p2-bold">test typo</p>
    <p class="p3">test typo</p>
    <p class="p3-bold">test typo</p>
    <p class="p4">test typo</p>
    <p class="p4-bold">test typo</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
