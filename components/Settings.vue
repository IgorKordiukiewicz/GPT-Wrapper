<script setup lang="ts">
const apiKeyInput = ref<string>();
const showApiKey = ref<boolean>(false);

onMounted(() => {
    apiKeyInput.value = localStorage?.getItem('apiKey') ?? '';
});

function toggleShowApiKey() {
    showApiKey.value = !showApiKey.value;
}

function update() {
    if(!apiKeyInput.value) {
        return;
    }

    localStorage.setItem('apiKey', apiKeyInput.value);
}

defineExpose({ update });
</script>

<template>
    <label>API Key</label>
    <div class="input-container">
        <input :type="showApiKey ? 'text' : 'password'" class="input key-input" v-model="apiKeyInput" placeholder="Enter API key..." @click.prevent />
        <div class="separator"></div>
        <IconButton :icon="showApiKey ? 'bi-eye-slash' : 'bi-eye'" class="show-button" @onClick="toggleShowApiKey"></IconButton>
    </div>
</template>

<style scoped>
.input-container {
    position: relative;
}

.key-input {
    width: 15vw;
    text-overflow: ellipsis;
    padding-right: 70px;
}

.separator {
    position: absolute;
    border-right: 1px solid #ccc;
    height: 30px; /* Adjust height as needed */
    right: 60px;
    transform: translateY(-50%);
    top: 50%;
}

.show-button {
    position: absolute;
    right: 24px;
    transform: translateY(-50%);
    top: 50%;
}

</style>