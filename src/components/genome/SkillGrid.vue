<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skillsData from '@/assets/data/skills.json';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Animate each section's entry
  gsap.utils.toArray('.skill-chapter').forEach((chapter, i) => {
    // Background color subtle shift or parallax elements could go here
    
    // Animate list items staggering in
    const items = chapter.querySelectorAll('.skill-item');
    gsap.from(items, {
      scrollTrigger: {
        trigger: chapter,
        start: "top 60%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Sticky Title Animation (Scaling down slightly as you scroll past)
    const title = chapter.querySelector('.chapter-title-wrapper');
    if(title) {
        gsap.to(title, {
            scrollTrigger: {
                trigger: chapter,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            },
            scale: 0.95,
            opacity: 0.8,
            ease: "none"
        });
    }
  });

  // Micro-interaction for skill bars
  gsap.utils.toArray('.skill-bar').forEach(bar => {
    gsap.from(bar, {
      scrollTrigger: {
        trigger: bar,
        start: "top 90%",
      },
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "expo.out"
    });
  });
  // Create Cipher Animation (Reusable in this component)
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
    
    const charEls = cipherTarget.querySelectorAll('.cipher-char:not(.spacer)');

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 80%",
      onEnter: () => {
        // Animate Chars
        charEls.forEach((charEl, i) => {
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

  createCipherAnimation('.skills-header', 'SKILL GENOME');
});
</script>

<template>
  <div class="skill-genome-container" id="skills">
    <!-- Unified Header Style -->
    <div class="container skills-header reveal-wrap" style="margin-bottom: 80px; padding-top: 15vh;">
        <h2 class="box-title cipher-text">SKILL GENOME</h2>
        <div class="title-underline"></div>
    </div>

    <!-- Loop through categories to create full-screen sections -->
    <section 
      v-for="(category, index) in skillsData" 
      :key="category.id" 
      class="skill-chapter"
      :class="index % 2 === 0 ? 'layout-left' : 'layout-right'"
    >
      <div class="container grid chapter-grid">
        
        <!-- Sticky Title Column -->
        <div class="col-4 chapter-title-col">
          <div class="chapter-title-wrapper">
             <span class="chapter-num">0{{ index + 1 }}</span>
             <h2 class="chapter-title" style="color: #111;">
               {{ category.label }}
             </h2>
             <div class="chapter-deco-line" style="background-color: #111;"></div>
          </div>
        </div>

        <!-- Scrollable Content Column -->
        <div class="col-7 col-offset-1 chapter-content-col">
           <div class="skill-list">
             <div v-for="skill in category.children" :key="skill.id" class="skill-item">
                <div class="skill-header">
                   <span class="skill-name">{{ skill.label }}</span>
                   <div class="skill-track">
                     <div class="skill-bar" :style="{ width: (skill.size * 100) + '%', backgroundColor: '#111' }"></div>
                   </div>
                </div>
                <p class="skill-desc">{{ skill.description }}</p>
                <div class="skill-tags">
                   <span v-for="ach in skill.achievements" :key="ach" class="tag">
                     {{ ach }}
                   </span>
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

// Header Styles (Copied for consistency, should be global or mixin ideally)
.box-title {
  font-size: clamp(36px, 5.5vw, 72px);
  font-family: var(--font-display); 
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-icon);
  margin-bottom: 20px;
  min-height: 1.1em;
  white-space: nowrap;
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
  min-width: 0.6em;
  text-align: center;
}

.skill-genome-container {
  padding-bottom: 200px;
}

.skill-chapter {
  min-height: 100vh;
  position: relative;
  padding: 100px 0;
  display: flex;
  align-items: flex-start; /* Align top for sticky to work */
}

// Layout variations
.layout-right {
  .chapter-grid {
    direction: rtl; // Quick hack to flip columns, reset direction in children
  }
  .chapter-title-col, .chapter-content-col {
    direction: ltr; // Reset
  }
  .col-offset-1 {
    margin-right: 8.33%; // Manually handle offset in RTL grid if needed
    margin-left: 0;
  }
}

.chapter-title-col {
  height: 100%; // Fill height of section
  position: relative;
}

.chapter-title-wrapper {
  position: sticky;
  top: 150px; /* Stick 150px from top */
  text-align: left;
}

.chapter-num {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  display: block;
  margin-bottom: 15px;
  opacity: 0.5;
}

.chapter-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 80px);
  line-height: 1;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.chapter-deco-line {
  width: 60px;
  height: 4px;
  margin-top: 10px;
  border-radius: 2px;
}

.skill-list {
  padding-top: 20px; // Slight offset from title
}

.skill-item {
  margin-bottom: 80px;
}

.skill-header {
  margin-bottom: 15px;
}

.skill-name {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  display: block;
  margin-bottom: 15px;
  color: var(--color-text);
}

.skill-track {
  width: 100%;
  height: 2px;
  background: rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}

.skill-bar {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.skill-desc {
  font-size: 15px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;
  max-width: 90%;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .tag {
    font-size: 12px;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.1);
    padding: 6px 14px;
    border-radius: 20px;
    color: #444;
    transition: all 0.3s;
    cursor: default;
    
    &:hover {
      border-color: #000;
      background: #000;
      color: #fff;
    }
  }
}

@media (max-width: 768px) {
  .skill-chapter {
    padding: 60px 0;
  }
  
  .chapter-title-wrapper {
    position: relative;
    top: 0;
    margin-bottom: 40px;
  }
  
  .layout-right .chapter-grid {
    direction: ltr; // Disable RTL swap on mobile
  }
  
  .col-offset-1 {
    margin-left: 0;
  }
  
  .skill-item {
    margin-bottom: 50px;
  }
}
</style>
