<script setup>
const apiKeyInput = ref();

function updateApiKey() {
    localStorage.setItem('apiKey', apiKeyInput.value);
}
</script>

<template>
    <div>
      <form>
        <label>Enter OpenAI API Key</label>
        <input type="text" v-model="apiKeyInput" />
        <button type="submit" @click="updateApiKey()">Save</button>
      </form>
    </div>
</template>
  