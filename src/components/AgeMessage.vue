<template>
  <message
    class="age-message"
    :text="text"
    :flow="flow"
    :isError="isError"
    :typingDuration="typingDuration"
  >
    <div class="age-selection">
      <div class="input">
        <select class="day" v-model="age" :disabled="selected !== ''">
          <option value="" selected>Select age</option>
          <option v-for="i in 100 - 17" :key="i">
            {{ i + 17 }}
          </option>
        </select>
        <!-- <select class="month" v-model="month" :disabled="selected !== ''">
          <option value="" selected>Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select class="year" v-model="year" :disabled="selected !== ''">
          <option value="" selected>Year</option>
          <option v-for="i in 100" :key="i">
            {{ new Date().getFullYear() + (101 - i) - 100 }}
          </option>
        </select> -->
      </div>
      <button
        class="submit"
        :disabled="!(this.age !== '') || selected !== ''"
        v-if="selected === ''"
        @click="selectValue"
      >
        Go
      </button>
    </div>
  </message>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Message from "@/components/Message.vue";
@Component({
  components: { Message },
})
export default class AgeMessage extends Vue {
  @Prop({ default: "" }) private text!: string;
  @Prop({ default: "incoming" }) private flow!: string;
  @Prop({ default: false }) private isError!: boolean;
  @Prop({ default: 1000 }) private typingDuration!: number;
  @Prop({ default: {} }) private selected!: any;
  private age = "";

  private created() {
    if (this.selected !== "") {
      this.onChange();
    }
  }

  @Watch("selected")
  private onChange() {
    this.age = this.selected;
  }

  private selectValue() {
    if (this.selected === "") {
      if (this.age !== "") {
        this.$emit("selected", this.age);
      }
    }
  }
}
</script>

<style lang="scss">
.age-message {
  .age-selection {
    margin: 10px 0;
    align-self: flex-end;
    display: flex;
    align-items: center;
    // min-width: 60%;
    .input {
      flex: 1;
      margin-right: 10px;
      display: flex;
      border: 2px solid #c41e1e;
      border-radius: 6px;
      background-color: white;
      .day {
        // border-right: 0;
        border-radius: 8px;
      }
      .month {
        flex: 1;
      }
      .year {
        border-left: 0;
        border-radius: 0 8px 8px 0;
      }
      select {
        background-color: transparent;
        border: 1px solid white;
        padding: 8px 5px;
        &:focus {
          outline: none;
        }
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
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
}
</style>
