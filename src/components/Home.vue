<template>
  <div>
    <div class="content">
      <!--<img src="static/assets/images/logo.png" width="300"/>-->
      <login></login>
      <img  class="print" src="static/assets/images/print.jpg" width="100%" />
    </div>


    <div id="particles-js"></div>
      <div class="clearfix"></div>
  </div>
</template>
<style scoped>
      .content{
         position:absolute;
         text-align:center;
         z-index: 100;
         left: 50%;
         margin-left: -490px;
         top: 30%;
         margin-top: -150px;
         width:980px;
        }

        .print{
          position: absolute;
          top:100;
          margin-top: 70px;
          margin-left: -490px;
        }

      #particles-js{
        position:absolute;
        width: 100%;
        height: 100%;
        background-color: white;
        background-repeat: no-repeat;
        background-size: 20%;
        background-position: 50% 50%;
        }






</style>
<script>
   import Login from './Login.vue'
    export default{
        name: 'Home',
        components: { Login },
        data(){
            return{
                msg:'hello vue'
            }
        },
        mounted(){



        }

    }






</script>
