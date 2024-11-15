// Define courses with time slots for lectures, labs, and tutorials
const courseTimes = {
    CET212: {
        lectures: [
            {course: 'CET212', class: 'Lec 1', day: 'Sun', start: '12', end: '13', location: 'C2.1', lecturer: 'Dr. A'},
            {course: 'CET212', class: 'Lec 2', day: 'Mon', start: '12', end: '13', location: 'C2.1', lecturer: 'Dr. A'},
            {course: 'CET212', class: 'Lec 3', day: 'Wed', start: '12', end: '13', location: 'C2.1', lecturer: 'Dr. A'},
        ],
        labs: [
            {course: 'CET212', class: 'Lab 1', day: 'Tue', start: '14', end: '16', location: 'Lab1', lecturer: 'Dr. A'},
            {course: 'CET212', class: 'Lab 2', day: 'Thu', start: '14', end: '16', location: 'Lab1', lecturer: 'Dr. A'},
        ],
        tutorials: [
            {course: 'CET212', class: 'Tut 1', day: 'Fri', start: '10', end: '11', location: 'T1', lecturer: 'Dr. A'},
        ],
    },
    CET101: {
        lectures: [
            {course: 'CET101', class: 'Lec 1', day: 'Tue', start: '09', end: '10', location: 'B1.1', lecturer: 'Dr. B'},
            {course: 'CET101', class: 'Lec 2', day: 'Thu', start: '09', end: '10', location: 'B1.1', lecturer: 'Dr. B'},
        ],
        labs: [
            {course: 'CET101', class: 'Lab 1', day: 'Mon', start: '12', end: '14', location: 'Lab2', lecturer: 'Dr. B'},
        ],
        tutorials: [
            {course: 'CET101', class: 'Tut 1', day: 'Wed', start: '11', end: '12', location: 'T2', lecturer: 'Dr. B'},
        ],
    },
    CET303: {
        lectures: [
            {course: 'CET303', class: 'Lec 1', day: 'Mon', start: '14', end: '15', location: 'A3.2', lecturer: 'Dr. C'},
            {course: 'CET303', class: 'Lec 2', day: 'Wed', start: '15', end: '16', location: 'A3.2', lecturer: 'Dr. C'},
        ],
        labs: [
            {course: 'CET303', class: 'Lab 1', day: 'Thu', start: '15', end: '17', location: 'Lab3', lecturer: 'Dr. C'},
        ],
        tutorials: [
            {course: 'CET303', class: 'Tut 1', day: 'Fri', start: '13', end: '14', location: 'T3', lecturer: 'Dr. C'},
        ],
    },
    // CET404: {
    //     lectures: [
    //         {course: 'CET404', class: 'Lec 1', day: 'Fri', start: '09', end: '10', location: 'D4.1', lecturer: 'Dr. D'},
    //         {course: 'CET404', class: 'Lec 2', day: 'Fri', start: '11', end: '12', location: 'D4.1', lecturer: 'Dr. D'},
    //     ],
    //     labs: [
    //         {course: 'CET404', class: 'Lab 1', day: 'Wed', start: '10', end: '12', location: 'Lab4', lecturer: 'Dr. D'},
    //     ],
    //     tutorials: [
    //         {course: 'CET404', class: 'Tut 1', day: 'Thu', start: '08', end: '09', location: 'T4', lecturer: 'Dr. D'},
    //     ],
    // }
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

    return !(class1.end <= class2.start || class2.end <= class1.start); // True if they overlap
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
    const { lectures = [], labs = [], tutorials = [] } = courseTimes[course]; // Default to empty arrays

    // Replace empty lists with a placeholder null option
    const lectureOptions = lectures.length ? lectures : [null];
    const labOptions = labs.length ? labs : [null];
    const tutorialOptions = tutorials.length ? tutorials : [null];

    // Iterate through all combinations of lecture, lab, and tutorial
    for (let lectureTime of lectureOptions) {
        for (let labTime of labOptions) {
            for (let tutorialTime of tutorialOptions) {
                const newSchedule = [
                    ...currentSchedule,
                    ...(lectureTime ? [lectureTime] : []),  // Add lecture if present
                    ...(labTime ? [labTime] : []),          // Add lab if present
                    ...(tutorialTime ? [tutorialTime] : []) // Add tutorial if present
                ];

                // Recursively generate schedules if valid
                if (isValidSchedule(newSchedule)) {
                    generateSchedules(remainingCourses, newSchedule, results);
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
