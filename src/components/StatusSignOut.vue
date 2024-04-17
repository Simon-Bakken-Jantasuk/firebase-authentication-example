<script setup>
import { ref, onMounted } from 'vue';
import { useUserAuthStore } from '@/stores/auth';
import { getAuth, signOut } from 'firebase/auth';
  
const store = useUserAuthStore();

const auth = getAuth();
auth.useDeviceLanguage();

const logout = () => {
  signOut(auth)
    .then(() => {
      checkUserStatus();
      console.log('User logged out');
    })
    .catch((error) => {
      console.error('Error signing out:', error.message)
    });
};
</script>
    
<template>
  <div v-if="store.online">
    <h2>You are Online</h2>
    <button @click="logout" type="button">Sign out</button>
  </div>
  <div v-else-if="store.online == false">
    <h2>You are Offline</h2>
  </div>
</template>
