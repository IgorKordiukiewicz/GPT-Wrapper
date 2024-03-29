<script setup lang="ts">
const props = defineProps({
    content: { type: String, required: true }
});

const showCheck = ref<boolean>(false);

function copyToClipboard() {
    showCheck.value = true;
    setTimeout(() => {
        showCheck.value = false;
    }, 2000);
    navigator.clipboard.writeText(props.content);
}
</script>

<template>
    <IconButton :icon="showCheck ? 'bi-check2' : 'bi-clipboard'" :size-px="16" @click="copyToClipboard"></IconButton>
</template>