import { generateSchedules } from './scheduleFinder.js'; // Adjust the path as needed
import { specificDayFilter } from './filters/dataSetAlterFilters.js';
import { initFileHandler } from './filesHandler.js';
import { renderSchedule } from './uiFunctions.js';
import { populatelist } from './uiFunctions.js';

// Initialize the file handler
initFileHandler(); //TODO: only load when needed
// Usage

// const allSchedules = generateSchedules(courses,courseDetails);

// console.log("Total valid schedules found:", allSchedules.length);
// console.log("Example valid schedule:", allSchedules[0]); // Print one example schedule

let coursesData = JSON.parse(localStorage.getItem('coursesData')) || [];
let userSchedule = JSON.parse(localStorage.getItem('userSchedule')) || [];

if (coursesData) {
    populatelist(coursesData);
}
let viewIndex = 0;

document.getElementById("processButton").addEventListener("click", function() {
    console.log(selectedResults);
    window.test = specificDayFilter(selectedData, ["MON", "WED"]);
    console.log("before: ", selectedData);
    console.log("after: ", test);
    window.allSchedules = generateSchedules(selectedResults,test);
    console.log("Total schedules = ", allSchedules.length);
    renderSchedule(allSchedules[0]);
    viewIndex = 0;
});

document.getElementById("back").addEventListener("click", function() {
    viewIndex--;
    renderSchedule(test[viewIndex]);
});

document.getElementById("next").addEventListener("click", function() {
    viewIndex++;
    renderSchedule(test[viewIndex]);
});