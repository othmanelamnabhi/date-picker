import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  getMonth,
} from "date-fns";

// Select the date picker button and add an event listener to it
const dateButton = document.querySelector(".date-picker-button");
dateButton.addEventListener("click", showDateModal);

function showDateModal(e) {
  const dateModal = document.querySelector(".date-picker");
  dateModal.classList.toggle("show");
}

// When page loads, the button shows today's date
const today = new Date();
dateButton.innerText = format(today, "LLLL do, yyyy");

// Create variables to hold the value of previous and next month
const nextMonth = (randomDate) => addMonths(randomDate, 1);
const previousMonth = (randomDate) => subMonths(randomDate, 1);

console.log(previousMonth(today), nextMonth(today));

/* List all days of the month */
// 1- Find 1st day of any month
const whenMonthStarts = (randomDate) => startOfMonth(randomDate);

console.log(whenMonthStarts(today));

// 2- Find last day of any month
const whenMonthEnds = (randomDate) => endOfMonth(randomDate);

console.log(whenMonthEnds(today));

// 3- find start of week for 1st day of the month
const whenIsStartWeek = (whenMonthStartsFunction) =>
  startOfWeek(whenMonthStartsFunction);

console.log(whenIsStartWeek(whenMonthStarts(today)));

// 4- find endofweek for 1st day
const whenIsEndWeek = (whenMonthEndsFunction) =>
  endOfWeek(whenMonthEndsFunction);

console.log(whenIsEndWeek(whenMonthEnds(today)));

// 5- create array of date from interval
const createArrayFromInterval = () =>
  eachDayOfInterval({
    start: whenIsStartWeek(whenMonthStarts(today)),
    end: whenIsEndWeek(whenMonthEnds(today)),
  });

console.log(createArrayFromInterval());
