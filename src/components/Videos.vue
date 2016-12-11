<script>
    import Loading from './Loading.vue'
    import {mapState, mapActions} from 'vuex'
    import axios from 'axios';

    //cria instancia do axios
    const youtube = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      headers: '',
    });

    export default{
       name: 'Videos',
      components: { Loading },
        data(){
            return{
                key:'AIzaSyA_AliVKxvNDgi13nClTygYedgab8phBLA',
                videos: [],
                videoSelected: null,
                playlist: null,
            }
        },
         computed: {
          ...mapState({
                languageSelected: state => {
                  return state.languages.languageSelected;
                }
          })
        },
         watch: {
          'languageSelected':function (response) {
              this.search();
          }
        },
        mounted(){
              this.search();
        },

        methods:{


          search(){
              let vm = this;
              youtube.get(`search?part=snippet&q=${this.languageSelected.videos}&maxResults=30&type=playlist&order=relevance&key=${this.key}`).then((response) => {
                  vm.videos = response.data.items;
                  vm.getVideo(vm.videos[0])
             });
          },


          getVideo(item){
            let vm = this;
            youtube.get(`playlistItems?part=snippet&maxResults=12&playlistId=${item.id.playlistId}&key=${this.key}`).then((response) => {
                  vm.playlist = response.data.items;
                  vm.videoSelected = vm.playlist[0];
            });

          }

        }
    }




</script>

<template>
  <div class="repository col-md-12 row">
    <loading v-if="!videoSelected"></loading>

    <div v-if="videoSelected" class="mt40">

      <div class="clearfix"></div>
      <div class="col-md-3 col-xl-1">

        <!--//PLAYLIST-->
        <div class="card" v-for="item in videos" @click="getVideo(item);">
          <div class="card-text">
            <img class="card-img-top  text-md-center" :src="item.snippet.thumbnails.default.url" width="30%">
            <h2 class="card-title">{{item.snippet.title}} </h2>
            {{item.snippet.description}}
          </div>
          <div class="clearfix"></div>
          <hr/>
          <div class="card-repository">
            <ul>
              <li><strong>Channel:</strong> {{item.snippet.channelTitle}}</li>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>

      </div>

      <div class="col-md-9" v-if="videoSelected">

        <!--//VIDEO-->
        <div class="col-md-12">
          <h2>{{videoSelected.snippet.title}}</h2>
          <div class="iframe">
            <iframe width="100%" height="600"
                    :src="`https://www.youtube-nocookie.com/embed/${videoSelected.snippet.resourceId.videoId}?showinfo=0`"
                    frameborder="0" allowfullscreen></iframe>
          </div>
        </div>

        <!--//VIDEOS LIST-->
        <div class="col-md-4" v-for="item in playlist" @click="videoSelected = item;">
          <div class="card">
            <div class="card-text">
              <img class="card-img-top  text-md-center" :src="item.snippet.thumbnails.default.url" width="30%">
              <h2 class="card-title">{{item.snippet.title}} </h2>
              {{item.snippet.description}}
            </div>
            <div class="clearfix"></div>
            <hr/>
            <div class="card-repository">
              <ul>
                <li><strong>Channel:</strong> {{item.snippet.channelTitle}}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
</template>

<style scoped>
  h2{
    margin-top: 0px;
    margin-bottom:25px;
  }

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


.iframe {
    margin-bottom: 40px;
}













</style>
