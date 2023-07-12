// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  const currentDayEl = document.getElementById('currentDay');
  const timeBlockEls = document.querySelectorAll('.time-block');
  const saveBtns = document.querySelectorAll('.saveBtn');

  let currentTime;

  function updateClock() {
    currentTime = dayjs().format('MMM-DD-YYYY HH:mm:ss');
    currentDayEl.textContent = currentTime;
  }

  function saveEvent(event) {
    const description = event.target.parentNode.querySelector('.description').value;
    const parentId = event.target.parentNode.id;

    const savedObject = {
      hour: parentId,
      eventInfo: description,
    };

    let existingEvents = JSON.parse(localStorage.getItem('events')) || [];
    const existingEventIndex = existingEvents.findIndex(event => event.hour === parentId);

    if (existingEventIndex !== -1) {
      existingEvents[existingEventIndex].eventInfo = description;
    } else {
      existingEvents.push(savedObject);
    }

    localStorage.setItem('events', JSON.stringify(existingEvents));
  }

  function checkTime() {
    const currentHour = parseInt(dayjs().format('H'), 10);

    timeBlockEls.forEach(timeBlock => {
      const hour = parseInt(timeBlock.id.split('-')[1], 10);

      timeBlock.classList.remove('past', 'present', 'future');

      if (hour < currentHour) {
        timeBlock.classList.add('past');
      } else if (hour === currentHour) {
        timeBlock.classList.add('present');
      } else {
        timeBlock.classList.add('future');
      }
    });
  }

  function updatePlanner() {
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];

    existingEvents.forEach(event => {
      const textarea = document.querySelector(`#${event.hour} .description`);
      if (textarea) {
        textarea.value = event.eventInfo;
      }
    });
  }

  checkTime();
  updatePlanner();

  saveBtns.forEach(saveBtn => {
    saveBtn.addEventListener('click', saveEvent);
  });

  updateClock();
  setInterval(updateClock, 1000);
});



// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.