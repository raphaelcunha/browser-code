<template>
  <div id="app">
    <header-app></header-app>
    <div class="clearfix"></div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
body::-webkit-scrollbar-track
{
	background-color: white;
}

body::-webkit-scrollbar
{
	width: 8px;
	background-color: #cecece;
}

body::-webkit-scrollbar-thumb
{
	background-color: #cecece;
}

</style>


<script>
  import Firebase from 'firebase';
  import HeaderApp from './components/HeaderApp';
  import Login from './components/Login';
  export default {
    name: 'App',
    components: { HeaderApp },
  }


</script>
