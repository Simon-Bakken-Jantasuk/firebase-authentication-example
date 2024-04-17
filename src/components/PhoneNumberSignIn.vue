<script setup>
import { ref, onMounted } from 'vue';
import { useUserAuthStore } from '@/stores/auth';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const store = useUserAuthStore();

const auth = getAuth();
auth.useDeviceLanguage();

const phoneNumber = ref('');
const verificationCode = ref('');
const showVerificationInput = ref(false);

const signIn = () => {
  const formattedPhoneNumber = `+47${phoneNumber.value}`; 
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
    .then((confirmationResult) => {
      showVerificationInput.value = true;
      window.confirmationResult = confirmationResult;
      console.log('SMS sent', confirmationResult);
    })
    .catch((error) => {
      console.error('Error sending SMS:', error.message);
    });
};

const verifyCode = () => {
  const confirmationResult = window.confirmationResult;
  confirmationResult.confirm(verificationCode.value)
    .then((result) => {
      const user = result.user;
      store.updateUserOnlineStatus(auth);
      console.log(user);
    })
    .catch((error) => {
      console.error('Error verifying code:', error.message);
    });
};

onMounted(() => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
  store.updateUserOnlineStatus(auth);
})
</script>

<template>
  <div>
    <h2>Sign In with Phone Number</h2>
    <form @submit.prevent="signIn">
      <input type="text" v-model="phoneNumber" placeholder="Phone Number" required>
      <button type="submit">Send Verification Code</button>
    </form>
    <input v-model="verificationCode" placeholder="Verification Code" v-if="showVerificationInput">
    <button v-if="showVerificationInput" @click="verifyCode">Verify Code</button>
  </div>
  <div id="recaptcha-container"></div>
</template>
