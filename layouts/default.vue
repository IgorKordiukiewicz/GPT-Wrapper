<template>
    <div class="main-container">
        <div class="nav-bar">
            <NuxtLink to="/chat" class="nav-btn">Chat</NuxtLink>
            <NuxtLink to="/images" class="nav-btn">Images</NuxtLink>
            <NuxtLink to="/audio" class="nav-btn">Audio</NuxtLink>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    overflow: hidden;
    background: linear-gradient(334deg, #28a08c, #00dc8c);
    background: #141414;
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
    background: #212121cc;
    padding: 0.5rem;
    border-radius: 10px;
    gap: 0.5rem;
}

.content {
    background: #212121cc;
    border-radius: 10px;
    height: 100%;
    padding: 1rem;
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
    background: #19c37d;
    color: #ffffff;
}
</style>