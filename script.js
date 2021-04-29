import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  parse,
  getMonth,
} from "date-fns";

// Select some HTML elements we'll use
const dateButton = document.querySelector(".date-picker-button");
const currentMonth = document.querySelector(".current-month");
const calendarDaysContainer = document.querySelector(".date-picker-grid-dates");

// Show or hide the modal when the button is clicked
dateButton.addEventListener("click", showHideDateModal);
function showHideDateModal(e) {
  const dateModal = document.querySelector(".date-picker");
  dateModal.classList.toggle("show");
}

// Fetch today's date
const today = new Date();

// When page loads, the button shows today's date
setButtonDate(today);
// When page loads and the modal is opened, it shows the current month
setCurrentMonth(today);
calendarDaysContainer.innerHTML = renderDates(today);

// When modal is open, the date on the button needs to also be selected on calendar
const initiallySelectedDate = document.querySelector(
  `[data-date="${dateButton.innerText}"]`
);
initiallySelectedDate.classList.add("selected");

/* What happens when I click on the right arrow? */
const nextArrow = document.querySelector(".next-month-button");
nextArrow.addEventListener("click", () => {
  const parsedDate = parse(currentMonth.innerText, "LLLL - yyyy", new Date());
  const nextMonth = getNextMonth(parsedDate);
  calendarDaysContainer.innerHTML = renderDates(nextMonth);
  setCurrentMonth(nextMonth);
});

/* What happens when I click on the left arrow? */
const prevArrow = document.querySelector(".prev-month-button");
prevArrow.addEventListener("click", () => {
  const parsedDate = parse(currentMonth.innerText, "LLLL - yyyy", new Date());
  const prevMonth = getPreviousMonth(parsedDate);
  calendarDaysContainer.innerHTML = renderDates(prevMonth);
  setCurrentMonth(prevMonth);
});

/* What happens when I select a date in the calendar? */
calendarDaysContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".date")) return;
  const selectAllDates = document.querySelectorAll(".date");
  selectAllDates.forEach((date) => {
    date.classList.remove("selected");
  });
  e.target.classList.add("selected");
  const selectedDate = parse(
    e.target.dataset.date,
    "LLLL do, yyyy",
    new Date()
  );
  setButtonDate(selectedDate);
});

// Set date of the button
function setButtonDate(selectedDate) {
  dateButton.innerText = format(selectedDate, "LLLL do, yyyy");
}

// set month and year of the calendar displayed
function setCurrentMonth(someDate) {
  currentMonth.innerText = format(someDate, "LLLL - yyyy");
}

// Create variables to hold the value of previous and next month
function getNextMonth(randomDate) {
  return addMonths(randomDate, 1);
}
function getPreviousMonth(randomDate) {
  return subMonths(randomDate, 1);
}

/* List all days of the month */
// 1- Find 1st day of any month
function whenMonthStarts(randomDate) {
  return startOfMonth(randomDate);
}

// 2- Find last day of any month
function whenMonthEnds(randomDate) {
  return endOfMonth(randomDate);
}

// 3- find start of week for 1st day of the month
function whenIsStartWeek(whenMonthStartsFunction) {
  return startOfWeek(whenMonthStartsFunction);
}

// 4- find endofweek for last day of the month
function whenIsEndWeek(whenMonthEndsFunction) {
  return endOfWeek(whenMonthEndsFunction);
}

// 5- create array of date from interval
function createArrayFromInterval(date) {
  return eachDayOfInterval({
    start: whenIsStartWeek(whenMonthStarts(date)),
    end: whenIsEndWeek(whenMonthEnds(date)),
  });
}

/* Render interval of dates */
// map the array / create div / add classes / insert the day / add the attribute
function renderDates(date) {
  return createArrayFromInterval(date)
    .map((date) => {
      const dateButt = document.createElement("button");
      const parsedDate = parse(
        currentMonth.innerText,
        "LLLL - yyyy",
        new Date()
      );
      dateButt.classList.add("date");
      if (getMonth(date) !== getMonth(parsedDate))
        dateButt.classList.add("date-picker-other-month-date");
      dateButt.dataset.date = format(date, "LLLL do, yyyy");
      dateButt.innerText = format(date, "d");
      return dateButt.outerHTML;
    })
    .reduce((sum, current) => {
      return sum + current;
    });
}
