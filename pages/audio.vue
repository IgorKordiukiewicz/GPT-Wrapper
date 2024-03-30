<script setup lang="ts">
const api = useApi();

const speechContentInput = ref<string>();
const speechOutputUrl = ref<string | undefined>();
const speechInProgress = ref<boolean>(false);

const transcriptionAudioInput = ref<File | undefined>();
const transcriptionOutput = ref<string | undefined>();
const transcriptionInProgress = ref<boolean>(false);

const isGenerateSpeechButtonDisabled = computed(() => {
    if(!speechContentInput || !speechContentInput.value) {
        return true;
    }

    return speechContentInput.value.length == 0 || speechInProgress.value;
});

const isGenerateTranscriptionButtonDisabled = computed(() => {
    return !transcriptionAudioInput || !transcriptionAudioInput.value || transcriptionInProgress.value; 
});

const transcriptionAudioInputUrl = computed(() => {
    if(!transcriptionAudioInput.value) {
        return;
    }

    return URL.createObjectURL(transcriptionAudioInput.value as Blob);
})

async function generateSpeech(event: Event) {
    event.preventDefault();
    speechInProgress.value = true;

    const blob = await api.getGeneratedSpeech(speechContentInput.value!);
    speechOutputUrl.value = window.URL.createObjectURL(blob as Blob);
    speechInProgress.value = false;
}

async function generateTranscription(event: Event) {
    event.preventDefault();
    transcriptionInProgress.value = true;

    transcriptionOutput.value = await api.generateTranscription(transcriptionAudioInput.value!);
    transcriptionInProgress.value = false;
}

function submitAudioFile(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if(!files || files.length == 0) {
        return;
    }

    transcriptionAudioInput.value = files[0];
}

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
        <div class="vertical-divider"></div>
        <div class="transcription-container">
            <h4 class="header">Transcription</h4>
            <input type="file" accept=".mp3" @change="submitAudioFile" />
            <form class="column-container" @submit="generateTranscription">
                <label>Audio</label>
                <audio controls :src="transcriptionAudioInputUrl"></audio>
                <AudioView :src="transcriptionAudioInputUrl"></AudioView>
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
    overflow-y: auto;
}

.vertical-divider {
    border-right: 1px solid #808080;
}
</style>