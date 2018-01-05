import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    classrooms: [],
    classroom: [],
    student: [],
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
    getStudent: state => {
      return state.student;
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
    setStudent: (state, data) => {
      state.student = data;
    },
  },
  actions: {
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
    findUser(context, payload) {
      return firebase
        .database()
        .ref('Users')
        .orderByChild('Email')
        .equalTo(payload.Email)
        .on('child_added', function(data) {
          const student = [];
          const obj = data.val();
          (student.id = obj.id), (student.DisplayName = obj.DisplayName), (student.Email = obj.Email);
          context.commit('setStudent', student);
        });
    },
    updateUser(payload) {
      return firebase
        .database()
        .ref('Users/' + payload.id)
        .set(payload);
    },
    addStudentToClass(payload) {
      return firebase
        .database()
        .ref('Users/' + payload.state.student.id)
        .update({
          Class: payload.state.classroom.id,
        });
    },
  },
});
