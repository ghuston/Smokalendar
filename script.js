document.addEventListener('DOMContentLoaded', function() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  buildCalendar(currentMonth, currentYear);
});

function buildCalendar(month, year) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const numOfDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let calendar = document.getElementById('calendar');
  calendar.innerHTML = ''; // Clear the previous calendar

  // Create the days of the week headers
  daysOfWeek.forEach(day => {
    let dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerText = day;
    calendar.appendChild(dayDiv);
  });

  // Add empty days for the first week if needed
  for (let i = 0; i < firstDay; i++) {
    let emptyDiv = document.createElement('div');
    emptyDiv.className = 'day';
    calendar.appendChild(emptyDiv);
  }

  // Add the days of the month
  for (let i = 1; i <= numOfDays; i++) {
    let dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    let dateDiv = document.createElement('div');
    dateDiv.innerText = i;
    dateDiv.className = 'date';
    dateDiv.style.backgroundColor = getHeatMapColor(); // Function to determine color
    dayDiv.appendChild(dateDiv);
    calendar.appendChild(dayDiv);
  }
}

function getHeatMapColor() {
  // Placeholder for heatmap color, adjust as needed
  let hours = Math.random() * 24; // Replace with actual hours
  if (hours < 6) {
    return 'red';
  } else if (hours < 12) {
    return 'green';
  } else if (hours < 18) {
    return 'orange';
  } else {
    return 'blue';
  }
}

// Add more JavaScript to handle user input and local storage as needed
