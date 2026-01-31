<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkDetailModal from '../common/WorkDetailModal.vue';
import worksData from '@/assets/data/works.json';

gsap.registerPlugin(ScrollTrigger);

const showModal = ref(false);
const selectedWork = ref(null);

// Asset Resolution Helper for Thumbnail Display in Loop
const images = import.meta.glob('@/assets/images/*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' });
const resolvePath = (path) => {
  if (!path) return '';
  const filename = path.split('/').pop();
  for (const key in images) {
    if (key.endsWith(filename)) {
      return images[key];
    }
  }
  return path;
};

const openWorkModal = (work) => {
  selectedWork.value = work;
  showModal.value = true;
};

const createBlockRevealAnimation = (wrapperSelector) => {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;

  const title = wrapper.querySelector('.box-title');
  if (!title) return;

  // Wrap text content in a span if not already wrapped
  if (!title.querySelector('.text-wrapper')) {
    const text = title.textContent;
    title.innerHTML = `<span class="text-wrapper" style="display:inline-block">${text}</span>`;
  }
  const textWrapper = title.querySelector('.text-wrapper');

  // Ensure wrapper is positioned for absolute children
  gsap.set(wrapper, { position: 'relative' });

  // Create the block element dynamically & append to Wrapper
  const block = document.createElement('div');
  block.classList.add('reveal-block');
  wrapper.appendChild(block);

  // Set stable styles & z-indices
  gsap.set(title, { 
    position: 'relative',
    display: 'inline-block',
    clipPath: 'none',
    zIndex: 3
  }); 
  
  gsap.set(textWrapper, {
    clipPath: 'inset(0 100% 0 0)'
  });

  const underline = wrapper.querySelector('.title-underline');
  if (underline) {
    gsap.set(underline, { zIndex: 2, position: 'relative' });
  }
  
  gsap.set(block, { 
    position: 'absolute',
    backgroundColor: '#000',
    zIndex: 1, 
    opacity: 0 
  });

  ScrollTrigger.create({
    trigger: wrapper,
    start: "top 80%",
    onEnter: () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      
      const screenRightInWrapper = window.innerWidth - wrapperRect.left;
      const screenLeftInWrapper = -wrapperRect.left;
      const titleRightInWrapper = titleRect.right - wrapperRect.left;
      
      const gap = 30; 
      const targetLeftPos = titleRightInWrapper + gap;
      const finalBarWidth = (window.innerWidth - titleRect.right) - gap;
      
      const titleTopInWrapper = titleRect.top - wrapperRect.top;
      const titleHeight = titleRect.height;
      const screenWidth = window.innerWidth;

      gsap.set(block, { 
        left: screenRightInWrapper, 
        width: 0,
        top: titleTopInWrapper,
        height: titleHeight,
        opacity: 1
      });

      const tl = gsap.timeline();

      // Step 1: Extend
      tl.to(block, {
        left: screenLeftInWrapper,
        width: screenWidth,
        duration: 0.5, // Faster extension
        ease: "power4.inOut"
      }, 0)
      
      // Underline Sync
      if (underline) {
        tl.fromTo(underline, 
          { width: '0vw' },
          {
            width: '100vw', 
            duration: 0.7, // Faster sync
            ease: "power3.out"
          }, 
          0
        );
      }

      // Step 2: Retract
      const extendDuration = 0.5;
      tl.to(block, {
        left: targetLeftPos, 
        width: finalBarWidth, 
        duration: 0.6, // Faster retraction
        ease: "power4.inOut"
      }, extendDuration)

      .to(textWrapper, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.6, // Sync with retraction
        ease: "power4.inOut"
      }, extendDuration) 

      // Step 3: Color Change
      .to(block, {
        backgroundColor: '#00E5FF',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });
};

onMounted(() => {
  // 1. Text Horizontal Scroll Effect (Ryden-esque)
  gsap.utils.toArray('.marquee-text').forEach(text => {
    gsap.to(text, {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: text.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });

  // 2. Image Curtain Reveal Effect
  gsap.utils.toArray('.img-reveal-wrapper').forEach(wrapper => {
    const curtain = wrapper.querySelector('.reveal-curtain');
    // const img = wrapper.querySelector('img'); // Unused variable removed
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Curtain wipes away to reveal image
    tl.to(curtain, {
      height: 0,
      duration: 1.2,
      ease: "power4.inOut"
    });
  });
  
  // 3. Line Reveal Animation for Text
  gsap.utils.toArray('.line-reveal').forEach(line => {
    gsap.to(line, {
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Reveal down
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });
  });

  // 4. Block Reveal Animation (Layering: Text > Underline > Cyan Block)
  createBlockRevealAnimation('.philosophy-header');
  createBlockRevealAnimation('.works-header');

  // ... (rest of animations) ...

  // 5. Parallax for Philosophy Images
  gsap.utils.toArray('.philo-img').forEach((container) => {
    const isLarge = container.classList.contains('large');
    // Large moves down slowly (parallax depth), Small moves up faster (foreground/floater)
    const yVal = isLarge ? 30 : -50; 
    
    gsap.fromTo(container, 
      { yPercent: 0 },
      {
        yPercent: yVal,
        ease: "none",
        scrollTrigger: {
          trigger: "#philosophy",
          start: "top bottom",
          end: "bottom top",
          scrub: 1 // smooth scrub
        }
      }
    );
  });

  // 6. Works Image Zoom (Scroll Scrub)
  gsap.utils.toArray('.work-item-grid .img-reveal-wrapper img').forEach((img) => {
    gsap.fromTo(img, 
      { scale: 1.0 }, // Start normal
      {
        scale: 1.15,  // Slight zoom in
        ease: "none",
        scrollTrigger: {
          trigger: img.closest('.work-item-grid'), // Trigger based on container
          start: "top bottom", // When entering viewport
          end: "bottom top",   // When leaving viewport
          scrub: 1 // Smooth scrubbing
        }
      }
    );
  });

  // 7. Work Details Parallax (Move up slightly)
  gsap.utils.toArray('.work-item-grid .work-details').forEach((details) => {
    gsap.fromTo(details,
      { y: 0 },
      {
        y: -30, // Move up by 30px over the scroll distance
        ease: "none",
        scrollTrigger: {
          trigger: details.closest('.work-item-grid'),
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );
  });
  
  // Force refresh to ensure positions are correct after layout settlement
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500); // 500ms delay for safety
});
</script>

<template>
  <div class="sections-container">
  <section class="section about-section" id="philosophy">
      <div class="container grid align-center">
        <!-- Huge typography for section transition -->
        <h2 class="bg-typography marquee-text">CRAFTSMANSHIP</h2>
        
        <div class="col-12 content-header philosophy-header reveal-wrap">
          <h3 class="box-title reveal-text">PHILOSOPHY</h3>
          <div class="title-underline"></div>
        </div>
        <div class="col-7 content-body">
          <p class="section-text line-reveal large-text">
            「実装」を、「事業価値」へ。
          </p>
          <div class="spacer"></div>
          <p class="section-text line-reveal">
            確かな技術と16年の経験が、<br>
            ビジネスの成長を加速させる。
          </p>
          <br>
          <p class="section-text line-reveal">
            大規模開発で培った「組織の規律」と、<br>
            個人事業で磨いた「突破力」。<br>
            デザインから実装までを一気通貫で担い、<br>
            不測の事態にも柔軟に対応できる<br>
            強靭なパートナーとして貢献します。
          </p>
        </div>

        <!-- Parallax Visuals (Right) -->
        <div class="col-5 philosophy-visuals">
           <div class="philo-img large">
              <img :src="resolvePath('/assets/images/collage_02.png')" alt="Philosophy Visual Large" />
           </div>
           <div class="philo-img small">
              <img :src="resolvePath('/assets/images/collage_03.png')" alt="Philosophy Visual Small" />
           </div>
        </div>
      </div>
    </section>

    <section class="section works-section" id="works">
       <div class="container">
          <!-- Unified Header Style -->
          <div class="works-header reveal-wrap" style="margin-bottom: 80px;">
             <h2 class="box-title">WORKS</h2>
             <div class="title-underline"></div>
          </div>
          
          <div class="works-layout-grid">
             <div 
               v-for="(work, index) in worksData" 
               :key="work.id"
               class="work-item-grid"
               :class="{ 'span-col-2': (worksData.length % 2 !== 0) && (index === worksData.length - 1) }" 
               @click="openWorkModal(work)"
             >
               <div class="img-reveal-wrapper">
                  <div class="reveal-curtain"></div>
                  <!-- Use first image as thumbnail -->
                  <img :src="resolvePath(work.images[0])" :alt="work.title" :class="{ 'contain-img': work.category === 'LOGO DESIGN' }" />
               </div>
               <div class="work-info">
                 <span class="work-num">{{ String(index + 1).padStart(2, '0') }}</span>
                 <div class="work-details">
                   <h3>{{ work.title }}</h3>
                   <p>{{ work.category }}</p>
                 </div>
               </div>
             </div>
          </div>
       </div>
    </section>
  </div>
    
  <WorkDetailModal 
    :show="showModal" 
    :work="selectedWork" 
    @close="showModal = false" 
  />
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.sections-container {
  padding-bottom: 100px;
}

.section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 10vh 0;
  overflow: hidden; // For marquee text
}

// Typography / Marquee
.bg-typography, .section-header {
  font-family: var(--font-display);
  font-size: clamp(100px, 15vw, 300px);
  font-weight: 800;
  color: rgba(255,255,255,0.03); // Very subtle
  white-space: nowrap;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 0;
  line-height: 1;
}

.section-header {
  position: relative;
  font-size: clamp(60px, 10vw, 150px);
  color: #fff;
  margin-bottom: 100px;
  opacity: 0.9;
  transform: none;
  top: auto;
}

// Content Layout
.content-header {
  border-top: 2px solid var(--color-accent);
  padding-top: 20px;
}

.box-title {
  font-size: clamp(50px, 8vw, 100px); /* Enlarged as requested */
  font-family: var(--font-display); 
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-icon);
  margin-bottom: 20px;
  min-height: 1.1em;
  white-space: nowrap; /* Force single line */
  display: inline-block; /* Changed for block reveal */
  position: relative;
  z-index: 3; /* Top Layer */
}

.title-underline {
  width: 0;
  height: 15px;
  background-color: #000;
  margin-top: -30px; /* Slight overlap */
  position: relative;
  left: 50%;
  margin-left: -75vw; // Pull back more
  width: 150vw !important; // Force wide coverage to ensure no gaps
  z-index: 2; /* Middle Layer */
}

/* Deep selector for cipher chars if scoped, but v-html/innerHTML might need :deep */
:deep(.cipher-char) {
  display: inline-block;
  min-width: 0.6em; /* Attempt to stabilize width if non-mono */
  text-align: center;
}

.section-text {
  font-size: clamp(16px, 1.5vw, 24px);
  line-height: 1.8;
  color: #333;
  font-weight: 400;
  margin-bottom: 0px;
  
  /* Mask Reveal Setup */
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); /* Hidden top */
  transform: translateY(20px);
  opacity: 0;
}

.large-text {
  font-size: clamp(24px, 3vw, 48px);
  line-height: 1.4;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}

.spacer {
  height: 40px;
}

// Grid Layout for Works
.works-layout-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 Columns on Desktop
  gap: 80px 40px; // Row gap 80, Col gap 40
  width: 100%;
}

