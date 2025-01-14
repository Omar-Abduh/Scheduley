function introRenderSchedule(schedule, customColors={}) {
    // Clear all previously rendered blocks
    document.querySelectorAll('.class-block').forEach(block => block.remove());

    schedule.forEach(session => {
        // Possition logic start
        const dayColumn = document.querySelector(`.day-column[data-day="${session.day}"]`);
        
        if (!dayColumn) {
            console.error(`No column found for day: ${session.day}`);
            return;
        }

        const startTime = parseInt(session.start);
        const endTime = parseInt(session.end);
        const duration = endTime - startTime;

        const block = document.createElement("div");
        block.className = "class-block "+ session.course;
        block.style.top = `${(startTime - 8) * 50}px`; // Adjust 8 to match your dayStart time
        block.style.height = `${duration * 50}px`;
        // Possition logic end
        
        // Add text if not a filler block
        if (session.course !== "Filler") {
            // Create main text element
            const className = document.createElement("div");
            className.textContent = `${session.class}`;
            block.appendChild(className);
        }
        // Add custom color if available, otherwise use default
        if (session.course === "Options") {
            block.addEventListener('click', () => {
                window.location.href = session.action;
            });
            // Create additional text element
            const additionalInfo = document.createElement("div");
            additionalInfo.textContent = `${session.details}`; // Example: adding time info
            additionalInfo.style.fontSize = "smaller";
            block.appendChild(additionalInfo);
        }

        if (customColors[session.course]){
            block.style.backgroundColor = customColors[session.course];
        }
        dayColumn.appendChild(block);
    });
}
const customColors = {
    // "CET211": "#FFD700",
    // "CET212": "#FF6347",
    // "CET213": "#20B2AA",
    // "CET214": "#FFD700",
    // "CET291": "#FF6347",
    // "HUM231": "#20B2AA",
    "Warn": "#D82323",
    "Options": "#CE3602",
    "Filler": "#d1d1d1",
    "Other": "#5F0202",
}


function loadScheduleFromJSON(filename) {
    return fetch(filename)
        .then(response => response.json())
        .then(data => {
            
            // for (let schedule of data) {
            //     renderSchedule(schedule);
            //     console.log('Schedule loaded:', schedule);
            //     // Using vanilla setTimeout with callback
            //     setTimeout(() => { /* continue */ }, 1000);

            //     // Or using regular Promise syntax
            //     // new Promise(resolve => setTimeout(resolve, 1000));
            // }
            let index = 0;
            console.log('Schedule loaded:', data);
            introRenderSchedule(data[20],customColors);
            // const interval = setInterval(() => {
            //     if (index < data.length) {
            //         introRenderSchedule(data[index],customColors);
            //         index++;
            //     } else {
            //         clearInterval(interval); // Stop the interval when the list ends
            //     }
            // }, 200); // 1000ms = 1 second
        })
        .catch(error => {
            console.error('Error loading schedule:', error);
        });
}

loadScheduleFromJSON('20schedules.json');


