<template>
  <div class="d-flex justify-content-center">
    <div class="card " style="width: 18rem;">
      <div class="card-header">
        Student Details
      </div>
      <div class="card-body">
        <!-- {{getgetStudentData}} -->
        <p class="card-text">
          <b>Name</b> :
          {{ getStudentData.firstName + " " + getStudentData.lastName }}
        </p>
        <p><b>Phone No</b> : {{ getStudentData.phoneNo }}</p>
        <p><b>Email</b> : {{ getStudentData.email }}</p>
        <p><b>Address</b> : {{ getStudentData.address }}</p>
        <a href="#/students" class="btn btn-primary">Go Back</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["getStudentData"]),

  data() {
    return {
      // studentInfo: "",
    };
  },
  mounted() {
    // this.studentInfo = this.$store.state.studentData;
  },
};
</script>

<style></style>
