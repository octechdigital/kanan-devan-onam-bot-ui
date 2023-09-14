<template>
  <message
    class="upload-message"
    :text="text"
    :flow="flow"
    :isError="isError"
    :typingDuration="typingDuration"
  >
    <div class="upload-wrapper">
      <input
        type="file"
        ref="fileInput"
        accept="image/png, image/jpeg"
        class="upload"
        @change="onfileSelection"
        v-if="previewUrl === ''"
      />
      <div class="preview-wrapper" v-else>
        <div class="image">
          <img :src="previewUrl" class="preview" />
          <!-- <img
            src="@/assets/img/close.png"
            class="close-btn"
            title="Clear selection"
            @click="clearSelection"
            v-if="selected === ''"
          /> -->
        </div>
        <div class="actions" v-if="selected === '' && !uploaded && !loading">
          <button class="submit" @click="uploadImage">Upload</button>
          <button class="submit change" @click="clearSelection">Change</button>
        </div>
        <div class="loading" v-if="loading">
          <div class="loader"></div>
          <p class="loading-message">Uploading...</p>
        </div>
      </div>
    </div>
  </message>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Message from "@/components/Message.vue";
import { toBase64 } from "@/lib/utils";
// import { saveMemory } from "@/api";
import eventBus from "@/lib/event_bus";
@Component({
  components: { Message },
})
export default class UploadMessage extends Vue {
  @Prop({ default: "" }) private text!: string;
  @Prop({ default: "incoming" }) private flow!: string;
  @Prop({ default: false }) private isError!: boolean;
  @Prop({ default: 1000 }) private typingDuration!: number;
  @Prop({ default: "" }) private selected!: "";

  private previewUrl: any = "";
  private loading = false;
  private uploaded = false;

  private created() {
    if (this.selected) {
      this.previewUrl = this.selected;
    }
  }

  private async onfileSelection() {
    const input: any = this.$refs.fileInput;
    if (input) {
      const [file] = input.files;
      if (file) {
        try {
          const base64 = await toBase64(file);
          if (base64) {
            this.previewUrl = base64;
            eventBus.$emit("scroll-chat-to-bottom");
          } else {
            this.$notify({
              type: "error",
              title: "Error reading file, try again",
            });
          }
        } catch (error: any) {
          this.$notify({
            type: "error",
            title: error || "Format not supported",
          });
        }
      }
    }
  }

  private uploadImage() {
    if (this.previewUrl) {
      this.loading = true;
      // saveInvoice(this.previewUrl)
      //   .then((resp) => {
      // this.$emit("selected", resp.picURL);
      this.$emit("selected", this.previewUrl);
      this.uploaded = true;
      this.loading = false;
      // })
      // .catch(() => {
      //   this.loading = false;
      // });
    }
  }
  private clearSelection() {
    this.previewUrl = "";
  }
}
</script>

<style lang="scss">
.upload-message {
  .upload-wrapper {
    max-width: 75%;
    background-color: white;
    margin: 10px 0 0 auto;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    .upload {
      max-width: 100%;
    }
    .preview-wrapper {
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      .submit {
        background-color: green;
        border: 1px solid white;
        padding: 10px;
        color: white;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        &.change {
          background-color: rgb(192, 192, 192);
          color: black;
          margin-left: 10px;
        }
      }
      .actions {
        display: flex;
        // flex-direction: column;
        margin-top: 6px;
      }
      .image {
        position: relative;
        .preview {
          // max-width: 150px;
          // max-height: 150px;
          object-fit: contain;
        }
        .close-btn {
          position: absolute;
          width: 25px;
          left: -10px;
          top: -10px;
          cursor: pointer;
        }
      }
    }
  }
  .loading {
    position: absolute;
    background: #0000009f;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .loader {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 30px;
    height: 30px;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
  }
  .loading-message {
    color: white;
    font-size: 14px;
    margin: 10px auto 0;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
