<script setup lang="ts">
const props = defineProps({
    icon: { type: String, required: true },
    sizePx: { type: Number },
    disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['onClick']);

const sizeElement = computed(() => {
    return props.sizePx ? `${props.sizePx}px` : '';
});

const styleObject = reactive({
    width: sizeElement,
    height: sizeElement
});

function emitOnClick() {
    if(props.disabled) {
        return;
    }

    emit('onClick');
}

</script>

<template>
    <div class="container" @click="emitOnClick" :class="{ 'disabled': disabled }">
        <v-icon :name="icon" :style="styleObject" />
    </div>
</template>

<style scoped>
.container {
    border-radius: 100%;
    cursor: pointer;
    width: fit-content;
}

.container:hover {
    color: var(--primary-color);
}

.disabled {
    color: #6e6e6e !important;
}
</style>