// Description: This script is used to parse a CSV file containing course data and populate a dropdown with the course names.
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

// Array to store selected courses
// Event listener for course selection
document.getElementById("courseSelect").addEventListener("change", function(event) {
    let selectedCourses = Array.from(event.target.selectedOptions).map(option => option.value);
    const courses = event.target.courses;

    const selectedData = selectedCourses.reduce((acc, course) => {
        if (courses[course]) {
            acc[course] = courses[course];
        }
        return acc;
    }, {});
    window.selectedResults = selectedCourses;
    window.selectedData = selectedData;
    // let selectedCourses2 = Object.keys(JSON.stringify(selectedData, null, 2));
});

document.getElementById("daySelect").addEventListener("change", function(event) {
    const selectedDays = event.target.value;
    const filteredSchedules = classifications[`days${selectedDays}`];
    if (filteredSchedules) {
        window.allSchedules = filteredSchedules;
        viewIndex = 0;
        renderSchedule(allSchedules[0]);
    }
});

//--------------------End of import code--------------------
//--------------------Start of schedule gen code--------------------
// Conflict cache to store known conflicts
const conflictCache = new Set();

const classifications = {
    days1: [],
    days2: [],
    days3: [],
    days4: [],
    days5: []
};

// Helper function to generate a unique key for two conflicting sessions
function getConflictKey(session1, session2) {
    return [session1.course + session1.class, session2.course + session2.class].sort().join("-");
}
// Helper function to check if two time slots overlap
function timesOverlap(class1, class2) {
    // Check if they are on the same day
    //const lecture = courses.CET212.lectures[2].class;
    if (class1.day !== class2.day) return false; // No overlap if different days

    return !(class1.end <= class2.start || class2.end <= class1.start); // True if they overlap
}

//Functon to classify schedules based on the number of unique days
function classifier(schedule, uniqueDays) {
    const daysCount = uniqueDays.size;
    if (daysCount >= 1 && daysCount <= 5) {
        const days = `days${daysCount}`;
        classifications[days].push(schedule);
    } else {
        console.log("Classes are spread over more than five days.");
        console.log(schedule);
    }
}

// Function to check if a schedule has any conflicts
function isValidSchedule(schedule) {
    const uniqueDays = new Set();
    for (let i = 0; i < schedule.length; i++) {
        for (let j = i + 1; j < schedule.length; j++) {
            const conflictKey = getConflictKey(schedule[i], schedule[j]);

            // Skip if conflict is already known
            if (conflictCache.has(conflictKey)) {
                return false;
            }

            if (timesOverlap(schedule[i], schedule[j])) {
                conflictCache.add(conflictKey);
                return false; // Conflict found
            }
            if (!uniqueDays.has(schedule[i].day)) {
                uniqueDays.add(schedule[i].day);
            }
            if (!uniqueDays.has(schedule[j].day)) {
                uniqueDays.add(schedule[j].day);
            }
        }
    }
    classifier(schedule, uniqueDays);
    return true; // No conflicts
}

// Recursive function to generate all valid schedules
function newgenerateSchedules(courses, currentSchedule = [], results = []) {
    // Base case: If there are no more courses, add the current schedule to results
    if (courses.length === 0) {
        results.push([...currentSchedule]);
        return;
    }
  
    // Take first course and remaining courses
    const [courseId, ...remainingCourses] = courses;
    const course = selectedData[courseId];
  
    // For each type of class (lecture, lab, tutorial), create a new schedule with that class added
    for (const classType of ['lectures', 'labs', 'tutorials']) {
        if (!course[classType] || course[classType].length === 0) continue;
        
        course[classType].forEach(classItem => {
            // Check for time conflicts with existing classes in the current schedule
            if (currentSchedule.every(existingItem => !timesOverlap(existingItem, classItem))) {
                const newSchedule = [...currentSchedule, classItem];
                newgenerateSchedules(remainingCourses, newSchedule, results);
            }
        });
    }
  
    return results;
}

function generateSchedules(courses, currentSchedule = [], results = []) {
    if (courses.length === 0) {
        // If no more courses to add, check for validity
        if (isValidSchedule(currentSchedule)) {
            results.push([...currentSchedule]); // Store valid schedule
        }
        return;
    }

    // Get the first course and iterate over each of its time slots
    const [course, ...remainingCourses] = courses;
    const { lectures = [], labs = [], tutorials = [] } = selectedData[course]; // Default to empty arrays
    // Check if all session types are required and present
    if (lectures.length && labs.length && tutorials.length) {
        // If any required session is missing, return early
        return results;
    }
    // Replace empty lists with a placeholder null option
    
    for (let lectureTime of lectures) {
        for (let labTime of labs) {
            if (tutorials == []) {
                for (let tutorialTime of tutorials) {
                    const newSchedule = [...currentSchedule, lectureTime, labTime, tutorialTime];
                    // Check for conflicts and proceed if none
                    console.log("Ifed", newSchedule);
                    if (isValidSchedule(newSchedule)) {
                        if(results.length == 240000){ // Limiting the number of schedules to 240000
                            return results;
                        }else{
                            generateSchedules(remainingCourses, newSchedule, results);
                        }
                    }
                }
            }else{
                const newSchedule = [...currentSchedule, lectureTime, labTime];
                // Check for conflicts and proceed if none
                console.log("Elsed",newSchedule);
                if (isValidSchedule(newSchedule)) {
                    if(results.length == 100){ // Limiting the number of schedules to 240000
                        return results;
                    }else{
                        generateSchedules(remainingCourses, newSchedule, results);
                    }
                }
            }
        }
    }
    return results; // Contains all valid schedules
}



//--------------------End of schedule gen code--------------------
//--------------------Start of display code--------------------
function renderSchedule(schedule) {
    // Clear all previously rendered blocks
    document.querySelectorAll('.class-block').forEach(block => block.remove());

    schedule.forEach(session => {
        const dayColumn = document.querySelector(`.day-column[data-day="${session.day}"]`);
        
        if (!dayColumn) {
            console.error(`No column found for day: ${session.day}`);
            return;
        }

        const startTime = parseInt(session.start);
        const endTime = parseInt(session.end);
        const duration = endTime - startTime;

        const block = document.createElement("div");
        block.className = "class-block";
        block.style.top = `${(startTime - 8) * 50}px`; // Adjust 8 to match your dayStart time
        block.style.height = `${duration * 50}px`;
        block.textContent = `${session.course} - ${session.class} (${session.location})`;
        
        dayColumn.appendChild(block);
    });
    document.querySelector('.schedule-container').style.visibility = 'visible';
    document.getElementById("back").style.visibility = "visible";
    document.getElementById("next").style.visibility = "visible";
}

let viewIndex = 0;

document.getElementById("processButton").addEventListener("click", function() {
    window.allSchedules = newgenerateSchedules(selectedResults);
    console.log(allSchedules.length);
    console.log(allSchedules);
    document.getElementById("daySelect").style.visibility = "visible";
});

document.getElementById("back").addEventListener("click", function() {
    viewIndex--;
    renderSchedule(allSchedules[viewIndex]);
});

document.getElementById("next").addEventListener("click", function() {
    viewIndex++;
    renderSchedule(allSchedules[viewIndex]);
});