export function validateEntries(entries) {
    const courses = {};
    entries.forEach((entry, i) => {
        const { course, class: className, day, start, end, location, lecturer, type } = entry;
        if (!course || !type) {
            console.warn(`Skipping row ${i} due to missing 'course' or 'type'`);
            return;
        }

        if (!courses[course]) {
            courses[course] = { lectures: [], labs: [], tutorials: [] };
        }

        const session = { course, class: className, day, start, end, location, lecturer };
        if (type === "LEC") {
            courses[course].lectures.push(session);
        } else if (type === "LAB") {
            courses[course].labs.push(session);
        } else if (type === "Tutorials") {
            courses[course].tutorials.push(session);
        } else {
            console.warn(`Unrecognized type '${type}' at row ${i}`);
        }
    });
    return courses;
}