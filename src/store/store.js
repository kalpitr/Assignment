import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    studentData: [],
  },
  mutations: {
    payStudentFee(state, studentData) {
      state.studentData = studentData
    }
  },
  getters: {
    getStudentData: state => state.studentData
  }
})