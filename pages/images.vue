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
            <textarea class="input prompt-input" v-model="promptInput" placeholder="Enter prompt..."></textarea>
            <button type="submit" class="button generate-button primary" :disabled="isGenerateButtonDisabled">Generate</button>
        </form>
        <div class="image-container">
            <label>Generated Image</label>
            <img :src="imageOutput" alt=" ">
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
    justify-content: center;
    width: 50%;
    position: relative;
}

.prompt-input {
    height: 100%;
    resize: none;
    text-decoration: none;
}

.generate-button {
    align-self: flex-end;
    height: auto;
}

img {
    width: 100%;
    aspect-ratio: 1;
    display: block;
    background: #3d3d3d55;
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 5px;
}

.spinner-container {
    position: absolute;
    color: red;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}
</style>