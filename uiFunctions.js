export function renderSchedule(schedule) {
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

export function populatelist(courses){
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
}