import { findSchedule } from './scheduleFinder.js';  // Adjust the path as needed
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

function getSelectedFilters() {
    const chosenDays = document.querySelector('input[name="numOfDays"]:checked');
    const chosenGaps = document.querySelector('input[name="findSchedulesWithGaps"]:checked');
    const chosenLabOrTutorialAfterLecture = document.querySelector('input[name="checkLabOrTutorialAfterLecture"]:checked');

    if (selectedRadio) {
      console.log("Selected setting:", selectedRadio.value);
      return selectedRadio.value;
    } else {
      console.log("No setting selected.");
      return null;
    }
  }
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
    //Get filter values first
    const chosenDays = document.querySelector('input[name="numOfDays"]:checked');
    const chosenGaps = document.querySelector('input[name="findSchedulesWithGaps"]:checked');
    const chosenLabOrTutorialAfterLecture = document.querySelector('input[name="checkLabOrTutorialAfterLecture"]:checked');
    //Pack the filter values into an object to pass to the schedule generator
    const filterData = {
        days: chosenDays ? chosenDays.value : "any", //default to any if no value is selected
        numOfDays: chosenDays ? chosenDays.value : "any", //default to any if no value is selected
        gaps: chosenGaps ? chosenGaps.value : false, //default to false if no value is selected
        labOrTutorialAfterLecture: chosenLabOrTutorialAfterLecture ? chosenLabOrTutorialAfterLecture.value : false //default to false if no value is selected
    };
    window.allSchedules = findSchedule(selectedResults,selectedData,filterData);
    console.log("Total schedules found: " + allSchedules.length);
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
