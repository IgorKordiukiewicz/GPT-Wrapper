<script setup lang="ts">

const promptInput = ref<string>();

const imageOutput = ref<string | undefined>();

</script>

<template>
    <div class="container">
        <div class="prompt-container full-width">
            <label>Prompt</label>
            <textarea class="input" v-model="promptInput" placeholder="Enter prompt..." style="height: 100%; resize: none;"></textarea>
            <button type="button" class="button generate-button">Generate</button>
        </div>
        <div class="image-container">
            <label>Generated Image</label>
            <img :src="imageOutput" alt="...">
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
}
</style>