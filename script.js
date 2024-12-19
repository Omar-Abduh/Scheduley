import { readFile } from './fileHandler.js';
import { parseCSV } from './csvParser.js';
import { validateEntries } from './validator.js';

// Rest of your code

document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        readFile(file, (csvData) => {
            const entries = parseCSV(csvData);
            const courses = validateEntries(entries);
            populateCourseDropdown(courses);
            storeCourseData(courses);
        });
    } else {
        console.log("No file selected");
    }
});

function populateCourseDropdown(courses) {
    const courseSelect = document.getElementById("courseSelect");
    courseSelect.innerHTML = '<option value="">Select courses</option>';
    Object.keys(courses).forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });
}

function storeCourseData(courses) {
    const courseSelect = document.getElementById("courseSelect");
    courseSelect.courses = courses;
}

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
});