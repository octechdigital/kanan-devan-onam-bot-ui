<template>
  <div class="message-wrapper" :class="flow">
    <div class="message" :class="flow">
      <img
        src="@/assets/img/logo.png"
        class="icon"
        v-if="flow === 'incoming'"
      />
      <template v-if="isTyping">
        <div class="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </template>
      <p class="text" :class="{ error: isError }" v-else v-html="text"></p>
    </div>
    <slot v-if="!isTyping" />
  </div>
</template>

<script lang="ts">
import eventBus from "@/lib/event_bus";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Message extends Vue {
  @Prop({ default: "" }) private text!: string;
  @Prop({ default: "incoming" }) private flow!: string;
  @Prop({ default: false }) private isError!: boolean;
  @Prop({ default: 1000 }) private typingDuration!: number;
  private isTyping = this.flow === "outgoing" ? false : true;

  private mounted() {
    setTimeout(() => {
      this.isTyping = false;
      eventBus.$emit("scroll-chat-to-bottom");
    }, this.typingDuration);
    const links = this.$el.querySelectorAll("a");
    for (const link of links) {
      link.onclick = () => {
        const id = link.getAttribute("data-id");
        this.linkClicked(id || "");
      };
    }
  }

  private linkClicked(id: string) {
    // alert(id + "clicked");
    // TODO: track based on id
  }
}
</script>

<style lang="scss">
.message-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
  transition: all 0.3s ease;
  transform: translateY(0px);
  opacity: 1;
  padding: 0 10px;
  padding-left: 0px;
  &.outgoing {
    padding-left: 10px;
    padding-right: 0px;
  }
  .message {
    width: 80%;
    padding: 15px 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    min-width: 300px;
    .design-link {
      position: absolute;
      left: 15px;
      top: calc(100% - 2px);
      width: 24px;
    }
    &.incoming {
      background-color: #004e26;
      padding-left: 50px;
      border-radius: 25px 25px 25px 0px;
      color: white;
    }
    &.outgoing {
      padding-right: 30px;
      background-color: #fdde3c;
      border-radius: 25px 0px 25px 25px;
      color: #004e26;
      align-self: flex-end;
      justify-content: flex-end;
      .text {
        text-align: right;
      }
      .design-link {
        left: auto;
        right: 15px;
      }
      .icon {
        left: unset;
        right: -30px;
      }
    }
    .text {
      margin: 0;
      font-size: 16px;
      &.error {
        color: red;
      }
    }
    .icon {
      width: 30px;
      margin-right: 6px;
      align-self: flex-start;
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
    a {
      color: yellow;
      word-break: break-all;
    }
  }
  $animationTime: 0.8s;
  $dotSize: 8px;
  .typing {
    text-align: center;
  }
  .typing span {
    display: inline-block;
    vertical-align: middle;
    width: $dotSize;
    height: $dotSize;
    margin-left: 2px;
    background: white;
    border-radius: $dotSize;
    animation: typing $animationTime infinite alternate;
  }
  .typing span:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  .typing span:nth-of-type(3) {
    animation-delay: 0.6s;
  }
  @keyframes typing {
    0% {
      opacity: 0.9;
      transform: scale(0.5);
    }
    100% {
      opacity: 0.1;
      transform: scale(1);
    }
  }
}
</style>
