const closeErrorButton = document.getElementById("close-alert");
const errorOverlay = document.getElementById("errorOverlay");

// Show overlay
export function showAlert(title, message = "", action=null, actionText=null) {
    errorOverlay.style.opacity = "1"; // Make visible
    errorOverlay.style.visibility = "visible";
    document.getElementById("alert-title").textContent = title;
    document.getElementById("alert-text").textContent = message;

    //Modify the close button action
    if(action){
        document.getElementById("close-alert").textContent = actionText;
        closeErrorButton.addEventListener("click", () => {
            window.location.href = action;
        });
    }else{
        closeErrorButton.addEventListener("click", () => {
            errorOverlay.style.opacity = "0"; // Make invisible
            errorOverlay.style.visibility = "hidden";
        });
    }
}
