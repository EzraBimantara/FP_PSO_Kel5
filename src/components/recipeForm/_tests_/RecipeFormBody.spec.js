import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRecipeStore } from '@/store/recipe';
import { createRouter, createWebHistory } from 'vue-router';
import RecipeFormBody from '../RecipeFormBody.vue';

// Router tetap dibutuhkan oleh komponen
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/user/user-recipe', component: { template: '<div></div>' } }],
});

describe('RecipeFormBody.vue with Pinia', () => {
  
  it('seharusnya memanggil action addNewRecipe saat form disubmit (mode baru)', async () => {
    const wrapper = mount(RecipeFormBody, {
      props: { isEdit: false },
      global: {
        plugins: [
          createTestingPinia({ createSpy: vi.fn }),
          router
        ],
      },
    });

    const recipeStore = useRecipeStore();

    await wrapper.find('input[id="recipeTitle"]').setValue('Resep Baru Pinia');
    await wrapper.find('form').trigger('submit.prevent');
    
    expect(recipeStore.addNewRecipe).toHaveBeenCalled();
  });

  it('seharusnya memanggil getRecipeDetail pada mode edit', async () => {
    mount(RecipeFormBody, {
      props: { isEdit: true },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              recipe: { recipeDetail: { name: 'Resep Lama' } }
            }
          }),
          router
        ],
      },
    });

    const recipeStore = useRecipeStore();
    expect(recipeStore.getRecipeDetail).toHaveBeenCalled();
  });

  it('seharusnya memanggil action updateRecipe saat form disubmit (mode edit)', async () => {
    const wrapper = mount(RecipeFormBody, {
      props: { isEdit: true },
      global: {
        plugins: [
          createTestingPinia({ createSpy: vi.fn }),
          router
        ],
      },
    });
    
    const recipeStore = useRecipeStore();

    await wrapper.find('form').trigger('submit.prevent');
    
    expect(recipeStore.updateRecipe).toHaveBeenCalled();
    expect(recipeStore.addNewRecipe).not.toHaveBeenCalled();
  });
});