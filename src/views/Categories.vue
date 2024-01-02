<template>
    <div class="p-8">
      <input
        type="search"
        v-model="category"
        class="rounded border-spacing-2 border-gray-200 w-full"
        placeholder="Search for products by category"
        @change="searchProducts"
      />
    </div>
  
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
      <div v-for="prod of products" :key="prod.id" class="bg-white shadow rounded-xl">
        <router-link :to="{ name: 'product-detail', params: { id: prod.id } }">
          <img :src="prod.image" :alt="prod.title" class="rounded-t-xl w-full h-48 object-cover" />
        </router-link>
        <div class="p-3">
          <h3 class="font-bold">{{ prod.title }}</h3>
          <p class="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sapiente sit, debitis quidem inventore
          </p>
          <div class="flex items-center">
            <!-- Make sure Button component is correctly implemented -->
            <Button href="prod">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import store from "../store";
  import { computed, ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import Button from "../components/Button.vue";
  
  const products = computed(() => store.state.singleCategory);
  
  const router = useRoute();
  
  const category = ref("");
  
  function searchProducts() {
    store.dispatch("getCategoryByName", category.value);
  }
  
  onMounted(() => {
    category.value = router.params.name;
    if (category.value) {
      searchProducts();
    }
  });
  </script>
  
  