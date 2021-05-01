// bring in elements from HTML, give them variable names

const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggle = document.querySelector('.toggle');

// index list of words that have number values ("Sunday" = 0)
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

// add click function to button using 'e' as event in the arrow function
toggle.addEventListener('click', (e) => {
  // bring in html element
  const html = document.querySelector('html');
  // check if html has the class 'dark'
  if (html.classList.contains('dark')) {
    // if it does, remove it and change button text to say 'Dark Mode'
    html.classList.remove('dark');
    e.target.innerHTML = 'Dark Mode';
  } else {
    // if it doesn't, add it and change button text to say 'Light Mode'
    html.classList.add('dark');
    e.target.innerHTML = 'Light Mode';
  }
});

// set function to get the time from new Date
function setTime() {
  // get time from built in Date method
  const time = new Date();
  // get Month
  const month = time.getMonth();
  // get day
  const day = time.getDay();
  // get Date
  const date = time.getDate();
  // get Hours
  const hours = time.getHours();
  // make clock 12 hour and not 24
  const hoursForClock = hours % 12;
  // get minutes
  const minutes = time.getMinutes();
  // get seconds
  const seconds = time.getSeconds();
  // ternary statement to set AM or PM based on whether the hours grow past 12
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // animate hour, min, sec hand elements by changing styles with string literal, using scale function
  hourEl.style.transform = `translate(-50%, -100%)rotate(${scale(
    hoursForClock,
    0,
    11,
    0,
    360
  )}deg)`;
  // hours' first two arguments are 0,11 (12 positions)
  minuteEl.style.transform = `translate(-50%, -100%)rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg)`;
  // mins and secs are 0,59 (60 positions)
  secondEl.style.transform = `translate(-50%, -100%)rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg)`;

  // update time using ternary to make minutes less than 10 take up two spaces
  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;
  // update day and month of year and change span element to value of date
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
// map hours of clock (0-12) to degrees of rotation (0-360) 👇
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

//  run setTime function
setTime();

// run setTime every one second
setInterval(setTime, 1000);
