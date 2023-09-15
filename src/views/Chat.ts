/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue, Watch } from "vue-property-decorator";
import Message from "@/components/Message.vue";
import ButtonMessage from "@/components/ButtonMessage.vue";
import AgeMessage from "@/components/AgeMessage.vue";
import ImageMessage from "@/components/ImageMessage.vue";
import DropdownMessage from "@/components/DropdownMessage.vue";
import UploadMessage from "@/components/UploadMessage.vue";
import ThankYouMessage from "@/components/ThankYouMessage.vue";
import { INTENTS, STATES } from "@/lib/consts";
import { saveCity, saveMobile, saveName, saveUniquecode } from "@/api";
import eventBus from "@/lib/event_bus";

@Component({
  components: {
    Message,
    ButtonMessage,
    AgeMessage,
    ImageMessage,
    DropdownMessage,
    UploadMessage,
    ThankYouMessage,
  },
})
export default class Chat extends Vue {
  private outgoingText = "";
  private lastIntent = INTENTS.WELCOME;
  private conversation: any[] = [];

  private mobile = this.$store.getters.mobile;
  private name = this.$store.getters.name;
  private city = this.$store.getters.city;
  private uniqueCode = this.$store.getters.uniqueCode;

  private get enableInput() {
    if (this.conversation.length > 0) {
      return (
        this.conversation[this.conversation.length - 1].waitForInput || false
      );
    }
    return false;
  }

  private created() {
    this.lastIntent = this.$store.getters.lastIntent;
    if (this.lastIntent !== INTENTS.WELCOME) {
      this.conversation = this.$store.getters.conversation;
    }
    eventBus.$on("scroll-chat-to-bottom", this.scrollToBottom);
  }

  private clearData() {
    this.$store.dispatch("CLEAR_ALL_DETAILS");
    location.reload();
  }

  private mounted() {
    this.sendNextMessage();
    this.scrollToBottom();
  }

  private sendTextMessage(
    text: string,
    waitForInput = false,
    isError = false,
    flow = "incoming",
    typingDuration = 1000
  ) {
    this.conversation.push({
      type: "text",
      flow,
      text,
      waitForInput,
      isError,
      typingDuration,
    });
    this.scrollToBottom();
  }

  private sendDropdownMessage(
    text: string,
    options: string[] | number[],
    selected = "",
    placeHolder = "",
    waitForInput = false,
    isError = false,
    typingDuration = 1000
  ) {
    this.conversation.push({
      type: "dropdown",
      flow: "incoming",
      text,
      selected,
      waitForInput,
      isError,
      options,
      placeHolder,
      typingDuration,
    });
    this.scrollToBottom();
  }

  private sendAgeMessage(
    text: string,
    selected: any,
    waitForInput = false,
    isError = false,
    typingDuration = 1000
  ) {
    this.conversation.push({
      type: "age",
      flow: "incoming",
      text,
      selected,
      waitForInput,
      isError,
      typingDuration,
    });
    this.scrollToBottom();
  }

  private sendUploadMessage(
    text: string,
    selected: any,
    waitForInput = false,
    isError = false,
    typingDuration = 1000
  ) {
    this.conversation.push({
      type: "upload",
      flow: "incoming",
      text,
      selected,
      waitForInput,
      isError,
      typingDuration,
    });
    this.scrollToBottom();
  }

  private sendButtonMessage(
    text: string,
    options: string[],
    selected: any,
    waitForInput = false,
    isError = false,
    typingDuration = 1000
  ) {
    this.conversation.push({
      type: "button",
      flow: "incoming",
      text,
      selected,
      waitForInput,
      isError,
      options,
      typingDuration,
    });
    this.scrollToBottom();
  }

  private sendImageMessage(
    text: string,
    image: string,
    waitForInput = false,
    isError = false,
    flow = "incoming",
    typingDuration = 1000
  ) {
    this.conversation.push({
      type: "image",
      image,
      flow,
      text,
      waitForInput,
      isError,
      typingDuration,
    });
    setTimeout(() => {
      this.scrollToBottom();
    }, 200);
  }

