<template>
<MyTable></MyTable>
</template>

<script>
import MyTable from "@/components/MyTable";

export default {
  name: 'App',
  components: {
  MyTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
