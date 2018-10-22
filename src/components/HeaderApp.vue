<script>
  import {mapState, mapActions} from 'vuex'
  import SubMenu from './SubMenu.vue'
  import LocalStorage from '../localstorage';
  import Modal from './modal.vue';
  import Search from './search.vue';
  import {db} from '../firebase';

  export default{
    name: 'HeaderApp',
    components: {Modal, Search, SubMenu},
    firebase: {
      languages: {
        source: db.ref('languages'),
      }
    },
    computed: {
      ...mapState({
        language: state => {
          return state.languages.languageSelected;
        }
      })
    },
    data(){
      return {
        user: {},
        menuShow: true,
        languageOpen: true,
        showModal: false
      }
    },
    mounted(){
      if (this.$route.path == '/') {
        this.menuShow = false;
      } else {
        this.menuShow = true;
      }
      this.user = LocalStorage.getUser();
      this.languageSelected(this.languages[0]);
    },

    methods: {
      openLanguages(){
        if (this.languageOpen == true) {
          this.languageOpen = true;
        } else {
          this.languageOpen = true;
        }
      },

      selectLanguage(language){
        this.language = language;
        this.languageOpen = true;

        if (this.$route.name == 'Developer') {
          this.$router.push('/developers');
        }

        if (this.$route.name == 'Repositorie') {
          this.$router.push('/projects');
        }

        this.languageSelected(language);
      },

      logout(){
        LocalStorage.logout();
        location.reload();
      },

      ...mapActions(['languageSelected'])

    }
  }


</script>

<template>
  <div v-if="user">
    <div class="sidebar">
      <div class="logo">
        <div style="position: relative; left: -50%; ">
          <img :src="`/static/assets/images/logos/${language.img}`"/>
          <p>{{language.name}}</p>
        </div>
      </div>

      <div class="icon-logout" @click="logout()">
        <i class="octicon octicon-sign-out"></i>
      </div>

      <div class="icon-user">
        <img  :src='user.photoURL' height="25" width="25"/>
        <p>{{user.displayName}}</p>
      </div>


    </div>
    <div class="clearfix"></div>
    <div class="languages" v-if="languageOpen">
      <ul>
        <li v-for="lang in languages"  :key=lang.name :class="{active: language.name == lang.name }" @click="selectLanguage(lang)">
          <img :src="'/static/assets/images/logos/'+ lang.img"/>
          <p>{{lang.name}}</p>
        </li>
        <div class="clearfix"></div>
      </ul>
    </div>

    <sub-menu></sub-menu>

  </div>
</template>
<style scoped>
  .languages {
    height: 120px;
    background: #434242;
  }

  .languages ul {
    margin: 0;
    padding: 0;
  }

  .languages ul li {
    float: left;
    width: 100px;
    padding-top: 10px;
    height: 120px;
    margin-right: 0;
    text-align: center;
    cursor: pointer;
  }

  .languages ul li:hover {
    background: #545454;
  }

  .languages ul li.active {
    background: #353535;
  }

  .languages ul li p {
    text-align: center;
    font-size: 12px;
    color: white;
  }

  .sidebar {
    width: 100%;
    float: left;
    background: #f9f8f8;
    border-bottom: 1px solid #d7d4d4;
    display: block;
    text-align: center;
  }

  .sidebar i {
    display: block;
    position: absolute;
    padding-top: 3px;
    margin-left: -16px;
  }

  .sidebar ul li {
    padding-left: 20px;
    text-align: left;
  }

  .logo {
    float: left;
    position: absolute;
    left: 50%;
    padding-top: 5px;
  }

  .logo img {
    float: left;
    width: 45px;
  }

  .logo p {
    padding-top: 10px;
    font-size: 18px;
    float: left;
  }

  .menu {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 20px;
  }

  .menu ul {
    width: 330px;
    margin:0 auto;
    float: none;
    padding: 15px;
  }


  .menu ul li {
    float: left;
    margin-right: 25px;
  }

  .menu ul li a.active {
    color: #466a90;
    font-weight: 700;
    text-decoration: none;
  }



  .menu ul li i {
    float: left;
  }

  .menu ul li span {
    font-size: 13px;
    margin-top: -2px;
    margin-left: 5px;
  }

  .icon-user {
    float: right;
    padding-top: 10px;
    margin-right: 10px;
    width: 150px;
    border-right: 1px solid #cccccc;
  }

  .icon-user p {
    text-align: left;
    margin-left: 10px;
    padding-top: 8px;
    font-size: 13px;
    color: #706f6f;
    padding-right: 5px;
    float: left;
  }

  .icon-user img {
    margin-top: 5px;
    float: left;
  }

  .icon-logout {
    float: right;
    padding-top: 15px;
    width: 30px;
    cursor: pointer;
  }

  .icon-logout i {
    display: block;
    font-size: 15px;
    padding-left: 15px;
    width: 42px;
  }


</style>
