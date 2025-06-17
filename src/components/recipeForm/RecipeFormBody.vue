<script setup>
    import BaseInput from '../ui/BaseInput.vue';
    import BaseSelect from '../ui/BaseSelect.vue';
    import BaseTextArea from '../ui/BaseTextArea.vue';
    import BaseButton from '../ui/BaseButton.vue';

    import { onMounted, reactive } from "vue";
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    // Impor store Pinia Anda
    import { useRecipeStore } from '@/store/recipe';
    
    // Gunakan store Pinia
    const recipeStore = useRecipeStore();
    const router = useRouter();
    const route = useRoute();

    const props = defineProps({
        isEdit: { type: Boolean, default: false },
        detailData: { type: Object },
    });

    const recipeData = reactive({
        imageLink: "",
        name: "",
        description: "",
        category: "",
        prepTime: 0,
        cookTime: 0,
        totalTime: 0,
        ingredients: [],
        directions: [],
    });

    onMounted(async () => {
        if (props.isEdit) {
            try {
                await recipeStore.getRecipeDetail(route.params.id);
                Object.assign(recipeData, recipeStore.recipeDetail);
                
                ingredientCount.value = recipeStore.recipeDetail.ingredients?.length || 1;
                directionCount.value = recipeStore.recipeDetail.directions?.length || 1;
            } catch (err) {
                console.log(err);
            } 
        }
    });

    const ingredientCount = ref(1);
    const directionCount = ref(1);

    const addIngredient = () => { ingredientCount.value++; };
    const addDirection = () => { directionCount.value++; };
    const deleteIngredient = (index) => {
        recipeData.ingredients.splice(index, 1);
        ingredientCount.value--;
    };
    const deleteDirection = (index) => {
        recipeData.directions.splice(index, 1);
        directionCount.value--;
    };

    const totalTime = () => {
        recipeData.totalTime = parseInt(recipeData.prepTime || 0) + parseInt(recipeData.cookTime || 0);
    };

    const addNewRecipe = async () => {
        if (props.isEdit){
            await recipeStore.updateRecipe({ id: route.params.id, newRecipe: recipeData });
        } else {
            await recipeStore.addNewRecipe(recipeData);
        }
        router.push("/user/user-recipe");
    };
</script>