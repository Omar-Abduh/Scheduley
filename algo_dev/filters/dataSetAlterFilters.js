export function specificDayFilter(data, chosenDays) {
    const result = {};
  
    for (const course in data) {
      result[course] = {};
  
      for (const sessionType in data[course]) {
        //To skip empty session types
        if (data[course][sessionType].length != 0) {
          // Filter sessions based on chosen days
          result[course][sessionType] = data[course][sessionType].filter(session =>
            chosenDays.includes(session.day)
          );
          // If there are no sessions on the chosen days, return an error message
          if (result[course][sessionType].length == 0) {
            return "Not possible for " + course + " on " + chosenDays;
          }
        }
      }
    }
    return result;
}

//Allows the user to filter out specific sessions from the schedule
export function removeSessionsFilter(data, sessionsToRemove) {
  const result = {};

  for (const course in data) {
    if (!sessionsToRemove[course]) {
      // If the course is not in sessionsToRemove, include it as is
      result[course] = data[course];
      continue;
    }

    result[course] = {};

    for (const sessionType in data[course]) {
      // Check if the sessionType exists in sessionsToRemove for this course
      if (!sessionsToRemove[course][sessionType]) {
        result[course][sessionType] = data[course][sessionType];
        continue;
      }

      // Filter out the sessions that match the names in sessionsToRemove
      result[course][sessionType] = data[course][sessionType].filter(
        session => !sessionsToRemove[course][sessionType].includes(session.class)
      );
    }
  }

  return result;
}