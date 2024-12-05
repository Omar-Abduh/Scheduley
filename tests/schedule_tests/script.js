
        const schedule = [
            { course: "CET212", class: "Lecture", day: "Mon", start: "9", end: "10", location: "C2.1" },
            { course: "CET212", class: "Lec 1", day: "Sun", start: "12", end: "13", location: "C2.1"},
            { course: "CET2120", class: "Lab 1", day: "Tue", start: "14", end: "16", location: "Lab1"},
            { course: "CET212", class: "Tut 1", day: "Sun", "start": "10", end: "11", location: "T1"},
            { "course": "CET101", "class": "Lec 1", "day": "Tue", "start": "09", "end": "10", "location": "B1.1", "lecturer": "Dr. B" },
            { "course": "CET101", "class": "Lab 1", "day": "Mon", "start": "12", "end": "14", "location": "Lab2", "lecturer": "Dr. B" },
            { "course": "CET101", "class": "Tut 1", "day": "Wed", "start": "11", "end": "12", "location": "T2", "lecturer": "Dr. B" },
            { "course": "CET303", "class": "Lec 1", "day": "Mon", "start": "14", "end": "15", "location": "A3.2", "lecturer": "Dr. C" },
            { "course": "CET303", "class": "Lab 1", "day": "Thu", "start": "15", "end": "17", "location": "Lab3", "lecturer": "Dr. C" },
            { "course": "CET303", "class": "Tut 1", "day": "Sun", "start": "13", "end": "14", "location": "T3", "lecturer": "Dr. C" }
        ]
        const customColors = {
            "CET212": "#FFD700",
            "CET101": "#FF6347",
            "CET303": "#20B2AA"
        }

        async function fetchSchedule() {
            try {
                const response = await fetch('maker.js');
                const schedule = await response.json();
                renderSchedule(schedule);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        }

        fetchSchedule();
    
            function renderSchedule(schedule) {
                schedule.forEach(session => {
                    const dayColumn = document.querySelector(`.day-column[data-day="${session.day}"]`);
                    const startTime = parseInt(session.start);
                    const endTime = parseInt(session.end);
                    const duration = endTime - startTime;
    
                    const block = document.createElement("div");
                    block.className = "class-block";
                    block.style.top = `${(startTime - 8) * 50}px`; // Adjust 8 to match your dayStart time
                    block.style.height = `${duration * 50}px`;
                    block.textContent = `${session.course} - ${session.class} (${session.location})`;
                    if (customColors[session.course]){
                        block.style.backgroundColor = customColors[session.course];
                    }
                    dayColumn.appendChild(block);
                });
            }
    
            renderSchedule(schedule);