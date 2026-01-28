<script setup>
import { onMounted, inject, ref } from 'vue';
import gsap from 'gsap';

const lenis = inject('lenis');
const isMobileMenuOpen = ref(false);

const navItems = [
  { name: 'Philosophy', target: '#philosophy' },
  { name: 'Works', target: '#works' },
  { name: 'Skills', target: '#skills' },
  { name: 'Contact', target: '#contact' },
];

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  if (isMobileMenuOpen.value) {
    // Open Animation
    gsap.to(".mobile-menu", { autoAlpha: 1, duration: 0.5 });
    gsap.fromTo(".mobile-nav-link", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  } else {
    // Close Animation
    gsap.to(".mobile-menu", { autoAlpha: 0, duration: 0.5 });
  }
};

const scrollTo = (target) => {
  if (isMobileMenuOpen.value) toggleMenu();
  
  if (lenis && lenis.value) { // Ensure lenis is available (it might be provided as ref or object, usually object from our code)
     // Wait, provide('lenis', lenis) passes the object directly.
     lenis.scrollTo(target, { offset: -50 });
  } else {
    // Fallback
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  gsap.from(".nav-desktop .nav-item", {
    y: -20,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.5
  });
  
  gsap.from(".logo", {
    opacity: 0,
    duration: 1,
    delay: 0.2
  });
});
</script>

<template>
  <header class="app-header">
    <div class="logo" @click="scrollTo('#top')">SI</div>
    
    <!-- Desktop Menu -->
    <nav class="nav-menu nav-desktop">
      <a v-for="item in navItems" :key="item.name" @click.prevent="scrollTo(item.target)" class="nav-item">
        {{ item.name }}
      </a>
    </nav>

    <!-- Mobile Menu Toggle -->
    <button class="menu-toggle" @click="toggleMenu" :class="{ 'is-active': isMobileMenuOpen }">
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </button>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu">
      <nav class="mobile-nav">
        <a v-for="item in navItems" :key="item.name" @click.prevent="scrollTo(item.target)" class="mobile-nav-link">
          {{ item.name }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  padding: 30px 20px; // Reduced padding for safety
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; // High z-index
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #111; // Solid color for light theme visibility
  // mix-blend-mode removed for better consistency
}

/* Desktop Nav */
.nav-desktop {
  display: flex;
  gap: 30px; // Reduced gap from 40px to 30px to prevent overflow
  
  .nav-item {
    text-decoration: none;
    color: #111;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    cursor: pointer;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
    }
    
    &:hover::after {
      width: 100%;
    }
  }
}

/* Mobile Toggle */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
  
  .hamburger-line {
    width: 100%;
    height: 2px;
    background-color: #111;
    transition: all 0.3s ease;
  }
  
  &.is-active {
    .hamburger-line:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    .hamburger-line:nth-child(2) {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
}

/* Mobile Menu Overlay */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(238, 238, 243, 0.98); // Matches theme bg, slight opacity
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  z-index: 1000;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
}

.mobile-nav-link {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover {
    color: var(--color-accent);
  }
}

@media (max-width: 1024px) {
  .app-header {
    padding: 20px 20px;
  }
  
  .nav-desktop {
    display: none;
  }
  
  .menu-toggle {
    display: flex;
  }
}
</style>
