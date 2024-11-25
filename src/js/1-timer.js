import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputItimer = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const timerDisplay = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    if (selectedDates[0] >= now) {
      userSelectedDate = selectedDates[0];
      buttonStart.disabled = false;
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: '#FFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        message: 'Illegal operation',
        messageColor: '#FFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        backgroundColor: '#EF4040',
        position: 'topRight',
        iconUrl: '../img/iconalert.svg',
      });
      buttonStart.disabled = true;
    }
    return;
  },
};

flatpickr(inputItimer, options);

buttonStart.addEventListener('click', onClick);

function onClick() {
  if (!userSelectedDate) return;
  buttonStart.disabled = true;
  inputItimer.disabled = true;

  intervalId = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;
    updateTimerDisplay(convertMs(timeLeft));

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      resetTimer();
      inputItimer.disabled = false;
      return;
    }
  }, 1000);
}

function updateTimerDisplay(time) {
  timerDisplay.days.textContent = addLeadingZero(time.days);
  timerDisplay.hours.textContent = addLeadingZero(time.hours);
  timerDisplay.minutes.textContent = addLeadingZero(time.minutes);
  timerDisplay.seconds.textContent = addLeadingZero(time.seconds);
}

function resetTimer() {
  updateTimerDisplay(convertMs(0));
}
