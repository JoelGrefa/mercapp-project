<script setup>
import { useToast } from '../composables/useToast';

const { isVisible, message } = useToast();
</script>

<template>
  <transition name="toast-fade">
    <div v-if="isVisible" class="toast">
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  right: 1.75rem;
  bottom: 1.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.92);
  color: #f9fafb;
  font-size: 0.9rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.4);
  z-index: 9999;
}

/* Animación suave */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
