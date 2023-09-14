<template>
  <div class="terms-and-condition">
    <p class="close-btn" @click="close">Close</p>
    <p dir="ltr" class="heading">Terms and Conditions</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Terms extends Vue {
  private close() {
    this.$router.back();
  }
}
</script>

<style lang="scss">
.terms-and-condition {
  .heading {
    font-size: 24px;
    color: darkred;
    text-align: center;
  }
  .close-btn {
    color: lightblue;
    text-decoration: underline;
    cursor: pointer;
    text-align: right;
    margin: 20px 20px 0px;
  }
}
</style>
