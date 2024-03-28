<script setup lang="ts">
const props = defineProps({
    icon: { type: String, required: true },
    widthPx: { type: Number }
});

const widthElement = computed(() => {
    return props.widthPx ? `${props.widthPx}px` : '';
})

const styleObject = reactive({
    width: widthElement
})
</script>

<template>
    <div class="container" @click="$emit('click')">
        <v-icon :name="icon" :style="styleObject" />
    </div>
</template>

<style scoped>
.container {
    border-radius: 100%;
    cursor: pointer;
    width: fit-content;
}
</style>