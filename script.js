// Define courses with time slots for lectures, labs, and tutorials
const courseTimes = {
    course1: {
        lecture: ["c2 lec1 Mon 9-10", "c2 lec2 Wed 10-11","c2 lec2 Wed 10-11","c2 lec2 Wed 10-11", "c2 lec1 Mon 9-10"], 
        lab: ["c2 lab 1 Tue 2-4", "c2 lab2 Fri 2-4"], 
        tutorial: ["c2 tut1 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4", "c2 tut2 Thu 3-4"] 
    }
};
// Conflict cache to store known conflicts
const conflictCache = new Set();

// Helper function to generate a unique key for two conflicting sessions
function getConflictKey(session1, session2) {
    return [session1.course + session1.class, session2.course + session2.class].sort().join("-");
}

// Helper function to check if two time slots overlap
function timesOverlap(class1, class2) {
    // Check if they are on the same day
    //const lecture = courses.CET212.lectures[2].class;
    if (class1.day !== class2.day) return false; // No overlap if different days

    return !(end1 <= start2 || end2 <= start1); // True if they overlap
}

// Function to check if a schedule has any conflicts
function isValidSchedule(schedule) {
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
        }
    }
    return true; // No conflicts
}

let i = 0; // Counter to limit the number of schedules generated
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
                    if(i == 240000){
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
