// Define courses with time slots for lectures, labs, and tutorials
const courseTimes = {
    course1: { 
        lecture: ["c2 lec1 Mon 9-10", "c2 lec2 Wed 10-11","c2 lec2 Wed 10-11","c2 lec2 Wed 10-11", "c2 lec1 Mon 9-10"], 
        lab: ["c2 lab 1 Tue 2-4", "c2 lab2 Fri 2-4"], 
        tutorial: ["c2 tut1 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4"] 
    },
    course2: { 
        lecture: ["c2 lec1 Mon 9-10", "c2 lec2 Wed 10-11","c2 lec2 Wed 10-11","c2 lec2 Wed 10-11", "c2 lec1 Mon 9-10"], 
        lab: ["c2 lab 1 Tue 2-4", "c2 lab2 Fri 2-4"], 
        tutorial: ["c2 tut1 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4"] 
    },
    course3: { 
        lecture: ["c2 lec1 Mon 9-10", "c2 lec2 Wed 10-11","c2 lec2 Wed 10-11","c2 lec2 Wed 10-11", "c2 lec1 Mon 9-10"], 
        lab: ["c2 lab 1 Tue 2-4", "c2 lab2 Fri 2-4"], 
        tutorial: ["c2 tut1 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4"] 
    },
    course4: { 
        lecture: ["c2 lec1 Mon 9-10", "c2 lec2 Wed 10-11", "c2 lec2 Wed 10-11", "c2 lec2 Wed 10-11","c2 lec2 Wed 10-11"], 
        lab: ["c2 lab 1 Tue 2-4", "c2 lab2 Fri 2-4","c2 lab2 Fri 2-4","c2 lab2 Fri 2-4"], 
        tutorial: ["c2 tut1 Thu 3-4", "c2 tut2 Thu 3-4"] 
    },
    course5: { 
        lecture: ["c2 lec1 Mon 9-10", "c2 lec2 Wed 10-11", "c2 lec2 Wed 10-11", "c2 lec2 Wed 10-11","c2 lec2 Wed 10-11"], 
        lab: ["c2 lab 1 Tue 2-4", "c2 lab2 Fri 2-4","c2 lab2 Fri 2-4","c2 lab2 Fri 2-4"], 
        tutorial: ["c2 tut1 Thu 3-4", "c2 tut2 Thu 3-4"] 
    }
};

// Helper function to check if two time slots overlap
function timesOverlap(time1, time2) {
    if(time1 == "c2 lab 1 Tue 2-4"){
        return true;
    }
    return false; // Return true if times overlap, false otherwise
}
const test= { 
        lecture: ["c2 lec1 Mon 9-10", "c2 lec2 Wed 10-11","c2 lec2 Wed 10-11","c2 lec2 Wed 10-11", "c2 lec1 Mon 9-10"], 
        lab: ["c2 lab 1 Tue 2-4", "c2 lab2 Fri 2-4"], 
        tutorial: ["c2 tut1 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4"] 
    }
// Function to check if a schedule has any conflicts
function isValidSchedule(schedule) {
    for (let i = 0; i < schedule.length; i++) {
        for (let j = i + 1; j < schedule.length; j++) {
            if (timesOverlap(schedule[i], schedule[j])) {
                return false; // Conflict found
            }
        }
    }
    return true; // No conflicts
}
let i = 0;
// Recursive function to generate all valid schedules
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
    const { lecture, lab, tutorial } = courseTimes[course];

    for (let lectureTime of lecture) {
        for (let labTime of lab) {
            for (let tutorialTime of tutorial) {
                const newSchedule = [...currentSchedule, lectureTime, labTime, tutorialTime];
                
                // Check for conflicts and proceed if none
                if (isValidSchedule(newSchedule)) {
                    if(i == 240000){ // Limiting the number of schedules to 240000
                        return results;
                    }else{
                        i++;
                        generateSchedules(remainingCourses, newSchedule, results);
                    }
                }
            }
        }
    }

    return results; // Contains all valid schedules
}

// Usage
const courses = Object.keys(courseTimes);
const allSchedules = generateSchedules(courses);

console.log("Total valid schedules found:", allSchedules.length);
console.log("Example valid schedule:", allSchedules[0]); // Print one example schedule
