<script setup>
// TAMBAHKAN INI: Deklarasikan semua props yang diterima komponen
defineProps([
    'modelValue', 
    'label', 
    'identity', 
    'type', 
    'placeholder',
    'readonly'
]);

// TAMBAHKAN INI: Definisikan emit untuk v-model
defineEmits(['update:modelValue']);
</script>

<template>
    <div>
        <label :for="identity" class="form-label">{{ label }}</label>
        <input 
            :type="type" 
            :id="identity" 
            :name="identity" 
            :placeholder="placeholder" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="form-control"
            :readonly="readonly"
        />
    </div>
</template>