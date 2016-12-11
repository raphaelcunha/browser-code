<script>
   import showdown from 'showdown';
    export default{
        data(){
            return{
                owner: '',
                repo: '',
                repository: {},
                packages: {},
                readme: {},
            }
        },
        mounted(){
            let vm = this;
            console.log(this.$route);
            vm.owner = this.$route.params.owner;
            vm.repo = this.$route.query.repo;
            vm.$http.get(`repos/${this.owner}/${this.repo}`).then((response) => {
                vm.repository = response.data;
            });

            vm.$http.get(`repos/${this.owner}/${this.repo}/readme`).then((response) => {
                    let readme = atob(response.data.content);
                    let converter = new showdown.Converter();
                    vm.readme = converter.makeHtml(readme);
            });

            vm.$http.get(`repos/${this.owner}/${this.repo}/contents/package.json`).then((response) => {
              vm.packages = JSON.parse(atob(response.data.content));
            });

        }
    }





</script>

<template>
  <div class="repository repo-description container col-md-12 mt15" v-if="repository.owner">


    <!--HEADER-->
    <div class="repo-about col-md-12 col-xl-12">
      <img class="img-circle" :src="repository.owner.avatar_url"/>
      <h1>{{repository.full_name}}</h1>
      <p> {{repository.description}}</p>
      <!--<ul>-->
      <!--<li> {{repository.forks_count}}</li>-->
      <!--<li> {{repository.stargazers_count}}</li>-->
      <!--<li> {{repository.watchers_count}}</li>-->
      <!--<li> {{repository.git_url}}</li>-->
      <!--<li> {{repository.created_at}}</li>-->
      <!--<li> {{repository.clone_url}}</li>-->
      <!--</ul>-->
    </div>
    <div class="clearfix"></div>

    <!--CONTENT-->
    <div class="repo-box">

      <!--CONTENT -->
      <div class="repo-readme col-md-8 col-xl-7 markdown-body" v-html="readme"></div>

      <!--SIDEBAR RIGHT-->
      <div class="repo-fixed col-md-4 col-xl-3">
        <div class="repo-info text-md-left">
          <button class="btn btn-primary btn-sm btn-repository">
            <i class="octicon octicon-arrow-left"></i> Go Back
          </button>
          <a class="btn btn-primary btn-sm btn-repository"
             :href="`https://github.com/${repository.full_name}/archive/master.zip`">
            <i class="octicon octicon-desktop-download"></i> Download Zip
          </a>
        </div>
        <div class="repo-activity">
          <ul>
            <h4>Activity</h4>
            <li> Last update: {{repository.updated_at}}</li>
          </ul>
        </div>
        <div class="repo-dependencies" v-if="packages">
          <h4>Dependencies</h4>
          <ul>
            <li v-for="(val, key ) in packages.dependencies">
              <span class="octicon octicon-package"></span>{{key}} - {{val}}
            </li>
          </ul>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<style scoped>
   repo-description{
    margin-left: 60px;
    }

  .btn-repository {
      padding: 6px;
  }

.repo-description .repo-about {
    min-height: 150px;
    padding: 30px;
    color: #454355;
    position: relative;
    text-overflow: ellipsis;
}

      .header{
          font-size:18px;
          float:left;
        }

        .header i {
          font-size:24px;
          border: 1px solid #ccc;
          padding: 10px;
           float:left;
          margin-top: 15px;
          margin-bottom: 15px;
        }

        .header h1 {
         margin-top: 25px;
         margin-left: 10px;
        font-size:24px;
        float:left;
       }

.header input {
    height: 70px;
    width: 150px;
    padding-top: 5px;
    border: none;
    font-size: 28px;
    margin-left: 10px;
}

      .header .list-languages{
          float:left;
      }

      .header .search{
          float:left;
      }

     .filters{
       margin-left: 15px;
       margin-right: 25px;
      float:right;
      margin-top:30px;
      margin-bottom:20px;
    }
    .views{
      float:right;
      margin-bottom:15px;
      margin-top:30px;
    }

.repo-description .repo-about h1 {
    font-size: 34px;
}

.repo-description .repo-about p {
    font-weight: 300;
}

.repo-description .repo-about img {
    width:100px;
    margin-right: 20px;
    float:left;
}

.repo-description .repo-readme {
    padding: 0 40px;
}

.repo-description .repo-readme a {
    color:black;
    font-weight: 600;
}

.repo-description .repo-readme img {
  max-width: 100%
}


.repo-description .repo-info {
    font-size: 14px;
    padding: 10px;
    margin-top: 35px;
}

.repo-description .repo-info ul li{
    list-style: none;
}


.repo-description .repo-activity{
    margin-top: 15px;
    padding-bottom: 25px;
}


.repo-description .repo-activity ul li {
    padding-left: 25px;
    padding-right: 25px;
    list-style: none;
}

.repo-description .repo-dependencies{
    margin-top: 25px;
    font-size: 14px;
    padding-bottom: 25px;
}


.repo-description  h4{
    font-size: 20px;
    padding-top: 25px;
    font-weight: 600;
    margin-left: 25px;
}



.repo-description .repo-dependencies ul li{
    padding-left: 25px;
    padding-right: 25px;
    list-style: none;
}

.repo-description .repo-dependencies ul li span{
    color: #999;
    margin-right: 5px;
    margin-bottom: 5px;
}



 .repo-box {
     margin-top: 10px;
    background: white;
}




</style>
