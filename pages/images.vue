<script setup lang="ts">

const promptInput = ref<string>();
const imageOutput = ref<string | undefined>();
const inProgress = ref<boolean>(false);

const api = useApi();

const isGenerateButtonDisabled = computed(() => {
    if(!promptInput || !promptInput.value) {
        return true;
    }

    return promptInput.value.length == 0 || inProgress.value;
});

async function generateImage(event: Event) {
    event.preventDefault();
    imageOutput.value = undefined;
    inProgress.value = true;

    const prompt = promptInput.value!;

    const response = await api.getGeneratedImage(prompt);
    imageOutput.value = response;
    inProgress.value = false;
}

</script>

<template>
    <div class="container">
        <form class="prompt-container full-width" @submit="generateImage">
            <label>Prompt</label>
            <ExpandableInput v-model="promptInput" placeholder="Enter prompt..."></ExpandableInput>
            <button type="submit" class="button generate-button primary" :disabled="isGenerateButtonDisabled">Generate</button>
        </form>
        <div class="image-container">
            <label>Generated Image</label>
            <template v-if="imageOutput">
                <img :src="imageOutput" class="image">
            </template>
            <template v-else>
                <div class="image"></div>
            </template>
            <div class="spinner-container" v-if="!imageOutput && inProgress">
                <Spinner></Spinner>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    gap: 1rem;
    height: 100%;
}

.prompt-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 50%;
}

.image-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 50%;
    position: relative;
}

.generate-button {
    align-self: flex-end;
    height: auto;
}

.image {
    width: 100%;
    aspect-ratio: 1;
    background: #3d3d3d55;
    overflow: hidden;
    border-radius: 5px;
}

.spinner-container {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}
</style>