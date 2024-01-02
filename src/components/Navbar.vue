<script setup>
import { reactive } from 'vue';

const state = reactive({
  isMenuOpen: false
});

const toggleMenu = () => {
  state.isMenuOpen = !state.isMenuOpen;
};
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-400 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Vue Commerce</span>
    </div>
    <div class="block lg:hidden">
      <button @click="toggleMenu" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div :class="{ 'hidden': !state.isMenuOpen }" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:justify-end"> <!-- Added lg:justify-end class -->


      <div>
      <router-link @click="toggleMenu" :to="{name:'home' }" class="inline-block text-md px-4 py-2 leading-none  text-white  mt-4 lg:mt-0">Home</router-link>
    </div>

    <div>
      <router-link @click="toggleMenu" :to="{name:'category' }" class="inline-block text-md px-4 py-2 leading-none  text-white  mt-4 lg:mt-0">Categories</router-link>
    </div>

    <div>
      <router-link @click="toggleMenu" :to="{name:'cart' }" class="inline-block text-md px-4 py-2 leading-none  text-white  mt-4 lg:mt-0">Cart</router-link>
    </div>
    </div>
  </nav>
</template>
