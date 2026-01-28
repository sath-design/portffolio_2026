<script setup>
import { ref } from 'vue';
import SmoothScroll from './components/common/SmoothScroll.vue';
import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
import Hero from './components/home/Hero.vue';
import ContentSections from './components/home/ContentSections.vue';
import SkillGrid from './components/genome/SkillGrid.vue';
import LoadingScreen from './components/common/LoadingScreen.vue';

const isLoaded = ref(false);

const onLoaded = () => {
  isLoaded.value = true;
};
</script>

<template>
  <LoadingScreen @loaded="onLoaded" />
  <SmoothScroll>
    <Header />
    <main>
      <Hero :start-animation="isLoaded" />
      <ContentSections />
      <SkillGrid />
    </main>
    <Footer />
  </SmoothScroll>
</template>

<style scoped>
.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  pointer-events: auto; /* Allow interaction with canvas */
}

.content-layer {
  position: relative;
  z-index: 1;
  pointer-events: none; /* Let clicks pass through to canvas where empty */
}

.content-layer > * {
  pointer-events: auto; /* Re-enable pointer events for actual content */
}
</style>
