<template>
  <div id="app">
    <HeaderNav/>
    <router-view/>
  </div>
</template>

<script>
import HeaderNav from '../src/components/headerNav'
export default {
  name: 'App',
  components: {
    HeaderNav
  }
}
</script>

<style></style>
