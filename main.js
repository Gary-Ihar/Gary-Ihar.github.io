"use strict";
const span = document.querySelectorAll(".date-piker .calendar .one .date span");
const span2 = document.querySelectorAll(
  ".date-piker .calendar .two .date span"
);
const leftBtn1 = document.querySelector(
  ".date-piker .calendar .one .wrapper .left"
);
const rightBtn1 = document.querySelector(
  ".date-piker .calendar .one .wrapper .right"
);
const rightBtn2 = document.querySelector(
  ".date-piker .calendar .two .wrapper .right"
);
const mounthAndYear = document.querySelector(
  ".date-piker .calendar .one .wrapper .mounth"
);
const mounthAndYear2 = document.querySelector(
  ".date-piker .calendar .two .wrapper .mounth"
);
const input = document.querySelector(".date-piker input");
const calendar = document.querySelector(".date-piker .calendar");
const closeBtn = document.querySelector("#close");

let globalNewDate = new Date();
let globalYear = globalNewDate.getFullYear();
let globalMonth = globalNewDate.getMonth();

let yearFromCalendar2;
let monthFromCalendar2;

leftBtn1.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth--;
  if (globalMonth === -1) {
    globalMonth = 11;
    globalYear--;
  }
  globalNewDate = new Date(globalYear, globalMonth, 1);
  createdDaysNumber(globalNewDate);
});
rightBtn2.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth++;
  if (globalMonth === 12) {
    globalMonth = 0;
    globalYear++;
  }
  globalNewDate = new Date(globalYear, globalMonth, 1);
  createdDaysNumber(globalNewDate);
});

