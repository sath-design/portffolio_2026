<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Integrate Lenis with GSAP ScrollTrigger
// This ensures ScrollTrigger updates accurately with Lenis's smooth scroll
gsap.registerPlugin(ScrollTrigger);

let lenis;

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2, // The duration of the scroll animation
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    direction: 'vertical', 
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Connect Lenis to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);
});

onBeforeUnmount(() => {
  if (lenis) {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  }
});
</script>

<template>
  <div class="smooth-scroll-wrapper">
    <slot />
  </div>
</template>

<style lang="scss">
// Recommended CSS for Lenis
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
</style>
