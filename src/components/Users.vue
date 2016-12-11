<script>
    import {mapState, mapActions} from 'vuex'
    import Loading from './Loading.vue'

    export default{
      name: 'Users',
      components: { Loading },
        data(){
            return{
                language: 'Vue.js',
                inputSearch: false,
                users: [],
            }
        },
         watch: {
          'languageSelected': function (response) {
              console.log(response.name);
              this.search(response.name);
          }
        },
        computed: {
          ...mapState({
                languageSelected: state => {
                  return state.languages.languageSelected;
                }
          })
        },
        mounted(){
           //console.log(this.$router.redirect('/'));
           //window.location.href = '/#/login';
           this.search();
        },

        methods:{
          search(){
            let vm = this;
            vm.users = [];
           this.$http.get(`search/users?q=${this.languageSelected.users}+sort:followers&order=desc&per_page=16`).then((response) => {
               vm.getDetails(response.data.items);
            });
          },
          getDetails(users) {
              let vm = this;
              for (var user of users) {
                   this.$http.get(`users/${user.login}`).then((response) => {
                       vm.users.push(response.data);
                   });
              }
           }


        }

    }



</script>

<template>
  <div>

    <loading v-if="!users.length"></loading>

    <div  v-if="users.length" class="col-md-12 mt30">

      <div class="col-md-3 col-lg-3 col-xl-1" v-for="item of users">

        <div class="card">
          <router-link :to="{ path: `developers/${item.login}`}">
            <div style="width:30%; float:left;">
              <img class="card-img-top  text-md-center" :src="item.avatar_url">
            </div>
            <div style="width:70%; float:left;">
              <h2 class="card-title">{{item.name}}</h2>
              <p class="card-text">
                <span v-if="item.location"><strong>Location: </strong>{{item.location}}<br/></span>
                <span v-if="item.company"><strong>Company: </strong>{{item.company}}<br/></span>
                <span v-if="item.blog"><strong>Url: </strong>{{item.blog}}<br/></span>
                <span v-if="item.email"><strong>E-mail: </strong>{{item.email}}</span>
              </p>
            </div>
            <div class="clearfix"></div>
            <div class="card-repository">
              <ul>
                <li><i class="octicon octicon-person-follow"></i> {{item.followers}}</li>
                <li><i class="octicon octicon-rss"></i>{{item.following}}</li>
              </ul>
            </div>
            <div class="clearfix"></div>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card{
    background: #fdfdfd;
    position:relative;
    height: 180px;
    margin-bottom: 30px;
    text-overflow: ellipsis;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.12), 0 1px 1px -1px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(204, 204, 204, 0.52)
}

.card a {
    color:#373a3c;
}

.card:hover {
    cursor:pointer;
    background-color:#F9F9F9;
}

.card-img-top {
    float:left;
    width: 100%;
    max-width: 160px;
    padding: 10px;
    vertical-align: middle;
}

.card-title {
    word-wrap: break-word;
    float: left;
    font-size: 16px;
    width: 100%;
    overflow-y: hidden;
    text-overflow: ellipsis;
    color: #373a3c;
    margin-top:10px;
    padding: 0px 5px 0px 4px;
    margin-bottom: 0px;
}

.card-title span {
    float:left;
}

.card-text {
    float:left;
    font-size: 12px;
    padding: 0 5px;
    text-overflow: ellipsis;
    height: 75px;
    overflow:hidden;
    margin-top: 5px;
    color: #56595b;
    text-overflow:ellipsis;
}

.card-text i {
    position: absolute;
    bottom: 28px;
    right: 3px;
    color: #dadada;
}

.card-repository{
    position:absolute;
    width: 100%;
    bottom: 0;
    height: 20px;
    font-size: 11px;
}

.card-repository ul {
    margin:0;
    padding:0;
    text-align: center;
}

.card-repository ul li {
    list-style: none;
    padding:2px;
    margin-left: 10px;
    float:left;
}

.card-repository ul li i {
    font-size: 12px;
    padding-right: 2px;
}


</style>
