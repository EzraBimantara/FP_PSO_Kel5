import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import recipeModule from '../recipe.js'; // Ganti sesuai path file sebenarnya

const { state, mutations, actions } = recipeModule;

vi.mock('axios'); // Mock seluruh axios

describe('Vuex recipe module', () => {
  let testState;

  beforeEach(() => {
    testState = state(); // panggil state() setiap sebelum test
    axios.get.mockReset();
    axios.post.mockReset();
  });

  describe('mutations', () => {
    it('setRecipeData harus mengisi state.recipes', () => {
      const recipes = [{ id: 1, name: 'Nasi Goreng' }];
      mutations.setRecipeData(testState, recipes);
      expect(testState.recipes).toEqual(recipes);
    });

    it('setNewRecipe harus menambahkan resep baru', () => {
      const newRecipe = { id: 'abc123', name: 'Mie Goreng' };
      mutations.setNewRecipe(testState, newRecipe);
      expect(testState.recipes).toContainEqual(newRecipe);
    });
  });

  describe('actions', () => {
    it('getRecipeData harus memanggil axios.get dan commit setRecipeData', async () => {
      const commit = vi.fn();
      const mockResponse = {
        data: {
          '-M123': { name: 'Nasi Goreng' },
          '-M456': { name: 'Sate Ayam' }
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      await actions.getRecipeData({ commit });

      expect(axios.get).toHaveBeenCalledWith('https://timedoorezra-default-rtdb.firebaseio.com/recipes.json');
      expect(commit).toHaveBeenCalledWith('setRecipeData', [
        { id: '-M123', name: 'Nasi Goreng' },
        { id: '-M456', name: 'Sate Ayam' }
      ]);
    });
  });
});
