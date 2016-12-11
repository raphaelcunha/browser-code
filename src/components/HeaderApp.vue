<script>
    import { mapState, mapActions  } from 'vuex'
    import LocalStorage from '../localstorage';
    import Modal from './modal.vue';
    import Search from './search.vue';
    import configLanguages from '../languages';

    export default{
        name: 'HeaderApp',
        components: { Modal, Search },
        computed: {
          ...mapState({
                language: state => {
                  return state.languages.languageSelected;
                }
          })
        },
        data(){
            return{
                languages:  configLanguages,
                user: {},
                menuShow: true,
                languageOpen: true,
                showModal: false
            }
        },
        mounted(){
           if(this.$route.path == '/'){
                 this.menuShow = false;
           }else{
           this.menuShow = true;
           }
          this.user = LocalStorage.getUser();
        },

        methods: {
          openLanguages(){
            if(this.languageOpen == true) {
                this.languageOpen = true;
            }else{
               this.languageOpen = true;
            }
          },

          selectLanguage(language){
            this.language = language;
            this.languageOpen = true;

            console.log(this.$route);

            if(this.$route.name == 'Developer'){
                this.$router.push('/developers');
            }

            if(this.$route.name == 'Repositorie'){
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
      <ul>
        <!-- <li>
           <a @click="openLanguages()" :class="{'active': languageOpen }">
             languages
           </a>
         </li>-->
        <!--<li>
          <router-link :to="{ path: '/about' }" :class="{'active': this.$route.path == '/about'}" >
            about
          </router-link>
        </li>-->
        <li style="width: 70px;">
          <router-link :to="{ path: '/projects' }" :class="{'active': this.$route.path == '/projects'}">
            <i class="octicon octicon-repo" style="padding-top: 5px;"></i> projects
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/developers' }" :class="{'active': this.$route.path == '/developers'}">
            <i class="octicon octicon-person"></i> developers
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/videos' }" :class="{'active': this.$route.path == '/videos'}">
            <i class="octicon octicon-device-camera-video" style="padding-top: 4px; margin-left: -20px;"></i> videos
          </router-link>
        </li>
      </ul>

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
          <p>{{user.displayName}}</p>
          <img class="img-circle" :src='user.photoURL' width="65"/>
      </div>



    </div>
    <div class="clearfix"></div>
    <div class="languages" v-if="languageOpen">
      <ul>
        <li v-for="lang in languages" :class="{active: language.name == lang.name }" @click="selectLanguage(lang)">
          <img :src="'/static/assets/images/logos/'+ lang.img"/>
          <p>{{lang.name}}</p>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<style scoped>
 .languages {
   height: 120px;
   background: #434242;
 }

  .languages ul {
      margin:0px;
      padding: 0px;
  }

 .languages ul li{
      float:left;
      width: 100px;
      padding-top: 10px;
      height: 120px;
      margin-right: 0px;
 }


 .languages ul li:hover {
    background: #545454;
 }


 .languages ul li.active {
     background: #353535;
 }

 .languages ul li p {
  font-size:12px;
 }

 .sidebar {
  width: 100%;
  float: left;
  height: 55px;
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

.logo{
  float:left;
  position:absolute;
  left: 50%;
  padding-top: 5px;
}
.logo img {
  float:left;
  width: 45px;
}
.logo p{
  padding-top: 10px;
  font-size:18px;
  float:left;
}

 ul {
  height: 55px;
  float:left;
  padding-top: 25px;
  margin-left: 10px;
}

ul li {
  list-style:none;
  float:left;
  cursor: pointer !important;
  color:white;
  text-align: center;
  margin-right:15px;
  width: 90px;
}

ul li a{
  color: #706f6f;
  font-size:13px;
}

ul li a.active {
  font-weight:600;
  color: #128f76;
}

ul li a:hover, a:active, a:visited, a:focus{
text-decoration:none;
}

.icon-user{
  float:right;
  padding-top: 10px;
  margin-right: 10px;
  width: 185px;
}

.icon-user p{
  text-align:right;
  padding-top:8px;
  font-size: 13px;
  color:#706f6f;
  padding-right: 5px;
  width:150px;
  float:left;
}

.icon-user img {
  float:right;
  width:35px;
}



.icon-logout{
  float:right;
  padding-top: 18px;
  width:30px;
  cursor:pointer;
}
.icon-logout i {
  display:block;
  font-size:15px;
  padding-left: 15px;
}



</style>
