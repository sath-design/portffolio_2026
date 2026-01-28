<script setup>
import { computed } from 'vue';

const props = defineProps({
  node: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);

const hasData = computed(() => props.node && props.node.data);
</script>

<template>
  <transition name="slide-up">
    <div v-if="hasData" class="skill-detail-panel">
      <button class="close-btn" @click="$emit('close')">×</button>
      
      <div class="header" :style="{ borderLeftColor: props.node.data.color || '#333' }">
        <span class="category">{{ props.node.data.category || 'Skill' }}</span>
        <h2>{{ props.node.data.label }}</h2>
      </div>
      
      <div class="content">
        <p class="description">{{ props.node.data.description }}</p>
        
        <div v-if="props.node.data.achievements" class="achievements">
          <h3>Achievements / Works</h3>
          <ul>
            <li v-for="(item, index) in props.node.data.achievements" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.skill-detail-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  max-width: calc(100vw - 40px);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
  z-index: 100;
  pointer-events: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.5;
  &:hover { opacity: 1; }
}

.header {
  border-left: 4px solid #333;
  padding-left: 15px;
  margin-bottom: 20px;
  
  .category {
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #666;
  }
  
  h2 {
    margin: 5px 0 0;
    font-size: var(--text-xl);
  }
}

.content {
  .description {
    font-size: var(--text-sm);
    line-height: 1.6;
    margin-bottom: 20px;
    color: #444;
  }
  
  .achievements {
    h3 {
      font-size: var(--text-xs);
      text-transform: uppercase;
      margin-bottom: 10px;
      color: #888;
    }
    
    ul {
      padding-left: 20px;
      margin: 0;
      
      li {
        font-size: var(--text-sm);
        margin-bottom: 5px;
      }
    }
  }
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
