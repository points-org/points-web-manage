import Vue from 'vue';

export let canRender = false;
let timeoutHandler;

export function setRenderTime(value) {
  if (timeoutHandler) {
    clearTimeout(timeoutHandler);
  }
  canRender = true;
  timeoutHandler = setTimeout(() => {
    canRender = false;
  }, value * 1000 || 3000);
}

export const eventBus = new Vue();
