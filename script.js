// Get current date information
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const todayDate = now.getDate();

// Days of the week
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Get the first day of the month
const firstDay = new Date(currentYear, currentMonth, 1);

// Get the last day of the month
const lastDay = new Date(currentYear, currentMonth + 1, 0);

// Create calendar
function createCalendar(year, month) {
  const calendarDiv = document.getElementById('calendar');
  calendarDiv.innerHTML = ''; // Clear existing table
  
  // Create table element
  const table = document.createElement('table');
  table.className = 'calendar-table';
  
  // Create header row
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  weekDays.forEach(dayName => {
    const th = document.createElement('th');
    th.textContent = dayName;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create body of the calendar
  const tbody = document.createElement('tbody');
  let date = 1; // Start from the first day of the month
  for (let row = 0; row < 6; row++) { // Calendar has max 6 rows
    const tr = document.createElement('tr');
    
    for (let day = 0; day < 7; day++) {
      const td = document.createElement('td');
      if ((row === 0 && day < firstDay.getDay()) || date > lastDay.getDate()) {
        td.classList.add('empty');
        tr.appendChild(td);
        continue;
      }
      
      td.textContent = date;
      if (date === todayDate && month === now.getMonth() && year === now.getFullYear()) {
        td.classList.add('today');
      }
      
      tr.appendChild(td);
      date++;
    }
    
    tbody.appendChild(tr);
    
    // Stop creating rows if we've run out of dates
    if (date > lastDay.getDate()) {
      break;
    }
  }
  
  table.appendChild(tbody);
  calendarDiv.appendChild(table);
}

// Initial call to create calendar
createCalendar(currentYear, currentMonth);
