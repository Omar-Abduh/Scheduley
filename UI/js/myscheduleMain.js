import { renderSchedule } from './uiFunctions.js';

const savedSchedule = localStorage.getItem('savedSchedule');
if (savedSchedule) {
    const schedule = JSON.parse(savedSchedule);
    renderSchedule(schedule);
}