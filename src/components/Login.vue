<template>
  <div>
    <button @click="login()" class="btn btn-primary mt15" id="quickstart-sign-in">
      Sign in with GitHub
    </button>
  </div>
</template>

<script>
  import LocalStorage from '../localstorage';
  import Firebase from 'firebase';
  const config = {
    apiKey: "AIzaSyD0iMja2uLfakYuc4waKMo6rx47jObPSVU",
    authDomain: "code-c7eae.firebaseapp.com",
    databaseURL: "https://code-c7eae.firebaseio.com",
    projectId: "code-c7eae",
    storageBucket: "code-c7eae.appspot.com",
    messagingSenderId: "284055458998"
  };
  Firebase.initializeApp(config);


  export default {
    name: 'Login',
    data(){
      return {
        logged: false,
      }
    },
    mounted(){
      const vm = this;
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
          const provider = new Firebase.auth.GithubAuthProvider();
          provider.addScope('user');
          Firebase.auth().signInWithPopup(provider).then(function (result) {
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
