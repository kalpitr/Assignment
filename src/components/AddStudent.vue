<template>
  <div>
    <button @click="showModal = true">Add Student</button>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-modal
        v-model="showModal"
        id="myModal"
        title="Add Student Details"
        ok-variant="outline-danger"
        cancel-variant="outline-primary"
        @ok="
          editStudentInfo
            ? handleSubmit(updateStudentData(id))
            : handleSubmit(addStudentData($event))
        "
      >
        <form>
          <div class="col-lg-12 col-12 mb-3">
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <label for="name">First Name</label>
                        <input
                          v-model="firstName"
                          type="text"
                          placeholder="First Name"
                          class="form-control"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <label for="name">Last Name</label>
                        <input
                          v-model="lastName"
                          type="text"
                          placeholder="Last Name"
                          class="form-control"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <ValidationProvider
                        rules="required|regex:^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$"
                        v-slot="{ errors }"
                      >
                        <label for="name">Phone No</label>
                        <input
                          v-model="phoneNo"
                          type="text"
                          placeholder="Phone No"
                          class="form-control"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <ValidationProvider
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <label for="name">Email</label>
                        <input
                          type="email"
                          v-model="email"
                          placeholder="Email"
                          class="form-control"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <label for="name">Address</label>
                        <Address
                          :sendAddress="address"
                          @changed="getAddressData"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </form>
      </b-modal>
    </ValidationObserver>

    <div class="table-wrapper">
      <table class="table  table-bordered mt-2">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(studentData, index) in studentData" :key="index">
            <td>
              {{ studentData.firstName + " " + studentData.lastName }}
            </td>
            <td>
              {{ studentData.phoneNo }}
            </td>
            <td>
              {{ studentData.email }}
            </td>
            <td>
              <button
                v-b-modal.myModal
                class="btn btn-primary mr-1 mt-1"
                @click="
                  sendDataToModel(
                    index,
                    studentData.firstName,
                    studentData.lastName,
                    studentData.email,
                    studentData.phoneNo,
                    studentData.address
                  )
                "
              >
                Edit
              </button>
              <button
                type="submit"
                @click="deleteData(index)"
                class="btn btn-danger mr-1 mt-1"
              >
                Delete
              </button>
              <button
                type="submit"
                class="btn btn-success mt-1"
                @click="payFee(studentData)"
              >
                Pay Fee
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import Address from "./Address.vue";
import { extend } from "vee-validate";
import { required, email, regex } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});
extend("regex", {
  ...regex,
  message: "This field must be a valid contact no",
});

extend("email", {
  ...email,
  message: "This field must be a valid email",
});
export default {
  components: {
    Address,
    InfiniteLoading,
  },
  data() {
    return {
      studentData: [],
      dummyData: [
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
        {
          address: "Mumbai",
          email: "demo@demo.com",
          firstName: "John",
          lastName: "Doe",
          phoneNo: "6678673848",
        },
        {
          address: "Pune",
          email: "jane@doe.com",
          firstName: "Jane",
          lastName: "Doe",
          phoneNo: "67878787878",
        },
        {
          address: "Mumbai",
          email: "brad@brad.com",
          firstName: "Brad",
          lastName: "Doe",
          phoneNo: "9876789876",
        },
        {
          address: "Pune",
          email: "Jim@Doe.com",
          firstName: "Jim",
          lastName: "Doe",
          phoneNo: "8789876789",
        },
        {
          address: "Mumbai",
          email: "Erik@Doe.com",
          firstName: "Erik",
          lastName: "Doe",
          phoneNo: "7878767898",
        },
      ],
      editStudentInfo: false,
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      address: "",
      showModal: false,
    };
  },
 
  methods: {
    infiniteHandler($state) {
      if (this.studentData.length > 40) {
        $state.complete();
      } else {
        setTimeout(() => {
          var temp = [];
          for (
            var i = this.studentData.length;
            i <= this.studentData.length + 4;
            i++
          ) {
            temp.push(this.dummyData[i]);
          }
          this.studentData.push(...temp);

          $state.loaded();
        }, 1500);
      }
    },
    getAddressData: function(value) {
      this.address = value;
    },
    addStudentData() {
      // e.preventDefault();

      var student = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNo: this.phoneNo,
        address: this.address,
      };

      this.studentData.push(student);
      this.firstName = "";
      this.lastName = "";
      this.phoneNo = "";
      this.email = "";
      this.address = "";
    },
    updateStudentData(id) {
      this.studentData.map((data, index) => {
        if (index == id) {
          (data.firstName = this.firstName),
            (data.lastName = this.lastName),
            (data.phoneNo = this.phoneNo),
            (data.email = this.email);
          data.address = this.address;
        }
      });
      this.firstName = "";
      this.lastName = "";
      this.phoneNo = "";
      this.email = "";
      this.address = "";
    },
    deleteData(id) {
      this.$swal({
        title: "Do you want to delete this record ?",
        text: "You can't revert your data",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          this.studentData.splice(id, 1);

          this.$swal("Deleted", "You successfully deleted the data", "success");
        }
      });
    },
    payFee(studentData) {
      this.$swal({
        text: `Do you want to continue to pay the fee for ${studentData.firstName}`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.$store.commit("payStudentFee", studentData);
          this.$router.push("/pay-now");
        }
      });
    },
    sendDataToModel(index, firstName, lastName, email, phoneNo, address) {
      (this.id = index),
        (this.editStudentInfo = true),
        (this.firstName = firstName),
        (this.lastName = lastName),
        (this.email = email),
        (this.phoneNo = phoneNo);
      this.address = address;
      

    },
  },
};
</script>

<style>
.pac-container {
  z-index: 1051 !important;
}
</style>
