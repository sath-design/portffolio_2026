<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    const img = wrapper.querySelector('img');
    
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
    })
    // Scale image slightly for "breathing" effect
    .from(img, {
      scale: 1.4,
      duration: 1.6,
      ease: "power3.out",
      delay: -1.2
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

  // 4. Cipher Text Animation (Reusable)
  const createCipherAnimation = (wrapperSelector, text) => {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return;

    const cipherTarget = wrapper.querySelector('.cipher-text');
    if (!cipherTarget) return;

    const chars = text.split('');
    
    // Clear initial text and set up spans
    cipherTarget.innerHTML = chars.map(c => 
      c === ' ' ? '<span class="cipher-char spacer">&nbsp;</span>' : `<span class="cipher-char" style="opacity:0">A</span>`
    ).join('');
    
    // Select only non-spacer characters for animation
    const charEls = cipherTarget.querySelectorAll('.cipher-char:not(.spacer)');

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 80%",
      onEnter: () => {
        // Animate Chars
        charEls.forEach((charEl, i) => {
          // Filter out spaces from logic source
          const targetChar = chars.filter(c => c !== ' ')[i]; 
          if (!targetChar) return;

          const targetCode = targetChar.charCodeAt(0);
          let currentCode = 65; // Start from 'A'
          
          gsap.to(charEl, {
            opacity: 1,
            duration: 0.05,
            delay: i * 0.05
          });

          const obj = { code: currentCode };
          
          gsap.to(obj, {
            code: targetCode,
            duration: 0.3,
            ease: "none",
            delay: i * 0.05,
            onUpdate: () => {
              charEl.textContent = String.fromCharCode(Math.floor(obj.code));
            },
            onComplete: () => {
              charEl.textContent = targetChar;
            }
          });
        });

        // Animate Underline
        const underline = wrapper.querySelector('.title-underline');
        if (underline) {
          gsap.fromTo(underline, 
            { width: '0vw' },
            {
              width: '100vw', // Full viewport width
              duration: 1.0, 
              ease: "power3.out",
              delay: 0
            }
          );
        }
      }
    });
  };

  createCipherAnimation('.philosophy-header', 'PHILOSOPHY');
  createCipherAnimation('.works-header', 'SELECTED WORKS');

  // Header Reveal (Modified to not fade in the text wrapper broadly, let cipher handle it)
  // ... (Keep existing layout)
});
</script>

<template>
  <div class="sections-container">
  <section class="section about-section" id="philosophy">
      <div class="container grid align-center">
        <!-- Huge typography for section transition -->
        <h2 class="bg-typography marquee-text">CRAFTSMANSHIP</h2>
        
        <div class="col-12 content-header philosophy-header reveal-wrap">
          <h3 class="box-title reveal-text cipher-text">PHILOSOPHY</h3>
          <div class="title-underline"></div>
        </div>
        <div class="col-6 col-offset-1 content-body">
          <p class="section-text line-reveal">
            コード、デザイン、インタラクション。
          </p>
          <p class="section-text line-reveal">
            すべては「感情」を動かすために。
          </p>
          <br>
          <p class="section-text line-reveal">
            私たちは画面の向こう側にいる
          </p>
          <p class="section-text line-reveal">
            「人」のために創る。
          </p>
        </div>
      </div>
    </section>

    <section class="section works-section" id="works">
       <div class="container">
          <!-- Unified Header Style -->
          <div class="works-header reveal-wrap" style="margin-bottom: 80px;">
             <h2 class="box-title cipher-text">SELECTED WORKS</h2>
             <div class="title-underline"></div>
          </div>
          
          <div class="works-layout-grid">
             <!-- Work 1 -->
             <div class="work-item-grid">
               <div class="img-reveal-wrapper">
                  <div class="reveal-curtain"></div>
                  <img src="/images/simple_mockup_light.png" alt="NFT Marketplace" />
               </div>
               <div class="work-info">
                 <span class="work-num">01</span>
                 <div class="work-details">
                   <h3>NFT Marketplace "Kizuna"</h3>
                   <p>UI/UX Design / Front-end Dev</p>
                 </div>
               </div>
             </div>

             <!-- Work 2 -->
             <div class="work-item-grid">
               <div class="img-reveal-wrapper">
                  <div class="reveal-curtain"></div>
                  <img src="/images/simple_mockup_light.png" alt="Rebranding" />
               </div>
               <div class="work-info">
                 <span class="work-num">02</span>
                 <div class="work-details">
                   <h3>Corporate Rebranding "Alpha"</h3>
                   <p>Art Direction / WebGL</p>
                 </div>
               </div>
             </div>

             <!-- Work 3 -->
             <div class="work-item-grid">
               <div class="img-reveal-wrapper">
                  <div class="reveal-curtain"></div>
                  <img src="/images/simple_mockup_light.png" alt="Generative Art" />
               </div>
               <div class="work-info">
                 <span class="work-num">03</span>
                 <div class="work-details">
                   <h3>Generative Art Collection</h3>
                   <p>Creative Coding</p>
                 </div>
               </div>
             </div>
          </div>
       </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.sections-container {
  padding-bottom: 200px;
}

.section {
  position: relative;
  padding: 15vh 0;
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
  font-size: clamp(36px, 5.5vw, 72px); /* Slightly reduced to prevent wrapping */
  font-family: var(--font-display); 
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-icon);
  margin-bottom: 20px;
  min-height: 1.1em;
  white-space: nowrap; /* Force single line */
}

.title-underline {
  width: 0;
  height: 15px;
  background-color: #000;
  margin-top: 10px;
  position: relative;
  left: 50%;
  margin-left: -50vw;
}

/* Deep selector for cipher chars if scoped, but v-html/innerHTML might need :deep */
:deep(.cipher-char) {
  display: inline-block;
  min-width: 0.6em; /* Attempt to stabilize width if non-mono */
  text-align: center;
}

.section-text {
  font-size: clamp(16px, 1.2vw, 20px);
  line-height: 2;
  color: #111; /* Strong contrast for visibility */
  font-weight: 500;
  margin-bottom: 0px;
  
  /* Mask Reveal Setup */
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); /* Hidden top */
  transform: translateY(20px);
  opacity: 0;
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
}

// Image Reveal Animation Styles
.img-reveal-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  aspect-ratio: 16/9; // Enforce 16:9 for ALL work items

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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

.work-info {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  
  .work-num {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--color-accent);
    padding-top: 5px;
  }
  
  h3 {
    font-size: clamp(24px, 3vw, 36px);
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  p {
    font-size: 14px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

@media (max-width: 768px) {
  .works-layout-grid {
    grid-template-columns: 1fr; // Single column on mobile
    gap: 60px;
  }
  
  .bg-typography {
    font-size: 15vw;
  }
}
</style>
