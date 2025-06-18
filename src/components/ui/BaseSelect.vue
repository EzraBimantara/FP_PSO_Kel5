<script setup>
    defineProps({
        data: Array,
        modelValue: String // Prop untuk v-model
    });
    const emit = defineEmits(['update:modelValue']); // Emit untuk v-model

    // Fungsi yang akan kita uji
    function handleChange(event) {
        emit('update:modelValue', event.target.value);
    }
</script>

<template>
    <select 
        class="form-select" 
        aria-label="Default select example"
        :value="modelValue"
        @change="handleChange">
        <option disabled value="">Select a category</option>
        <option v-for="item in data" :key="item" :value="item">{{ item }}</option>
    </select>
</template>