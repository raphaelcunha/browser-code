<script>
    export default{
        data(){
            return{
                item: '',
                user: '',
                repos: '',
                profile: '',
                events: '' ,
                repository: '',
            }
        },

        mounted(){
            const user = this.$route.params.user;
            if (user != null) {
              this.getProfile(user);
              this.getRepositorys(user);
              this.getEvents(user);
            }
        },
        methods: {
              getProfile(user) {
                 this.$http.get(`users/${user}`).then((response) => {
                       this.profile = response.data;
                  });
              },
              getRepositorys(user) {
                  this.$http.get(`users/${user}/repos?sort=created&order=desc`).then((response) => {
                       this.repos = response.data;
                  });
              },

              getEvents(user) {
                this.$http.get(`users/${user}/events`).then((response) => {
                  this.events = response.data;
                 });
              }

        }

    }










</script>
<template>
  <div>


    <div class="container-fluid profile" v-if="profile">
      <div class="col-md-12 row">
        <div class="repo-content">
          <div class="pull-left">
            <img class="img-circle" :src="profile.avatar_url"/>
          </div>
          <div class="pull-left data">
            <h1>{{profile.name}}</h1>
            <p>
              <span v-if="profile.location"><strong>Location: </strong>{{profile.location}}<br/></span>
              <span v-if="profile.company"><strong>Company: </strong>{{profile.company}}<br/></span>
              <span v-if="profile.email"><strong>E-mail: </strong>{{profile.email}}<br/></span>
              <span v-if="profile.followers"><strong>Followers: </strong>{{profile.followers}}<br/></span>
              <span v-if="profile.following"><strong>Following: </strong>{{profile.following}}</span>
            </p>
          </div>
          <div class="clearfix"></div>

        </div>
      </div>

      <div class="clearfix"></div>


      <!-- BIOGRAFIA-->
      <div class="col-md-6">
        <h4>Bio.</h4>
        <p>{{profile.bio}}</p>
      </div>

      <div class="clearfix"></div>

      <div class="col-md-6">
        <h4>Url.</h4>
        <span v-if="profile.blog">
          <a :href="profile.blog">{{profile.blog}}</a><br/></span>

      </div>

      <div class="clearfix"></div>
      <br/>

      <!-- REPOSITORY-->
      <div class="col-md-12">

        <div v-if="repos">
          <h4>Projects</h4>
          <hr />
          <div class="col-md-4 project row" v-for="repo of repos">
            <router-link :to="{ path: `/projects/${repo.owner.login}`, query: { repo: repo.name }}">
              <i class="octicon octicon-repo"></i>
              <strong>{{repo.name }}</strong>
              <p>{{repo.description }}</p>
            </router-link>
          </div>
        </div>

        <hr/>


      </div>

      <!-- EVENTS-->
      <!--  <div class="repo-readme col-md-4 col-xl-7">
          <div v-if="events">
            <h4>Events</h4>
            <ul>
              <li v-for="event of events">
                <i class="octicon octicon-star" v-if="event.type == 'WatchEvent'"></i>
                <i class="octicon octicon-comment-discussion" v-if="event.type == 'IssueCommentEvent'"></i>
                <i class="octicon octicon-issue-opened"
                   v-if="event.type == 'IssuesEvent' && event.payload.action == 'created'"></i>
                <i class="octicon octicon-issue-closed"
                   v-if="event.type == 'IssuesEvent' && event.payload.action == 'closed'"></i>
                <i class="octicon octicon-git-commit"
                   v-if="event.type == 'PushEvent && event.payload.commit != null'"></i>
                {{event.repo.name }}
              </li>
            </ul>
          </div>
        </div>-->


      <div class="clearfix"></div>
    </div>
  </div>

</template>
<style scoped>
      h1{
        margin-top: -10px;
        font-size:28px;
      }

      h4{
        font-weight: 600;
      }
      .profile {
         padding: 40px;
      }

      .profile img {
          width: 100px;
      }

      .profile .data {
        margin: 15px;
      }


      .project {
          height: 100px;
          max-height: 100px;
      }


      .project p {
        padding-right: 35px;
      }


</style>
