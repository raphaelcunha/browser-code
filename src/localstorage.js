export default {
  token: JSON.parse(window.localStorage.getItem('firebase:authUser:AIzaSyCr5j-n_kT0DpW7I36hzcU0L3IVLsZ3BxE:[DEFAULT]')),
  tokenGithub: window.localStorage.getItem('token-github'),
  userGithub: JSON.parse(window.localStorage.getItem('user-github')),

  setToken(token){
    window.localStorage.setItem('token-github', token)
  },

  setUser(user){
    window.localStorage.setItem('user-github', JSON.stringify(user))
  },

  getToken(){
    if (this.tokenGithub) {
      return this.tokenGithub;
    }
  },
  getUser(){
    if (this.userGithub) {
      return this.userGithub
    }
  },
  logout(){
    window.localStorage.clear();
  }
}
