<script>
    import Loading from './Loading.vue'
    import {mapState, mapActions} from 'vuex'
    export default{
      components: { Loading },
        data(){
            return{
                inputSearch: false,
                respositories: {},
            }
        },
        mounted(){
              this.search();
        },

        watch: {
          'languageSelected': function (response) {
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

        methods:{
          search(){
               let vm = this;
               vm.respositories = {};
               this.$http.get(`search/repositories?q=${this.languageSelected.projects}&sort=stars&order=desc&per_page=100`).then((response) => {
                   vm.respositories = response.data.items;
               });
          }
        }

    }




</script>

<template>
  <div class="repository col-md-12 row">
    <loading v-if="!respositories.length"></loading>

    <div v-if="respositories.length" class="mt10">

      <div class="clearfix"></div>

      <div class="col-xs-6 col-md-2 col-xl-1" v-for="item in respositories">
        <router-link :to="{ path: `projects/${item.owner.login}`, query: { repo: item.name }}">
          <div class="card">
            <div class="card-text">
              <img class="card-img-top  text-md-center" :src="item.owner.avatar_url " width="30%">
              <h2 class="card-title">{{item.name}} </h2>
              {{item.description}}
              <a :href="'https://github.com/'+item.full_name+'/archive/master.zip'" title="download">
                <i class="octicon octicon-desktop-download"></i>
              </a>
            </div>
            <div class="clearfix"></div>
            <hr/>
            <div class="card-repository">
              <ul>
                <li><i class="octicon octicon-star"></i> {{item.stargazers_count}}</li>
                <li><i class="octicon octicon-repo-forked"></i>{{item.forks}}</li>
                <li><i class="octicon octicon-eye-watch"></i> {{item.watchers}}</li>
              </ul>
            </div>
            <div class="clearfix"></div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .repository{
        display: block;
        margin-top:0px;
        margin-left:0px;
        margin-right:15px;
    }


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
.card a:hover{
    cursor:pointer;
    background-color:#F9F9F9;
    background: 1px solid #ccc;
}

.card:hover {
    cursor:pointer;
    background-color:#F9F9F9;
}

.card-img-top {
    float:left;
    width:25%;
    margin: 10px;
    margin-bottom: 0px;
    margin-left:0px;
}

.card-title {
    padding:5px;
    margin:10px 5px 5px 45px;
    font-size:16px;
    font-weight: 600;
    word-wrap: break-word;
    color:#373a3c;
}

.card-text {
    font-size: 12px;
    padding: 0 15px;
    text-overflow: ellipsis;
    height: 145px;
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

.card-text i:hover{
  color: black;
}


hr {
  width: 100%;
  position: absolute;
  bottom: 0px;
  border-top: 1px solid #ccc;
}

.card-repository{
    position:absolute;
    bottom: 0px;
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
