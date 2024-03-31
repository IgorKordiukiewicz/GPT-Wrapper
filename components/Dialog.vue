<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true }
})

const emit = defineEmits([ 'onSubmit' ])

const visible = ref<Boolean>(false);

function hide() {
    visible.value = false;
}

function show() {
    visible.value = true;
}

function submit(event: Event) {
    event.preventDefault();
    emit('onSubmit');
    visible.value = false;
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
            <form @submit="submit">
                <div class="dialog-content">
                    <slot></slot>
                </div>
                <div class="buttons">
                    <button type="button" class="button secondary" @click="hide">Cancel</button>
                    <button type="submit" class="button primary">Save</button>
                </div>
            </form>
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
    background: var(--background-color);
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
    margin: 1rem 0;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.5rem;
}
</style>