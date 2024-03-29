<script setup lang="ts">
const props = defineProps({
    placeholder: { type: String }
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
    document.querySelector('textarea')?.addEventListener("input", function(){
        this.style.height = '20px';
        this.style.height = `${this.scrollHeight - 32}px`;
    });
});

</script>

<template>
    <textarea type="text" class="input full-width message-text-area" :placeholder="props.placeholder" v-model="input" ref="textArea"></textarea>
</template>

<style scoped>
.message-text-area {
    resize: none;
    height: 20px;
}
</style>