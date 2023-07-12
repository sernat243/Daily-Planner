// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  let currentDayEl = document.getElementById('currentDay');
  let timeBlockEls = document.getElementsByClassName('time-block');
  let saveBtns = document.getElementsByClassName('saveBtn');

  let currentTime;

 

  function updateClock() {
    let currentTime = dayjs().format('MMM-DD-YYYY HH:mm:ss');
    currentDayEl.textContent = currentTime;
  }

  function saveEvent(event) {
    let description = event.target.previousElementSibling.value
    let parentId = event.target.parentNode.id;

    let savedObject = {
        hour: parentId,
        eventInfo: description,
      }

    let existingEventsString = localStorage.getItem('events');
    let existingEvents = existingEventsString ? JSON.parse(existingEventsString) : [];

    let updatedEvents = existingEvents.map(event => {
      if (event.hour === parentId) {
        event.eventInfo = description;
      }
      return event;
    });
    if (!existingEvents.some(event => event.hour === parentId)) {
      updatedEvents.push(savedObject);
    }

    localStorage.setItem('events', JSON.stringify(updatedEvents));
  }

   // localStorage.setItem('eventInfo', JSON.stringify(savedObject));

  //  console.log(parentId);
    //console.log(event.target);
    //console.log(description);
    //console.log(savedObject);
//};

  function checkTime() {
    let currentHour = parseInt(dayjs().format('H'), 10);
    console.log(currentHour);

    for (let i = 0; i < timeBlockEls.length; i++) {
      let timeBlock = timeBlockEls[i];
      let hour = parseInt(timeBlock.id.split('-')[1], 10);

      if (hour < currentHour) {
        timeBlock.classList.add('past');
      } else if (hour === currentHour) {
        timeBlock.classList.add('present');
      } else {
        timeBlock.classList.add('future');
      }
    }
  };

  function updatePlanner() {
    let existingEventsString = localStorage.getItem('events');
    if (existingEventsString) {
      let existingEvents = JSON.parse(existingEventsString);
      existingEvents.forEach(event => {
        let textarea = document.querySelector('#' + event.hour + ' .description');
        if (textarea) {
          textarea.value = event.eventInfo;
        }
      })

    }
  };

  checkTime();
  updatePlanner();

  for (let i = 0; i < saveBtns.length; i++) {
    saveBtns[i].addEventListener('click', saveEvent);
 };

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