  private sendThankYouMessage() {
    this.conversation.push({
      type: "thankYou",
    });
    this.scrollToBottom();
  }

  private async sendOutgoingMessage() {
    if (this.outgoingText) {
      this.sendTextMessage(this.outgoingText, false, false, "outgoing");
      const temp = this.outgoingText;
      this.outgoingText = "";
      switch (this.lastIntent) {
        case INTENTS.GET_NAME:
          if (/^[a-zA-Z]{2}[a-zA-Z\s]*$/.test(temp)) {
            saveName(temp)
              .then(() => {
                this.name = temp;
                this.$store.dispatch("SAVE_DETAIL", {
                  key: "name",
                  value: this.name,
                });
                this.sendNextMessage();
              })
              .catch(() => this.conversation.pop());
          } else {
            await this.sleep(1000);
            this.sendTextMessage(`Please enter a valid name`, true, true);
          }
          break;
        case INTENTS.GET_MOBILE:
          if (/^[56789][0-9]{9}$/.test(temp)) {
            saveMobile(temp)
              .then(() => {
                this.mobile = temp;
                this.$store.dispatch("SAVE_DETAIL", {
                  key: "mobile",
                  value: this.mobile,
                });
                this.sendNextMessage();
              })
              .catch(() => this.conversation.pop());
          } else {
            await this.sleep(1000);
            this.sendTextMessage(
              `Please enter a valid 10 digit mobile number`,
              true,
              true
            );
          }
          break;
        case INTENTS.GET_CITY:
          if (temp) {
            saveCity(temp)
              .then(() => {
                this.city = temp;
                this.$store.dispatch("SAVE_DETAIL", {
                  key: "city",
                  value: this.city,
                });
                this.sendNextMessage();
              })
              .catch(() => this.conversation.pop());
          } else {
            await this.sleep(1000);
            this.sendTextMessage(`Please enter valid city`, true, true);
          }
          break;
        case INTENTS.GET_CODE:
          if (/^[a-zA-Z0-9]{12}$/.test(temp)) {
            saveUniquecode(temp)
              .then(() => {
                this.uniqueCode = temp;
                this.$store.dispatch("SAVE_DETAIL", {
                  key: "uniqueCode",
                  value: this.uniqueCode,
                });
                this.sendNextMessage();
              })
              .catch(async () => {
                await this.sleep(1000);
                this.sendTextMessage(
                  "Sorry you have entered an invalid code, please enter the unique code printed inside the pack as shown.",
                  true,
                  true
                );
                this.sendTextMessage(
                  "ക്ഷമിക്കണം, നിങ്ങൾ ഒരു അസാധുവായ കോഡ് നൽകി, പായ്ക്കിനുള്ളിൽ അച്ചടിച്ച യുണീക് കോഡ് കാണിച്ചിരിക്കുന്നതുപോലെ നൽകുക.",
                  true,
                  true
                );
              });
          } else {
            await this.sleep(1000);
            this.sendTextMessage(
              "Sorry you have entered an invalid code, please enter the unique code printed inside the pack as shown.",
              true,
              true
            );
            this.sendTextMessage(
              "ക്ഷമിക്കണം, നിങ്ങൾ ഒരു അസാധുവായ കോഡ് നൽകി, പായ്ക്കിനുള്ളിൽ അച്ചടിച്ച യുണീക് കോഡ് കാണിച്ചിരിക്കുന്നതുപോലെ നൽകുക.",
              true,
              true
            );
          }
          break;
      }
    } else {
      eventBus.$emit("submit-clicked");
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatBody = document.querySelector(".chat-layout .chat-body");
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 100);
  }

