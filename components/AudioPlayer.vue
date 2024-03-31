<script setup lang="ts">
const props = defineProps({
    src: { type: String },
    download: { type: Boolean },
    reset: { type: Boolean }
});

const audioElement = ref();
const volumeSlider = ref();

const duration = ref<number | undefined>();
const lastVolume = ref<number>(1);
const muted = ref<boolean>(false);
const paused = ref<boolean>(true);

const currentTime = ref<number>(0);

const timeDisplay = computed(() => {
    if(!audioElement.value || !duration.value) {
        return;
    }

    return `${secondsParsed(currentTime.value)} / ${secondsParsed(duration.value)}`;
});

function secondsParsed(seconds: number) {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
}

function updateCurrentTime(event: Event) {
    if(!audioElement.value) {
        return;
    }
    event.preventDefault();

    audioElement.value.currentTime = currentTime.value;
}

function updateVolume(event: Event) {
    if(!audioElement.value) {
        return;
    }
    event.preventDefault();

    const newVolume = Number((event.target as HTMLInputElement).value);
    lastVolume.value = newVolume;
    audioElement.value.volume = newVolume;
    muted.value = newVolume == 0;
}

function toggleMute() {
    if(!audioElement.value || !volumeSlider.value) {
        return;
    }

    if(muted.value) {
        muted.value = false;
        audioElement.value.volume = lastVolume.value;
        volumeSlider.value.value = lastVolume.value;
    }
    else {
        muted.value = true;
        audioElement.value.volume = 0;
        volumeSlider.value.value = 0;
    }
}

function togglePlay() {
    if(!audioElement.value) {
        return;
    }

    if(paused.value) {
        audioElement.value.play();
        paused.value = false;
    }
    else {
        audioElement.value.pause();
        paused.value = true;
    }
}

function downloadFile() {
    if(!props.src) {
        return;
    }

    const element = document.createElement('a');
    element.href = props.src;
    element.target = '_blank';
    element.download = `audiofile-${getCurrentDateString()}.mp3`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// TODO: Move to composable?
function getCurrentDateString() {
    return new Date().toISOString().replace(/[-:.]/g, '').replace('T', '').split('Z')[0].slice(0, -5);
}

const playPauseIcon = computed(() => {
    console.log('test');
    if(duration.value && currentTime.value >= duration.value) {
        return 'bi-play-fill';
    }

    return paused.value ? 'bi-play-fill' : 'bi-pause-fill';
});

onMounted(() => {
    audioElement.value.onloadedmetadata = function() {
        duration.value = audioElement.value.duration;
    }

    audioElement.value.addEventListener('timeupdate', function() {
        currentTime.value = audioElement.value.currentTime;
    })
});

</script>

<template>
    <div>
        <audio :src="src" ref="audioElement" preload="metadata"></audio>
        <div class="audio-container">
            <template v-if="src">
                <template v-if="download">
                    <IconButton icon="bi-download" @onClick="downloadFile"></IconButton>
                    <div class="vertical-separator"></div>
                </template>
                <template v-if="reset">
                    <IconButton icon="io-close" @onClick="$emit('onReset')"></IconButton>
                    <div class="vertical-separator"></div>
                </template>
                <IconButton :icon="playPauseIcon" @onClick="togglePlay" :sizePx="32"></IconButton>
                <input type="range" min="0" :max="duration" step="0.01" v-model="currentTime" @change="updateCurrentTime" />
                <span class="time-display">
                    {{  timeDisplay }}
                </span>
                <div></div>
                <IconButton :icon="muted ? 'fa-volume-mute' : 'fa-volume-up'" :sizePx="24" @onClick="toggleMute"></IconButton>
                <input type="range" min="0" max="1" step="0.01" class="volume-slider" @change="updateVolume" ref="volumeSlider" />
            </template>
            <template v-else>
                <div class="nocontent-container">
                    <slot name="nocontent"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.audio-container {
    display: flex;
    background: var(--secondary-color);
    align-items: center;
    border-radius: 5px;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
}

.time-display {
    white-space: nowrap;
    font-size: small;
}

.volume-slider {
    width: 5rem;
}

.vertical-separator {
    border-right: 1px solid #ccc;
    height: 24px;
    margin-left: 5px;
}

.nocontent-container {
    height: 32px;
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    gap: 2rem;
}
</style>