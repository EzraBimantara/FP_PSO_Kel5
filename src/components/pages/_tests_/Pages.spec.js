import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

// Impor semua komponen halaman Anda
import SignupPage from '../SignupPage.vue';
import LoginPage from '../LoginPage.vue';
import NewRecipePage from '../NewRecipePage.vue';

describe('Pages rendering', () => {
  // Buat opsi global yang menyediakan Pinia tiruan
  const globalOptions = {
    global: {
      plugins: [
        createTestingPinia({ createSpy: vi.fn }), // Inisialisasi Pinia untuk tes
      ],
      stubs: {
        'router-link': true,
        'RouterLink': true,
        'RecipeFormBody': true, // Penting: stub komponen anak agar tes tidak rumit
        'RecipeFormHeader': true,
      }
    }
  };

  it('SignupPage.vue > renders signup form', () => {
    const wrapper = mount(SignupPage, globalOptions);
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('LoginPage.vue > renders login form', () => {
    const wrapper = mount(LoginPage, globalOptions);
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('NewRecipePage.vue > renders new recipe form', () => {
    const wrapper = mount(NewRecipePage, globalOptions);
    expect(wrapper.find('form').exists()).toBe(true);
  });
});