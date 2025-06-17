// src/components/recipe/_tests_/RecipeList.spec.js

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeList from '../RecipeList.vue';

describe('RecipeList.vue', () => {
  const globalOptions = {
    global: {
      stubs: {
        // PERBAIKAN: Berikan implementasi stub yang me-render slot
        RouterLink: {
          template: '<div class="stub-router-link"><slot /></div>',
        },
      },
    },
  };

  it('seharusnya me-render daftar resep berdasarkan props', () => {
    const recipes = [
      { id: '1', name: 'Ayam Bakar', imageLink: 'url1', category: 'Dinner', username: 'Chef' },
      { id: '2', name: 'Soto Ayam', imageLink: 'url2', category: 'Lunch', username: 'Cook' },
    ];

    const wrapper = mount(RecipeList, {
      props: { recipes },
      ...globalOptions, // Gabungkan opsi global
    });

    const recipeItems = wrapper.findAll('.recipe_list-recipe > div');
    expect(recipeItems.length).toBe(2);

    const firstRecipeTitle = recipeItems[0].find('h4');
    expect(firstRecipeTitle.exists()).toBe(true);
    expect(firstRecipeTitle.text()).toBe('Ayam Bakar');
  });

  it('seharusnya menampilkan pesan "tidak ada resep" jika props kosong', () => {
    const wrapper = mount(RecipeList, {
      props: { recipes: [] },
      ...globalOptions, // Gabungkan opsi global
    });

    const emptyMessage = wrapper.find('.empty-message');
    expect(emptyMessage.exists()).toBe(true);
  });
});