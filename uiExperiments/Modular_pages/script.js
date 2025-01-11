// Function to load an HTML module dynamically
function loadModule(moduleURL, targetElementID) {
    fetch(moduleURL) // Load the content of the module
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load module: ' + moduleURL);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(targetElementID).innerHTML = data;
        })
        .catch(error => console.error(error));
}

// Load the header module automatically on page load
document.addEventListener('DOMContentLoaded', function () {
    loadModule('header.html', 'header');
});
