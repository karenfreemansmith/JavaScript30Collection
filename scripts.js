let countdown;
const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  console.log(seconds);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    clearInterval(countdown);
    const secondsLeft = Math.round((then - Date.now())/1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds/60);
  const remSeconds = seconds % 60;
  const display = `${minutes}:${remSeconds < 10 ? '0' : ''}${remSeconds}`;

  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  if(hour>12) {
    endTime.textContent = `Be back at: ${hour}:${minutes < 10? '0':''}${minutes} (${hour-12}:${minutes < 10? '0':''}${minutes} pm)`;
  } else {
    endTime.textContent = `Be back at: ${hour}:${minutes < 10? '0':''}${minutes} (am)`;
  }

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins*60);
  this.reset();
});
}
