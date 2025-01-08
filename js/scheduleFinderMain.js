import { generateSchedules } from './scheduleFinder.js';  // Adjust the path as needed
import { initFileHandler } from './filesHandler.js';
import { renderSchedule } from './uiFunctions.js';

// Initialize the file handler
initFileHandler(); //TODO: only load when needed
// Usage

// const allSchedules = generateSchedules(courses,courseDetails);

// console.log("Total valid schedules found:", allSchedules.length);
// console.log("Example valid schedule:", allSchedules[0]); // Print one example schedule
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('navbar').innerHTML = data;
});
fetch('scheduleVisuals.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('schedule-container').innerHTML = data;
});


let viewIndex = 0;

document.getElementById("save-import-button").addEventListener("click", function() {
    const savedSchedule = localStorage.getItem('coursesData');
    if (!savedSchedule) {
        alert("An error happened please import a schedule again");
        return;
    }
    // Change the style of the upload container
    document.getElementById("upload-container").style.display = "none";
    document.getElementById("course-selection-container").style.display = "block";
});

document.getElementById("show-filter-menu-button").addEventListener("click", function() {
    document.getElementById("course-selection-container").style.display = "none";
    document.getElementById("filter-selection-menu").style.display = "block";
});
document.getElementById("processButton").addEventListener("click", function() {
    window.allSchedules = generateSchedules(selectedResults,selectedData);
    console.log("Total schedule made: " + allSchedules.length);
    document.getElementById("center-container").style.display = "none";
    document.getElementById("schedule-details-container").style.display = "block";
    renderSchedule(allSchedules[0]);
    viewIndex = 0;
});

document.getElementById("back").addEventListener("click", function() {
    viewIndex--;
    renderSchedule(allSchedules[viewIndex]);
});

document.getElementById("next").addEventListener("click", function() {
    viewIndex++;
    renderSchedule(allSchedules[viewIndex]);
});

document.getElementById("save-schedule-button").addEventListener("click", function() {
    localStorage.setItem('savedSchedule', JSON.stringify(allSchedules[viewIndex]));
    alert('Schedule saved successfully!');
});
