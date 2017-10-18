<template>
  <div id="app">

    <v-nav id="top">
        <a href="#!" class="brand-logo" slot="logo">Follow Me</a>
    </v-nav>

      <router-view/>
    </v-container>

    <v-footer id="footer">
          <div class="container" slot="content">
              <div class="row">
                  <div class="col l6 s12">
                      <h5 class="white-text">Follow Me</h5>
                      <p class="grey-text text-lighten-4">Smart Object : Follow Me - Share my position</p>
                  </div>
                  <div class="col l4 offset-l2 s12">
                      <h5 class="white-text">Links</h5>
                      <ul>
                          <li><a href="https://github.com/Ealenn/Follow-Me-Share-My-Position" class="grey-text text-lighten-3">Github</a></li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="container" slot="copyright">&copy; Copyright 2016</div>
      </v-footer>

    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped="">
  #top{
    margin-bottom: 15px;
  }
  .brand-logo{
    margin-left: 10px;
  }
  #footer{
    margin-top: 15px;
  }
</style>
