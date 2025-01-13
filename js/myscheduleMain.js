import { renderSchedule } from './uiFunctions.js';
import { showAlert } from './alert.js';
const savedSchedule = localStorage.getItem('savedSchedule');

fetch('nav.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('navbar').innerHTML = data;
});
fetch('scheduleVisuals.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('schedule-container').innerHTML = data;
        if (savedSchedule !== "" && savedSchedule !== null) {
            const schedule = JSON.parse(savedSchedule);
            renderSchedule(schedule);
        } else {
            showAlert("No schedule found", "Please make a schedule first", "scheduleFinder.html", "Find a schedule");
        }
    });