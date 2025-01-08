import { generateSchedules } from './scheduleFinder.js'; // Adjust the path as needed
import { removeSessionsFilter } from './filters/dataSetAlterFilters.js';
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
let sessionsToRemove = {
    "CET212": {
      "lectures": ["Lecture 06", "Lecture 02"],
      "labs": ["Lab 09", "Lab 13"],
      "tutorials": []
    },
    "CET211": {
      "lectures": ["Lecture 01", "Lecture 02"],
      "labs": ["Lab 04", "Lab 02"],
      "tutorials": []
    }
  }
document.getElementById("processButton").addEventListener("click", function() {
    console.log(selectedResults);
    window.test = removeSessionsFilter(selectedData, sessionsToRemove);
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