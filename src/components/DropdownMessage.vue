<template>
  <message
    class="dropdown-message"
    :text="text"
    :flow="flow"
    :isError="isError"
    :typingDuration="typingDuration"
  >
    <div class="options-wrapper">
      <select
        class="options"
        :class="{ active: defaultValue !== '' }"
        :disabled="selected !== ''"
        v-model="defaultValue"
      >
        <option value="" v-if="placeHolder !== ''">{{ placeHolder }}</option>
        <option class="item" v-for="option in options" :key="option">
          {{ option }}
        </option>
      </select>
      <button
        class="submit"
        v-if="selected === ''"
        :disabled="!(this.defaultValue !== '')"
        @click="selectValue"
      >
        Go
      </button>
    </div>
  </message>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Message from "@/components/Message.vue";
import eventBus from "@/lib/event_bus";
@Component({
  components: { Message },
})
export default class DropdownMessage extends Vue {
  @Prop({ default: "" }) private text!: string;
  @Prop({ default: "incoming" }) private flow!: string;
  @Prop({ default: false }) private isError!: boolean;
  @Prop({ default: 1000 }) private typingDuration!: number;
  @Prop({ default: [] }) private options!: string[];
  @Prop({ default: "" }) private selected!: string;
  @Prop({ default: "Select" }) private placeHolder!: string;

  private defaultValue = "";

  private created() {
    this.defaultValue = this.selected;
    if (this.selected === "") {
      eventBus.$on("submit-clicked", this.selectValue);
    }
  }

  private selectValue() {
    if (this.selected === "" && this.defaultValue !== "") {
      this.$emit("selected", this.defaultValue);
    }
  }
}
</script>

<style lang="scss">
.dropdown-message {
  .options-wrapper {
    align-self: flex-end;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    height: 40px;
    .options {
      width: 60%;
      min-width: 220px;
      padding: 8px;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;
      font-family: "bliss";
      background-color: white;
      &:disabled {
        cursor: not-allowed;
      }
      &.active {
        background-color: #c61d22;
        color: white;
      }
    }
    .submit {
      background-color: green;
      border: 1px solid white;
      padding: 0 10px;
      color: white;
      align-self: stretch;
      border-radius: 10px;
      font-size: 16px;
      cursor: pointer;
      margin-left: 10px;
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
}
</style>
