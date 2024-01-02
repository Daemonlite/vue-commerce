<template>
  <div class="p-8 pb-0 text-gray-500">
    <h1 class="text-4xl font-bold mb-4">Product List</h1>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
    <div
      v-for="product in products"
      :key="product.id"
      class="bg-white shadow rounded-xl"
    >
      <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
        <img
          :src="product.image"
          :alt="product.title"
          class="rounded-t-xl w-full h-48 object-cover"
          loading="lazy"
        />
      </router-link>
      <div class="p-3">
        <h3 class="font-bold">{{ product.title }}</h3>
        <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          sapiente sit, debitis quidem inventore</p>
        <div class="flex items-center cursor-pointer">
          <Button @click="addToCart(product)">Add to Cart</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Button from "../components/Button.vue";
import axiosClient from "../../axiosClient.js";

const products = ref([]); // Initialize products as a ref

onMounted(async () => {
  for (let i = 0; i < 10; i++) {
    axiosClient.get(`products`).then((response) => {
      // Assuming the response data has a 'data' property containing the array of products
      products.value.push(...response.data);
    });
  }
});

const addToCart = (product) => {
  const userId = 1; // Assuming user ID 1 for simplicity

  axiosClient.post('carts', {
    userId,
    date: new Date().toISOString(),
    products: [product]
  })
  .then(({ data }) => {
    console.log("Item added to cart:", data);
    // You might want to update the cart state in your Vuex store here
  })
  .catch(error => {
    console.error("Error adding item to cart:", error);
  });
};

</script>

