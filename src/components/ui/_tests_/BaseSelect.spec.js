import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelect from '../BaseSelect.vue';

describe('BaseSelect.vue', () => {
    it('seharusnya memanggil fungsi handleChange dan emit event saat pilihan berubah', async () => {
        const wrapper = mount(BaseSelect, {
            props: {
                data: ['Lunch', 'Dinner']
            }
        });

        const selectElement = wrapper.find('select');

        // Simulasikan pengguna memilih 'Dinner'
        await selectElement.setValue('Dinner');

        // Cek apakah event untuk v-model di-emit
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');

        // Cek apakah data yang di-emit benar
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Dinner']);
    });
});