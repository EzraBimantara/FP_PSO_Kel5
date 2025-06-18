// src/store/recipe.pinia.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [],
    recipeDetail: {}
  }),

  actions: {
    async getRecipeData() {
      try {
        const { data } = await axios.get(
          "https://timedoorezra-default-rtdb.firebaseio.com/recipes.json"
        );

        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        this.recipes = arr;
      } catch (err) {
        console.log(err);
      }
    },

    async getRecipeDetail(id) {
      try {
        const { data } = await axios.get(
          `https://timedoorezra-default-rtdb.firebaseio.com/recipes/${id}.json`
        );
        this.recipeDetail = data;
      } catch (err) {
        console.log(err);
      }
    },

    async addNewRecipe(payload) {
      try {
        const newData = {
          ...payload,
          username: 'dummyUser',
          userId: 'dummyId',
          createdAt: Date.now(),
          likes: ['null'],
        };

        const { data } = await axios.post(
          "https://timedoorezra-default-rtdb.firebaseio.com/recipes.json",
          newData
        );

        this.recipes.push({ id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },

    async updateRecipe({ id, newRecipe }) {
      try {
        await axios.put(
          `https://timedoorezra-default-rtdb.firebaseio.com/recipes/${id}.json`,
          newRecipe
        );
        await this.getRecipeData();
      } catch (err) {
        console.log(err);
      }
    },

    async deleteRecipe(id) {
      try {
        await axios.delete(
          `https://timedoorezra-default-rtdb.firebaseio.com/recipes/${id}.json`
        );
        await this.getRecipeData();
      } catch (err) {
        console.log(err);
      }
    }
  }
});
