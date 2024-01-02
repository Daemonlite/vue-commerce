<template>
  <a
    :href="href"
    target="_blank"
    class="px-3 py-2 rounded border-2 border-blue-600 bg-blue-600 text-white transition-colors cursor-pointer"
  >
    <slot></slot>
  </a>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  href: String,
});
</script>
