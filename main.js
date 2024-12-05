import { generateSchedules } from './scheduleFinder.js';  // Adjust the path as needed
import { initFileHandler } from './filesHandler.js';
import { renderSchedule } from './uiFunctions.js';

// Initialize the file handler
initFileHandler(); //TODO: only load when needed
// Usage

// const allSchedules = generateSchedules(courses,courseDetails);

// console.log("Total valid schedules found:", allSchedules.length);
// console.log("Example valid schedule:", allSchedules[0]); // Print one example schedule

let viewIndex = 0;

document.getElementById("processButton").addEventListener("click", function() {
    console.log(selectedResults);
    window.allSchedules = generateSchedules(selectedResults,courseDetails);
    console.log(allSchedules.length);
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