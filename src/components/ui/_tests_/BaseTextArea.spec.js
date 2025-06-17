import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTextArea from '../BaseTextArea.vue';

describe('BaseTextArea.vue', () => {
    it('seharusnya memanggil fungsi handleInput dan emit event saat ada input', async () => {
        const wrapper = mount(BaseTextArea);

        const textareaElement = wrapper.find('textarea');
        
        // Simulasikan pengguna mengetik
        await textareaElement.setValue('Ini adalah deskripsi resep.');

        // Cek apakah event untuk v-model di-emit
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');

        // Cek apakah data yang di-emit benar
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Ini adalah deskripsi resep.']);
    });
});