<script>
  export default{
    name: 'Menu',
    data(){
      return{
        msg:'hello vue',
        obj: {
          javascript : {
            name: 'javascript',
            projects: 'javascript',
            users: 'javascript',
            videos: 'javascript',
            img: 'javascript.png'
          },
          angular: {
            name: 'angular',
            projects: 'angular',
            users: 'angular',
            videos: 'angular.js',
            img: 'angular.png'
          },
          react: {
            name: 'react',
            projects: 'react',
            users: 'react',
            videos: 'react.js',
            img: 'react.png'
          },
          vue: {
            name: 'vue.js',
            projects: 'vue.js',
            users: 'vuejs',
            videos: 'vue.js',
            img: 'vue.png'
          },
          node: {
            name: 'node.js',
            projects: 'node.js',
            users: 'node.js',
            videos: 'node.js',
            img: 'node.png'
          }

        },
      }
    },
    mounted(){
        //console.log(JSON.stringify (this.obj));
    }

  }
</script>
<template>
  <div>
    <div class="menu">
      <ul>
        <li>
          <router-link :to="{ path: '/about' }" :class="{'active': this.$route.path == '/about'}">
            <i class="octicon octicon-home" style="padding-top: 3px;"></i>
            <span>About</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{ path: '/projects' }" :class="{'active': this.$route.path == '/projects'}">
            <i class="octicon octicon-repo" style="padding-top: 5px;"></i>
            <span>projects</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/developers' }" :class="{'active': this.$route.path == '/developers'}">
            <i class="octicon octicon-person" style="padding-top: 3px;"></i>
            <span>developers</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/videos' }" :class="{'active': this.$route.path == '/videos'}">
            <i class="octicon octicon-device-camera-video" style="padding-top: 4px; margin-right: 2px; "></i>
            <span>videos</span>
          </router-link>
        </li>
        <div class="clearfix"></div>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<style scoped>
  .menu {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 20px;
    margin: 0 auto;
  }

  .menu ul {
    width: 430px;
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
</style>
