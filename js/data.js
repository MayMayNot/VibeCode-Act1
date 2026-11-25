// Edit this file to change what the portal shows. No backend needed.
const STUDENT = {
  name: "Maya Santos", id: "2024-10382", program: "BS Computer Science",
  year: "3rd Year", semester: "Fall Semester 2026", email: "maya.santos@northfield.edu",
  phone: "+63 917 555 0142", address: "Iloilo City, Western Visayas", birthday: "March 14, 2005",
  advisor: "Dr. Elena Ramos", advisorEmail: "e.ramos@northfield.edu", status: "Enrolled",
  bio: "Interested in web development and data visualization. Member of the Programming Guild."
};

// hue = colour of the course across the portal
const SCHEDULE = [
  { day: "Monday",    start: "08:00", end: "09:30", code: "CS301", course: "Algorithms",          room: "Room 204", teacher: "Prof. Reyes",   hue: 230 },
  { day: "Monday",    start: "13:00", end: "14:30", code: "CS320", course: "Web Development",     room: "Lab 3",    teacher: "Prof. Lim",     hue: 170 },
  { day: "Tuesday",   start: "10:00", end: "11:30", code: "MA250", course: "Linear Algebra",      room: "Room 118", teacher: "Dr. Cruz",      hue: 20 },
  { day: "Tuesday",   start: "14:00", end: "15:30", code: "CS340", course: "Databases",           room: "Lab 1",    teacher: "Prof. Tan",     hue: 280 },
  { day: "Wednesday", start: "08:00", end: "09:30", code: "CS301", course: "Algorithms",          room: "Room 204", teacher: "Prof. Reyes",   hue: 230 },
  { day: "Wednesday", start: "13:00", end: "14:30", code: "CS320", course: "Web Development",     room: "Lab 3",    teacher: "Prof. Lim",     hue: 170 },
  { day: "Thursday",  start: "10:00", end: "11:30", code: "MA250", course: "Linear Algebra",      room: "Room 118", teacher: "Dr. Cruz",      hue: 20 },
  { day: "Thursday",  start: "14:00", end: "15:30", code: "CS340", course: "Databases",           room: "Lab 1",    teacher: "Prof. Tan",     hue: 280 },
  { day: "Friday",    start: "09:00", end: "12:00", code: "EN210", course: "Technical Writing",   room: "Room 305", teacher: "Ms. Garcia",    hue: 340 }
];

const GRADES = [
  { code: "CS301", course: "Algorithms",        credits: 4, score: 91, hue: 230 },
  { code: "CS320", course: "Web Development",   credits: 3, score: 96, hue: 170 },
  { code: "MA250", course: "Linear Algebra",    credits: 3, score: 84, hue: 20 },
  { code: "CS340", course: "Databases",         credits: 4, score: 88, hue: 280 },
  { code: "EN210", course: "Technical Writing", credits: 2, score: 79, hue: 340 }
];

const ANNOUNCEMENTS = [
  { title: "Midterm exam schedule released", date: "2026-11-23", category: "Exams",
    body: "Midterm exams run from December 7 to December 11. Check the schedule page for your room assignments and bring your student ID." },
  { title: "Library extended hours", date: "2026-11-20", category: "Campus",
    body: "The main library will stay open until 11 PM from November 30 through December 18 to support exam preparation." },
  { title: "Enrollment for Spring 2027 opens", date: "2026-11-18", category: "Registrar",
    body: "Pre-enrollment starts January 5. Meet your academic advisor before December 20 to get your study plan approved." },
  { title: "Programming Guild hack night", date: "2026-11-15", category: "Events",
    body: "Join us Friday at 6 PM in Lab 3 for a relaxed build night. Pizza is provided. All skill levels are welcome." },
  { title: "Scholarship applications due", date: "2026-11-10", category: "Registrar",
    body: "Submit the merit scholarship form to the Student Affairs office by December 1. Late submissions will not be accepted." }
];
