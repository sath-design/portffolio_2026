<script setup>
import { onMounted, watch, ref } from 'vue';
import gsap from 'gsap';
import BackgroundGrid from '../common/BackgroundGrid.vue';

const props = defineProps({
  startAnimation: Boolean
});

const heroSectionRef = ref(null);

const runAnimation = () => {
  if (!heroSectionRef.value) return;

  // Main Timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  // Select all lines to animate individually for precise control
  const lines = heroSectionRef.value.querySelectorAll('.hero-line');
  
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

onMounted(() => {
  if (props.startAnimation) {
    runAnimation();
  }
});

watch(() => props.startAnimation, (newVal) => {
  if (newVal) {
    runAnimation();
  }
});
</script>

<template>
  <section class="hero-section" id="top" ref="heroSectionRef">
    <BackgroundGrid />
    <div class="container full-height grid">
      <div class="col-12 hero-content">
        <h1 class="main-title">
          <div class="hero-line">
            <span class="hero-text serif-font">IMTSGHR</span>
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
      
      <!-- Scroll Indicator -->
      <div class="scroll-indicator sub-reveal">
        <span>SCROLL</span>
        <div class="line"></div>
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
  font-size: clamp(40px, 15vw, 200px);
  font-weight: 700;
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

.hero-curtain {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: #000;
  z-index: 2;
}

.hero-text {
  position: relative;
  z-index: 1;
  opacity: 0;
  display: block;
  
  &.serif-font {
    font-family: 'Times New Roman', serif;
    font-weight: 400; // Standard weight for Times
    letter-spacing: -0.02em;
  }
}

// ... existing styles ...

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  // Default Mobile: Centered without transform (avoids GSAP conflict)
  left: 0;
  right: 0;
  margin: 0 auto;
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0; // revealed by GSAP
  
  // Desktop: Right Side & Taller
  @media (min-width: 768px) {
    left: auto;
    right: 8%; // Approx between "PORTFOLIO" right edge and screen edge
    margin: 0; // Reset auto margin
    bottom: 60px;
    align-items: flex-end; // Align text/line
  }
  
  span {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #888;
  }
  
  .line {
    width: 1px;
    height: 60px; // Mobile height
    background: #ddd;
    position: relative;
    overflow: hidden;
    
    @media (min-width: 768px) {
      height: 150px; // Increased vertical length for PC
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      animation: scrollDown 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    }
  }
}

@keyframes scrollDown {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.meta-info {
// ... existing styles ...
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
