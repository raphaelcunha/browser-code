export default  {
  languageSelected(store, payload){
    console.log(payload, store);
      store.commit('LANGUAGE_SELECTED', payload);
  }
}
