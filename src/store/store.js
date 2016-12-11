import Vue from 'vue';
import Vuex from 'vuex';
import languages from './modules/languages/main';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    languages
  }
});

export default store
