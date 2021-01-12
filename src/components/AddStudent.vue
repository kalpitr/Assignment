<template>
  <div>

    <b-modal
      id="myModal"
      ok-variant="outline-danger"
      cancel-variant="outline-primary"
      ref="modal"
      @ok="addStudentData"
    >
    <form>

      <div class="col-lg-12 col-12 mb-3">
        
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">First Name</label>
                  <input
                    v-model="student.firstName"
                    type="text"
                    placeholder="First Name"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Last Name</label>
                  <input
                    v-model="student.lastName"
                    type="text"
                    placeholder="Last Name"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Phone No</label>
                  <input
                    v-model="student.phoneNo"
                    type="text"
                    placeholder="Phone No"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <ValidationProvider name="email" rules="required|email">
                    <div slot-scope="{ errors }">
                      <label for="name">Email</label>
                      <input
                        type="email"
                        v-model="student.email"
                        placeholder="Email"
                        class="form-control"
                      />
                      <p v-if="submitted" class="text-danger">
                        {{ errors[0] }}
                      </p>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="form-group">
                  <label for="name">Address</label>
                  <input
                    v-model="student.address"
                    type="text"
                    placeholder="Address"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div>
          
        </div>
          </div>
        </div>
      </div>
    </form>

    </b-modal>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Full Name</th>
          <th scope="col">Phone No</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(Data, index) in studentData" :key="index">
          <td>
            {{ Data.firstName + " " + Data.lastName }}
          </td>
          <td>
            {{ Data.phoneNo }}
          </td>
          <td>
            {{ Data.email }}
          </td>
          <button
            v-b-modal.myModal
            class="btn btn-primary"
            @click="
              editStudentData(
                index,
                studentData.firstName,
                studentData.lastName,
                studentData.phoneNo,
                studentData.email
              )
            "
          >
            Edit
          </button>
          <button type="submit" class="btn btn-danger">
            Delete
          </button>
        </tr>
      </tbody>
    </table>

    <Address />
    <button  v-b-modal.myModal>test</button>
  </div>
</template>

<script>
import Address from "./Address.vue";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

// Add the required rule
extend("required", {
  ...required,
  message: "This field is required",
});

// Add the email rule
extend("email", {
  ...email,
  message: "This field must be a valid email",
});
export default {
  components: {
    Address,
  },
  data() {
    return {
      studentData: [
        // {
        //   address: "test",
        //   email: "test@test.com",
        //   firstName: "11",
        //   lastName: "teasa",
        //   phoneNo: "test",
        // },
      ],
      student: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        address: "",
      },
      submitted: false,
    };
  },
  computed:{
  },
  watch: {
  },  
  mounted(){
  },
  methods: {
    addStudentData() {
      console.log(this.student)
      this.studentData.push(this.student);
      console.log(this.studentData)
      console.log(this.studentData.length)
      this.student.firstName = "";
      this.student.lastName = "";
      this.student.phoneNo = "";
      this.student.email= "";
      console.log(this.studentData);
      this.submitted = true;
      // this.$refs.modal.hide();
    },
    editStudentData(index) {
      console.log(index);
      // console.log(this.student)
      // this.student.firstName = firstName,
      //   this.student.lastName = lastName,
      //   this.student.phoneNo = phoneNo,
      //   this.student.email = email
      // console.log(firstName, lastName, phoneNo, email);
    },
  },
};
</script>

<style></style>
