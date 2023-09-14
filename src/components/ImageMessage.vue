<template>
  <!-- <message
    class="image-message"
    :text="text"
    :flow="flow"
    :isError="isError"
    :typingDuration="typingDuration"
  > -->
  <div class="image-wrapper">
    <img :src="require(`@/assets/img/${image}`)" class="image" />
  </div>
  <!-- </message> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Message from "@/components/Message.vue";
@Component({
  components: { Message },
})
export default class ImageMessage extends Vue {
  @Prop({ default: "" }) private text!: string;
  @Prop({ default: "incoming" }) private flow!: string;
  @Prop({ default: false }) private isError!: boolean;
  @Prop({ default: 1000 }) private typingDuration!: number;
  @Prop({ default: "" }) private image!: string;
}
</script>

<style lang="scss">
.image-wrapper {
  margin: 10px 0 0 2px;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  animation: imageIn 0.6s;
  transform: scale(1);
  .image {
    width: 100%;
    max-width: 300px;
  }
  @keyframes imageIn {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
