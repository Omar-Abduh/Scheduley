import { renderSchedule } from './uiFunctions.js';
const savedSchedule = localStorage.getItem('savedSchedule');


document.addEventListener('DOMContentLoaded', () => {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
        document.getElementById('navbar').innerHTML = data;
    });
    fetch('scheduleVisuals.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('schedule-container').innerHTML = data;
            if (savedSchedule) {
                const schedule = JSON.parse(savedSchedule);
                renderSchedule(schedule);
            }
    });
    
    setTimeout(() => {
        
        
    }, 3000);
    
});
