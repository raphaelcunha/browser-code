<template>
  <div>
    <a @click="login()" class="btn btn-success mt15" id="quickstart-sign-in">
      Sign in with GitHub
    </a>
  </div>
</template>

<script>
  import LocalStorage from '../localstorage';
  import Firebase from 'firebase';
  Firebase.initializeApp({
    appName: 'Browser Code',
    apiKey: "AIzaSyCr5j-n_kT0DpW7I36hzcU0L3IVLsZ3BxE",
    authDomain: "browsercode.firebaseapp.com",
    databaseURL: "https://browsercode.firebaseio.com",
    storageBucket: "project-1516492458785316542.appspot.com",
    messagingSenderId: "28266784702"
  });

  export default {
    name: 'Login',
    data(){
      return {
        logged: false,
      }
    },
    mounted(){
      var vm = this;
      Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.logged = true;
          vm.$router.push({ path: '/projects' });
        }
      });
    },
    methods: {
      login() {
        const vm = this;
        if (!Firebase.auth().currentUser) {
          var provider = new Firebase.auth.GithubAuthProvider();
          provider.addScope('user');
          Firebase.auth().signInWithPopup(provider).then(function (result) {
            let token = result.credential.accessToken;
            let user = result.user.providerData[0];
            LocalStorage.setToken(token);
            LocalStorage.setUser(user);
            vm.logged = false;
            window.location = "/projects";
            vm.$router.push({ path: '/projects' });
          }).catch(function (error) {
            vm.logged = true;
            console.log(error.code, error.message);
          });
        }
      },
    },
  }
  ;



</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     button:hover{
        color:white;
     }



</style>
