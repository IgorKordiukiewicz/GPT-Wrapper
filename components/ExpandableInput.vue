<script setup lang="ts">
const props = defineProps({
    placeholder: { type: String },
    fullWidth: { type: Boolean, default: false }
});

const input = ref<string>();
const textArea = ref();

function reset() {
    input.value = '';
    textArea.value.style.height = '20px';
}

const isValid = computed(() => {
    if(!input || !input.value) {
        return false;
    }

    return input.value.length > 0;
})

defineExpose({ reset, input, isValid });

onMounted(() => {
    textArea.value?.addEventListener("input", function(){
        textArea.value.style.height = '20px';
        textArea.value.style.height = `${textArea.value.scrollHeight - 32}px`;
    });
});

</script>

<template>
    <textarea type="text" class="input message-text-area" :placeholder="props.placeholder" v-model="input" ref="textArea" :class="{ 'full-width': fullWidth }"></textarea>
</template>

<style scoped>
.message-text-area {
    resize: none;
    height: 20px;
}
</style>