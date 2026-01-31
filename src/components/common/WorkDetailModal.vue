<script setup>
import { onMounted, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  work: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);

// Image Asset Resolution
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

const close = () => {
  emit('close');
};

// Scroll Lock
watch(() => props.show, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="show && work" class="modal-overlay" @click="close">
      <div class="modal-container" @click.stop>
        <button class="close-btn" @click="close">×</button>

        <div class="modal-content" data-lenis-prevent>
          <!-- Left: Visuals -->
          <div class="visual-col">
            <div v-for="(img, index) in work.images" :key="index" class="image-wrapper">
              <img :src="resolvePath(img)" :alt="work.title + ' ' + (index + 1)" />
            </div>
          </div>

          <!-- Right: Details -->
          <div class="detail-col">
            <div class="header">
              <span class="category">{{ work.category }}</span>
              <h2>{{ work.title }}</h2>
              <div class="meta-tags">
                <span class="period" v-if="work.period">{{ work.period }}</span>
                <span class="role" v-if="work.role">{{ work.role }}</span>
              </div>
            </div>

            <div class="description-block" v-if="work.description">
              <div class="desc-item" v-if="work.description.challenge">
                <h3>Challenge</h3>
                <p>{{ work.description.challenge }}</p>
              </div>
              <div class="desc-item" v-if="work.description.solution">
                <h3>Solution</h3>
                <p>{{ work.description.solution }}</p>
              </div>
              <div class="desc-item" v-if="work.description.result">
                <h3>Result</h3>
                <p>{{ work.description.result }}</p>
              </div>
            </div>

            <div class="tech-stack" v-if="work.tech_stack">
              <h3>Tech Stack</h3>
              <div class="tags">
                <span v-for="tech in work.tech_stack" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="actions" v-if="work.url">
              <a :href="work.url" target="_blank" rel="noopener noreferrer" class="visit-btn">
                Visit Website ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(238, 238, 243, 0.95); // Light mode overlay
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  padding: 40px;
  cursor: pointer;
}

.modal-container {
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background: #fff;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: default;
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  font-size: 2.5rem;
  font-weight: 300;
  color: #111;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  
  &:hover {
    color: var(--color-accent);
  }
}

.modal-content {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.visual-col {
  flex: 1.5;
  background: #f5f5f5;
  overflow-y: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  
  .image-wrapper {
    width: 100%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.detail-col {
  flex: 1;
  padding: 60px 50px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: #fff;
}

.header {
  .category {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #888;
    display: block;
    margin-bottom: 10px;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(24px, 3vw, 40px);
    line-height: 1.1;
    margin-bottom: 20px;
  }
  
  .meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 14px;
    color: #555;
    font-family: var(--font-body);
    
    span {
      padding-right: 15px;
      border-right: 1px solid #ddd;
      
      &:last-child {
        border: none;
      }
    }
  }
}

.description-block {
  display: flex;
  flex-direction: column;
  gap: 25px;
  
  .desc-item {
    h3 {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-accent);
      margin-bottom: 8px;
    }
    
    p {
      font-size: 15px;
      line-height: 1.8;
      color: #333;
    }
  }
}

.tech-stack {
  h3 {
    font-size: 12px;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 15px;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .tech-tag {
      font-size: 13px;
      padding: 6px 14px;
      background: #f0f0f5;
      border-radius: 100px;
      color: #444;
    }
  }
}

.visit-btn {
  display: inline-block;
  padding: 15px 40px;
  background: #111;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-accent);
    transform: translateY(-2px);
  }
}

@media (max-width: 900px) {
  .modal-overlay {
    padding: 0;
  }

  .modal-container {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-content {
    flex-direction: column;
    overflow-y: auto;
  }

  .visual-col, .detail-col {
    flex: none;
    width: 100%;
    overflow-y: visible;
  }
  
  .visual-col {
    padding: 0;
    
    .image-wrapper {
      box-shadow: none;
    }
  }
  
  .detail-col {
    padding: 40px 20px 80px; // Bottom padding for mobile search bar etc
  }
  
  .close-btn {
    top: 15px;
    right: 15px;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
  
  .modal-container {
    transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  
  .modal-container {
    transform: scale(0.98) translateY(20px);
  }
}
</style>
