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
  <footer class="app-footer" id="contact">
    <div class="container grid">
      <div class="col-12">
        <div class="footer-cta">
          <p class="cta-label">Got a project?</p>
          <a href="mailto:info@ariesplus.com" class="footer-big-text">
            <span class="block">LET'S</span>
            <span class="block">WORK</span>
            <span class="block">TOGETHER</span>
          </a>
        </div>
        
        <div class="footer-bottom">
          <div class="social-links">
            <a href="https://x.com/sath_design" target="_blank" rel="noopener noreferrer" class="social-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/sath_design" target="_blank" rel="noopener noreferrer" class="social-item">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
               </svg>
            </a>
          </div>
          <p class="copyright">&copy; {{ currentYear }} IMTSGHR</p>
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
    color: #00E5FF; /* Cyan Accent from animations */
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Centered as requested */
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 30px;
}

.social-links {
  display: flex;
  gap: 30px;
  
  .social-item {
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    transition: opacity 0.3s;
    
    svg {
      width: 18px; /* Slightly larger for visibility */
      height: 18px;
    }
    
    &:hover {
      opacity: 0.7;
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
