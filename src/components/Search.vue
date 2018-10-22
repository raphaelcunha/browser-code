
<script>
export default {
  data() {
    return {
      language: ""
    };
  },
  methods: {
    search() {
      console.log(this.language);
    }
  }
};
</script>
<template>
  <div>
    <form class="search" @submit.prevent="search()" @keyup.enter.prevent="search()">
      <input id="search" autofocus v-model="language" name="search" type="text" placeholder="Search language"/>
      <i class="octicon octicon-search" @click="search()"></i>
    </form>
    <div class="clearfix">

</template>
<style scoped>
h3 {
  padding: 0;
  margin: 0;
  float: left;
}

i {
  font-size: 26px;
  margin-right: 15px;
  cursor: pointer;
}

input {
  height: 70px;
  width: 90%;
  padding-top: 5px;
  border: none;
  font-size: 28px;
  margin-left: 15px;
}
</style>
