import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    classrooms: [],
    classroom: [],
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getClassrooms: state => {
      return state.classrooms;
    },
    getClassroom: state => {
      return state.classroom;
    },
  },
  mutations: {
    setUser: state => {
      state.user = firebase.auth().currentUser;
    },
    setClassrooms: (state, data) => {
      state.classrooms = data;
    },
    setClassroom: (state, data) => {
      state.classroom = state.classrooms.find(classroom => classroom.id === data);
    },
  },
  actions: {
    //set the user, get the classrooms
    setUser: context => {
      context.commit('setUser');
    },
    getClassroom(context, payload) {
      context.commit('setClassroom', payload.id);
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
          context.commit('setClassrooms', classrooms);
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
    createStudent(context, payload) {
      return firebase
        .database()
        .ref('Classrooms/' + context.state.user.uid + '/' + context.state.classroom.id)
        .push(payload)
        .then(data => {
          context.dispatch('getClassroom');
        });
    },
  },
});
