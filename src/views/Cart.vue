<template>
    <div>
      <div class="bg-gray-800 text-white p-8  ">
        <h1 class="text-4xl font-bold">Shopping Cart</h1>
      </div>
  
      <div v-if="carts && carts.length === 0" class="p-8 text-center">
        <p>Your cart is empty.</p>
      </div>
  
      <div v-else class="p-10">
        <div v-for="cart in carts" :key="cart.id">
          <h2 class="text-2xl font-bold mb-4">Order Date: {{ cart.date }}</h2>
  
          <div v-for="cartItem in cart.products" :key="cartItem.productId" class="bg-white  rounded-xl overflow-hidden mb-6">
            <img
              :src="cartItem.product.image"
              alt="Product Image"
              class="w-[300px] h-48 "
              loading="lazy"
            />
            <div class="p-3">
              <h3 class="text-xl font-bold mb-2">{{ cartItem.product.title }}</h3>
              <p class="text-gray-600 mb-4">Quantity: {{ cartItem.quantity }}</p>
              <div class="flex items-center">
                <p class="text-green-500 font-bold">{{ cartItem.product.price * cartItem.quantity }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 p-3">
                <Button >Check out</Button>
                <Button  @click="removeFromCart(cartItem.productId)">Remove</Button>
            </div>
            <br>
          </div>
         
        </div>
        
      </div>
    </div>

  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import axiosClient from "../../axiosClient.js";
  import Button from "../components/Button.vue";
  
  const carts = ref([]);
  
  onMounted(() => {
    const userId = 1; // Assuming user ID 1 for simplicity
  
    // Fetch cart items for the user
    getCart(userId);
  });
  
  const getProductDetails = async (productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };
  
  const getCart = async (userId) => {
    try {
      const response = await axiosClient.get(`carts/user/${userId}`);
      const cartData = response.data || [];
  
      carts.value = await Promise.all(
        cartData.map(async (cart) => {
          const products = await Promise.all(
            cart.products.map(async (cartItem) => {
              const productDetails = await getProductDetails(cartItem.productId);
              return {
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                product: productDetails || {
                  title: "Product Name Not Available",
                  image: "Image URL Not Available",
                  price: 0,
                },
              };
            })
          );
  
          return {
            id: cart.id,
            date: cart.date,
            products,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "DELETE",
      });
      const json = await response.json();
      console.log(json);
      // Update the cart items after successful removal
      getCart(1); // Assuming user ID 1 for simplicity
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  