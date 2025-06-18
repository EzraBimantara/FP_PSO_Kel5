<script setup>
    defineProps(['label', 'identity', 'placeholder', 'modelValue']);
    const emit = defineEmits(['update:modelValue']);

    // Fungsi yang akan kita uji
    function handleInput(event) {
        emit('update:modelValue', event.target.value);
    }
</script>

<template>
    <div>
        <label :for="identity" class="form-label">{{ label }}</label>
        <textarea 
            class="form-control" 
            :id="identity" 
            rows="3" 
            :placeholder="placeholder"
            :value="modelValue"
            @input="handleInput"
        ></textarea>
    </div>
</template>