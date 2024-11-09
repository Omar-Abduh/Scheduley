const Offered_courses = {
    CET212: {
        lectures: [
            {course: 'CET212', class: 'Lec 1', day: 'Sun', start: '12', end: '13', location: 'C2.1', lecturer: 'Dr. A'},
            {course: 'CET212', class: 'Lec 2', day: 'Mon', start: '12', end: '13', location: 'C2.1', lecturer: 'Dr. A'},
            {course: 'CET212', class: 'Lec 3', day: 'Wed', start: '12', end: '13', location: 'C2.1', lecturer: 'Dr. A'},
        ],
        labs: [
            {course: 'CET212', class: 'Lab 1', day: 'Tue', start: '14', end: '16', location: 'Lab1', lecturer: 'Dr. A'},
            {course: 'CET212', class: 'Lab 2', day: 'Thu', start: '14', end: '16', location: 'Lab1', lecturer: 'Dr. A'},
        ],
        tutorials: [
            {course: 'CET212', class: 'Tut 1', day: 'Fri', start: '10', end: '11', location: 'T1', lecturer: 'Dr. A'},
        ],
    },
    CET101: {
        lectures: [
            {course: 'CET101', class: 'Lec 1', day: 'Tue', start: '10', end: '11', location: 'B1.1', lecturer: 'Dr. B'},
            {course: 'CET101', class: 'Lec 2', day: 'Thu', start: '10', end: '11', location: 'B1.1', lecturer: 'Dr. B'},
        ],
        labs: [
            {course: 'CET101', class: 'Lab 1', day: 'Mon', start: '12', end: '14', location: 'Lab2', lecturer: 'Dr. B'},
        ],
        tutorials: [
            {course: 'CET101', class: 'Tut 1', day: 'Wed', start: '11', end: '12', location: 'T2', lecturer: 'Dr. B'},
        ],
    },
    CET303: {
        lectures: [
            {course: 'CET303', class: 'Lec 1', day: 'Mon', start: '14', end: '15', location: 'A3.2', lecturer: 'Dr. C'},
            {course: 'CET303', class: 'Lec 2', day: 'Wed', start: '14', end: '15', location: 'A3.2', lecturer: 'Dr. C'},
        ],
        labs: [
            {course: 'CET303', class: 'Lab 1', day: 'Thu', start: '15', end: '17', location: 'Lab3', lecturer: 'Dr. C'},
        ],
        tutorials: [
            {course: 'CET303', class: 'Tut 1', day: 'Fri', start: '13', end: '14', location: 'T3', lecturer: 'Dr. C'},
        ],
    },
    CET404: {
        lectures: [
            {course: 'CET404', class: 'Lec 1', day: 'Fri', start: '09', end: '10', location: 'D4.1', lecturer: 'Dr. D'},
            {course: 'CET404', class: 'Lec 2', day: 'Fri', start: '11', end: '12', location: 'D4.1', lecturer: 'Dr. D'},
        ],
        labs: [
            {course: 'CET404', class: 'Lab 1', day: 'Wed', start: '10', end: '12', location: 'Lab4', lecturer: 'Dr. D'},
        ],
        tutorials: [
            {course: 'CET404', class: 'Tut 1', day: 'Thu', start: '09', end: '10', location: 'T4', lecturer: 'Dr. D'},
        ],
    },
};

const courses = {
    CET212: {
        name: 'Data Structures and Algorithms',
        code: 'CET212',
        credits: 3,
        prerequisite: 'CET101',
        offered: Offered_courses.CET212,
    },
    CET101: {
        name: 'Introduction to Computer Science',
        code: 'CET101',
        credits: 3,
        prerequisite: null,
        offered: Offered_courses.CET101,
    },
    CET303: {
        name: 'Software Engineering',
        code: 'CET303',
        credits: 3,
        prerequisite: 'CET212',
        offered: Offered_courses.CET303,
    },
    CET404: {
        name: 'Computer Networks',
        code: 'CET404',
        credits: 3,
        prerequisite: 'CET303',
        offered: Offered_courses.CET404,
    },
}