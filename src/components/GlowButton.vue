<template>
  <!-- 光效按钮组件 -->
  <div class="glow-button" :style="buttonStyle" @click="handleClick">
    <!-- 边框动画元素 -->
    <div v-for="n in 4" :key="n" class="border-effect"></div>
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  position: {
    type: Object,
    required: true,
    validator: (value: { top?: string; bottom?: string; left?: string; right?: string }) =>
      Object.keys(value).some((k) => ['top', 'bottom', 'left', 'right'].includes(k)),
  },
  color: {
    type: String,
    default: '#03e9f4',
  },
  label: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])

const buttonStyle = computed(() => ({
  color: props.color,
  top: props.position.top,
  left: props.position.left,
  right: props.position.right,
  bottom: props.position.bottom,
}))

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.glow-button {
  position: absolute;
  padding: 25px 30px;
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
}

.glow-button:hover {
  background-color: v-bind('props.color');
  color: #050801;
  box-shadow:
    0 0 5px v-bind('props.color'),
    0 0 25px v-bind('props.color'),
    0 0 50px v-bind('props.color'),
    0 0 200px v-bind('props.color');
}

.border-effect {
  position: absolute;
  background: linear-gradient(
    var(--gradient-direction, to right),
    transparent,
    v-bind('props.color')
  );
  animation: var(--animation-name) 1s linear infinite;
  animation-delay: var(--animation-delay);
}

.border-effect:nth-child(1) {
  --gradient-direction: to right;
  --animation-name: animateX;
  --animation-delay: 0s;
  width: 100%;
  height: 2px;
  top: 0;
  left: -100%;
}

.border-effect:nth-child(2) {
  --gradient-direction: to bottom;
  --animation-name: animateY;
  --animation-delay: 0.25s;
  width: 2px;
  height: 100%;
  top: -100%;
  right: 0;
}

.border-effect:nth-child(3) {
  --gradient-direction: to left;
  --animation-name: animateX;
  --animation-delay: 0.5s;
  width: 100%;
  height: 2px;
  bottom: 0;
  right: -100%;
}

.border-effect:nth-child(4) {
  --gradient-direction: to top;
  --animation-name: animateY;
  --animation-delay: 0.75s;
  width: 2px;
  height: 100%;
  bottom: -100%;
  left: 0;
}

@keyframes animateX {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

@keyframes animateY {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200%);
  }
}
</style>
