export function renderSchedule(schedule, customColors={}) {
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
        // Add custom color if available, otherwise use default, disabled for now
        if (customColors[session.course]){
            block.style.backgroundColor = customColors[session.course];
        }
        dayColumn.appendChild(block);
    });
}