import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';

export const useUserAuthStore = defineStore('userAuth', () => {
  const online = ref(null);

  function updateUserOnlineStatus(auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        online.value = true;
        console.log('User is online');
      } else {
        online.value = false;
        console.log('User is offline');
      }
    });
  };

  return { online, updateUserOnlineStatus }
});
