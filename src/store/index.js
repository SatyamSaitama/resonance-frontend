import { createStore} from 'vuex'
export default createStore({
  state: {
    user: null,

  },
  getters: {
    isLoggedIn: state => state.user !== null,

    user: state => state.user,
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
   

  },
  actions: {
    user(context, user) {
      context.commit('user', user)
    }
  },
 
})