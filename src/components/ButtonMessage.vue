<template>
  <message
    class="button-message"
    :text="text"
    :flow="flow"
    :isError="isError"
    :typingDuration="typingDuration"
  >
    <div class="options">
      <div
        class="item"
        v-for="option in options"
        :key="option"
        @click="selectValue(option)"
        :class="{ active: selected === option, disabled: selected !== '' }"
      >
        {{ option }}
      </div>
    </div>
  </message>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Message from "@/components/Message.vue";
@Component({
  components: { Message },
})
export default class ButtonMessage extends Vue {
  @Prop({ default: "" }) private text!: string;
  @Prop({ default: "incoming" }) private flow!: string;
  @Prop({ default: false }) private isError!: boolean;
  @Prop({ default: 1000 }) private typingDuration!: number;
  @Prop({ default: [] }) private options!: string[];
  @Prop({ default: "" }) private selected!: string;

  private selectValue(val: string) {
    if (this.selected === "") {
      this.$emit("selected", val);
    }
  }
}
</script>

<style lang="scss">
.button-message {
  .options {
    width: 60%;
    align-self: flex-end;
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0 0;
    justify-content: space-between;
    min-width: 220px;
    .item {
      border: 2px solid white;
      color: white;
      width: calc(50% - 2px);
      text-align: center;
      padding: 6px 0;
      border-radius: 8px;
      box-sizing: border-box;
      margin-bottom: 4px;
      cursor: pointer;
      &.disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }
      &:not(.disabled) {
        &:hover {
          background-color: #c61d22;
        }
      }
      &.active {
        background-color: #c61d22;
      }
    }
  }
}
</style>
