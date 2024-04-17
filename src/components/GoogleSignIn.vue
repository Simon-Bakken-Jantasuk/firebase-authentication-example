<script setup>
import { onMounted } from 'vue';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';

const auth = getAuth();
auth.useDeviceLanguage();

const signIn = () => signInWithRedirect(auth, new GoogleAuthProvider());

</script>

<template>
  <div>
    <h2>Sign In with a Google Account</h2>
    <button @click="signIn" type="button">Google</button>
  </div>
</template>
