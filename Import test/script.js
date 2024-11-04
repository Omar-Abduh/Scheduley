document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file

        reader.onload = function(event) {
            const csvData = event.target.result; // Get the CSV file content
            const rows = csvData.split("\n");    // Split content by rows
            
            // Parse rows into an array of arrays and trim each cell
            const data = rows.map(row => row.split(",").map(cell => cell.trim()));
            console.log(data); // Log to console for debugging
            
            // Display parsed data in the output element
            document.getElementById("output").textContent = JSON.stringify(data, null, 2);
        };

        reader.readAsText(file); // Read the file as text
    } else {
        console.log("No file selected");
    }
});