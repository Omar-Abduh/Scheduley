import { generateSchedules } from './scheduleFinder.js';  // Adjust the path as needed

// Usage

const allSchedules = generateSchedules(courses,courseDetails);

console.log("Total valid schedules found:", allSchedules.length);
console.log("Example valid schedule:", allSchedules[0]); // Print one example schedule
