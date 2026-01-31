<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref(null);
let animationFrameId;

const GRID_SPACING = 60; // Increased spacing
const CROSS_SIZE = 7; // Larger crosses
const COLOR = '#CCCCCC';
const SPEED = 0.1; // Slower motion

const draw = (ctx, width, height, time) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = COLOR;
  
  const rows = Math.ceil(height / GRID_SPACING) + 2;
  const cols = Math.ceil(width / GRID_SPACING) + 2;

  for (let r = 0; r < rows; r++) {
    const isEvenRow = r % 2 === 0;
    const direction = isEvenRow ? 1 : -1;
    const offset = (time * SPEED * direction) % GRID_SPACING;
    const y = r * GRID_SPACING;

    for (let c = -1; c < cols; c++) {
      let x = c * GRID_SPACING + offset;
      ctx.fillRect(x - CROSS_SIZE/2, y - 0.5, CROSS_SIZE, 1);
      ctx.fillRect(x - 0.5, y - CROSS_SIZE/2, 1, CROSS_SIZE);
    }
  }
};

const resize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
  }
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let time = 0;

  window.addEventListener('resize', resize);
  resize();

  const loop = () => {
    time++;
    draw(ctx, canvas.width, canvas.height, time);
    animationFrameId = requestAnimationFrame(loop);
  };
  loop();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', resize);
});
</script>

<template>
  <canvas ref="canvasRef" class="bg-canvas"></canvas>
</template>

<style scoped>
.bg-canvas {
  position: absolute; /* Changed from fixed to absolute */
  top: 0;
  left: 0;
  width: 100%; /* Relative to parent */
  height: 100%;
  z-index: 0; /* Behind Hero content but inside Hero */
  pointer-events: none;
  background-color: transparent;
}
</style>
