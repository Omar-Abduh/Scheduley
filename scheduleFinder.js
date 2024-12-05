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

    return !(class1.end <= class2.start || class2.end <= class1.start); // True if they overlap
}
// Function to check if a schedule has any conflicts
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

// Recursive function to generate all valid schedules
export function generateSchedules(courses,courseDetails, currentSchedule = [], results = []) {
    
    if (courses.length === 0) {
        // If no more courses to add, check for validity
        if (isValidSchedule(currentSchedule)) {
            results.push([...currentSchedule]); // Store valid schedule
        }
        return;
    }

    // Get the first course and iterate over each of its time slots
    // const [course, ...remainingCourses] = selectedResults;
    const [course, ...remainingCourses] = courses;
    const { lectures, labs, tutorials } = courseDetails[course];
    
    

    for (let lectureTime of lectures) {
        for (let labTime of labs) {
            if (tutorials == []) {
                for (let tutorialTime of tutorials) {
                    const newSchedule = [...currentSchedule, lectureTime, labTime, tutorialTime];
                    // Check for conflicts and proceed if none
                    if (isValidSchedule(newSchedule)) {
                        if(results.length == 240000){ // Limiting the number of schedules to 240000
                            return results;
                        }else{
                            generateSchedules(remainingCourses, courseDetails, newSchedule, results);
                        }
                    }
                }
            }else{
                const newSchedule = [...currentSchedule, lectureTime, labTime];
                // Check for conflicts and proceed if none
                if (isValidSchedule(newSchedule)) {
                    if(results.length == 100){ // Limiting the number of schedules to 240000
                        return results;
                    }else{
                        generateSchedules(remainingCourses, courseDetails , newSchedule, results);
                    }
                }
            }
        }
    }
    return results; // Contains all valid schedules
}