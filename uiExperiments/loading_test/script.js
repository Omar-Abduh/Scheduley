window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const minLoadingTime = 2000; // Minimum duration in milliseconds
    const fadeDuration = 500; // Fade-out duration in milliseconds
    const startTime = performance.now();

    function checkTime(currentTime) {
        const elapsedTime = currentTime - startTime;

        if (elapsedTime >= minLoadingTime) {
            loadingScreen.style.opacity = '0'; // Start fading out
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.style.display = 'block'; // Show main content
            }, fadeDuration); // Match the fade-out duration
        } else {
            requestAnimationFrame(checkTime); // Continue checking
        }
    }

    requestAnimationFrame(checkTime);
});
