document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const csvData = event.target.result;
            const rows = csvData.split("\n").map(row => row.trim());

            // Parse the CSV headers
            const headers = rows[0].split(",").map(header => header.trim());

            const courses = {}; // Initialize the courses object

            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(",").map(value => value.trim());

                if (values.length !== headers.length) {
                    console.warn(`Skipping row ${i} due to mismatched columns`);
                    console.log(values.length, headers.length);
                    continue; // Skip any row that doesn't match header columns
                }

                const entry = {}; // Create an object to map headers to values
                headers.forEach((header, index) => {
                    entry[header] = values[index];
                });

                const { course, class: className, day, start, end, location, lecturer, type } = entry;

                if (!course || !type) {
                    console.warn(`Skipping row ${i} due to missing 'course' or 'type'`);
                    continue;
                }

                // Initialize the course if it doesn't exist
                if (!courses[course]) {
                    courses[course] = { lectures: [], labs: [], tutorials: [] };
                }

                const session = { course, class: className, day, start, end, location, lecturer };

                // Add the session to the appropriate array based on the type
                if (type === "LEC") {
                    courses[course].lectures.push(session);
                } else if (type === "LAB") {
                    courses[course].labs.push(session);
                } else if (type === "Tutorials") {
                    courses[course].tutorials.push(session);
                } else {
                    console.warn(`Unrecognized type '${type}' at row ${i}`);
                }
            }

            // Populate the course dropdown
            const courseSelect = document.getElementById("courseSelect");
            courseSelect.innerHTML = '<option value="">Select courses</option>'; // Reset dropdown
            Object.keys(courses).forEach(course => {
                const option = document.createElement("option");
                option.value = course;
                option.textContent = course;
                courseSelect.appendChild(option);
            });

            // Store the courses data for later use
            courseSelect.courses = courses;
        };
        reader.readAsText(file);
    } else {
        console.log("No file selected");
    }
});

// Event listener for course selection
document.getElementById("courseSelect").addEventListener("change", function(event) {
    let selectedCourses = Array.from(event.target.selectedOptions).map(option => option.value);
    const courses = event.target.courses;

    let selectedData = selectedCourses.reduce((acc, course) => {
        if (courses[course]) {
            acc[course] = courses[course];
        }
        return acc;
    }, {});

    document.getElementById("output").textContent = JSON.stringify(selectedData, null, 2);
    // selectedCourses = JSON.stringify(selectedData, null, 2);
});