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

  // Create table for the calendar
  let table = document.createElement('table');
  let tableHead = document.createElement('thead');
  let headerRow = document.createElement('tr');

  // Create the days of the week headers
  daysOfWeek.forEach(day => {
    let dayHeader = document.createElement('th');
    dayHeader.textContent = day;
    headerRow.appendChild(dayHeader);
  });
  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);

  let tableBody = document.createElement('tbody');
  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('td');
        row.appendChild(cell);
      } else if (date > numOfDays) {
        break;
      } else {
        let cell = document.createElement('td');
        let cellText = document.createElement('span');
        cellText.textContent = date;
        if (date === now.getDate() && year === now.getFullYear() && month === now.getMonth()) {
          cell.classList.add('current-day');
        }
        // Color the cell based on smoking data
        cell.style.backgroundColor = getHeatMapColor(date);
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }

    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  calendar.appendChild(table);
}

function getHeatMapColor(day) {
  let savedData = localStorage.getItem('smokingData');
  let smokingData = savedData ? JSON.parse(savedData) : {};
  let hours = smokingData[`${day}`]; // Retrieve the hours for the specific day

  // Color logic
  if (hours === 0) {
    return 'lightblue';
  } else if (hours <= 6) {
    return 'lightgreen';
  } else if (hours <= 18) {
    return 'orange';
  } else {
    return 'red';
  }
}

function saveSmokingTime(day, hours) {
  let smokingData = localStorage.getItem('smokingData');
  smokingData = smokingData ? JSON.parse(smokingData) : {};
  smokingData[day] = hours;
  localStorage.setItem('smokingData', JSON.stringify(smokingData));
}

// Additional logic to handle user inputs, like clicking on a day to input smoking data,
// can be added below. You can use event delegation on the table to handle this.
