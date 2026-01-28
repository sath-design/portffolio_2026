<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const emit = defineEmits(['loaded']);
const progress = ref(0);

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      emit('loaded');
    }
  });

  // Simulate loading progress
  tl.to(progress, {
    value: 100,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => {
      progress.value = Math.round(progress.value);
    }
  })
  .to(".loading-screen", {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut"
  });
});
</script>

<template>
  <div class="loading-screen">
    <div class="loader-content">
      <div class="counter">{{ progress }}%</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #111; // Contrast to light theme? Or match? User likes light now.
  // Actually, Ryden often uses bold contrasts. Let's start with dark for impact, revealing light.
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.counter {
  font-family: var(--font-display);
  font-size: 120px;
  font-weight: 700;
}
</style>
