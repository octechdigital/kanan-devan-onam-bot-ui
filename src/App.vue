<template>
  <div id="app">
    <router-view></router-view>
    <notifications position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { createUser } from "@/api";
@Component({
  components: {},
})
export default class App extends Vue {
  private created() {
    const isAuthenticated = this.$store.getters.isAuthenticated;
    if (!isAuthenticated) {
      createUser().then((resp) => {
        this.$store.dispatch("SET_ACCESS_DETAILS", {
          userKey: resp.userKey,
          dataKey: resp.dataKey,
        });
      });
    }
  }
}
</script>

<style src="@/styles/global.scss" lang="scss"></style>
