const showErrorButton = document.getElementById("showError");
const closeErrorButton = document.getElementById("closeError");
const errorOverlay = document.getElementById("errorOverlay");

// Show overlay
showErrorButton.addEventListener("click", () => {
errorOverlay.style.opacity = "1"; // Make visible
errorOverlay.style.visibility = "visible";
});

// Hide overlay
closeErrorButton.addEventListener("click", () => {
errorOverlay.style.opacity = "0"; // Make invisible
errorOverlay.style.visibility = "hidden";
});