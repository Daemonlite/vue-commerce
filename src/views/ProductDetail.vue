<template>
  <div class="max-w-[800px] mx-auto p-8">
    <h1 class="text-5xl font-bold mb-5">{{ product.title }}</h1>

    <img :src="product.image" :alt="product.title" class="max-w-[100%]" />
    <div class="grid grid-cols-1 sm:grid-cols-3 text-lg py-2">
      <div class="">
        <strong class="font-bold"> Category:</strong>{{ product.category }}
      </div>
      <div class="">
        <strong class="font-bold">Price: $</strong>{{ product.price }}
      </div>

      <div class="">
        <strong class="font-bold">Rating:</strong>{{ product.rating }}
      </div>
    </div>

    <div class="my-3">
        {{ product.description }}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <ul>
          <template v-for="(el, index) of new Array(20)">
            <li v-if="product[`strIngredient${index + 1}`]">
              {{ index + 1 }}.{{ product[`strIngredient${index + 1}`] }}
            </li>
          </template>
        </ul>
      </div>

    

    </div>
    <div class="mt-4">
        <Button href="product.str">Add to cart </Button>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../axiosClient";
import Button from "../components/Button.vue";

const route = useRoute();

const product = ref({});

onMounted(() => {
  axiosClient.get(`products/${route.params.id}`).then(({ data }) => {
    product.value = data || {};
  });
});
</script>