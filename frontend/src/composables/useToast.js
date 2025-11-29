// src/composables/useToast.js
import { ref } from 'vue';

// estado global del toast
const isVisible = ref(false);
const message = ref('');
let timeoutId = null;

function showToast(text, duration = 2500) {
  message.value = text;
  isVisible.value = true;

  // si hay un timeout anterior, lo limpiamos
  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    isVisible.value = false;
  }, duration);
}

export function useToast() {
  return {
    isVisible,
    message,
    showToast,
  };
}
