<template>
  <div
    role="dialog"
    aria-modal="true"
    class="PopupWrap"
  >
    <div class="PopupWrap__backdrop" @click="closePopup">
    </div>
    <slot/>
  </div>
</template>

<script>
import {eventBus} from '@/main.js';
export default {
  name: 'PopupWrap',
  methods: {
    closePopup: function() {
        eventBus.$emit('show-pop-up',false)}
  }
}
</script>

<style>
.PopupWrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
    display: flex;
  justify-content: center;
  align-items: center;
}

.PopupWrap__backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
