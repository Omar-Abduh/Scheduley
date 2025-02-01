// import { findSchedule } from './scheduleFinder.js';  // Adjust the path as needed
import { initFileHandler } from './filesHandler.js';
import { renderSchedule } from './uiFunctions.js';
import { showAlert } from './alert.js';
let worker = new Worker("../js/scheduleFinder.js");

// Initialize the file handler
initFileHandler(); //TODO: only load when needed

window.selectedResults = null; //Temporary to check if courses are selected

fetch('nav.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('navbar').innerHTML = data;
});
fetch('scheduleVisuals.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('schedule-container').innerHTML = data;
        document.getElementById('right-panel').innerHTML = data;
});
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
});

function getSelectedFilters() {
    //Get filter values first
    const chosenDays = document.querySelector('input[name="numOfDays"]:checked');
    const chosenGaps = document.querySelector('input[name="findSchedulesWithGaps"]:checked');
    const chosenLabOrTutorialAfterLecture = document.querySelector('input[name="checkLabOrTutorialAfterLecture"]:checked');
    const chosenRemoveSingleSessionDays = document.querySelector('input[name="removeSingleSessionDays"]:checked');
    //Pack the filter values into an object to pass to the schedule generator
    const filterData = {
        days: chosenDays ? chosenDays.value : "any", //default to any if no value is selected
        numOfDays: chosenDays ? chosenDays.value : "any", //default to any if no value is selected
        gaps: chosenGaps ? chosenGaps.value : false, //default to false if no value is selected
        labOrTutorialAfterLecture: chosenLabOrTutorialAfterLecture ? chosenLabOrTutorialAfterLecture.value : false, //default to false if no value is selected
        chosenRemoveSingleSessionDays: chosenRemoveSingleSessionDays ? chosenRemoveSingleSessionDays.value : false //default to false if no value is selected
    };
    return filterData;
}

let viewIndex = 0;

document.getElementById("save-import-button").addEventListener("click", function() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files.length) {
        showAlert("No data found", "Please upload a schedule file first");
        return;
    }
    const savedSchedule = localStorage.getItem('coursesData');
    if (!savedSchedule) {
        showAlert("An error happened", "Please import a schedule again");
        return;
    }
    // Change the style of the upload container
    document.getElementById("upload-container").style.display = "none";
    document.getElementById("course-selection-container").style.display = "block";
});

document.getElementById("show-course-details-button").addEventListener("click", function() {
    if(!selectedResults){
        showAlert("No courses selected", "Please select courses first");
        return;
    }
    for(let i = 0; i < selectedResults.length; i++){
        const courseId = selectedResults[i];
        const courseData = JSON.parse(localStorage.getItem('coursesData'))[courseId];
        
        const courseDetailsDiv = document.createElement('div');
        courseDetailsDiv.className = 'course-card';
        courseDetailsDiv.innerHTML = `${courseData.title} <br> ${courseId} <br> Level: ${courseData.level}  CR: ${courseData.creditHours}`;
        document.getElementById('left-panel').appendChild(courseDetailsDiv);
        courseDetailsDiv.addEventListener('click', () => {
            const courseData = JSON.parse(localStorage.getItem('coursesData'))[courseId];
            if (courseData && courseData.sessions) {
            // Create a temporary schedule with just this course's sessions
            const singleCourseSchedule = {
                [courseId]: courseData.sessions
            };
            renderSchedule(singleCourseSchedule, "right-panel");
            } else {
                console.log(JSON.parse(localStorage.getItem('coursesData'))[courseId]);
                showAlert("No sessions", "This course has no available sessions");
            }
        });
        
    }
    document.getElementById("course-selection-container").style.display = "none";
    document.getElementById("course-details-container").style.display = "block";
});

document.getElementById("show-filter-menu-button").addEventListener("click", function() {
    // TODO: check if a course has no sessions chosen
    document.getElementById("course-details-container").style.display = "none";
    document.getElementById("filter-selection-menu").style.display = "block";
});

// Make schedule button
document.getElementById("processButton").addEventListener("click", function() {
    const filterData = getSelectedFilters();
    const startTime = Date.now();
    worker.postMessage({selectedResults, filterData, coursesData: JSON.parse(localStorage.getItem('coursesData'))});
    processOverlay.style.opacity = "1"; // Make visible
    processOverlay.style.visibility = "visible";
    worker.onmessage = function(e) {
        let data = e.data;
        console.log(data);
        if (data.type === "error") {
            console.error("Worker error:", data.message);
            showAlert("An error happened", "Please try again");
            processOverlay.style.opacity = "0";
            processOverlay.style.visibility = "hidden";
            return;
        }
        
        const timeElapsed = Date.now() - startTime;
        const minimumLoadTime = 5000; // 10 seconds

        const processResults = () => {
            if (data.schedules.length === 0) {
                showAlert("No schedules found", "Try adjusting your filters");
                return;
            }
            window.allSchedules = data.schedules;
            console.log("Total schedules found: " + allSchedules.length);
            document.getElementById("center-container").style.display = "none";
            document.getElementById("schedule-details-container").style.display = "block";
            renderSchedule(allSchedules[0], "schedule-details-container");
            viewIndex = 0;
            processOverlay.style.opacity = "0";
            processOverlay.style.visibility = "hidden";
        };

        if (timeElapsed < minimumLoadTime) {
            setTimeout(processResults, minimumLoadTime - timeElapsed);
        } else {
            processResults();
        }
    };
    worker.onerror = function(event) {
        console.error("Worker error:", event.message);
    };
});

document.getElementById("back").addEventListener("click", function() {
    viewIndex--;
    if(viewIndex < 0){
        viewIndex = allSchedules.length - 1;
    }
    renderSchedule(allSchedules[viewIndex], "schedule-details-container");
});

document.getElementById("next").addEventListener("click", function() {
    viewIndex++;
    if(viewIndex >= allSchedules.length){
        viewIndex = 0;
    }
    console.log(allSchedules[viewIndex])
    renderSchedule(allSchedules[viewIndex], "schedule-details-container");
});

document.getElementById("save-schedule-button").addEventListener("click", function() {
    localStorage.setItem('savedSchedule', JSON.stringify(allSchedules[viewIndex]));
    showAlert("Schedule saved", "Your schedule has been saved", "myschedule.html", "View schedule");
});

//Course selection cards code
export function loadCourseCardView(courses) {
    const courseGrid = document.getElementById('courseGrid');
    const selectedCourses = new Set(); // To track selected course IDs

    Object.entries(courses).forEach(([courseId, course]) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.dataset.id = courseId; // Use the courseId (key) here


        //TODO: add more details to the card
        card.innerHTML = ` 
        <div class="course-card-title">Course ID</div>
        <div class="course-card-code">${courseId}</div>
        <div class="course-card-details">Level:2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CR:4.0</div>
        `;
        // card.innerHTML = `
        // <div class="course-card-title">${course.title}</div>
        // <div class="course-card-code">${courseId}</div>
        // <div class="course-card-level">${course.level}</div>
        // <div class="course-card-creditHours">${course.creditHours}</div>
        // `;

        // Add click event listener
        card.addEventListener('click', () => {

        // Toggle selection
        if (selectedCourses.has(courseId)) {
            selectedCourses.delete(courseId); // Remove from selected set
            card.classList.remove('selected'); // Remove highlight
            window.selectedResults = Array.from(selectedCourses); // TODO: not store in global
        } else {
            selectedCourses.add(courseId); // Add to selected set
            card.classList.add('selected'); // Highlight card
            window.selectedResults = Array.from(selectedCourses);
        }
        });

        courseGrid.appendChild(card);
    });
}