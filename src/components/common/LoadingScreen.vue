<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const emit = defineEmits(['loaded']);
const progress = ref(0);

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      // Restore theme color to light background after loading
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#EEEEF3');
      }
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
  })
  .to(".loader-content", {
    y: () => document.querySelector('.loading-screen').offsetHeight,
    duration: 1,
    ease: "power4.inOut"
  }, "<")
  .set(".loading-screen", { display: "none" });
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
  background-color: #111;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 120vh; /* Prevent address bar jump */
    box-sizing: border-box;
    padding-bottom: 20vh; /* Re-center content visually (120vh - 20vh = 100vh content area) */
  }
}

.counter {
  font-family: var(--font-display);
  font-size: 120px;
  font-weight: 700;
}
</style>
