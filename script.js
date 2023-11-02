// script.js
document.addEventListener('DOMContentLoaded', function() {
  createCalendar(document.getElementById('calendar'), new Date());

  // Event delegation to handle click on calendar days
  document.getElementById('calendar').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('day')) {
      const time = prompt('Enter the time you started smoking (HH:MM)');
      // Save the data and update the color
      if (time) {
        const day = e.target.getAttribute('data-date');
        localStorage.setItem(day, time);
        e.target.style.backgroundColor = getColorForTime(time);
      }
    }
  });
});

function createCalendar(container, date) {
  // Code to create days and attach to container...
}

function getColorForTime(time) {
  // Code to determine color based on time...
}
