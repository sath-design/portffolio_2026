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
                scrub: 1
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
  // 4. Block Reveal Animation (Layering: Text > Underline > Cyan Block)
  const createBlockRevealAnimation = (wrapperSelector) => {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return;

    const title = wrapper.querySelector('.box-title');
    if (!title) return;

    // Wrap text content in a span
    if (!title.querySelector('.text-wrapper')) {
      const text = title.textContent;
      title.innerHTML = `<span class="text-wrapper" style="display:inline-block">${text}</span>`;
    }
    const textWrapper = title.querySelector('.text-wrapper');

    gsap.set(wrapper, { position: 'relative' });

    const block = document.createElement('div');
    block.classList.add('reveal-block');
    wrapper.appendChild(block);

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
        // Calculate geometry
        const wrapperRect = wrapper.getBoundingClientRect();
        const titleRect = title.getBoundingClientRect();
        
        const screenRightInWrapper = window.innerWidth - wrapperRect.left;
        const screenLeftInWrapper = -wrapperRect.left;
        const titleRightInWrapper = titleRect.right - wrapperRect.left;
        
        // Gap Adjustment
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

      // Step 1: Extend (Start at 0)
        tl.to(block, {
          left: screenLeftInWrapper,
          width: screenWidth,
          duration: 0.5, // Faster extension (was 0.8)
          ease: "power4.inOut" // Snappier ease (was power3)
        }, 0)

        // Underline (Start at 0)
        if (underline) {
          tl.fromTo(underline, 
            { width: '0vw' },
            {
              width: '100vw', 
              duration: 0.7, // Faster sync (was 1.2)
              ease: "power3.out"
            },
            0
          );
        }

        // Step 2: Retract (Start at 0.5)
        const extendDuration = 0.5;
       
        tl.to(block, {
          left: targetLeftPos, 
          width: finalBarWidth, 
          duration: 0.6, // Faster retraction (was 1.0)
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
          duration: 0.3, // Faster color switch
          ease: "power2.out"
        });
      }
    });
  };

  createBlockRevealAnimation('.skills-header');
});
</script>

<template>
  <div class="skill-genome-container" id="skills">
    <!-- Unified Header Style -->
    <div class="container skills-header reveal-wrap" style="margin-bottom: 80px; padding-top: 15vh;">
        <h2 class="box-title">SKILLS</h2>
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
             <div class="chapter-deco-line"></div>
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
  font-size: clamp(50px, 8vw, 100px);
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
  margin-top: -30px;
  position: relative;
  z-index: 2;
  left: 50%;
  margin-left: -50vw;
}

.box-title {
  position: relative;
  z-index: 3;
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
  background-color: $color-accent;
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
