<script setup>
import { ref, reactive, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import BaseInput from '../ui/BaseInput.vue'
import BaseSelect from '../ui/BaseSelect.vue'
import BaseTextArea from '../ui/BaseTextArea.vue'
import BaseButton from '../ui/BaseButton.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const props = defineProps({
  isEdit: { type: Boolean, default: false },
  detailData: { type: Object },
})

// Data untuk form
const form = ref({ title: '' })

// Data lengkap resep
const recipeData = reactive({
  imageLink: '',
  name: '',
  description: '',
  category: '',
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [],
  directions: [],
})

const ingredientCount = ref(1)
const directionCount = ref(1)

const addIngredient = () => { ingredientCount.value++ }
const addDirection = () => { directionCount.value++ }
const deleteIngredient = (index) => {
  recipeData.ingredients.splice(index, 1)
  ingredientCount.value--
}
const deleteDirection = (index) => {
  recipeData.directions.splice(index, 1)
  directionCount.value--
}
const totalTime = () => {
  recipeData.totalTime = parseInt(recipeData.prepTime || 0) + parseInt(recipeData.cookTime || 0)
}

// Sync form data saat edit
watchEffect(() => {
  if (props.isEdit && props.detailData) {
    form.value = { ...props.detailData }
  }
})

// Load detail resep saat edit
onMounted(async () => {
  if (props.isEdit) {
    try {
      await store.dispatch('recipe/getRecipeDetail', route.params.id)
      Object.assign(recipeData, store.state.recipe.recipeDetail)

      ingredientCount.value = recipeData.ingredients?.length || 1
      directionCount.value = recipeData.directions?.length || 1

      // Sync juga form.title jika perlu
      form.value.title = recipeData.name || ''
    } catch (err) {
      console.log(err)
    }
  }
})

const onSubmit = async () => {
  if (props.isEdit) {
    await store.dispatch('recipe/updateRecipe', { id: route.params.id, newRecipe: recipeData })
  } else {
    await store.dispatch('recipe/addNewRecipe', recipeData)
  }
  router.push('/user/user-recipe')
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input name="title" v-model="form.title" />
    <button type="submit">Submit</button>
  </form>
</template>
