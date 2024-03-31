<script setup lang="ts">
const settingsDialog = ref();
const settingsKeyInput = ref();
const hasApiKey = ref<boolean>();

function showSettingsDialog() {
    settingsDialog.value.show();
}

onMounted(() => {
    const apiKey = localStorage.getItem('apiKey');
    hasApiKey.value = apiKey ? apiKey.length > 0 : false;
});
</script>

<template>
    <template v-if="hasApiKey">
        <div class="main-container">
            <div class="nav-bar">
                <NuxtLink to="/chat" class="nav-btn">
                    <IconText text="Chat" icon="bi-chat-fill"></IconText>
                </NuxtLink>
                <NuxtLink to="/images" class="nav-btn">
                    <IconText text="Images" icon="bi-image"></IconText>
                </NuxtLink>
                <NuxtLink to="/audio" class="nav-btn">
                    <IconText text="Audio" icon="bi-music-note"></IconText>
                </NuxtLink>
            </div>
            <div class="content">
                <slot />
            </div>
        </div>
        <IconButton class="settings-button" icon="io-settings-sharp" :size-px="50" @onClick="showSettingsDialog"></IconButton>
        <Dialog title="Settings" ref="settingsDialog" @onSubmit="settingsKeyInput.update()">
            <KeyInput ref="settingsKeyInput"></KeyInput>
        </Dialog>
    </template>
    <template v-else>
        <InitialScreen @onUpdate="hasApiKey = true"></InitialScreen>
    </template>
</template>

<style>
body {
    margin: 0;
    overflow: hidden;
    background: linear-gradient(334deg, #28a08c, #141414);
    /*background: #141414;*/
    background-size: 180% 180%;
    animation: gradient-animation 6s ease infinite;
    color: #ececec;
    font-family: "Inter", sans-serif;
}

@keyframes gradient-animation {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.main-container {
    height: 90vh;
    width: 60%;
    margin: 5vh auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.nav-bar {
    display: flex;
    justify-content: space-around;
    background: #212121dd;
    padding: 0.5rem;
    border-radius: 10px;
    gap: 0.5rem;
}

.content {
    background: #212121dd;
    border-radius: 10px;
    height: 100%;
    padding: 1rem;
    overflow-y: hidden;
}

.nav-btn {
    position: relative;
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #818181;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-decoration: none;
    width: 100%;
    border-radius: 6px;
}

.nav-btn:hover {
    background: #81818133;
}

.router-link-exact-active {
    transform: scale(1, 1);
    background: var(--primary-color) !important;
    color: #ffffff;
}

.settings-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #212121dd;
    transition: transform .3s ease;
}

.settings-button:hover {
    transform: rotate(90deg);
    color: #818181;
}
</style>