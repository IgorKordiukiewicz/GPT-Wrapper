<script setup lang="ts">
const api = useApi();

const speechContentInput = ref<string>();
const speechOutputUrl = ref<string | undefined>();

const transcriptionAudioInput = ref<string | undefined>();
const transcriptionOutput = ref<string | undefined>();

async function generateSpeech(event: Event) {
    event.preventDefault();
}

async function generateTranscription(event: Event) {
    event.preventDefault();
}

const isGenerateSpeechButtonDisabled = computed(() => {
    if(!speechContentInput || !speechContentInput.value) {
        return true;
    }

    return speechContentInput.value.length == 0;
});

const isGenerateTranscriptionButtonDisabled = computed(() => {
    return !transcriptionAudioInput || !transcriptionAudioInput.value;
})

</script>

<template>
    <div class="container">
        <div class="speech-container">
            <h4 class="header">Speech</h4>
            <form class="column-container" @submit="generateSpeech">
                <label>Content</label>
                <textarea class="input" placeholder="Enter content..." v-model="speechContentInput"></textarea>
                <button type="submit" class="button primary end-button" :disabled="isGenerateSpeechButtonDisabled">Generate</button>
            </form>
            <div class="column-container" v-if="speechOutputUrl">
                <label>Output</label>
                <audio controls :src="speechOutputUrl"></audio>
            </div>
        </div>
        <div style="border-right: 1px solid rgb(128, 128, 128);"></div>
        <div class="transcription-container">
            <h4 class="header">Transcription</h4>
            <form class="column-container" @submit="generateTranscription">
                <label>Audio</label>
                <audio controls></audio>
                <button type="submit" class="button primary end-button" :disabled="isGenerateTranscriptionButtonDisabled">Generate</button>
            </form>
            <div class="column-container" v-if="transcriptionOutput">
                <label>Output</label>
                <p class="transcript-content">
                    {{ transcriptionOutput }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    height: 100%;
    width: 100%;
    gap: 1rem;
}

.speech-container {
    height: 100%;
    width: 50%;
}

.transcription-container {
    height: 100%;
    width: 50%;
}

.header {
    margin: 0;
    margin-bottom: 1rem;
    text-align: center;
}

.column-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

.end-button {
    align-self: end;
}

.transcript-content {
    background: #3d3d3d88;
    padding: 1rem;
    border-radius: 5px;
    margin: 0;
    color: #c5c5c5;
    white-space: pre-wrap;
}
</style>