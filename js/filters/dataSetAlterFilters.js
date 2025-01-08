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