.work-item-grid {
  width: 100%;
  cursor: pointer;
  
  &.span-col-2 {
    grid-column: span 2;
    
    .img-reveal-wrapper {
      aspect-ratio: 21/9; // Cinematic wide aspect for full-width item
    }
  }
}

// Image Reveal Animation Styles
.img-reveal-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  aspect-ratio: 16/9; // Enforce 16:9 for ALL work items
  background: #f0f0f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1);
  }

  /* Specific style for logos in grid to look good */
  img.contain-img {
    object-fit: contain;
    padding: 30px;
    background: #fff;
  }
  
  .reveal-curtain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000; // Curtain color
    z-index: 5;
    transform-origin: top;
  }
}

.work-item-grid:hover {
  .img-reveal-wrapper img {
    transform: scale(1.05);
  }
  
  h3 {
    color: var(--color-accent);
  }
}

.work-info {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  
  .work-num {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    // color: inherit; 
    padding-top: 5px;
  }
  
  h3 {
    font-size: clamp(24px, 3vw, 36px);
    margin-bottom: 5px;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  p {
    font-size: 14px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

// Philosophy Visuals
.philosophy-visuals {
  position: relative;
  height: 60vh; // Occupy vertical space
  min-height: 600px;
  transform: translateX(-5%); // Move whole group left
}

.philo-img {
  position: absolute;
  // overflow: hidden; // Removed to prevent shadow clipping issues if any
  box-shadow: 0 15px 25px rgba(0,0,0,0.15); // Sharper shadow (less blur)
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.philo-img.large {
  width: 80%;
  top: 0;
  right: 5%; // Added spacing from right edge
  left: auto;
  z-index: 1;
}

.philo-img.small {
  width: 28%; // Reduced from 35%
  bottom: -15%; // Lowered further
  left: -5%; // Moved left
  right: auto;
  z-index: 2;
  // border removed
}

@media (max-width: 768px) {
  .works-layout-grid {
    grid-template-columns: 1fr; // Single column on mobile
    gap: 60px;
  }
  
  .work-item-grid.span-col-2 {
    grid-column: auto !important;
    
    .img-reveal-wrapper {
      aspect-ratio: 16/9; // Reset to standard on mobile
    }
  }
  
  .bg-typography {
    font-size: 15vw;
  }
  
  // Enable visuals on mobile
  .philosophy-visuals {
    display: block;
    height: 360px; // Increased further (was 300px)
    min-height: auto; // Reset desktop constraint
    margin-top: 20px;
    width: 100%;
    transform: none; // Reset desktop shift
  }

  // Mobile specific overrides for visuals
  .philo-img.large {
    width: 85%;
    right: 5%; // Moved inside the screen (was -5%)
    top: 0;
  }

  .philo-img.small {
    width: 32%; // Smaller (was 38%)
    left: 0; 
    bottom: -20%; // Much lower (was -10%)
    z-index: 2;
  }

  // Force Left Alignment on Mobile
  .container.grid {
    align-items: flex-start; // Override center
    text-align: left;
  }
  
  .section {
    align-items: flex-start; // Allow top flow (scrollable)
    padding-top: 100px;
    min-height: auto; // Fix "strangely long" issue
    padding-bottom: 60px;
  }
}
</style>
