import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    classrooms: [],
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getClassrooms: state => {
      return state.classrooms;
    },
  },
  mutations: {
    setUser: state => {
      state.user = firebase.auth().currentUser;
    },
    fetchClassrooms: (state, data) => {
      state.classrooms = data;
    },
  },
  actions: {
    //set the user, get the classrooms
    setUser: context => {
      context.commit('setUser');
    },
    getClassrooms: context => {
      firebase
        .database()
        .ref('Classrooms/' + context.state.user.uid)
        .once('value')
        .then(data => {
          const classrooms = [];
          const obj = data.val();
          for (var key in obj) {
            classrooms.push({
              id: key,
              ClassName: obj[key].ClassName,
            });
          }
          //return classrooms;
          context.commit('fetchClassrooms', classrooms);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createClassroom(context, payload) {
      return firebase
        .database()
        .ref('Classrooms/' + context.state.user.uid)
        .push(payload)
        .then(data => {
          context.dispatch('getClassrooms');
        });
    },
  },
});
