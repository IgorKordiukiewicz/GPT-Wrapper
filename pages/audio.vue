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
    speechOutputUrl.value = undefined;

    const blob = await api.generateSpeech(speechContentInput.value!);
    speechOutputUrl.value = window.URL.createObjectURL(blob as Blob);
    speechInProgress.value = false;
}

async function generateTranscription(event: Event) {
    event.preventDefault();
    transcriptionInProgress.value = true;
    transcriptionOutput.value = undefined;

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

function openFileInput() {
    document.getElementById('fileUpload')?.click();
}

function resetTranscriptAudioInput() {
    transcriptionAudioInput.value = undefined;
}

</script>

<template>
    <div class="container">
        <div class="half-column">
            <h4 class="header">Speech</h4>
            <div class="content-container column-container">
                <form class="column-container overflow-auto" @submit="generateSpeech">
                    <label>Content</label>
                    <ExpandableInput placeholder="Enter content..." v-model="speechContentInput"></ExpandableInput>
                    <button type="submit" class="button primary self-end" :disabled="isGenerateSpeechButtonDisabled">Generate</button>
                </form>
                <template v-if="speechOutputUrl || speechInProgress">
                    <label>Output</label>
                <AudioPlayer :src="speechOutputUrl" :download="true">
                    <template #nocontent>
                        <div class="loader-container">
                            <DotLoader></DotLoader>
                        </div>
                    </template>
                </AudioPlayer>
                </template>
            </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="half-column">
            <h4 class="header">Transcription</h4>
            <div class="content-container column-container">
                <input type="file" accept=".mp3" @change="submitAudioFile" style="display: none;" id="fileUpload" />
                <form class="column-container" @submit="generateTranscription">
                    <label>Audio</label>
                    <AudioPlayer :src="transcriptionAudioInputUrl" :reset="true" @onReset="resetTranscriptAudioInput">
                    <template #nocontent>
                        <div class="file-upload-container">
                            <IconButton icon="bi-upload" :sizePx="24" @onClick="openFileInput"></IconButton>                    
                            Upload audio file (.mp3)
                        </div>
                    </template>
                    </AudioPlayer>
                    <button type="submit" class="button primary self-end" :disabled="isGenerateTranscriptionButtonDisabled">Generate</button>
                </form>
                <div class="column-container overflow-auto" v-if="transcriptionOutput || transcriptionInProgress">
                    <div class="output-actions">
                        <label>Output</label>
                        <ClipboardCopy v-if="transcriptionOutput" :content="transcriptionOutput"></ClipboardCopy>
                    </div>
                    <p class="transcript-content">
                        <template v-if="transcriptionOutput">
                            {{ transcriptionOutput }}
                        </template>
                        <template v-else>
                            <div class="loader-container">
                                <DotLoader></DotLoader>
                            </div>
                        </template>
                    </p>
                </div>
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

.half-column {
    height: 100%;
    width: 50%;
    overflow-y: hidden;
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

.overflow-auto {
    overflow-y: auto;
}

.content-container {
    overflow-y: hidden;
    max-height: calc(100% - 20px - 1rem);
}

.transcript-content {
    background: var(--secondary-color);
    padding: 1rem;
    border-radius: 5px;
    margin: 0;
    white-space: pre-wrap;
    overflow-y: auto;
}

.loader-container {
    display: flex;
    align-items: center;
    height: 20px; 
    padding-left: 1rem;
}

.vertical-divider {
    border-right: 1px solid #808080;
}

.file-upload-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: smaller;
}

.output-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>