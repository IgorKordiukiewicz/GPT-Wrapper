<script setup lang="ts">
defineProps({
    text: { type: String, required: true },
    icon: { type: String, required: true }
})
</script>

<template>
    <div class="container">
        <v-icon :name="icon" />
        {{ text }}
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>