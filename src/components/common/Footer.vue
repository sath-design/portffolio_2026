<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const currentYear = new Date().getFullYear();

onMounted(() => {
  gsap.from(".footer-big-text span", {
    scrollTrigger: {
      trigger: ".app-footer",
      start: "top 80%",
    },
    y: "100%",
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "power4.out"
  });
});
</script>

<template>
  <footer class="app-footer">
    <div class="container grid">
      <div class="col-12">
        <div class="footer-cta">
          <p class="cta-label">Got a project?</p>
          <a href="mailto:shigeharu.imoto@example.com" class="footer-big-text">
            <span class="block">LET'S</span>
            <span class="block">WORK</span>
            <span class="block">TOGETHER</span>
          </a>
        </div>
        
        <div class="footer-bottom">
          <div class="social-links">
            <a href="#" class="social-item">X (Twitter)</a>
            <a href="#" class="social-item">GitHub</a>
            <a href="#" class="social-item">LinkedIn</a>
          </div>
          <p class="copyright">&copy; {{ currentYear }} Shigeharu Imoto</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.app-footer {
  padding: 100px 0 40px;
  background: #000;
  color: #fff;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  z-index: 10;
}

.footer-cta {
  margin-bottom: 100px;
}

.cta-label {
  font-size: var(--text-sm);
  margin-bottom: 20px;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-big-text {
  font-family: var(--font-display);
  font-size: clamp(60px, 12vw, 150px);
  line-height: 0.8;
  font-weight: 800;
  display: block;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
  
  .block {
    display: block;
  }
  
  &:hover {
    color: var(--color-accent, #3366FF);
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 30px;
}

.social-links {
  display: flex;
  gap: 30px;
  
  .social-item {
    text-decoration: none;
    color: #fff;
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s;
    }
    
    &:hover::after {
      width: 100%;
    }
  }
}

.copyright {
  font-size: var(--text-xs);
  color: #666;
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }
  
  .app-footer {
     min-height: auto;
     padding-top: 60px;
  }
}
</style>
