<script setup>
import PhoneNumberSignIn from './components/PhoneNumberSignIn.vue';
import GoogleSignIn from './components/GoogleSignIn.vue';
import StatusSignOut from './components/StatusSignOut.vue';
</script>

<template>
  <div class="wrapper">
    <StatusSignOut />
    <div id="signInOptions">
      <PhoneNumberSignIn />
      <GoogleSignIn />
    </div>
  </div>
</template>


<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-conent: center;
}

#signInOptions {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
