"use strict";
const span = document.querySelectorAll(".date-piker .calendar .one .date span");
const leftBtn1 = document.querySelector(
  ".date-piker .calendar .one .wrapper .left"
);
const rightBtn1 = document.querySelector(
  ".date-piker .calendar .one .wrapper .right"
);
const mounthAndYear = document.querySelector(
  ".date-piker .calendar .one .wrapper .mounth"
);
const input = document.querySelector(".date-piker input");
const calendar = document.querySelector(".date-piker .calendar");
const closeBtn = document.querySelector("#close");

let globalNewDate = new Date();
let globalNewDateMilliseconds = Math.floor(Date.now());
let globalYear = globalNewDate.getFullYear();
let globalMonth = globalNewDate.getMonth();

leftBtn1.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth--;
  if (globalMonth === -1) {
    globalMonth = 11;
    globalYear--;
  }
  globalNewDate = new Date(globalYear, globalMonth, 1);
  createdMonthNames(globalMonth);
  createdDaysNumber(1, globalNewDate);
});

rightBtn1.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth++;
  if (globalMonth === 12) {
    globalMonth = 0;
    globalYear++;
  }
  globalNewDate = new Date(globalYear, globalMonth, 1);
  createdMonthNames(globalMonth);
  createdDaysNumber(1, globalNewDate);
});

// заполняет числами дни на календаре
function createdDaysNumber(cnt, selectedDateFromClicker) {
  let now;
  let month;
  let year;
  if (selectedDateFromClicker === undefined) {
    now = new Date();
    month = now.getMonth();
    year = now.getFullYear();
  } else {
    now = selectedDateFromClicker;
    month = selectedDateFromClicker.getMonth();
    year = selectedDateFromClicker.getFullYear();
  }

  let count = cnt || 1; // первый день месяца, который будем увеличивать для отрисовки каждого дня
  const setNewDate = new Date(now.setFullYear(year, month, count)); // эммулируем начало месяца
  let startDay = setNewDate.getDay();
  if (count !== 1) {
    startDay = new Date(now.setFullYear(year, month, 1)).getDay(); // на каждом круге необходимо вернуть startDay в первоначальное положение
  }
  if (month !== setNewDate.getMonth()) {
    for (let i = 7; i < 7 + startDay; i++) {
      // это "фор" чистит спаны, которые уже не используются в текущем месяце перед первым числом
      span[i].innerHTML = "";
      span[i].style.cursor = "default";
    }
    return; // если месяц изменился, то выходим из рекурсии.
  }
  // в формуле, что пониже:
  // 7 - это пропускаем именованные span'ы(вс.пн.вт.ср.чт.пт.сб).
  // startDay - это количество дней(спанов), которые надо пропустить для рисования. (пример: месяц начинается не с Воскресенья(1-ый спан), а с четверга(5-ый спан))
  // count - каждое следующее число(нумерация дня) в месяце.
  // 1 - просто отнять единичку, чтобы не было сдвига в спанах.
  span[7 + startDay + count - 1].innerHTML = `${setNewDate.getDate()}`;
  span[7 + startDay + count - 1].style.cursor = "pointer";
  count++;
  //--------------------------------------------------------------------
  for (let i = 7 + startDay + count - 1; i < span.length; i++) {
    span[i].innerHTML = ""; //Этот "фор" чистит спаны после последнего числа месяца.
    span[i].style.cursor = "default";
  }
  createdDaysNumber(count, selectedDateFromClicker);
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

let firstDateForInput = "";
let secondDateForInput = "";

span.forEach(function (span) {
  span.addEventListener("click", function (event) {
    if (event.target.innerHTML !== "") {
      // собираем информацию и пушим в строку
      firstDateForInput = `${globalYear}/${globalMonth}/${event.target.innerHTML}`;
      createdDateInInput(firstDateForInput, secondDateForInput);
    }
  });
});

function createdDateInInput(fText, sText) {
  input.value = fText + sText;
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
