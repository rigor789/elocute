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
    students: [],
    assignments: [],
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
    getStudents: state => {
      return state.students;
    },
    getAssignments: state => {
      return state.assignments;
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
    setStudents: (state, data) => {
      state.students = data;
    },
    setAssignments: (state, data) => {
      state.assignments = data;
    },
    clearStudent: state => {
      state.student = [];
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
        .ref('Classrooms')
        .orderByChild('TeacherId')
        .equalTo(context.state.user.uid)
        .once('value', function(data) {
          const classrooms = [];
          const obj = data.val();
          for (var key in obj) {
            classrooms.push({
              id: key,
              ClassName: obj[key].ClassName,
            });
          }
          context.commit('setClassrooms', classrooms);
        });
    },
    getStudents(context, payload) {
      firebase
        .database()
        .ref('Classrooms/' + payload.id + '/Students')
        .on('value', function(data) {
          const students = [];
          const obj = data.val();
          for (var key in obj) {
            students.push({
              id: key,
              StudentName: obj[key].DisplayName,
            });
          }
          context.commit('setStudents', students);
        });
    },
    getAssignments(context, payload) {
      firebase
        .database()
        .ref('Assignments')
        .orderByChild('ClassId')
        .equalTo(payload.id)
        .once('value', function(data) {
          const assignments = [];
          const obj = data.val();
          for (var key in obj) {
            assignments.push({
              id: key,
              Title: obj[key].Title,
              Text: obj[key].Text,
            });
          }
          context.commit('setAssignments', assignments);
        });
    },
    createClassroom(context, payload) {
      return firebase
        .database()
        .ref('Classrooms')
        .push(payload)
        .then(data => {
          context.dispatch('getClassrooms');
        });
    },
    createAssignment(context, payload) {
      return firebase
        .database()
        .ref('Assignments')
        .push(payload)
        .then(data => {
          context.dispatch('getAssignments');
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
    updateUser(context, payload) {
      return firebase
        .database()
        .ref('Users/' + payload.id)
        .update(payload)
        .then(data => {
          context.dispatch('getStudents');
        });
    },
    associateClassToStudent(context, payload) {
      return firebase
        .database()
        .ref('Users/' + payload.studentId + '/Classes/' + payload.classId)
        .update({
          ClassName: payload.className,
        });
    },
    associateStudentToClass(context, payload) {
      return firebase
        .database()
        .ref('Classrooms/' + payload.classId + '/Students/' + payload.studentId)
        .update({
          DisplayName: payload.studentName,
        })
        .then(context.commit('clearStudent'))
        .then(context.dispatch('getStudents'));
    },
    addAssignmentToClass(payload) {
      return firebase
        .database()
        .ref('Classrooms/' + payload.classId + '/Assignments')
        .update({
          AssignmentName: payload.assignmentName,
          AssignmentContent: payload.assignmentContent,
        });
    },
  },
});
