<script setup lang="ts">
const props = defineProps({
    icon: { type: String, required: true },
    sizePx: { type: Number }
});

const sizeElement = computed(() => {
    return props.sizePx ? `${props.sizePx}px` : '';
});

const styleObject = reactive({
    width: sizeElement,
    height: sizeElement
});
</script>

<template>
    <div class="container" @click="$emit('onClick')">
        <v-icon :name="icon" :style="styleObject" />
    </div>
</template>

<style scoped>
.container {
    border-radius: 100%;
    cursor: pointer;
    width: fit-content;
}

.container:hover {
    color: var(--primary-color);
}
</style>