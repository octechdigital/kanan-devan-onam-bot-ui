<template>
  <div class="chat-layout">
    <img src="@/assets/img/logo.png" @click="clearData" class="logo" />
    <div class="chat-body">
      <transition-group name="list">
        <template v-for="(message, index) in conversation">
          <template v-if="message.type === 'text'">
            <message
              :key="index"
              :text="message.text"
              :flow="message.flow"
              :isError="message.isError"
              :typingDuration="message.typingDuration"
            />
          </template>
          <template v-else-if="message.type === 'button'">
            <button-message
              :key="index"
              :text="message.text"
              :flow="message.flow"
              :isError="message.isError"
              :options="message.options"
              :selected="message.selected"
              :typingDuration="
                message.selected === '' ? message.typingDuration : 0
              "
              @selected="optionSelected"
            />
          </template>
          <template v-else-if="message.type === 'dropdown'">
            <dropdown-message
              :key="index"
              :text="message.text"
              :flow="message.flow"
              :isError="message.isError"
              :options="message.options"
              :selected="message.selected"
              :placeHolder="message.placeHolder"
              :typingDuration="
                message.selected === '' ? message.typingDuration : 0
              "
              @selected="optionSelected"
            />
          </template>
          <template v-else-if="message.type === 'age'">
            <age-message
              :key="index"
              :text="message.text"
              :flow="message.flow"
              :isError="message.isError"
              :selected="message.selected"
              :typingDuration="
                message.selected === '' ? message.typingDuration : 0
              "
              @selected="optionSelected"
            />
          </template>
          <template v-else-if="message.type === 'image'">
            <image-message
              :key="index"
              :text="message.text"
              :flow="message.flow"
              :isError="message.isError"
              :typingDuration="
                message.selected === '' ? message.typingDuration : 0
              "
              :image="message.image"
            />
          </template>
          <template v-else-if="message.type === 'upload'">
            <upload-message
              :key="index"
              :text="message.text"
              :flow="message.flow"
              :isError="message.isError"
              :selected="message.selected"
              :typingDuration="
                message.selected === '' ? message.typingDuration : 0
              "
              @selected="optionSelected"
            />
          </template>
          <template v-else-if="message.type === 'thankYou'">
            <thank-you-message :key="index" />
          </template>
        </template>
      </transition-group>
    </div>
    <div class="chat-footer">
      <div class="row" v-if="lastIntent !== 'COMPLETED'">
        <input
          type="text"
          v-model="outgoingText"
          class="text-input"
          :disabled="!enableInput"
          placeholder="Write your message"
          v-on:keyup.enter="sendOutgoingMessage"
        />
        <img
          src="@/assets/img/send.svg"
          class="send-btn"
          @click="sendOutgoingMessage"
        />
      </div>
      <div class="tandc" @click="openTandc">Terms & Conditions</div>
    </div>
  </div>
</template>

<script lang="ts" src="./Chat.ts"></script>

<style src="@/styles/chat.scss" lang="scss"></style>
