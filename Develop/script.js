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