  private async optionSelected(value: any) {
    // switch (this.lastIntent) {
    //   case INTENTS.GET_CITY:
    //     saveCity(value.toLowerCase()).then(() => {
    //       this.city = value;
    //       this.$store.dispatch("SAVE_DETAIL", {
    //         key: "city",
    //         value: this.city,
    //       });
    //       this.conversation[this.conversation.length - 1].selected = value;
    //       this.sendNextMessage();
    //     });
    //     break;
    // }
  }

  private async sendNextMessage() {
    const sleepTime = 1000;
    switch (this.lastIntent) {
      case INTENTS.WELCOME:
        this.sendTextMessage(
          "Welcome to Onam Veedu Vandi Swarnam Offer. To proceed further please share the required details"
        );
        this.sendTextMessage(
          "ഓണം വീട് വണ്ടി സ്വർണം ഓഫറിലേക്ക് സ്വാഗതം. തുടരുന്നതിന്, ആവശ്യമായ വിശദാംശങ്ങൾ പങ്കിടുക"
        );
        await this.sleep(sleepTime);
        this.sendTextMessage(`Enter your mobile number.`);
        this.sendTextMessage(`താങ്കളുടെ മൊബൈൽ നമ്പർ നൽകുക`, true);
        this.lastIntent = INTENTS.GET_MOBILE;
        break;
      case INTENTS.GET_MOBILE:
        if (this.mobile) {
          await this.sleep(sleepTime);
          this.sendTextMessage(`Enter your Name!`, true);
          this.sendTextMessage(`നിങ്ങളുടെ പേര് നൽകുക.`, true);
          this.lastIntent = INTENTS.GET_NAME;
        }
        break;
      case INTENTS.GET_NAME:
        if (this.name) {
          await this.sleep(sleepTime);
          this.sendTextMessage("Enter your city.");
          this.sendTextMessage("നിങ്ങളുടെ നഗരത്തിന്‍റെ പേര് നൽകുക.", true);
          this.lastIntent = INTENTS.GET_CITY;
        }
        break;
      case INTENTS.GET_CITY:
        if (this.city) {
          await this.sleep(sleepTime);
          this.sendTextMessage(
            `Please enter the unique code printed inside the pack to participate.`
          );
          this.sendTextMessage(
            `പങ്കെടുക്കാൻ പാക്കിനുള്ളിൽ പ്രിന്റ് ചെയ്തിരിക്കുന്ന യുണീക് കോഡ് നൽകുക.`,
            true
          );
          this.lastIntent = INTENTS.GET_CODE;
        }
        break;
      case INTENTS.GET_CODE:
        if (this.uniqueCode) {
          await this.sleep(sleepTime / 2);
          this.sendTextMessage(
            `Thank You for participation in this contest.
            We will contact you if you’re a winner.
            For detailed Terms & Conditions,please visit
            <a href="https://www.kanandevan.bigcityexperience.com" target="_blank">www.kanandevan.bigcityexperience.com</a>`
          );
          this.sendTextMessage(
            `ഈ മത്സരത്തിൽ പങ്കെടുത്തതിന് നന്ദി.
            നിങ്ങൾ   വിജയി ആകുകയാണെങ്കിൽ ഞങ്ങൾ നിങ്ങളെ ബന്ധപ്പെടും.
            വിശദമായ നിബന്ധനകൾക്കും വ്യവസ്ഥകൾക്കും, ദയവായി
            <a href="https://www.kanandevan.bigcityexperience.com" target="_blank">www.kanandevan.bigcityexperience.com</a> സന്ദർശിക്കുക`
          );
          this.lastIntent = INTENTS.COMPLETED;
        }
        break;
    }
  }

  @Watch("lastIntent")
  private onIntentChange() {
    this.$store.dispatch("SAVE_LAST_INTENT", this.lastIntent);
  }

  @Watch("conversation")
  private onConvoUpdate() {
    this.$store.dispatch("SAVE_CONVERSATION", this.conversation);
  }

  private sleep(ms: number) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("");
        this.scrollToBottom();
      }, ms)
    );
  }

  private openTandc() {
    this.$router.push({ name: "tandc" });
  }
}
