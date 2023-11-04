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

function getHeatMapColor(day) {
  let savedData = localStorage.getItem('smokingData');
  let smokingData = savedData ? JSON.parse(savedData) : {};
  let hours = smokingData[day]; // Retrieve the hours for the specific day

  // Assuming hours is in 24-hour format and a value of 0 means no smoking
  if (hours === 0) {
    return 'blue';
  } else if (hours <= 6) {
    return 'red';
  } else if (hours <= 18) {
    return 'green';
  } else {
    return 'orange';
  }
}

// To save data you would have a function like:
function saveSmokingTime(day, hours) {
  let smokingData = localStorage.getItem('smokingData');
  smokingData = smokingData ? JSON.parse(smokingData) : {};
  smokingData[day] = hours;
  localStorage.setItem('smokingData', JSON.stringify(smokingData));
}


// Add more JavaScript to handle user input and local storage as needed
