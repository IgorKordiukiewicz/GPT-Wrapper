<script setup lang="ts">

const promptInput = ref<string>();
const imageOutput = ref<string | undefined>();

const api = useApi();

async function generateImage(event: Event) {
    event.preventDefault();

    const prompt = promptInput.value!;
    promptInput.value = '';

    const response = await api.getGeneratedImage(prompt);
    imageOutput.value = response;
}

const isGenerateButtonDisabled = computed(() => {
    if(!promptInput || !promptInput.value) {
        return true;
    }

    return promptInput.value.length == 0;
})

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
            <div class="image-wrap">
                <img :src="imageOutput" alt="">
                <div class="image-download-hover" v-if="imageOutput">
                    <button type="button" class="button primary image-download-button">
                        <IconText icon="bi-download" text="Download"></IconText>
                    </button>
                </div>
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

.image-wrap {
    position: relative;
    width: 100%;
}

.image-download-hover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #3d3d3dbb;
    visibility: hidden;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: opacity .2s, visibility .2s;
}

.image-wrap:hover .image-download-hover {
    visibility: visible;
    opacity: 1;
}

.image-download-button {
    transition: .2s;
    transform: translateY(1em);
    height: auto;
}

.image-wrap:hover .image-download-button {
    transform: translateY(0);
}
</style>