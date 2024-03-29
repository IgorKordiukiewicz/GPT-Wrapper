<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true }
})

const visible = ref<Boolean>(false);

function hide() {
    visible.value = false;
}

function show() {
    visible.value = true;
}

defineExpose({ show });
</script>

<template>
    <div class="dialog-container" :class="{ 'show': visible }">
        <div class="dialog">
            <div class="header">
                <h3 class="title">{{ title }}</h3>
                <IconButton icon="io-close" @click="hide"></IconButton>
            </div>
            <div class="dialog-content">
                <slot></slot>
            </div>
            <div class="buttons">
                <button class="button secondary">Cancel</button>
                <button class="button primary">Save</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dialog-container {
    position: fixed;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background: #464646bb;
}

.dialog {
    background: #212121dd;
    position: relative;
    border-radius: 10px;
    padding: 1rem;
    height: fit-content;
    min-width: 15vw;
}

.show {
    display: flex;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}

.title {
    margin: 0;
}

.dialog-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.5rem;
}
</style>