<script setup>
import { onMounted, watch } from 'vue';
import gsap from 'gsap';
import BackgroundGrid from '../common/BackgroundGrid.vue';

const props = defineProps({
  startAnimation: Boolean
});

const runAnimation = () => {
  // Main Timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  // Select all lines to animate individually for precise control
  const lines = document.querySelectorAll('.hero-line');
  
  lines.forEach((line, i) => {
      const curtain = line.querySelector('.hero-curtain');
      const text = line.querySelector('.hero-text');
      
      // Individual timeline for each line with stagger delay
      const lineTl = gsap.timeline({ 
        delay: i * 0.15 + 0.2 // Start delay + stagger
      });
      
      lineTl
        // 1. Extend from Left (width 0 -> 105%)
        .to(curtain, {
          width: "105%", // Slightly wider to ensure full coverage
          duration: 0.6,
          ease: "power3.inOut"
        })
        // 2. Reveal Text (hidden behind curtain)
        .set(text, { opacity: 1 })
        // 3. Retract to Left (width 105% -> 0%)
        .to(curtain, {
          width: "0%",
          duration: 0.4, // Faster retraction
          ease: "power3.inOut"
        }, ">"); // Run immediately after extension finishes
        
      // Add line timeline to main one if strictly sequential, but here we run parallel with delay
      // Just letting them run is fine since we calculate delay.
  });

  // Meta info reveal
  gsap.fromTo(".sub-reveal",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, delay: 1.5 }
  );
};

watch(() => props.startAnimation, (newVal) => {
  if (newVal) {
    runAnimation();
  }
});
</script>

<template>
  <section class="hero-section" id="top">
    <BackgroundGrid />
    <div class="container full-height grid">
      <div class="col-12 hero-content">
        <h1 class="main-title">
          <div class="hero-line">
            <span class="hero-text">SHIGEHARU</span>
            <div class="hero-curtain"></div>
          </div>
          <div class="hero-line">
            <span class="hero-text">IMOTO</span>
            <div class="hero-curtain"></div>
          </div>
          <div class="hero-line">
            <span class="hero-text">PORTFOLIO</span>
            <div class="hero-curtain"></div>
          </div>
        </h1>
        <div class="meta-info sub-reveal">
          <p class="role">DIGITAL ARTISAN</p>
          <p class="role-desc">Art Direction / UI/UX / Motion</p>
          <p class="year">2026</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.hero-section {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.full-height {
  height: 100%;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100%;
}

.main-title {
  font-family: var(--font-display);
  font-size: clamp(80px, 15vw, 200px);
  font-weight: 800;
  line-height: 0.85;
  color: var(--color-icon);
  letter-spacing: -0.04em;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Default left alignment for lines */
  /* If centered: align-items: center */
}

/* Force left alignment within the centered container if desired?
   User said "From left screen edge".
   But let's stick to the container's flow. If hero-content is centered, we center lines.
*/

.hero-line {
  position: relative;
  display: inline-block; /* Fit content */
  margin-bottom: 5px;
}

.hero-text {
  opacity: 0; /* Hidden initially */
  display: block;
}

.hero-curtain {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #000;
  z-index: 2;
}

.meta-info {
  margin-top: 40px;
  display: flex;
  gap: 40px;
  font-family: var(--font-base);
  font-size: var(--text-sm);
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  p {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      width: 20px;
      height: 1px;
      background: currentColor;
    }
  }
}
</style>