// заполняет числами дни на календаре
function createdDaysNumber(selectedDateFromClicker) {
  let now;
  let month;
  let year;
  if (selectedDateFromClicker === undefined) {
    now = new Date();
   month = now.getMonth();
    // month = 0;
    year = now.getFullYear();
  } else {
    now = selectedDateFromClicker;
    month = selectedDateFromClicker.getMonth();
    year = selectedDateFromClicker.getFullYear();
  }
  createdMonthNames(month)
  //-------------------------переменные для цикла--------------------------------------------------------------
  const setNewDate = new Date(now.setFullYear(year, month, 1)); // эммулируем начало месяца
  const startDay = setNewDate.getDay()
  let dayCounter = 1;
  let monthCounter = month;

  for(let i = 7; i <span.length; i++) { 
    if (i-startDay<7) {
      span[i].innerHTML = ''
      span[i].style.cursor = "default";
    } else if (monthCounter === month){
      let newDate = new Date(now.setFullYear(year, month, dayCounter));
      span[i].innerHTML = `${newDate.getDate()}`;
      span[i].style.cursor = "pointer";
      monthCounter=newDate.getMonth()
      dayCounter++
    }
      if(monthCounter !== month) { 
    span[i].innerHTML = ''
    span[i].style.cursor = "default";
    dayCounter = 0
    }
  }
  dayCounter = 1;
  if(monthCounter === 0) {
    year++
  } 
  const setNewDate2 = new Date(now.setFullYear(year, monthCounter, 1)); // эммулируем начало месяца
  const startDay2 = setNewDate2.getDay()
  let newMonthCounter = setNewDate2.getMonth()

  yearFromCalendar2=setNewDate2.getFullYear();
  monthFromCalendar2=setNewDate2.getMonth()
  for(let i = 7; i <span2.length; i++) { 
     if (i-startDay2<7) {
      span2[i].innerHTML = ''
      span2[i].style.cursor = "default";
    } else if (monthCounter === newMonthCounter){
      let newDate = new Date(now.setFullYear(year, monthCounter, dayCounter));
      span2[i].innerHTML = `${newDate.getDate()}`;
      span2[i].style.cursor = "pointer";
      dayCounter++
      newMonthCounter = newDate.getMonth()
     }
    if(monthCounter!==newMonthCounter) {
     span2[i].innerHTML = ''
     span2[i].style.cursor = "default";
     if(i===span2.length-1) { 
      let newDate = new Date(now.setFullYear(year, newMonthCounter));
      const y = newDate.getFullYear()
      createdMonthNames2(monthCounter, y )
     }
    }
  }
}
function createdMonthNames(mon) {
  switch (mon) {
    case 0:
      mounthAndYear.innerHTML = `Январь ${globalYear}`;
      break;
    case 1:
      mounthAndYear.innerHTML = `Февраль ${globalYear}`;
      break;
    case 2:
      mounthAndYear.innerHTML = `Март ${globalYear}`;
      break;
    case 3:
      mounthAndYear.innerHTML = `Апрель ${globalYear}`;
      break;
    case 4:
      mounthAndYear.innerHTML = `Май ${globalYear}`;
      break;
    case 5:
      mounthAndYear.innerHTML = `Июнь ${globalYear}`;
      break;
    case 6:
      mounthAndYear.innerHTML = `Июль ${globalYear}`;
      break;
    case 7:
      mounthAndYear.innerHTML = `Август ${globalYear}`;
      break;
    case 8:
      mounthAndYear.innerHTML = `Сентябрь ${globalYear}`;
      break;
    case 9:
      mounthAndYear.innerHTML = `Октябрь ${globalYear}`;
      break;
    case 10:
      mounthAndYear.innerHTML = `Ноябрь ${globalYear}`;
      break;
    case 11:
      mounthAndYear.innerHTML = `Декабрь ${globalYear}`;
      break;
    default:
      console.log("switch case упал");
  }
}
function createdMonthNames2(mon, y) {
  switch (mon) {
    case 0:
      mounthAndYear2.innerHTML = `Январь ${y}`;
      break;
    case 1:
      mounthAndYear2.innerHTML = `Февраль ${y}`;
      break;
    case 2:
      mounthAndYear2.innerHTML = `Март ${y}`;
      break;
    case 3:
      mounthAndYear2.innerHTML = `Апрель ${y}`;
      break;
    case 4:
      mounthAndYear2.innerHTML = `Май ${y}`;
      break;
    case 5:
      mounthAndYear2.innerHTML = `Июнь ${y}`;
      break;
    case 6:
      mounthAndYear2.innerHTML = `Июль ${y}`;
      break;
    case 7:
      mounthAndYear2.innerHTML = `Август ${y}`;
      break;
    case 8:
      mounthAndYear2.innerHTML = `Сентябрь ${y}`;
      break;
    case 9:
      mounthAndYear2.innerHTML = `Октябрь ${y}`;
      break;
    case 10:
      mounthAndYear2.innerHTML = `Ноябрь ${y}`;
      break;
    case 11:
      mounthAndYear2.innerHTML = `Декабрь ${y}`;
      break;
    default:
      console.log("switch case упал");
  }
}
let firstDateForInput = "";
let secondDateForInput = "";

span.forEach(function (span) {
  span.addEventListener("click", function (event) {
    if (event.target.innerHTML !== "") {
      // собираем информацию и пушим в строку
      firstDateForInput = `${globalYear}/${globalMonth + 1}/${
        event.target.innerHTML
      }`;
      createdDateInInput(firstDateForInput, secondDateForInput);
    }
  });
});

function createdDateInInput(fText, sText) {
  if (fText === "") {
    input.value = "";
    input.value = sText;
  } else if (sText === "") {
    input.value = "";
    input.value = fText;
  } else {
    input.value = "";
    input.value = `${fText} - ${sText}`;
  }
}
input.addEventListener("focus", function () {
  // открывашка
  calendar.style.display = "block";
});
closeBtn.addEventListener("click", function () {
  // закрывашка
  calendar.style.display = "none";
});

createdMonthNames(globalMonth);
createdDaysNumber();

span2.forEach(function (span) {
  span.addEventListener("click", function (event) {
    if (event.target.innerHTML !== "") {
      // собираем информацию и пушим в строку
      secondDateForInput = `${yearFromCalendar2}/${monthFromCalendar2 + 1}/${
        event.target.innerHTML
      }`;
      createdDateInInput(firstDateForInput, secondDateForInput);
    }
    });
});

