import { renderSchedule } from './uiFunctions.js';
import { showError } from './alert.js';
const savedSchedule = localStorage.getItem('savedSchedule');


document.addEventListener('DOMContentLoaded', () => {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
        document.getElementById('navbar').innerHTML = data;
    });
    fetch('alert.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('errorOverlay').innerHTML = data;
    });
    fetch('scheduleVisuals.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('schedule-container').innerHTML = data;
            if (savedSchedule) {
                const schedule = JSON.parse(savedSchedule);
                renderSchedule(schedule);
            }else{
                showError("No schedule found", "Please import a schedule first");
            }
    });
    
    setTimeout(() => {
        
        
    }, 3000);
    
});