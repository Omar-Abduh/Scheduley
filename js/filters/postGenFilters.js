//Helper functions that turns time strings into minutes
function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function numOfDaysFilter(schedules) {
    const classifications = {};

    for (const schedule of schedules) {
        const uniqueDays = new Set(schedule.map(session => session.day));
        const daysCount = uniqueDays.size;

        if (daysCount >= 1 && daysCount <= 5) {
            const daysKey = daysCount;
            if (!classifications[daysKey]) {
                classifications[daysKey] = [];
            }
            classifications[daysKey].push(schedule);
        } else {
            console.log("Classes are spread over more than five days.");
            console.log(schedule);
        }
    }
    return classifications;
}

function findSchedulesWithGaps(schedules) {
    // Check for no back-to-back sessions in a single schedule
    const hasNoBackToBack = (schedule) => {
        // Group sessions by day
        const sessionsByDay = {};
        schedule.forEach((session) => {
            if (!sessionsByDay[session.day]) {
                sessionsByDay[session.day] = [];
            }
            sessionsByDay[session.day].push(session);
        });

        // Check for gaps within each day
        for (const day in sessionsByDay) {
            const sessions = sessionsByDay[day];
            // Sort sessions by start time
            sessions.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

            // Check if any two sessions are back-to-back
            for (let i = 1; i < sessions.length; i++) {
                const prevEnd = timeToMinutes(sessions[i - 1].end);
                // const prevEnd = sessions[i - 1].end;
                const currentStart = timeToMinutes(sessions[i].start);
                // const currentStart = sessions[i].start;
                // console.log(sessions[i - 1],sessions[i],  prevEnd, currentStart);
                if (currentStart == prevEnd) {
                    return false; // Found a back-to-back session
                }
                if (currentStart - prevEnd < 60){
                    return false;
                }
            }
        }
        return true; // No back-to-back sessions found
    };

    // Filter schedules with no back-to-back sessions
    return schedules.filter(hasNoBackToBack);
}

function checkLabOrTutorialAfterLecture(schedules) {
    // Check if labs/tutorials occur after the corresponding lecture in a single schedule
    const hasValidLabOrTutorial = (schedule) => {
        // Group sessions by course
        const sessionsByCourse = {};
        schedule.forEach((session) => {
            if (!sessionsByCourse[session.course]) {
                sessionsByCourse[session.course] = [];
            }
            sessionsByCourse[session.course].push(session);
        });

        // Check each course
        for (const course in sessionsByCourse) {
            const sessions = sessionsByCourse[course];

            // Separate lectures and labs/tutorials
            const lectures = sessions.filter((s) => s.class.toLowerCase().includes('lecture'));
            const labsOrTutorials = sessions.filter((s) => 
                s.class.toLowerCase().includes('lab') || s.class.toLowerCase().includes('tutorial')
            );

            // Check if any lab/tutorial is before the lecture
            for (const labOrTutorial of labsOrTutorials) {
                const labStartTime = timeToMinutes(labOrTutorial.start);

                for (const lecture of lectures) {
                    const lectureEndTime = timeToMinutes(lecture.end);
                    if (labStartTime < lectureEndTime) {
                        return false; // Lab/tutorial starts before the lecture ends
                    }
                }
            }
        }
        return true; // All labs/tutorials are after their lectures
    };

    // Filter schedules with valid lab/tutorial times
    return schedules.filter(hasValidLabOrTutorial);
}

function removeSingleSessionDays(schedules) {
    const hasNoSingleSessionDays = (schedule) => {
        // Count sessions per day
        const dayCounts = schedule.reduce((counts, session) => {
            counts[session.day] = (counts[session.day] || 0) + 1;
            return counts;
        }, {});

        // Check if all days have more than one session
        return Object.values(dayCounts).every(count => count > 1);
    };

    // Filter schedules that have no single-session days
    return schedules.filter(hasNoSingleSessionDays);
}