<template>
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
</template>

<style scoped>

.nav-bar {
    display: flex;
    justify-content: space-around;
    background: var(--background-color);
    padding: 0.5rem;
    border-radius: 10px;
    gap: 0.5rem;
}

.nav-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #818181;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-decoration: none;
    width: 100%;
    border-radius: 5px;
}

.nav-btn:hover {
    background: #81818133;
}

.router-link-exact-active {
    transform: scale(1, 1);
    background: var(--primary-color) !important;
    color: #ffffff;
}
</style>