<template>
  <div>
    <vue-google-autocomplete
      ref="address"
      id="map"
      classname="form-control"
      placeholder="Please type your address"
      v-on:placechanged="getAddressData"
      v-model="address"
      country="in"
    >
    </vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: { VueGoogleAutocomplete },
props: ['sendAddress'],
  data: function() {
    return {
      address: "",
    };
  },
  created(){
      this.address = this.sendAddress
  },

  methods: {
    getAddressData: function(addressData, placeResultData) {
      this.$emit("changed", placeResultData.formatted_address);
      this.address = addressData;
    },
  },
};
</script>
<style></style>
