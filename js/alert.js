const closeErrorButton = document.getElementById("close-alert");
const errorOverlay = document.getElementById("errorOverlay");

// Show overlay
export function showError(title, message) {
    errorOverlay.style.opacity = "1"; // Make visible
    errorOverlay.style.visibility = "visible";
    document.getElementById("alert-title").textContent = title;
    document.getElementById("alert-text").textContent = message;
    // Hide overlay
    closeErrorButton.addEventListener("click", () => {
        errorOverlay.style.opacity = "0"; // Make invisible
        errorOverlay.style.visibility = "hidden";
    });
}