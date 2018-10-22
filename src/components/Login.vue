<template>
  <div>
    <button @click="login()" class="btn btn-primary mt15" id="quickstart-sign-in">
      Sign in with GitHub
    </button>
  </div>
</template>

<script>
  import LocalStorage from '../localstorage';
  import {firebase} from '../firebase';

  export default {
    name: 'Login',
    data(){
      return {
        logged: false,
      }
    },
    mounted(){
      const vm = this;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.logged = true;
          vm.$router.push({ path: '/projects' });
        }
      });
    },
    methods: {
      login() {
        const vm = this;
        if (!firebase.auth().currentUser) {
          const provider = new firebase.auth.GithubAuthProvider();
          provider.addScope('user');
          firebase.auth().signInWithPopup(provider).then(function (result) {
            let token = result.credential.accessToken;
            let user = result.user.providerData[0];
            LocalStorage.setToken(token);
            LocalStorage.setUser(user);
            vm.logged = true;
            window.location = "/projects";
          }).catch(function (error) {
            vm.logged = false;
            console.log(error.code, error.message);
          });
        }
      },
    },
  };



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     button:hover{
        color:black;
     }
</style>
