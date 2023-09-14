<template>
  <div class="thank-you-wrapper">
    <p class="message">----Thank You----</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Message from "@/components/Message.vue";
@Component({
  components: { Message },
})
export default class ThankYouMessage extends Vue {}
</script>

<style lang="scss">
.thank-you-wrapper {
  .message {
    // background: linear-gradient(45deg, #edcb71, #f6e787, #edcb71);
    width: max-content;
    padding: 10px 20px;
    border-radius: 25px;
    margin: 20px auto;
    color: #203d75;
    font-size: 20px;
  }
}
</style>
