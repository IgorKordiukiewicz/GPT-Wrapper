<script setup lang="ts">

const emit = defineEmits(['onUpdate']);

const keyInput = ref();

const isContinueButtonDisabled = computed(() => {
    return keyInput.value?.apiKeyInput?.length == 0 ?? true;
});

function onSubmit() {
    if(!keyInput.value) {
        return;
    }

    keyInput.value.update();
    emit('onUpdate');
}

</script>

<template>
    <div class="center-container">
        <form class="key-input-container" @submit="onSubmit">
            <KeyInput ref="keyInput"></KeyInput>
            <button type="submit" class="button primary self-end" :disabled="isContinueButtonDisabled">Continue</button>
        </form>
    </div>
</template>

<style scoped>

.key-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--background-color);
    border-radius: 10px;
    padding: 1rem;
}

.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

</style>